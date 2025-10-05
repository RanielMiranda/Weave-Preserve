// src/Pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardTabs from './Components/DashboardTabs.jsx';
import DashboardToolbar from './Components/DashboardToolbar.jsx';
import DashboardTable from './Components/DashboardTable.jsx';
import mockData from './mockData.js';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  // ✅ Check if user is logged in AND admin
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!isLoggedIn || !isAdmin) {
      navigate('/'); // redirect to Home
    }
  }, [navigate]);

  const tabs = [
    { id: 'products', label: 'Manage Products' },
    { id: 'videos', label: 'Manage Videos' },
    { id: 'infographics', label: 'Manage Infographics' },
    { id: 'fundraising', label: 'Manage Fundraising' },
    { id: 'orders', label: 'Manage Orders' }
  ];

  const columnsByTab = {
    products: ['Name', 'Price', 'Status'],
    videos: ['Title', 'Duration', 'Status'],
    infographics: ['Title', 'Views', 'Status'],
    fundraising: ['Title', 'Raised', 'Goal', 'Status'],
    orders: ['Customer', 'Total', 'Status']
  };

  return (
    <div className="min-h-screen">
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage products, content, fundraising campaigns, and orders.
            </p>
          </div>

          {/* Tabs */}
          <DashboardTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Toolbar */}
          <DashboardToolbar activeTab={activeTab} />

          {/* Data Table */}
          <DashboardTable
            data={mockData[activeTab]}
            columns={columnsByTab[activeTab]}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
