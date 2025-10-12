import react from 'react';
import { CreditCard, Mail } from 'lucide-react';

const PaymentDetailsForm = ({ paymentMethod, paymentDetails, onPaymentDetailsChange }) => {
  if (paymentMethod === 'cod') {
    return null; // COD doesn't need a details form
  }

  const isCard = paymentMethod === 'card';
  const title = isCard ? 'Card Information' : 'PayPal Email';
  const Icon = isCard ? CreditCard : Mail;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="font-serif text-xl font-bold mb-4 flex items-center text-slate-900">
        <Icon className="w-5 h-5 mr-3 text-orange-600" />
        {title}
      </h2>
      <div className="space-y-4">
        {isCard ? (
          <>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number (16 digits) *"
              value={paymentDetails.cardNumber}
              onChange={onPaymentDetailsChange}
              maxLength={16}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition"
              required
            />
            {/* Mock fields for a full card form */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY *"
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition"
                maxLength={5}
                required
              />
              <input
                type="text"
                placeholder="CVV *"
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition"
                maxLength={4}
                required
              />
            </div>
          </>
        ) : (
          <input
            type="email"
            name="paypalEmail"
            placeholder="PayPal Email Address *"
            value={paymentDetails.paypalEmail}
            onChange={onPaymentDetailsChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition"
            required
          />
        )}
      </div>
    </div>
  );
};

export default PaymentDetailsForm;