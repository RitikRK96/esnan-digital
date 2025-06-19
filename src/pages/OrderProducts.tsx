import React, { useState, useEffect } from 'react';
import { Droplets, Camera, Star, Flower, Gift, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const OrderProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('holy-water');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart, items } = useCart();

  const tabs = [
    { id: 'holy-water', name: 'Holy Water', icon: Droplets },
    { id: 'prasadam', name: 'Prasadam', icon: Flower },
    { id: 'combos', name: 'Combo Deals', icon: Gift }
  ];
  const [products, setProducts] = useState<Record<string, any[]>>({
    'holy-water': [],
    'photography': [],
    'prasadam': [],
    'combos': []
  });


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch('https://us-central1-esnan-digital-10a7b.cloudfunctions.net/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);


  const isInCart = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const handleAddToCart = async (product: any) => {
    if (!user || !user.id) return;
    const userId =user.id; // Replace with actual user ID from auth context or state

   
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    };

    
     addToCart(cartItem);
  };


  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-decorative font-bold text-saffron-800 mb-4">
            Sacred Products & Services
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Bring divine blessings to your home with our authentic sacred products and services
          </p>
        </div>

        {/* Unified Scrollable Tabs for All Screen Sizes */}
        {/* Unified Scrollable Tabs with Wider Layout on Desktop */}
        <div className="mb-8">
          <div className="overflow-x-auto md:overflow-visible px-2 md:px-0 pb-4">
            <div className="flex md:justify-left md:flex-wrap space-x-2 md:space-x-6 max-w-full  mx-auto">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`transition-all duration-300 font-semibold rounded-xl whitespace-nowrap
              flex flex-col md:flex-row items-center md:space-x-3 space-y-2 md:space-y-0
              px-4 md:px-6 py-3 md:py-4
              ${activeTab === tab.id
                        ? 'bg-gradient-to-b md:bg-gradient-to-r from-saffron-600 to-saffron-700 text-white shadow-lg md:shadow-xl'
                        : 'bg-white text-gray-600 hover:bg-saffron-50 hover:text-saffron-600 shadow-md'
                      }`}
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="text-xs md:text-base">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>




        {/* Tab Content with Animation */}
        <div className="relative">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-saffron-600 border-opacity-60"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products[activeTab as keyof typeof products].map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Product Image */}
                  <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-saffron-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <Package className="h-5 w-5 text-saffron-600" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews.toLocaleString()})
                      </span>
                    </div>

                    {/* Volume/Quantity */}
                    <div className="text-sm text-saffron-600 font-medium mb-4 bg-saffron-50 px-3 py-1 rounded-full inline-block">
                      {product.volume}
                    </div>

                    {/* Price and Cart Controls */}
                    <div className="flex items-center justify-between">
                      <div className="text-xl sm:text-2xl font-bold text-saffron-600">
                        ₹{product.price}
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isInCart(product.id)||!user}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isInCart(product.id)
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : 'bg-saffron-600 text-white hover:bg-saffron-700 shadow-lg hover:shadow-xl'
                          }`}
                      >
                        {isInCart(product.id) ? 'Added ✓' : (!user ? 'Login First' : 'Add to Cart')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Special Offers Section */}
        <div className="mt-16 bg-gradient-to-r from-saffron-50 to-spiritual-cream rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-decorative font-bold text-saffron-800 mb-4">
              Special Offers & Blessings
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Take advantage of our special packages designed to bring maximum spiritual benefits
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Free Delivery</h3>
              <p className="text-gray-600 text-sm">On orders above ₹500</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Blessed by Priests</h3>
              <p className="text-gray-600 text-sm">All items blessed during ceremonies</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Certificate Included</h3>
              <p className="text-gray-600 text-sm">Authenticity certificate with each order</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProducts;