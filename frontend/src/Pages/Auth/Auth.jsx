import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AuthForm from './Components/AuthForm.jsx'; 

export default function Auth() {
    const navigate = useNavigate();
    
    // State management for AuthForm
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({});
    const [formMessage, setFormMessage] = useState({ type: '', text: '' });
    const [errors, setErrors] = useState({});

    // This function must accept all three parameters now
    const handleAuthSuccess = (isAdmin, userId, token) => {  
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", userId.toString());
        localStorage.setItem("access_token", token);           
        if (isAdmin) {
            localStorage.setItem("isAdmin", "true");            
            navigate("/dashboard");
        } else {
            navigate("/marketplace");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-inter">
            {/* Back Button */}
            <div className="absolute top-4 left-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                >
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    Back to Home
                </button>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {isLogin ? 'Sign in to your account' : 'Create a new account'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 max-w-sm mx-auto">
                    Manage your profile, view orders, and contribute to our campaigns.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10 border border-gray-200">
                    <AuthForm
                        isLogin={isLogin}
                        setIsLogin={setIsLogin}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        formData={formData}
                        setFormData={setFormData}
                        formMessage={formMessage}
                        setFormMessage={setFormMessage}
                        errors={errors}
                        setErrors={setErrors}
                        onAuthSuccess={handleAuthSuccess} // Pass the updated handler
                    />
                </div>
            </div>
        </div>
    );
}
