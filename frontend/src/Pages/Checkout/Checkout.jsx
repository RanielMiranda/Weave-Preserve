import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from '../../Components/Header.jsx';
import Footer from '../../Components/Footer.jsx';
import { Truck } from 'lucide-react';
import CartItemCard from './Components/CartItemCard.jsx'
import CartSummary from './Components/CartSummary.jsx'
import PaymentOptions from './Components/PaymentOptions.jsx'
import ShippingForm from './Components/ShippingForm.jsx'
import ToastMessage from './Components/ToastMessage.jsx';

const Checkout = () => {
  /** @type {[CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>]} */
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Traditional Inabel Blanket",
      price: 2500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      name: "Kalinga Geometric Scarf",
      price: 1800,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ]);

  /** @type {[ShippingInfo, React.Dispatch<React.SetStateAction<ShippingInfo>>]} */
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [toast, setToast] = useState(/** @type {{message: string, type: 'success' | 'error' | '', id: number} | null} */(null));

  // --- Calculations ---
  const { subtotal, shipping, total } = useMemo(() => {
    const calculatedSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Free shipping threshold for ₱5,000
    const calculatedShipping = calculatedSubtotal > 5000 ? 0 : 250;
    const calculatedTotal = calculatedSubtotal + calculatedShipping;
    return { subtotal: calculatedSubtotal, shipping: calculatedShipping, total: calculatedTotal };
  }, [cart]);

  // --- Handlers ---

  const showToast = useCallback((message, type) => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000); // Auto-hide after 4 seconds
  }, []);

  const handleQuantityChange = useCallback((id, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== id);
      }
      return prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    showToast('Item removed from cart.', 'error');
  }, [showToast]);

  const handleShippingChange = useCallback((e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleCheckout = () => {
    // Validation
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.address) {
      showToast('Please fill in required fields (Name, Email, Address).', 'error');
      return;
    }
    if (cart.length === 0) {
        showToast('Your cart is empty. Please add items to proceed.', 'error');
        return;
    }

    // Mock payment/inventory check
    if (total > 10000 && paymentMethod === 'card') {
      showToast('Card declined: Insufficient funds for transaction.', 'error');
    } else {
      showToast(`Order placed successfully! Total: ₱${total.toLocaleString()} via ${paymentMethod.toUpperCase()}.`, 'success');
      // Clear the cart on successful checkout
      setCart([]);
      // Reset shipping info (optional)
      setShippingInfo({ name: '', email: '', address: '', city: '', zipCode: '' });
      setPaymentMethod('card');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <style>{`
        .font-serif {
            font-family: 'Playfair Display', serif;
        }
        body {
            font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* Load Tailwind CSS and Google Font */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

      <Header />

      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              Secure Checkout
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Review your purchase details and complete your order. Every purchase supports local Filipino weavers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1 & 2: Cart Items, Shipping, Payment */}
            <div className="lg:col-span-2 space-y-8">

                {/* Cart Items */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 min-h-[150px]">
                    <h2 className="font-serif text-2xl font-bold mb-6 text-slate-900">Review Items</h2>
                    {cart.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <Truck className="w-10 h-10 mx-auto mb-3 text-orange-400" />
                            <p className="text-xl font-medium">Your cart is currently empty.</p>
                            <p className="text-sm mt-1">Add some beautiful handloom products to proceed!</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {cart.map((item) => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={handleRemoveItem}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Shipping Form */}
                <ShippingForm
                    shippingInfo={shippingInfo}
                    onShippingChange={handleShippingChange}
                />

                {/* Payment Method */}
                <PaymentOptions
                    paymentMethod={paymentMethod}
                    onSetPaymentMethod={setPaymentMethod}
                />
            </div>

            {/* Column 3: Order Summary and Action Button */}
            <div className="lg:col-span-1 space-y-6 sticky top-20 h-fit">
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                cartLength={cart.length}
              />

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full bg-gradient-to-r from-orange-600 to-red-500 text-white py-4 rounded-xl font-extrabold text-lg uppercase tracking-wider shadow-lg transition-all duration-300 hover:from-orange-700 hover:to-red-600 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cart.length > 0 ? `Pay Now ₱${total.toLocaleString()}` : 'Cart is Empty'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Custom Toast Message Container */}
      {toast && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Checkout;
