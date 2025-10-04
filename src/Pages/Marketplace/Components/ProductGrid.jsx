import React from 'react';
import { Heart, ShoppingCart, Star, Search, Filter } from 'lucide-react';

const ProductGrid = ({ products, searchTerm, setSearchTerm, addToCart }) => {
    return (
        <>
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-orange-600 focus:border-orange-600 shadow-sm transition-all"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-orange-600 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200">
                    <Filter className="w-5 h-5" />
                    Filter
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.03] transition-all duration-500 group border border-gray-100">
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/500x300/f97316/ffffff?text=Textile+Art"; }}
                                />
                                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
                                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                                </button>
                            </div>

                            <div className="p-5">
                                <h3 className="font-bold text-xl text-slate-900 mb-1 line-clamp-2">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">by <span className="font-medium text-orange-600">{product.weaver}</span></p>
                                <p className="text-xs text-fuchsia-500 mb-3 font-semibold">{product.community}</p>

                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                        <span className="text-sm text-gray-600 ml-2 font-semibold">{product.rating}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-3">({product.reviews} reviews)</span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="font-extrabold text-2xl text-slate-900">₱{product.price}</span>
                                    <button
                                        onClick={() => addToCart(product.id)}
                                        className="bg-gradient-to-r from-orange-600 to-fuchsia-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="lg:col-span-4 text-center py-10">
                        <p className="text-xl text-gray-500">No products found for "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductGrid;
