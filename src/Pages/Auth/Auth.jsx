import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

/**
 * Auth Component for Login and Registration
 * * This component handles user sign-in and sign-up logic using mock credentials
 * and form validation. It manages its own state for form data, errors, and UI messages.
 * * @param {object} props
 * @param {function(string, string): void} props.onAuthSuccess - Function to call on successful login, 
 * passing the target path ('admin' or 'marketplace') and the mock username.
 * @param {function(string): void} props.onNavigate - Function to call when the user clicks the logo/home link.
 */
const Auth = ({ onAuthSuccess, onNavigate }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });
    // State for local UI messages (replaces external toast library)
    const [formMessage, setFormMessage] = useState({ type: '', text: '' });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear message and specific error when user types
        setFormMessage({ type: '', text: '' });
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        
        if (!isLogin) {
            if (!formData.name) newErrors.name = 'Name is required';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormMessage({ type: '', text: '' }); // Clear previous general message
        
        if (!validateForm()) return;

        // --- Mock Authentication Logic ---
        
        if (isLogin) {
            const { email, password } = formData;
            let success = false;
            let targetPage = 'marketplace';
            let userName = email.split('@')[0];

            if (email === 'admin@example.com' && password === 'password') {
                targetPage = 'admin';
                success = true;
            } else if (email === 'user@example.com' && password === 'password') {
                targetPage = 'marketplace';
                success = true;
            }

            if (success) {
                setFormMessage({ type: 'success', text: 'Login successful! Redirecting...' });
                
                // Simulate navigation after a brief moment (or immediately)
                setTimeout(() => {
                    if (onAuthSuccess) {
                        onAuthSuccess(targetPage, userName);
                    }
                }, 500);

            } else {
                setErrors({ general: 'Invalid credentials. Try user@example.com or admin@example.com, password: password' });
                setFormMessage({ type: 'error', text: 'Invalid email or password.' });
            }
        } else {
            // Mock registration
            setFormMessage({ type: 'success', text: 'Registration successful! Please sign in.' });
            setIsLogin(true);
            setFormData({ email: formData.email, password: '', confirmPassword: '', name: '' });
        }
    };

    // Helper to determine message styles
    const getMessageClasses = (type) => {
        if (type === 'success') {
            return 'bg-green-50 border border-green-200 text-green-700';
        } else if (type === 'error') {
            return 'bg-red-50 border border-red-200 text-red-600';
        }
        return '';
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-xl rounded-xl border border-gray-100">
                <div className="text-center">
                    {/* Logo/Branding */}
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                        className="flex justify-center mb-6 cursor-pointer group"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <User className="w-6 h-6 text-white" />
                        </div>
                    </a>
                    
                    <h2 className="text-3xl font-extrabold text-slate-900">
                        {isLogin ? 'Welcome Back' : 'Create Your Account'}
                    </h2>
                    <p className="mt-2 text-md text-gray-600">
                        {isLogin ? 'Sign in to access your dashboard' : 'Join our community of weavers'}
                    </p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    
                    {/* General Error/Success Message */}
                    {(errors.general || formMessage.text) && (
                        <div className={`px-4 py-3 rounded-lg text-sm font-medium ${getMessageClasses(errors.general ? 'error' : formMessage.type)}`}>
                            {errors.general || formMessage.text}
                        </div>
                    )}

                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`appearance-none rounded-lg relative block w-full px-10 py-3 border ${
                                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-600'
                                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:border-orange-600 focus:z-10 sm:text-sm transition-colors`}
                                    placeholder="Full Name"
                                    required={!isLogin}
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-600 font-medium">{errors.name}</p>}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`appearance-none rounded-lg relative block w-full px-10 py-3 border ${
                                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-600'
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:border-orange-600 focus:z-10 sm:text-sm transition-colors`}
                                placeholder="Email address"
                                required
                            />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-600 font-medium">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`appearance-none rounded-lg relative block w-full px-10 py-3 border ${
                                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-600'
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:border-orange-600 focus:z-10 sm:text-sm transition-colors`}
                                placeholder="Password"
                                required
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-600 font-medium">{errors.password}</p>}
                    </div>

                    {!isLogin && (
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`appearance-none rounded-lg relative block w-full px-10 py-3 border ${
                                        errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-600'
                                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:border-orange-600 focus:z-10 sm:text-sm transition-colors`}
                                    placeholder="Confirm Password"
                                    required={!isLogin}
                                />
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600 font-medium">{errors.confirmPassword}</p>}
                        </div>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-orange-600 to-fuchsia-500 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 transform hover:scale-[1.01] transition-all duration-300"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </div>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setErrors({});
                                setFormMessage({ type: '', text: '' });
                                setFormData({ email: '', password: '', confirmPassword: '', name: isLogin ? '' : formData.name });
                            }}
                            className="text-sm font-medium text-orange-600 hover:text-orange-500 transition-colors"
                        >
                            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Auth;
