import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './api/axiosInstance.js';
import { dashboardConfig } from './config/dashboardConfig';

import DashboardTabs from './components/DashboardTabs';
import DashboardToolbar from './Components/DashboardToolbar';
import DashboardTable from './Components/DashboardTable';
import Modal from './Components/Modal';
import FormFields from './Components/FormFields';
import { AlertTriangle } from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [editItem, setEditItem] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = useCallback(async (tab) => {
        setLoading(true);
        setError(null);
        try {
            let url = `/${tab}`;
            
            if (tab === 'products') {
                url = '/products/all'; 
            }

            const response = await axiosInstance.get(url);
            setData(response.data);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            setError(`Failed to load ${tab}. Please try again.`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const isAdmin = localStorage.getItem("isAdmin") === "true";
        const token = localStorage.getItem("access_token");

        if (!isLoggedIn || !isAdmin || !token) navigate('/');
        else fetchData(activeTab);
    }, [activeTab, navigate, fetchData]);

    const openModal = (item = null) => {
        setEditItem(item);
        setFormData(item || {});
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setFormData({});
        setEditItem(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let newValue;
        if (type === 'checkbox') {
            newValue = checked;
        } else if (type === 'number') {
            const parsed = parseFloat(value);
            newValue = parsed < 0 ? 0 : parsed; // Prevent negative numbers
        } else {
            newValue = value;
        }

        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editItem ? `/${activeTab}/${editItem.id}` : `/${activeTab}`;
        const method = editItem ? 'put' : 'post';

        try {
            await axiosInstance({ method, url, data: formData });
            fetchData(activeTab);
            closeModal();
        } catch (err) {
            console.error("Failed to submit form:", err);
            setError("Operation failed. Please check the console for details.");
        }
    };

    const handleAction = (action, item) => {
        if (action === 'Edit') openModal(item);
        else if (action === 'Delete') setItemToDelete(item);
    };

const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    // 1. Determine the intent based on the activeTab
    const isProductArchive = activeTab === 'products';
    
    // 2. Build the URL
    const url = `/${activeTab}/${itemToDelete.id}`;

    try {
        if (isProductArchive) {
            const newIsArchived = !itemToDelete.is_archived; 
            await axiosInstance.put(url, { 
                ...itemToDelete, 
                is_archived: newIsArchived 
            });
        } else {
            await axiosInstance.delete(url);
        }

        fetchData(activeTab);
        setItemToDelete(null);
    } catch (err) {
        console.error("Failed to perform operation:", err);
        setError("Operation failed. Please check the console for details.");
    }
};

    const currentConfig = dashboardConfig[activeTab];
    const isEditable = currentConfig && currentConfig.fields.length > 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm-px-6 lg-px-8">
                    <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    <DashboardToolbar activeTab={activeTab} onAddClick={() => openModal()} isEditable={isEditable} />

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                    
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <DashboardTable data={data} columns={currentConfig?.columns || []} handleAction={handleAction} isEditable={isEditable} />
                    )}

                    <Modal isOpen={modalOpen} onClose={closeModal} title={editItem ? `Edit ${activeTab}` : `Add New ${activeTab}`}>
                        <form onSubmit={handleSubmit}>
                            <FormFields fields={currentConfig?.fields || []} formData={formData} handleChange={handleChange} />
                            <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-orange-700 transition-colors">
                                {editItem ? 'Update' : 'Add'}
                            </button>
                        </form>
                    </Modal>

                    <Modal isOpen={!!itemToDelete} onClose={() => setItemToDelete(null)} title="Confirm Deletion">
                        <div className="text-center">
                            <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Are you sure?</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Do you really want to {activeTab === 'products' ? (itemToDelete?.is_archived ? 'unarchive' : 'archive') : 'archive'} this {activeTab.slice(0, -1)}?
                            </p>
                        </div>
                        <div className="mt-5 sm-mt-6 sm-grid sm-grid-cols-2 sm-gap-3 sm-grid-flow-row-dense">
                            <button 
                                type="button" 
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm-col-start-2 sm-text-sm"
                                onClick={handleConfirmDelete}>
                                {activeTab === 'products' 
                                    ? (itemToDelete?.is_archived ? 'Unarchive' : 'Archive') 
                                    : 'Delete'}
                            </button>
                            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm-mt-0 sm-col-start-1 sm-text-sm" onClick={() => setItemToDelete(null)}>
                                Cancel
                            </button>
                        </div>
                    </Modal>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
