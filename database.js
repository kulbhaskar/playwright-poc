import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, 'app.db')

const db = new Database(dbPath)

// Initialize database schema
export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      image TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, product_id)
    )
  `)

  console.log('Database initialized successfully')
}

// Get user by email
export function getUserByEmail(email) {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
  return stmt.get(email)
}

// Create or get user
export function getOrCreateUser(email, password, name) {
  try {
    const stmt = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)')
    stmt.run(email, password, name)
    return getUserByEmail(email)
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return getUserByEmail(email)
    }
    throw error
  }
}

// Get user cart
export function getUserCart(userId) {
  const stmt = db.prepare(`
    SELECT 
      product_id as id,
      product_name as name,
      price,
      quantity,
      image
    FROM cart_items 
    WHERE user_id = ?
  `)
  return stmt.all(userId)
}

// Save cart items for user
export function saveUserCart(userId, cartItems) {
  // Clear existing cart items for this user
  const deleteStmt = db.prepare('DELETE FROM cart_items WHERE user_id = ?')
  deleteStmt.run(userId)

  // Insert new cart items
  if (cartItems && cartItems.length > 0) {
    const insertStmt = db.prepare(`
      INSERT INTO cart_items (user_id, product_id, product_name, price, quantity, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    cartItems.forEach(item => {
      insertStmt.run(userId, item.id, item.name, item.price, item.quantity, item.image)
    })
  }
}

// Merge guest cart with user cart
export function mergeCartWithUser(userId, guestCart) {
  const existingCart = getUserCart(userId)

  // Create a map of existing items for quick lookup
  const cartMap = new Map()
  existingCart.forEach(item => {
    cartMap.set(item.id, item)
  })

  // Merge guest items with existing items
  guestCart.forEach(guestItem => {
    if (cartMap.has(guestItem.id)) {
      const existingItem = cartMap.get(guestItem.id)
      existingItem.quantity += guestItem.quantity
    } else {
      cartMap.set(guestItem.id, {
        id: guestItem.id,
        name: guestItem.name,
        price: guestItem.price,
        quantity: guestItem.quantity,
        image: guestItem.image
      })
    }
  })

  // Convert map back to array and save
  const mergedCart = Array.from(cartMap.values())
  saveUserCart(userId, mergedCart)

  return mergedCart
}

export default db
