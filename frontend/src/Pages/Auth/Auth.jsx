import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './Components/AuthHeader.jsx';
import AuthForm from './Components/AuthForm.jsx';

export default function Auth() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });
    const [formMessage, setFormMessage] = useState({ type: '', text: '' });
    const [errors, setErrors] = useState({});

    const handleAuthSuccess = (isAdmin) => {
        if (isAdmin) {
            navigate("/dashboard");
        } else {
            navigate("/marketplace");
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-xl rounded-xl border border-gray-100">
                <AuthHeader isLogin={isLogin} />
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
                    onAuthSuccess={handleAuthSuccess} 
                />
            </div>
        </section>
    );
}
