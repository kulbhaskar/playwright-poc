# Shopping Cart API - Setup Guide

## Overview
Your app has been refactored to use a Node.js Express backend with file-based storage (db.json) instead of localStorage.

## Components Created

### 1. Backend Server (`api-server.js`)
- Runs on **http://localhost:3000**
- Stores cart data in **db.json**
- CORS enabled for localhost:5173 (your Vite frontend)

### 2. API Endpoints

#### GET /cart
Retrieves the current cart
```bash
curl http://localhost:3000/cart
```
**Response:**
```json
{
  "success": true,
  "cart": [
    { "id": 1, "name": "Item", "price": 29.99, "quantity": 2 }
  ]
}
```

#### POST /cart
Add or update cart items
```bash
curl -X POST http://localhost:3000/cart \
  -H "Content-Type: application/json" \
  -d '{"cart": [{"id": 1, "name": "Item", "price": 29.99, "quantity": 2}]}'
```

#### DELETE /cart
Clear the entire cart (called on checkout)
```bash
curl -X DELETE http://localhost:3000/cart
```

## Frontend Changes

### Updated App.jsx
- **API_URL** changed from `http://localhost:3001/api` to `http://localhost:3000`
- **Fetch on Mount**: Cart is fetched from backend when app loads with retry logic
- **Auto Sync**: Every time you add/remove items, the cart is automatically synced to the backend
- **Error Handling**: If server is offline, changes are still saved locally and will sync when server is back online
- **Async/Await**: All API calls use modern async/await pattern

### Functions Refactored
- `addToCart()` - Updates local state, which triggers sync to backend
- `removeFromCart()` - Updates local state, which triggers sync to backend  
- `updateQuantity()` - Updates local state, which triggers sync to backend
- `handleCheckout()` - Calls DELETE /cart endpoint to clear cart on backend

## Running the App

```bash
npm run dev
```

This will start:
- **Vite Frontend** on http://localhost:5173
- **API Server** on http://localhost:3000

## Database File

Cart data is persisted in **db.json**:
```json
{
  "cart": [
    { "id": 1, "name": "Product", "price": 99.99, "quantity": 1 }
  ]
}
```

## Error Handling

The frontend includes:
- **Retry Logic**: Tries up to 3 times with 2-second delays if server fails to load
- **Offline Support**: Changes are saved locally and will sync when server comes back online
- **Server Status**: `isServerOnline` state tracks connectivity (can be used for UI indicators)

## Notes

- The cart is now shared/persistent across browser sessions
- Clearing browser cache won't lose cart data (it's stored on server)
- Each cart item needs: `id`, `name`, `price`, `quantity`, and `image` (emoji) fields
