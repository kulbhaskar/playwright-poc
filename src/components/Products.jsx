import { useState, useEffect } from 'react'

// Sample products - in a real app, this would come from an API
const sampleProducts = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Electronics', image: '🎧', rating: 4.5 },
  { id: 2, name: 'Coffee Maker', price: 49.99, category: 'Kitchen', image: '☕', rating: 4.2 },
  { id: 3, name: 'Yoga Mat', price: 29.99, category: 'Fitness', image: '🧘', rating: 4.8 },
  { id: 4, name: 'Blender', price: 59.99, category: 'Kitchen', image: '🥤', rating: 4.3 },
  { id: 5, name: 'Smart Watch', price: 199.99, category: 'Electronics', image: '⌚', rating: 4.6 },
  { id: 6, name: 'Water Bottle', price: 24.99, category: 'Fitness', image: '💧', rating: 4.7 },
  { id: 7, name: 'Phone Case', price: 19.99, category: 'Accessories', image: '📱', rating: 4.4 },
  { id: 8, name: 'Laptop Stand', price: 34.99, category: 'Office', image: '💻', rating: 4.5 },
  { id: 9, name: 'Sunglasses', price: 89.99, category: 'Accessories', image: '🕶️', rating: 4.9 },
  { id: 10, name: 'Desk Lamp', price: 39.99, category: 'Office', image: '💡', rating: 4.1 },
]

export default function Products({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts)
      setLoading(false)
    }, 1000)
  }, [])

  const categories = ['All', ...new Set(products.map(product => product.category))]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 p-4"
            >
              <div className="text-6xl mb-3 text-center">{product.image}</div>
              <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <div className="flex items-center mb-3">
                <span className="text-yellow-400">⭐</span>
                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded transition text-sm font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}