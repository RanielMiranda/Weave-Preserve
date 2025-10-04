import React from 'react';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-fuchsia-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CW</span>
              </div>
              <span className="font-playfair text-xl font-bold">Cordillera Weaving</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Preserving and promoting the traditional handwoven textile heritage of the Cordillera region, 
              connecting indigenous weavers with global communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-600 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-600 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-600 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/marketplace" className="text-gray-300 hover:text-orange-600 transition-colors">Marketplace</a></li>
              <li><a href="/stories" className="text-gray-300 hover:text-orange-600 transition-colors">Cultural Stories</a></li>
              <li><a href="/support" className="text-gray-300 hover:text-orange-600 transition-colors">Support Weavers</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-orange-600 transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span className="text-gray-300 text-sm">Cordillera Region, Northern Luzon</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-600" />
                <span className="text-gray-300 text-sm">info@cordilleraweaving.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-600" />
                <span className="text-gray-300 text-sm">+63 123 456 7890</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2025 Cordillera Weaving Heritage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;