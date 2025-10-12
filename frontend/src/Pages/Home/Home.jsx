import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../Dashboard/api/axiosInstance.js';

import Hero from './Components/Hero.jsx';
import FeaturedProducts from './Components/Featuredproducts.jsx';
import StoryTelling from './Components/Storytelling.jsx';
import Fundraising from './Components/Fundraising.jsx';

const Home = () => {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/products/'); 
            setProductsData(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load featured products.");
            setProductsData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); 

    return (
        <div className = "w-full h-full">
            <Hero />
            <FeaturedProducts 
                products={productsData} 
                loading={loading}      
                error={error}          
            />            
            <StoryTelling />
            <Fundraising />    
        </div>
    ) 
}

export default Home;