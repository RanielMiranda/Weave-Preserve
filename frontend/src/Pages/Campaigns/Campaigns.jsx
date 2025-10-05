import CampaignStats from './Components/CampaignStats';
import CampaignCard from './Components/CampaignCard';
import { campaigns } from './Components/CampaignsData';

export default function Campaigns() {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-fuchsia-50 min-h-screen">
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
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}
