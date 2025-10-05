import React from 'react';
import { Eye, EyeOff, User, Mail, Lock, Loader2, Home } from 'lucide-react';

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear message and specific error when user types
        // Ensure formMessage is an object before accessing properties
        setFormMessage(prev => ({ ...prev, type: '', text: '' }));
        // Ensure errors is an object before accessing properties
        if (errors?.[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        // Use optional chaining here too, though this is less likely to fail if handleInputChange runs
        if (!formData?.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        
        if (!formData?.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        
        if (!isLogin) {
            if (!formData?.name) newErrors.name = 'Name is required';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        }
        
        // Ensure setErrors always receives an object
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegistration = async () => {
        // Validation ensures formData exists, but defensive copying is always good
        const payload = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            // Assuming no address/shipping info required on initial registration
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
            } else {
                const errorDetail = data.detail || "Registration failed due to an unknown error.";
                // Ensure setErrors always returns an object
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
            
            if (response.ok) {

                const parts = data.access_token.split('.');

                const decodedPayload = JSON.parse(atob(parts[1])); 
                const userEmail = decodedPayload.sub || formData.email;
                const isAdmin = decodedPayload.is_admin === true;

                // 1. Store the token (e.g., in localStorage or a state manager)
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("isAdmin", isAdmin);
                
                // 2. Notify parent component of success
                setFormMessage({ type: 'success', text: 'Login successful! Redirecting...' });
                
                setTimeout(() => {
                    if (onAuthSuccess) {
                        onAuthSuccess(isAdmin);
                    }
                }, 500);

            } else {
                const errorDetail = data.detail || 'Invalid email or password.';
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
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {/* Display general messages/errors safely */}
            {((errors?.general) || (formMessage?.text)) && (
                <div className={`px-4 py-3 rounded-lg text-sm font-medium ${getMessageClasses(errors?.general ? 'error' : formMessage?.type)}`}>
                    {errors?.general || formMessage?.text}
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
                            // FIX: Use optional chaining on formData to prevent crash if it's undefined
                            value={formData?.name || ''} 
                            onChange={handleInputChange}
                            className={`appearance-none rounded-lg relative block w-full px-10 py-3 border ${
                                errors?.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-600'
                            } placeholder-gray-500 text-gray-900 focus:outline-none focus:border-orange-600 focus:z-10 sm:text-sm transition-colors`}
                            placeholder="Full Name"
                            required={!isLogin}
                        />
                    </div>
                    {errors?.name && <p className="mt-1 text-sm text-red-600 font-medium">{errors.name}</p>}
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
                        // FIX: Use optional chaining on formData
                        value={formData?.email || ''}
                        onChange={handleInputChange}
                        className={`appearance-none rounded-lg relative block w-full px-10 py-3 border ${
                            errors?.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-600'
                        } placeholder-gray-500 text-gray-900 focus:outline-none focus:border-orange-600 focus:z-10 sm:text-sm transition-colors`}
                        placeholder="Email address"
                        required
                    />
                </div>
                {errors?.email && <p className="mt-1 text-sm text-red-600 font-medium">{errors.email}</p>}
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
                        // FIX: Use optional chaining on formData
                        value={formData?.password || ''}
                        onChange={handleInputChange}
                        className={`appearance-none rounded-lg relative block w-full px-10 py-3 border ${
                            errors?.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-600'
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
                {errors?.password && <p className="mt-1 text-sm text-red-600 font-medium">{errors.password}</p>}
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
                            // FIX: Use optional chaining on formData
                            value={formData?.confirmPassword || ''}
                            onChange={handleInputChange}
                            className={`appearance-none rounded-lg relative block w-full px-10 py-3 border ${
                                errors?.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-600'
                            } placeholder-gray-500 text-gray-900 focus:outline-none focus:border-orange-600 focus:z-10 sm:text-sm transition-colors`}
                            placeholder="Confirm Password"
                            required={!isLogin}
                        />
                    </div>
                    {errors?.confirmPassword && <p className="mt-1 text-sm text-red-600 font-medium">{errors.confirmPassword}</p>}
                </div>
            )}

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-orange-600 to-fuchsia-500 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 transition-all duration-300 ${isLoading ? 'opacity-60 cursor-not-allowed' : 'transform hover:scale-[1.01]'}`}
                >
                    {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                        isLogin ? 'Sign In' : 'Create Account'
                    )}
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
    );
}
