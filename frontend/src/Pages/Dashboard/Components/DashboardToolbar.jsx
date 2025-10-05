import React from 'react';
import { Plus } from 'lucide-react';
import { dashboardConfig } from '../config/dashboardConfig';

const DashboardToolbar = ({ activeTab, onAddClick, isEditable }) => (
    <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 capitalize">{dashboardConfig[activeTab]?.title || 'Dashboard'}</h2>
        {isEditable && (
            <button onClick={onAddClick} className="bg-gradient-to-r from-orange-600 to-fuchsia-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add New</span>
            </button>
        )}
    </div>
);

export default DashboardToolbar;
