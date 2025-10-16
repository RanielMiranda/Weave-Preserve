import axios from 'axios';
import axiosConfig from './axiosConfig.js';

const API_BASE = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
    baseURL: API_BASE,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export const fetchCampaigns = async () => {
    const response = await axiosInstance.get('/fundraising/');
    return response.data; 
};

// 2. Function to create a new donation (POST /donation/)
export const createDonation = async (donationData) => {
    const response = await axiosInstance.post('/donation/', donationData);
    return response.data;
};

export default axiosInstance;
