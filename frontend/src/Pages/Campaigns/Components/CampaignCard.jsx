// campaign card.jsx (Refactored)
import { useState } from 'react';
import { formatCurrency, getProgressPercentage } from '../utils.js';
import { createDonation } from '../../../api/axiosInstance.js';
// Removed 'import { X } from 'lucide-react';'
import DonationModal from './DonationModal'; // <-- New import

const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    return !!token && !!userId;
};



export default function CampaignCard({ 
    campaign, 
    onSuccessfulDonation, 
    onDonationError       
}) {
    const [donationAmount, setDonationAmount] = useState('');
    const [isDonating, setIsDonating] = useState(false); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentOption, setPaymentOption] = useState('gcash');
    const [paymentDetail, setPaymentDetail] = useState(''); // <-- NEW STATE for phone/email/card
    const [message, setMessage] = useState('');

    const isLoggedIn = checkLoginStatus();

    // Utility function to determine the placeholder and type for the dynamic input
    const getPaymentInputProps = () => {
        switch (paymentOption) {
            case 'gcash':
                return { placeholder: 'GCash Phone Number (e.g., 09xxxxxxxxx)', type: 'tel' };
            case 'paypal':
                return { placeholder: 'PayPal Email Address', type: 'email' };
            case 'credit_card':
                return { placeholder: 'Credit Card Number', type: 'text' };
            default:
                return { placeholder: 'Enter payment detail', type: 'text' };
        }
    };

    const handleModalOpen = () => {
        const amount = parseFloat(donationAmount);
        
        if (!isLoggedIn) {
            onDonationError("You must be logged in to donate.");
            return;
        }

        if (!amount || amount <= 0) {
            onDonationError("Invalid donation amount! Please enter a positive amount.");
            return;
        }
        
        // --- NEW VALIDATION ---
        if (!paymentDetail.trim()) {
            onDonationError(`Please enter your ${getPaymentInputProps().placeholder.split('(')[0].trim()}.`);
            return;
        }
        // -----------------------

        // Only open the modal if the amount and detail are valid.
        setIsModalOpen(true);
    }
    
    const donate = async () => {
        const amount = parseFloat(donationAmount);
        
        // Redundant checks kept for safety, though handleModalOpen should catch them.
        if (!amount || amount <= 0 || !isLoggedIn || !paymentDetail.trim()) {
            onDonationError("Missing required donation information.");
            setIsModalOpen(false); // Close modal on error
            return;
        }

        const userId = localStorage.getItem('user_id');
        setIsDonating(true); 
        
        const donationData = { 
            campaign_id: campaign.id, 
            amount: amount, 
            customer_id: parseInt(userId, 10),
            payment_option: paymentOption, 
            message: message,
            // NOTE: paymentDetail is intentionally NOT sent to createDonation API call based on your original backend setup,
            // but it is collected here on the frontend for UX compliance.
        };

        try {
            const newDonation = await createDonation(donationData);
            
            onSuccessfulDonation(newDonation);
            setDonationAmount('');
            setPaymentDetail(''); // Clear detail after success
            setMessage('');
            setPaymentOption('gcash'); 
            setIsModalOpen(false); 
        } catch (error) {
            const errorMessage = error.response?.data?.detail || error.message || "Donation failed due to server error.";
            onDonationError(errorMessage);
        } finally {
            setIsDonating(false); 
        }
    };

    const preDonateDisabled = !isLoggedIn; // The only condition for disabling the button is login status

    const inputProps = getPaymentInputProps();
    
    return (
        <>
            {/* The Campaign Card UI */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 relative">
                
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
                                {Math.round(getProgressPercentage(campaign.collected_amount || campaign.raised, campaign.goal_amount || campaign.goal))}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-orange-600 to-fuchsia-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${getProgressPercentage(campaign.collected_amount || campaign.raised, campaign.goal_amount || campaign.goal)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
                        <div>
                            <div className="text-xl font-bold text-slate-900">
                                {formatCurrency(campaign.collected_amount || campaign.raised)}
                            </div>
                            <div className="text-sm text-gray-600">
                                raised of {formatCurrency(campaign.goal_amount || campaign.goal)}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-slate-900">
                                {campaign.supporters || "N/A"}
                            </div>
                            <div className="text-sm text-gray-600">supporters</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {/* --- NEW PAYMENT INPUTS SECTION --- */}
                        {/* Payment Method Select */}
                        <select
                            value={paymentOption}
                            onChange={(e) => { 
                                setPaymentOption(e.target.value);
                                setPaymentDetail(''); // Reset detail when method changes
                            }}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-orange-600 focus:border-orange-600 transition-all"
                            disabled={isDonating || !isLoggedIn}
                        >
                            <option value="gcash">GCash</option>
                            <option value="paypal">PayPal</option>
                            <option value="credit_card">Credit Card</option>
                        </select>
                        
                        {/* Dynamic Payment Detail Input */}
                        <input
                            type={inputProps.type}
                            placeholder={inputProps.placeholder}
                            value={paymentDetail}
                            onChange={(e) => setPaymentDetail(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-orange-600 focus:border-orange-600 transition-all"
                            disabled={isDonating || !isLoggedIn} 
                            required
                        />
                        {/* --- END NEW PAYMENT INPUTS SECTION --- */}
                        
                        {/* Donation Amount Input (moved lower) */}
                        <input
                            type="number"
                            placeholder="Donation amount (₱)"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-orange-600 focus:border-orange-600 transition-all"
                            disabled={isDonating || !isLoggedIn} 
                        />
                        <button
                            // Calls validation first. Only proceeds to modal if valid amount and detail are entered.
                            onClick={handleModalOpen} 
                            className={`w-full text-white py-3 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform shadow-xl ${
                                preDonateDisabled
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-orange-600 to-fuchsia-600 hover:scale-[1.02]'
                            }`}
                            disabled={preDonateDisabled}
                        >
                            {isDonating ? 'Processing...' : !isLoggedIn ? 'Login to Donate' : 'Review & Donate'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Donation Modal (REPLACED with new component) */}
            <DonationModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                donationAmount={donationAmount}
                paymentOption={paymentOption}
                paymentDetail={paymentDetail}
                message={message}
                setMessage={setMessage}
                isDonating={isDonating}
                donate={donate} 
            />
        </>
    );
}