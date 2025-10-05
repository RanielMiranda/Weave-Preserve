// src/pages/Campaigns/CampaignCard.jsx
import { useState } from 'react';
import { formatCurrency, getProgressPercentage } from '../utils.js';

export default function CampaignCard({ campaign }) {
  const [donationAmount, setDonationAmount] = useState('');

  const donate = () => {
    const amount = parseFloat(donationAmount);
    if (!amount || amount <= 0) {
      console.error('Please enter a valid donation amount');
      return;
    }
    if (amount > 5000) {
      console.error('Insufficient funds!');
    } else {
      console.log(`Donation successful! Amount: ₱${amount} for campaign ${campaign.id}`);
      setDonationAmount('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
      <div className="relative">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-48 object-cover"
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x480/f97316/ffffff?text=Campaign+Photo"; }}
        />
        {campaign.urgent && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
            Urgent
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-slate-900 shadow-md">
          {campaign.daysLeft} days left
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          {campaign.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {campaign.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-bold text-fuchsia-600">
              {Math.round(getProgressPercentage(campaign.raised, campaign.goal))}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-600 to-fuchsia-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage(campaign.raised, campaign.goal)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
          <div>
            <div className="text-xl font-bold text-slate-900">
              {formatCurrency(campaign.raised)}
            </div>
            <div className="text-sm text-gray-600">
              raised of {formatCurrency(campaign.goal)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-slate-900">
              {campaign.supporters}
            </div>
            <div className="text-sm text-gray-600">supporters</div>
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="number"
            placeholder="Donation amount (₱)"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-orange-600 focus:border-orange-600 transition-all"
          />
          <button
            onClick={donate}
            className="w-full bg-gradient-to-r from-orange-600 to-fuchsia-600 text-white py-3 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}
