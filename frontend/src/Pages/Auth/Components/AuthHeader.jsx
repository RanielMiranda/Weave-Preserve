import React from 'react';
import { User } from 'lucide-react';

export default function AuthHeader({ isLogin, onNavigate }) {
    return (
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
    );
}
