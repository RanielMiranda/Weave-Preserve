import React from 'react';
import { Heart, Users, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      urgent: false
    }
  ];

  const formatCurrency = (amount = number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getProgressPercentage = (raised=number, goal=number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-fuchsia-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Support Our Weaving Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your contribution directly impacts the lives of indigenous weavers and helps preserve 
            this invaluable cultural heritage for future generations.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
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
              className="bg-white rounded-lg p-6 text-center shadow-md"
            >
              <stat.icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Active Campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                {campaign.urgent && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Urgent
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-slate-900">
                  {campaign.daysLeft} days left
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-slate-900 mb-3">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {campaign.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {Math.round(getProgressPercentage(campaign.raised, campaign.goal))}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-600 to-fuchsia-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(campaign.raised, campaign.goal)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-lg font-bold text-slate-900">
                      {formatCurrency(campaign.raised)}
                    </div>
                    <div className="text-sm text-gray-600">
                      raised of {formatCurrency(campaign.goal)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">
                      {campaign.supporters}
                    </div>
                    <div className="text-sm text-gray-600">supporters</div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-600 to-fuchsia-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Support This Campaign
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300">
            View All Campaigns
          </button>
        </div>
      </div>
    </section>
  );
};

export default Fundraising;