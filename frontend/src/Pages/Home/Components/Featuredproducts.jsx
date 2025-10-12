import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 

// 👇 Accept products, loading, and error as props 👇
const FeaturedProducts = ({ products, loading, error }) => {
    
    // 💡 Logic to display only the first 4 products
    const featuredItems = products.slice(0, 4);

    if (loading) {
        return (
            <section className="py-16 bg-gray-50 text-center">
                <p className="text-xl text-fuchsia-600 font-semibold">Loading featured treasures...</p>
            </section>
        );
    }

    if (error) {
         return (
            <section className="py-16 bg-gray-50 text-center">
                <p className="text-xl text-red-600 font-semibold">Error: {error}</p>
            </section>
        );
    }
    
    // Check if products array is empty after loading
    if (featuredItems.length === 0) {
        return (
            <section className="py-16 bg-gray-50 text-center">
                <p className="text-xl text-gray-500">No featured products available right now.</p>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ... (Header remains the same) ... */}
                <div className="text-center mb-12">
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Featured Handwoven Treasures
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover authentic textiles crafted by skilled artisans from the Cordillera region...
                    </p>
                </div>

                {/* 👇 Use the limited featuredItems here 👇 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredItems.map((product, index) => (
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
                                {/* ... (Rest of the product card logic) ... */}
                                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                                    <Heart className="w-4 h-4 text-gray-600" />
                                </button>
                                {/* Note: Assuming your backend doesn't provide originalPrice/reviews/rating, 
                                    you may need to add default values to the product objects 
                                    or update your database/API to include these fields if they are missing. */}
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
                                {/* The weaver and community data might be missing from your current ProductRead schema */}
                                <p className="text-sm text-gray-600 mb-2">by {product.weaver || 'Artisan'}</p> 
                                <p className="text-xs text-purple-400 mb-3">{product.community || 'Weaving Community'}</p>
                                
                                <div className="flex items-center mb-3">
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-gray-600 ml-1">{product.rating || 'N/A'}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-2">({product.reviews || 0} reviews)</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-lg text-slate-900">₱{product.price}</span>
                                        {/* You may need to remove or mock originalPrice */}
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