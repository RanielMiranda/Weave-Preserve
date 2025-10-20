// TermsModal.jsx
import React from 'react';
import { X } from 'lucide-react';

// Random data collection points for the modal content
const termsContent = [
    "1. Log Data: We automatically collect standard information that your browser sends, such as your IP address, browser type, pages you visit, and time spent on those pages.",
    "2. Cookies: We use cookies to remember your preferences and customize your experience. You can choose to disable cookies in your browser settings.",
    "3. Personal Information: We collect your name and email only for account registration and transactional communications.",
    "4. Usage Metrics: We track site usage and interaction metrics to improve site functionality and user interface.",
    "5. Data Security: We employ industry-standard security measures to protect your data from unauthorized access or disclosure.",
];

export default function TermsModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    // Prevents clicks inside the modal content from closing the modal
    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        // Modal Backdrop
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs transition-opacity" 
            onClick={onClose}
        >
            {/* Modal Container */}
            <div 
                className="bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-lg max-h-[90vh] overflow-y-auto transform transition-transform scale-100 animate-slide-in"
                onClick={handleModalContentClick}
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-slate-800">Terms and Conditions</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        aria-label="Close terms and conditions modal"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="space-y-4 text-sm text-gray-700">
                    <p className="font-semibold text-base text-orange-600">
                        This outlines how we collect and use your data to provide our services:
                    </p>
                    {termsContent.map((point, index) => (
                        <p key={index} className="pl-4 border-l-2 border-orange-200">
                            <span dangerouslySetInnerHTML={{ __html: point }} />
                        </p>
                    ))}
                    <p className="pt-2 text-xs text-gray-500">
                        By checking the box on the registration form, you confirm that you have read, understood, and agreed to these terms.
                    </p>
                </div>
            </div>
        </div>
    );
}