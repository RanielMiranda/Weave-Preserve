import react from 'react';
import { CreditCard } from 'lucide-react';

const PaymentOptions = ({ paymentMethod, onSetPaymentMethod }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <h2 className="font-serif text-2xl font-bold mb-6 flex items-center text-slate-900">
      <CreditCard className="w-5 h-5 mr-3 text-orange-600" />
      Payment Method
    </h2>
    <div className="space-y-3">
      {['card', 'paypal', 'cod'].map((method) => (
        <label key={method} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
          <input
            type="radio"
            value={method}
            checked={paymentMethod === method}
            onChange={(e) => onSetPaymentMethod(e.target.value)}
            className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
          />
          <span className="ml-3 font-medium text-gray-700 capitalize">
            {method === 'card' ? 'Credit/Debit Card' : method === 'cod' ? 'Cash on Delivery' : method}
          </span>
        </label>
      ))}
    </div>
  </div>
);

export default PaymentOptions;