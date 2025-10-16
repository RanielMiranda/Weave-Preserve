// DonationModal.jsx (Updated)
import { X } from 'lucide-react';
import { formatCurrency } from '../utils.js'; 

export default function DonationModal({
    isModalOpen,
    setIsModalOpen,
    donationAmount,
    paymentOption,
    paymentDetail, // <-- Included for display
    message,
    setMessage,
    isDonating,
    donate, 
}) {
    const amount = parseFloat(donationAmount);
    
    if (!isModalOpen || !amount || amount <= 0) {
        return null;
    }

    // Helper to format the payment detail label
    const paymentLabel = {
        'gcash': 'GCash Phone',
        'paypal': 'PayPal Email',
        'credit_card': 'Credit Card No.'
    }[paymentOption] || 'Payment Detail';

    const confirmButtonText = isDonating 
        ? 'Submitting...' 
        : `Confirm Final Donation`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with Blur */}
            <div 
                className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsModalOpen(false)} 
            ></div>

            {/* Modal Content */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-50 transform transition-all scale-100 opacity-100">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Review & Confirm Donation
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Review Section */}
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h3 className="text-lg font-bold text-orange-600 mb-2">Summary</h3>
                        <p className="text-slate-700">
                            Amount: {formatCurrency(amount)}
                        </p>
                        <p className="text-slate-700">
                            Method: <span className="capitalize">{paymentOption.replace('_', ' ')}</span>
                        </p>
                        <p className="text-slate-700 break-words">
                            {paymentLabel}: {paymentDetail}
                        </p>
                    </div>

                    {/* Message (Optional) */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Optional Message
                        </label>
                        <textarea
                            id="message"
                            rows="3"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Add a message of support..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-600 focus:border-orange-600 transition-all resize-none"
                            disabled={isDonating}
                        ></textarea>
                    </div>
                </div>

                <button
                    onClick={donate}
                    className={`mt-6 w-full text-white py-3 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform shadow-xl ${
                        isDonating 
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-600 to-fuchsia-600 hover:scale-[1.01]'
                    }`}
                    disabled={isDonating}
                >
                    {confirmButtonText}
                </button>
            </div>
        </div>
    );
}