// src/pages/Campaigns/CampaignStats.jsx
import { Heart, Users, Target, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, label: "Weavers Supported", value: "150+" },
  { icon: Heart, label: "Families Helped", value: "89" },
  { icon: Target, label: "Projects Funded", value: "12" },
  { icon: TrendingUp, label: "Funds Raised", value: "₱2.5M" }
];

export default function CampaignStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 text-center shadow-lg transition-transform hover:scale-105 duration-300"
        >
          <stat.icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
