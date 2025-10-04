import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Traditional Cordillera weaving"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Preserving the
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-fuchsia-500"> Sacred Art </span>
              of Cordillera Weaving
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Discover the rich heritage of indigenous textiles, support local weavers, 
              and be part of preserving centuries-old traditions for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/marketplace" 
                className="bg-gradient-to-r from-orange-600 to-fuchsia-500 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>Explore Marketplace</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-white hover:text-slate-900 transition-all duration-300">
                <Play className="w-5 h-5" />
                <span>Watch Stories</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Inabel textile"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Traditional weaving tools"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Kalinga weave pattern"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Ikat textile detail"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;