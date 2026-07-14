export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About ShopHub</h1>
          <p className="text-xl text-gray-600">
            Your trusted online shopping destination since 2024
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At ShopHub, we believe that shopping should be simple, enjoyable, and accessible to everyone.
              Our mission is to provide high-quality products at competitive prices while delivering
              exceptional customer service.
            </p>
            <p className="text-gray-600">
              We curate a diverse selection of products across multiple categories, ensuring that our
              customers can find everything they need in one convenient location.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Wide variety of quality products
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Competitive pricing and frequent deals
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Fast and reliable shipping
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Secure payment processing
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                30-day return policy
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                24/7 customer support
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍💼</span>
              </div>
              <h3 className="font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👩‍💻</span>
              </div>
              <h3 className="font-semibold text-gray-900">Jane Smith</h3>
              <p className="text-gray-600">Head of Technology</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍💼</span>
              </div>
              <h3 className="font-semibold text-gray-900">Mike Johnson</h3>
              <p className="text-gray-600">Customer Service Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}