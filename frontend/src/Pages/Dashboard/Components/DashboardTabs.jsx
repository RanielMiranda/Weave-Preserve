import React from 'react';
import { dashboardConfig } from '../config/dashboardConfig';

const DashboardTabs = ({ activeTab, setActiveTab }) => (
    <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {Object.keys(dashboardConfig).map(tabId => (
                <button
                    key={tabId}
                    onClick={() => setActiveTab(tabId)}
                    className={`${
                        activeTab === tabId
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                    {dashboardConfig[tabId].title}
                </button>
            ))}
        </nav>
    </div>
);

export default DashboardTabs;
