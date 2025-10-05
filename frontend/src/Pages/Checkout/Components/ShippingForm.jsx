import react from 'react';
import { Truck } from 'lucide-react';

const ShippingForm = ({ shippingInfo, onShippingChange }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <h2 className="font-serif text-2xl font-bold mb-6 flex items-center text-slate-900">
      <Truck className="w-5 h-5 mr-3 text-orange-600" />
      Delivery Details
    </h2>
    <div className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name *"
        value={shippingInfo.name}
        onChange={onShippingChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address *"
        value={shippingInfo.email}
        onChange={onShippingChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Street Address *"
        value={shippingInfo.address}
        onChange={onShippingChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={onShippingChange}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition"
        />
        <input
          type="text"
          name="zipCode"
          placeholder="ZIP Code"
          value={shippingInfo.zipCode}
          onChange={onShippingChange}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition"
        />
      </div>
    </div>
  </div>
);

export default ShippingForm;