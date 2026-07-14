import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'

const API_URL = 'http://localhost:3000'
const RETRY_DELAY = 2000 // 2 seconds
const MAX_RETRIES = 3

export default function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [isServerOnline, setIsServerOnline] = useState(true)
  const [loadingCart, setLoadingCart] = useState(true)

  // Fetch cart from backend with retry logic
  const fetchCartFromBackend = async (retryCount = 0) => {
    try {
      const response = await fetch(`${API_URL}/cart`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      
      const data = await response.json()
      if (data.success) {
        setCart(data.cart)
        setIsServerOnline(true)
        setLoadingCart(false)
        return
      }
    } catch (error) {
      console.warn(`Failed to fetch cart (attempt ${retryCount + 1}):`, error.message)
      
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => fetchCartFromBackend(retryCount + 1), RETRY_DELAY)
      } else {
        setIsServerOnline(false)
        setLoadingCart(false)
        console.error('Server appears to be offline. Using cached cart.')
      }
    }
  }

  // Load cart from server when app mounts
  useEffect(() => {
    fetchCartFromBackend()
  }, [])

  // Sync cart to backend whenever it changes
  useEffect(() => {
    if (cart.length === 0 && loadingCart) return // Skip initial empty state
    
    const syncCartToBackend = async () => {
      try {
        const response = await fetch(`${API_URL}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart })
        })
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        
        const data = await response.json()
        if (data.success) {
          setIsServerOnline(true)
        }
      } catch (error) {
        console.error('Error syncing cart to backend:', error)
        setIsServerOnline(false)
        // Cart state is still updated locally, will sync when server is back online
      }
    }
    
    syncCartToBackend()
  }, [cart, loadingCart])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      setCart(updatedCart)
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }]
      setCart(updatedCart)
    }
  }

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId)
    setCart(updatedCart)
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      const updatedCart = cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
      setCart(updatedCart)
    }
  }

  const handleLogin = async (email, password) => {
    try {
      // Get the guest cart before login
      const guestCart = cart.length > 0 ? cart : JSON.parse(localStorage.getItem('cart_guest') || '[]')
      
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, guestCart })
      })
      const data = await response.json()
      if (data.success) {
        setUser(data.user)
      }
      return data
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Error logging in' }
    }
  }

  const handleLogout = async () => {
    setUser(null)
    setCart([])
  }

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        setCart([])
        setIsServerOnline(true)
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
      setIsServerOnline(false)
      setCart([])
    }
  }

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartCount} user={user} onLogout={handleLogout} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/cart" element={
            <Cart 
              cart={cart} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity} 
              onCheckout={handleCheckout} 
            />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
