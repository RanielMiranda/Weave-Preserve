import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Traditional Inabel Blanket",
      price: "₱2,500",
      originalPrice: "₱3,000",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      weaver: "Maria Santos",
      community: "Ilocos Sur",
      rating: 4.9,
      reviews: 24
    },
    {
      id: 2,
      name: "Kalinga Geometric Scarf",
      price: "₱1,800",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      weaver: "Elena Baggao",
      community: "Kalinga Province",
      rating: 5.0,
      reviews: 18
    },
    {
      id: 3,
      name: "Ikat Table Runner",
      price: "₱1,200",
      originalPrice: "₱1,500",
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      weaver: "Rosa Dulawan",
      community: "Mountain Province",
      rating: 4.8,
      reviews: 31
    },
    {
      id: 4,
      name: "Cordillera Wall Hanging",
      price: "₱3,200",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      weaver: "Carmen Bautista",
      community: "Benguet",
      rating: 4.9,
      reviews: 15
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Handwoven Treasures
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover authentic textiles crafted by skilled artisans from the Cordillera region, 
            each piece telling a unique story of tradition and heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-orange-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    Sale
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">by {product.weaver}</p>
                <p className="text-xs text-purple-400 mb-3">{product.community}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-slate-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <button className="bg-gradient-to-r from-orange-600 to-fuchsia-500 text-white p-2 rounded-lg hover:shadow-md transition-all duration-300">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/marketplace" 
            className="inline-block bg-gradient-to-r from-orange-600 to-fuchsia-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;