import express from 'express'
import cors from 'cors'
import {
  initializeDatabase,
  getUserByEmail,
  getOrCreateUser,
  getUserCart,
  saveUserCart,
  mergeCartWithUser
} from './database.js'

const app = express()
const PORT = 3001

// Initialize database
initializeDatabase()

// Middleware
app.use(cors())
app.use(express.json())

// Login API
app.post('/api/login', (req, res) => {
  const { email, password, guestCart } = req.body

  // Simple validation (in a real app, this would be against a database with hashed passwords)
  if (email === 'user@example.com' && password === 'password') {
    try {
      const user = getOrCreateUser(email, password, 'John Doe')

      // Merge guest cart with user cart
      let userCart = []
      if (guestCart && guestCart.length > 0) {
        userCart = mergeCartWithUser(user.id, guestCart)
      } else {
        userCart = getUserCart(user.id)
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          cart: userCart
        }
      })
    } catch (error) {
      console.error('Login error:', error)
      res.json({
        success: false,
        message: 'Error logging in'
      })
    }
  } else {
    res.json({
      success: false,
      message: 'Invalid credentials'
    })
  }
})

// Get user cart
app.get('/api/cart/:email', (req, res) => {
  const { email } = req.params

  try {
    const user = getUserByEmail(email)

    if (user) {
      const cart = getUserCart(user.id)
      res.json({
        success: true,
        cart: cart
      })
    } else {
      res.json({
        success: false,
        cart: []
      })
    }
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.json({
      success: false,
      cart: []
    })
  }
})

// Save cart
app.post('/api/cart/:email', (req, res) => {
  const { email } = req.params
  const { cart } = req.body

  try {
    const user = getUserByEmail(email)

    if (user) {
      saveUserCart(user.id, cart)
      res.json({
        success: true,
        message: 'Cart saved successfully'
      })
    } else {
      res.json({
        success: false,
        message: 'User not found'
      })
    }
  } catch (error) {
    console.error('Error saving cart:', error)
    res.json({
      success: false,
      message: 'Error saving cart'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
