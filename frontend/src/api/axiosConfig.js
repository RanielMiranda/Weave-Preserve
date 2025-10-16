    // src/axiosConfig.js
    import axios from 'axios';

    const API_BASE = "http://127.0.0.1:8000";

    const axiosInstance = axios.create({
        baseURL: API_BASE,
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            // Read the token from localStorage
            const token = localStorage.getItem("access_token");
            if (token) {
                // Set the Authorization header for every request if the token exists
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    export default axiosInstance;