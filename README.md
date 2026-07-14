# ShopHub - Single-Page React Shopping Application

A modern, responsive single-page React shopping application built with Vite and styled with Tailwind CSS. All logic is contained in a single component for easy deployment and maintenance.

## ✨ Features

### 1. **Product Grid Display**
- 8 sample products displayed in a responsive grid layout
- Emoji icons, product names, categories, and prices
- "Add" button with green hover effects
- Fully responsive design with smooth animations
- Grid adjusts: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)

### 2. **Real-Time Cart Management**
- Sidebar cart that updates instantly when items are added
- Cart item counter in header showing total quantity
- Manage items: increase/decrease quantities or remove
- Automatic total price calculation
- Toggle cart visibility with button click

### 3. **Checkout Form**
- Clean form collecting:
  - Full Name
  - Email address
  - Shipping Address  
  - Credit Card Number
- Full validation (all fields required)

### 4. **Order Success Confirmation**
- Green success message appears after submission
- Auto-dismisses after 3 seconds
- Cart automatically clears
- Ready for next purchase

## 🚀 Quick Start

### Installation
```powershell
cd "c:\Users\kulbhaskar.pandey\Documents\WebAppTry1"
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📁 Project Structure

```
src/
├── App.jsx           # Complete shopping app (all logic in one file)
├── App.css           # App styles (Tailwind import)
├── index.css         # Global styles (Tailwind import)
├── main.jsx          # React entry point
└── assets/           # Static files

Configuration:
├── vite.config.js          # Vite setup
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS for Tailwind
└── package.json             # Dependencies
```

## 🛠 Tech Stack

- **React 18** - UI with hooks
- **Vite** - Fast build & dev server
- **Tailwind CSS v4** - Utility classes
- **PostCSS** - CSS processing

## 📝 Available Scripts

```powershell
npm run dev          # Start dev server (HMR enabled)
npm run build        # Production build to /dist folder
npm run preview      # Preview production build
```

## 🎯 How to Use

### Adding Items
1. Click green "Add" button on any product
2. Item instantly appears in cart
3. Cart counter updates in real-time
4. Cart sidebar opens automatically

### Managing Cart
- **Quantity Controls**: +/- buttons next to each item
- **Remove Item**: Click red ✕ button
- **Automatic Totals**: Price updates instantly

### Checkout
1. Fill in the 4 required fields
2. Click blue "Checkout" button
3. See green success message
4. Cart clears automatically
5. Continue shopping!

## 📦 Sample Products

| Product | Price | Category |
|---------|-------|----------|
| 🎧 Wireless Headphones | $79.99 | Electronics |
| ☕ Coffee Maker | $49.99 | Kitchen |
| 🧘 Yoga Mat | $29.99 | Fitness |
| ⌚ Smart Watch | $199.99 | Electronics |
| 🥤 Blender | $59.99 | Kitchen |
| 💧 Water Bottle | $24.99 | Fitness |
| 💡 Desk Lamp | $39.99 | Office |
| 📱 Phone Case | $19.99 | Accessories |

## 🎨 Customization

### Add Products
Edit the `products` array in `App.jsx`:
```javascript
const products = [
  { id: 9, name: 'New Product', price: 99.99, category: 'Category', image: '🎁' },
]
```

### Change Colors
Modify Tailwind classes:
- `bg-blue-500` → Any Tailwind color
- `text-white` → Text colors
- Animations: `hover:scale-105`, `transition`

### Custom Fields
Add to form by updating `formData` state and input fields.

## 🌐 Deployment

### Vercel (Recommended)
```powershell
npm run build
vercel  # Follow prompts
```

### Netlify
```powershell
npm run build
# Drag & drop /dist folder
```

### GitHub Pages / Self-Hosted
```powershell
npm run build
# Upload /dist folder to server
```

## 📊 Performance

- **CSS**: 3.71KB gzipped
- **JS**: 61.64KB gzipped  
- **Build Time**: ~600ms
- **Dev Server**: <1s HMR reload

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Vite auto-tries: 5174, 5175, etc. |
| CSS not loading | Verify `@import "tailwindcss"` in CSS files |
| Build errors | Run `npm install` and `npm run build` |
| Hot reload not working | Restart dev server |

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📄 Component Details

### State Management
```javascript
const [cart, setCart] = useState([])           // Items in cart
const [showCheckout, setShowCheckout] = useState(false)  // Sidebar visibility
const [showSuccess, setShowSuccess] = useState(false)  // Success message
const [formData, setFormData] = useState({...})  // Form inputs
```

### Key Functions
- `addToCart(product)` - Add/increase items
- `removeFromCart(productId)` - Delete items
- `updateQuantity(productId, quantity)` - Modify quantities
- `handleCheckout(e)` - Process order & clear cart

### Calculated Values
- `cartTotal` = sum of (price × quantity) for all items
- `cartCount` = sum of all quantities

## ✅ Features Implemented

- ✓ Product grid with Add buttons
- ✓ Real-time cart updates
- ✓ Item quantity management
- ✓ Automatic price calculations
- ✓ Cart sidebar toggle
- ✓ Checkout form validation
- ✓ Success message
- ✓ Cart persistence during session
- ✓ Responsive mobile/tablet/desktop
- ✓ Tailwind CSS styling
- ✓ Single file component (easy deployment)
- ✓ Hot Module Replacement (HMR)

## 🚢 Ready for Deployment

- Zero configuration needed
- Single App.jsx component
- All CSS included
- No dependencies on external APIs
- Fully self-contained
- ~250 lines of code

Perfect for:
- Learning React & Tailwind
- Quick prototyping
- Portfolio projects
- Small e-commerce needs
- Starting point for larger apps

---

**Built with React + Vite + Tailwind CSS**  
Happy Shopping! 🛒

