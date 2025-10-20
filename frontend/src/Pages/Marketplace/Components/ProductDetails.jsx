import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../Dashboard/api/axiosInstance.js';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        console.log('Fetched product:', res.data);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-xl py-20">Loading...</p>;
  if (!product) return <p className="text-center text-xl py-20">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
        <button onClick={() => window.history.back()} className="text-white hover:text-orange-800 hover:scale-105 flex items-center mb-6 transition rounded-full shadow-md bg-orange-600/90 px-2 py-1">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Marketplace
        </button>
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
      <h1 className="text-4xl font-bold mt-6">{product.name}</h1>
      <p className="text-lg text-gray-600 mt-2">By {product.weaver} • {product.community}</p>
      <p className="text-xl font-semibold mt-4 text-orange-600">₱{product.price}</p>
      <p className="mt-6 text-gray-700">{product.description || "No description available."}</p>

        {/* Order now */}
        <div className="mt-8">
            <button className="bg-gradient-to-r from-orange-600 to-fuchsia-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold">
                <ShoppingCart className="w-5 h-5 inline-block mr-2" /> Add to cart
            </button>
        </div>
    </div>
  );
};

export default ProductDetails;
