import React, { useState, useEffect, useCallback } from 'react';
import ProductGrid from './Components/ProductGrid.jsx';
import CartSummary from './Components/CartSummary.jsx';
import { toast } from 'react-toastify';
import axiosInstance from '../Dashboard/api/axiosInstance.js'; 


const Marketplace = () => {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/products/'); 
            setProductsData(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products. Please check the API connection.");
            setProductsData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); // Run once on component mount

    const addToCart = (productId) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing) {
                return prev.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            const product = productsData.find(p => p.id === productId);
            if (!product) {
                console.error(`Product with ID ${productId} not found.`);
                return prev;
            }
            toast.success(`Added ${product.name} to cart!`); 
            return [...prev, { id: productId, quantity: 1 }];
        });
        console.log(`Product ${productId} added to cart.`);
    };

    const checkout = () => {
        const total = cart.reduce((sum, item) => {
            const product = productsData.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);

        if (total > 100000) { // Adjusted mock check for larger totals
            toast.error('Insufficient funds!');
        } else if (cart.length > 0) {
            toast.success(`Checkout successful! Total: ₱${total.toFixed(2)}`);
            setCart([]);
        } else {
            toast.info('Your cart is empty.');
        }
    };

    // Filter products based on search term
    const filteredProducts = productsData.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 👇 RENDER LOGIC UPDATE 👇
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

                    {loading ? (
                        <div className="text-center py-20 text-xl text-fuchsia-600 font-bold">Loading Products...</div>
                    ) : error ? (
                        <div className="text-center py-20 text-xl text-red-600 font-bold">{error}</div>
                    ) : (
                        <>
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
                                products={productsData} // Ensure the cart uses the fetched data
                                checkout={checkout}
                            />
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Marketplace;