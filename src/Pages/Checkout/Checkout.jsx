import React, { useState } from 'react';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { Trash2, CreditCard, Truck } from 'lucide-react';
    import { toast } from 'react-toastify';

    const Checkout: React.FC = () => {
      // Mock cart data - in a real app, this would come from context or props
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

      const [shippingInfo, setShippingInfo] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zipCode: ''
      });

      const [paymentMethod, setPaymentMethod] = useState('card');

      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shipping = subtotal > 5000 ? 0 : 250;
      const total = subtotal + shipping;

      const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity <= 0) {
          setCart(cart.filter(item => item.id !== id));
        } else {
          setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          ));
        }
      };

      const handleRemoveItem = (id: number) => {
        setCart(cart.filter(item => item.id !== id));
      };

      const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
      };

      const handleCheckout = () => {
        // Mock checkout validation
        if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.address) {
          toast.error('Please fill in all required shipping information');
          return;
        }
        if (total > 10000) {
          toast.error('Insufficient funds!');
        } else {
          toast.success('Order placed successfully!');
          setCart([]);
        }
      };

      return (
        <div className="min-h-screen">
          <Header />
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Checkout
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Review your cart and complete your purchase to support our weavers.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="font-playfair text-2xl font-bold mb-6">Your Cart</h2>
                    {cart.length === 0 ? (
                      <p className="text-gray-600">Your cart is empty.</p>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-900">{item.name}</h3>
                              <p className="text-gray-600">₱{item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-2 py-1 border rounded"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-2 py-1 border rounded"
                              >
                                +
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">₱{item.price * item.quantity}</p>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-600 hover:text-red-800 mt-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Summary & Checkout */}
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="font-playfair text-2xl font-bold mb-6">Order Summary</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₱{subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `₱${shipping}`}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>₱{total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="font-playfair text-2xl font-bold mb-6 flex items-center">
                      <Truck className="w-5 h-5 mr-2" />
                      Shipping Information
                    </h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={shippingInfo.name}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-600 focus:border-orange-600"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-600 focus:border-orange-600"
                        required
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-600 focus:border-orange-600"
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-600 focus:border-orange-600"
                        />
                        <input
                          type="text"
                          name="zipCode"
                          placeholder="ZIP Code"
                          value={shippingInfo.zipCode}
                          onChange={handleShippingChange}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-600 focus:border-orange-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="font-playfair text-2xl font-bold mb-6 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Method
                    </h2>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        Credit/Debit Card
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        PayPal
                      </label>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                    className="w-full bg-gradient-to-r from-orange-600 to-fuchsia-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      );
    };

    export default Checkout;