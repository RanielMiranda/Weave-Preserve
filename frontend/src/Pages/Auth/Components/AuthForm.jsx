import React from 'react';
import { Eye, EyeOff, User, Mail, Lock, Loader2 } from 'lucide-react';
import TermsModal from './TermsModal.jsx'; 

// Define the base URL for the FastAPI backend (Must match where Uvicorn runs)
const API_BASE_URL = 'http://localhost:8000'; 

export default function AuthForm({
    isLogin,
    setIsLogin, 
    showPassword,
    setShowPassword,
    formData,
    setFormData,
    formMessage,
    setFormMessage,
    errors,
    setErrors,
    onAuthSuccess
}) {
    const [isLoading, setIsLoading] = React.useState(false);  
    const [agreedToTerms, setAgreedToTerms] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormMessage(prev => ({ ...prev, type: '', text: '' }));
        if (errors?.[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    
    const handleAgreementChange = (e) => {
        setAgreedToTerms(e.target.checked);
        // Clear terms error when checked
        if (errors?.terms) {
            setErrors(prev => ({ ...prev, terms: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email regex

        if (!formData?.email) newErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Email is invalid';
        
        if (!formData?.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        
        if (!isLogin) {
            if (!formData?.name) newErrors.name = 'Name is required';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
            
            // Check for Terms and Agreement
            if (!agreedToTerms) newErrors.terms = 'You must agree to the Terms and Conditions';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegistration = async () => {
        const payload = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            
            const data = await response.json();

            if (response.ok) {
                setFormMessage({ type: 'success', text: 'Registration successful! Please sign in with your new account.' });
                setIsLogin(true);

                setFormData({ email: formData.email, password: '', confirmPassword: '', name: '' });
                setAgreedToTerms(false); 
            } else {
                const errorDetail = data.detail || "Registration failed due to an unknown error.";
                setErrors({ general: errorDetail });
                setFormMessage({ type: 'error', text: errorDetail });
            }
        } catch (error) {
            console.error('Registration API Error:', error);
            setErrors({ general: 'Network error. Could not connect to the server.' });
            setFormMessage({ type: 'error', text: 'Network error. Please try again.' });
        }
    };

    const handleLogin = async () => {
        const payload = {
            email: formData.email,
            password: formData.password,
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            
            // Destructure access_token, user_id (snake_case from backend), and is_admin
            const { access_token, user_id, is_admin } = data; 
            
            if (response.ok && access_token) {
                
                // Call the success handler with the complete set of required arguments
                onAuthSuccess(is_admin, user_id, access_token); 
                
                // Store data locally
                localStorage.setItem('token', access_token);
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('is_admin', is_admin);

                console.log(data);
                setFormMessage({ type: 'success', text: 'Sign in successful! Redirecting...' });
                setFormData({ email: '', password: '', confirmPassword: '', name: '' });
            } else {
                const errorDetail = data.detail || "Invalid credentials or login failed.";
                setErrors({ general: errorDetail });
                setFormMessage({ type: 'error', text: errorDetail });
            }
        } catch (error) {
            console.error('Login API Error:', error);
            setErrors({ general: 'Network error. Could not connect to the server.' });
            setFormMessage({ type: 'error', text: 'Network error. Please try again.' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormMessage({ type: '', text: '' }); 
        setErrors({});

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            if (isLogin) {
                await handleLogin();
            } else {
                await handleRegistration();
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getMessageClasses = (type) => {
        if (type === 'success') {
            return 'bg-green-50 border border-green-200 text-green-700';
        } else if (type === 'error') {
            return 'bg-red-50 border border-red-200 text-red-600';
        }
        return '';
    };

    return (
        <>
            {/* Render the Terms Modal */}
            <TermsModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                {/* General Message/Error Display */}
                {formMessage.text && (
                    <div className={`p-3 rounded-lg text-sm ${getMessageClasses(formMessage.type)}`} role="alert">
                        {formMessage.text}
                    </div>
                )}
                {errors?.general && (
                    <div className="p-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-600" role="alert">
                        {errors.general}
                    </div>
                )}

                {/* Name Field (Registration Only) */}
                {!isLogin && (
                    <div className="relative">
                        <label htmlFor="name" className="sr-only">Full Name</label>
                        <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-orange-500 transition-shadow p-3">
                            <User className="h-5 w-5 text-gray-400" />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                className="ml-3 block w-full border-0 p-0 focus:ring-0 placeholder-gray-500 text-gray-900"
                            />
                        </div>
                        {errors?.name && <p className="mt-1 text-sm text-red-600 font-medium">{errors.name}</p>}
                    </div>
                )}

                {/* Email Field */}
                <div className="relative">
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-orange-500 transition-shadow p-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            placeholder="Email address"
                            className="ml-3 block w-full border-0 p-0 focus:ring-0 placeholder-gray-500 text-gray-900"
                        />
                    </div>
                    {errors?.email && <p className="mt-1 text-sm text-red-600 font-medium">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="relative">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-orange-500 transition-shadow p-3">
                        <Lock className="h-5 w-5 text-gray-400" />
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                            required
                            value={formData.password || ''}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="ml-3 block w-full border-0 p-0 focus:ring-0 placeholder-gray-500 text-gray-900"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-gray-600 transition-colors ml-2 p-1"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors?.password && <p className="mt-1 text-sm text-red-600 font-medium">{errors.password}</p>}
                </div>

                {/* Confirm Password Field (Registration Only) */}
                {!isLogin && (
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                        <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-orange-500 transition-shadow p-3">
                            <Lock className="h-5 w-5 text-gray-400" />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                required
                                value={formData.confirmPassword || ''}
                                onChange={handleInputChange}
                                placeholder="Confirm Password"
                                className="ml-3 block w-full border-0 p-0 focus:ring-0 placeholder-gray-500 text-gray-900"
                            />
                        </div>
                        {errors?.confirmPassword && <p className="mt-1 text-sm text-red-600 font-medium">{errors.confirmPassword}</p>}
                    </div>
                )}

                {/* Terms and Agreement Checkbox (Only for Registration) */}
                {!isLogin && (
                    <div className={`flex items-start pt-2 ${errors?.terms ? 'mb-1' : 'mb-4'}`}>
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={handleAgreementChange}
                                className={`h-4 w-4 rounded ${
                                    errors?.terms ? 'border-red-500 text-red-600' : 'border-gray-300 text-orange-600'
                                } focus:ring-orange-500 transition-colors`}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-medium text-gray-700">
                                I agree to the 
                                <button 
                                    type="button" 
                                    onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
                                    className="text-orange-600 hover:text-orange-500 font-semibold transition-colors underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ml-1 mr-1"
                                >
                                    Terms and Conditions
                                </button>
                            </label>
                        </div>
                    </div>
                )}
                {errors?.terms && <p className="mt-1 text-sm text-red-600 font-medium">{errors.terms}</p>}

                {/* Sign In / Create Account Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors transform active:scale-98 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        ) : (
                            isLogin ? 'Sign In' : 'Create Account'
                        )}
                    </button>
                </div>

                {/* Toggle Sign Up / Sign In link */}
                <div className="text-center pt-2">
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setErrors({});
                            setFormMessage({ type: '', text: '' });
                            // Clear fields on toggle, keep email for convenience if switching from sign up to sign in
                            setFormData(prev => ({ 
                                email: prev.email || '', 
                                password: '', 
                                confirmPassword: '', 
                                name: isLogin ? '' : prev.name || '' 
                            }));
                            setAgreedToTerms(false); 
                        }}
                        className="text-sm font-medium text-orange-600 hover:text-orange-500 transition-colors"
                    >
                        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                </div>
            </form>
        </>
    );
}
