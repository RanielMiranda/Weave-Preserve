import React from 'react';
import { Heart, Users, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'

// Component renamed to 'Fundraising' to match the import: import Fundraising from './Components/Fundraising.jsx';
const Fundraising = () => {
  const campaigns = [
    {
      id: 1,
      title: "Emergency Support for Weaver Families",
      description: "Help provide immediate assistance to weaver families affected by recent natural disasters in the region.",
      raised: 125000,
      goal: 200000,
      supporters: 89,
      daysLeft: 15,
      image: "https://www.lakwatsero.com/wp-content/uploads/2021/11/Cordillera-Weaves-06.jpg",
      urgent: true
    },
    {
      id: 2,
      title: "Traditional Loom Restoration Project",
      description: "Restore and maintain traditional looms to ensure the continuation of authentic weaving techniques.",
      raised: 85000,
      goal: 150000,
      supporters: 67,
      daysLeft: 28,
      image: "https://www.textileschool.com/wp-content/uploads/2025/03/traditional-weavers-working-on-handlooms-in-a-rural-setting.jpg",
      urgent: false
    },
    {
      id: 3,
      title: "Youth Weaving Education Program",
      description: "Fund educational programs to teach traditional weaving skills to the next generation of artisans.",
      raised: 45000,
      goal: 100000,
      supporters: 34,
      daysLeft: 42,
      image: "https://www.sapiens.org/app/uploads/2020/08/06_Paulette.Crespillo-Cuison_compressed.jpg",
      urgent: false
    }
  ];

  /**
   * Formats a number into Philippine Peso currency (₱).
   * Note: Removed TypeScript types for standard JSX compatibility.
   * @param {number} amount - The amount to format.
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  /**
   * Calculates the fundraising progress percentage.
   * Note: Removed TypeScript types for standard JSX compatibility.
   * @param {number} raised - The amount raised.
   * @param {number} goal - The fundraising goal.
   */
  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-fuchsia-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Support Our Weaving Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your contribution directly impacts the lives of indigenous weavers and helps preserve
            this invaluable cultural heritage for future generations.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: "Weavers Supported", value: "150+" },
            { icon: Heart, label: "Families Helped", value: "89" },
            { icon: Target, label: "Projects Funded", value: "12" },
            { icon: TrendingUp, label: "Funds Raised", value: "₱2.5M" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg border-t-4 border-orange-500"
            >
              <stat.icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Active Campaigns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500"
            >
              <div className="relative">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  // Placeholder fallback image for broken links
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/f97316/ffffff?text=Weaver+Artisan"; }}
                />
                {campaign.urgent && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
                    URGENT
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-900 shadow-md">
                  {campaign.daysLeft} days left
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {campaign.title}
                </h3>
                <p className="text-gray-500 mb-4 line-clamp-3 text-sm">
                  {campaign.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-bold text-slate-900">
                      {Math.round(getProgressPercentage(campaign.raised, campaign.goal))}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-fuchsia-400 h-3 rounded-full transition-all duration-700"
                      style={{ width: `${getProgressPercentage(campaign.raised, campaign.goal)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6 border-t pt-4">
                  <div>
                    <div className="text-xl font-bold text-orange-600">
                      {formatCurrency(campaign.raised)}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      raised of {formatCurrency(campaign.goal)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-slate-900">
                      {campaign.supporters}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">supporters</div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-600 to-fuchsia-600 text-white py-3 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] hover:from-orange-700 hover:to-fuchsia-700">
                  Support This Campaign
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to ='/campaigns' className="bg-white text-orange-600 border-2 border-orange-600 px-10 py-3 rounded-xl font-bold hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-lg">
            View All Campaigns
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Fundraising;
