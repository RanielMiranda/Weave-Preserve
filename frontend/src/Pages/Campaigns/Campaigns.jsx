// campaigns.jsx (No changes needed)
import { useState, useEffect } from 'react';
import CampaignStats from './Components/CampaignStats';
import CampaignCard from './Components/CampaignCard';
import { fetchCampaigns } from '../../api/axiosInstance.js';

export default function Campaigns() {
    const [campaigns, setCampaigns] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false); 

    // --- Data Fetching Effect ---
    useEffect(() => {
        const loadCampaigns = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchCampaigns(); 
                setCampaigns(data);
            } catch (err) {
                console.error("Error fetching campaigns:", err);
                setError("Failed to load campaigns. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        loadCampaigns();
    }, []); 

    // --- Handler to update state after a successful donation ---
    const handleSuccessfulDonation = (newDonation) => {
        setShowToast({ type: 'success', message: `Donation of ₱${newDonation.amount} successful!` });
        setTimeout(() => setShowToast(false), 2500);

        setCampaigns(prevCampaigns => 
            prevCampaigns.map(campaign => {
                if (campaign.id === newDonation.campaign_id) {
                    return {
                        ...campaign,
                        collected_amount: campaign.collected_amount + newDonation.amount,
                        supporters: (campaign.supporters || 0) + 1, 
                    };
                }
                return campaign;
            })
        );
    };

    // --- Handler for donation errors ---
    const handleErrorDonation = (errorMessage) => {
        setShowToast({ type: 'error', message: errorMessage });
        setTimeout(() => setShowToast(false), 3000);
    }

    // --- Render Logic ---
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl text-slate-600">
                <span className="animate-spin mr-2">⚙️</span> Loading Weaving Campaigns...
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl text-red-600">
                <span className="mr-2">❌</span> Error: {error}
            </div>
        );
    }
    return (
        <section className="py-16 bg-gradient-to-br from-orange-50 to-fuchsia-50 min-h-screen relative">
            
            {/* Centralized Toast Component */}
            {showToast && (
                <div className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl z-50 transition-all text-white font-semibold 
                    ${showToast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {showToast.message}
                </div>
            )}
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                        Support Our Weaving Community
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your contribution directly impacts the lives of indigenous weavers and helps preserve this invaluable cultural heritage for future generations.
                    </p>
                </div>

                <CampaignStats />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {campaigns.map((campaign) => (
                        <CampaignCard 
                            key={campaign.id} 
                            campaign={campaign}
                            onSuccessfulDonation={handleSuccessfulDonation}
                            onDonationError={handleErrorDonation}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}