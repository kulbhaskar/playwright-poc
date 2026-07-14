import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3000
const DB_FILE = path.join(__dirname, 'db.json')

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Initialize db.json if it doesn't exist
function initializeDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = { cart: [] }
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2))
  }
}

// Read cart from db.json
function readCart() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8')
    return JSON.parse(data).cart || []
  } catch (error) {
    console.error('Error reading cart:', error)
    return []
  }
}

// Write cart to db.json
function writeCart(cart) {
  try {
    const data = { cart }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing cart:', error)
    return false
  }
}

// GET /cart - Retrieve the cart
app.get('/cart', (req, res) => {
  const cart = readCart()
  res.json({
    success: true,
    cart: cart
  })
})

// POST /cart - Add/Update items in cart
app.post('/cart', (req, res) => {
  try {
    const { cart } = req.body

    if (!Array.isArray(cart)) {
      return res.status(400).json({
        success: false,
        message: 'Cart must be an array'
      })
    }

    writeCart(cart)
    res.json({
      success: true,
      message: 'Cart updated',
      cart: cart
    })
  } catch (error) {
    console.error('Error updating cart:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating cart'
    })
  }
})

// DELETE /cart - Clear the cart
app.delete('/cart', (req, res) => {
  try {
    writeCart([])
    res.json({
      success: true,
      message: 'Cart cleared',
      cart: []
    })
  } catch (error) {
    console.error('Error clearing cart:', error)
    res.status(500).json({
      success: false,
      message: 'Error clearing cart'
    })
  }
})

// POST /login - Login endpoint
app.post('/login', (req, res) => {
  const { email, password, guestCart } = req.body

  // Simple validation (demo credentials)
  if (email === 'user@example.com' && password === 'password') {
    // For demo, return success with user info
    res.json({
      success: true,
      user: {
        id: 1,
        name: 'John Doe',
        email: 'user@example.com'
      }
    })
  } else {
    res.json({
      success: false,
      message: 'Invalid credentials'
    })
  }
})

// Initialize database and start server
initializeDB()
app.listen(PORT, () => {
  console.log(`Shopping cart API server running on http://localhost:${PORT}`)
  console.log(`Cart data stored in: ${DB_FILE}`)
})
