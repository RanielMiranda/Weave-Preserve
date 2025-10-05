  import React, { useState, useEffect, useMemo, useCallback } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { Edit, Trash2, Plus, AlertTriangle } from 'lucide-react';

  // --- Axios Instance with Interceptor ---
  const API_BASE = "http://127.0.0.1:8000";
  const axiosInstance = axios.create({
    baseURL: API_BASE,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });


  // --- Configuration Object for the Dashboard ---
  const dashboardConfig = {
    products: {
      title: 'Manage Products',
      columns: [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name' },
        { key: 'price', header: 'Price' },
        { key: 'status', header: 'Status' },
      ],
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'price', label: 'Price', type: 'number' },
        { name: 'status', label: 'Status', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'image', label: 'Image Path', type: 'text' },
      ],
    },
    videos: {
      title: 'Manage Videos',
      columns: [
        { key: 'id', header: 'ID' },
        { key: 'title', header: 'Title' },
        { key: 'description', header: 'Description' },
      ],
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'filepath', label: 'Filepath', type: 'text' },
      ],
    },
    infographics: {
      title: 'Manage Infographics',
      columns: [
          { key: 'id', header: 'ID' },
          { key: 'title', header: 'Title' }
      ],
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'image_path', label: 'Image Path', type: 'text' },
      ],
    },
    fundraising: {
      title: 'Manage Fundraising',
      columns: [
        { key: 'id', header: 'ID' },
        { key: 'title', header: 'Title' },
        { key: 'goal_amount', header: 'Goal' },
        { key: 'collected_amount', header: 'Collected' },
        { key: 'status', header: 'Status' },
      ],
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'goal_amount', label: 'Goal Amount', type: 'number' },
        { name: 'collected_amount', label: 'Collected Amount', type: 'number' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'status', label: 'Status', type: 'text' },
      ],
    },
    orders: {
      title: 'Manage Orders',
      columns: [
        { key: 'id', header: 'Order ID' },
        { key: 'customer_name', header: 'Customer' },
        { key: 'status', header: 'Status' },
      ],
      fields: [],
    },
  };

  // --- Child Components ---

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 flex justify-center items-start z-50 pt-20">
        <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  };

  const DashboardTable = ({ data, columns, handleAction, isEditable }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{col.header}</th>
            ))}
            {isEditable && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map(col => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item[col.key]}</td>
              ))}
              {isEditable && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => handleAction('Edit', item)} className="text-orange-600 hover:text-orange-900"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleAction('Delete', item)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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

  const DashboardTabs = ({ activeTab, setActiveTab }) => (
      <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {Object.keys(dashboardConfig).map((tabId) => (
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


  // --- Main Dashboard Component ---

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
        const response = await axiosInstance.get(`/${tab}`);
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

      console.log({ isLoggedIn, isAdmin, token }); // check values

      if (!isLoggedIn || !isAdmin || !token) {
        navigate('/');
      } else {
        fetchData(activeTab);
      }
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
      const { name, value, type } = e.target;
      setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
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
      if (action === 'Edit') {
        openModal(item);
      } else if (action === 'Delete') {
        setItemToDelete(item);
      }
    };

    const handleConfirmDelete = async () => {
      if (!itemToDelete) return;
      try {
        await axiosInstance.delete(`/${activeTab}/${itemToDelete.id}`);
        fetchData(activeTab);
        setItemToDelete(null);
      } catch (err) {
        console.error("Failed to delete item:", err);
        setError("Delete operation failed.");
      }
    };

    const renderFormFields = () => {
      const config = dashboardConfig[activeTab];
      if (!config || !config.fields.length) {
          return <p>This section is for viewing only.</p>;
      }

      return config.fields.map(field => (
        <div key={field.name} className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea name={field.name} value={formData[field.name] || ''} onChange={handleChange} className="border p-2 w-full rounded-md" rows="4" />
          ) : (
            <input type={field.type} name={field.name} value={formData[field.name] || ''} onChange={handleChange} className="border p-2 w-full rounded-md" />
          )}
        </div>
      ));
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
                {renderFormFields()}
                <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-orange-700 transition-colors">
                  {editItem ? 'Update' : 'Add'}
                </button>
              </form>
            </Modal>

            <Modal isOpen={!!itemToDelete} onClose={() => setItemToDelete(null)} title="Confirm Deletion">
                <div className="text-center">
                  <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                      Are you sure?
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                      Do you really want to delete this {itemToDelete && activeTab.slice(0, -1)}? This process cannot be undone.
                  </p>
                </div>
                <div className="mt-5 sm-mt-6 sm-grid sm-grid-cols-2 sm-gap-3 sm-grid-flow-row-dense">
                  <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm-col-start-2 sm-text-sm"
                      onClick={handleConfirmDelete}
                  >
                      Delete
                  </button>
                  <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm-mt-0 sm-col-start-1 sm-text-sm"
                      onClick={() => setItemToDelete(null)}
                  >
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

