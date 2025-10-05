import React, { useState } from 'react';
// Corrected paths for local resolution in the compilation environment
import Header from '../../Components/Header.jsx';
import Footer from '../../Components/Footer.jsx';
import ProductGrid from './Components/ProductGrid.jsx';
import CartSummary from './Components/CartSummary.jsx';
import { toast } from 'react-toastify';

const productsData = [
    {
      id: 1,
      name: "Traditional Inabel Blanket",
      price: 2500,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      weaver: "Maria Santos",
      community: "Ilocos Sur",
      rating: 4.9,
      reviews: 24
    },
    {
      id: 2,
      name: "Kalinga Geometric Scarf",
      price: 1800,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      weaver: "Elena Baggao",
      community: "Kalinga Province",
      rating: 5.0,
      reviews: 18
    },
    {
      id: 3,
      name: "Ikat Table Runner",
      price: 1200,
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      weaver: "Rosa Dulawan",
      community: "Mountain Province",
      rating: 4.8,
      reviews: 31
    }
];

const Marketplace = () => {
    // State management for search and cart items
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]); // Array of { id: number, quantity: number }

    const addToCart = (productId) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing) {
                return prev.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { id: productId, quantity: 1 }];
        });
        console.log(`Product ${productId} added to cart.`);
    };
    const checkout = () => {
        const total = cart.reduce((sum, item) => {
            const product = productsData.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);

        if (total > 10000) { // Mock insufficient funds check
            // toast.error('Insufficient funds!');
            console.error('Insufficient funds!');
        } else if (cart.length > 0) {
            // toast.success(`Checkout successful! Total: ₱${total}`);
            console.log(`Checkout successful! Total: ₱${total}`);
            setCart([]);
        } else {
            // toast.info('Your cart is empty.');
            console.warn('Your cart is empty.');
        }
    };

    // Filter products based on search term
    const filteredProducts = productsData.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen font-sans bg-gray-50">
            
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                            Artisan Marketplace
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Browse and purchase authentic handwoven textiles from our community of artisans.
                        </p>
                    </div>

                    {/* Product Grid Component */}
                    <ProductGrid 
                        products={filteredProducts}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        addToCart={addToCart}
                    />

                    {/* Cart Summary Component */}
                    <CartSummary 
                        cart={cart}
                        products={productsData}
                        checkout={checkout}
                    />
                </div>
            </section>
        </div>
    );
};

export default Marketplace;
