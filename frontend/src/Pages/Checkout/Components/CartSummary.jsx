import react from 'react';

const CartSummary = ({ subtotal, shipping, total, cartLength, paymentMethod }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <h2 className="font-serif text-2xl font-bold mb-6 text-slate-900">Order Summary</h2>
    <div className="space-y-3 text-lg">
      <div className="flex justify-between text-gray-700">
        <span>Subtotal ({cartLength} items)</span>
        <span>₱{subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span>Shipping</span>
        <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
          {shipping === 0 ? 'Free' : `₱${shipping.toLocaleString()}`}
        </span>
      </div>
      <div className="flex justify-between text-sm pt-2 text-gray-500 border-t border-dashed border-gray-100">
        <span className='font-medium'>Payment Method</span>
        <span className='capitalize'>{paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}</span>
      </div>
      <div className="border-t border-dashed border-gray-300 pt-4 flex justify-between font-extrabold text-2xl text-orange-600">
        <span>Order Total</span>
        <span>₱{total.toLocaleString()}</span>
      </div>
      {shipping === 0 && (
        <p className="text-xs text-green-600 pt-2 text-center">
          * Congratulations! You qualified for free shipping.
        </p>
      )}
    </div>
  </div>
);

export default CartSummary;