import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom'

const CartSummary = ({ cart, products, checkout }) => {
    if (cart.length === 0) return null;

    const totalAmount = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        const total = sum + (product ? product.price * item.quantity : 0);
        return Math.round(total * 100) / 100;
    }, 0);

    // totalamount seperated by commas for thousands
    const formattedTotalAmount = totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <div className="mt-16 sticky bottom-0 bg-white p-6 rounded-xl shadow-2xl border-t-4 border-fuchsia-500 max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-fuchsia-600" />
                    Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                </h2>
                <span className="text-2xl font-extrabold text-orange-600">
                    ₱{formattedTotalAmount}
                </span>
            </div>

            <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                {cart.map(item => {
                    const product = products.find(p => p.id === item.id);
                    return product ? (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700 font-medium">
                                {product.name}
                            </span>
                            <span className="text-slate-900 font-bold">
                                x{item.quantity} (₱{Math.round(product.price * item.quantity) * 100 / 100})
                            </span>
                        </div>
                    ) : null;
                })}
            </div>

            <Link
            to="/checkout"
            className="mt-6 block text-center w-full bg-gradient-to-r from-orange-600 to-fuchsia-600 text-white py-3 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] shadow-lg"
            >
            Proceed to Checkout
            </Link>
        </div>
    );
};

export default CartSummary;
