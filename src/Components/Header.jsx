import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Heart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CW</span>
            </div>
            <span className="font-playfair text-xl font-bold text-slate-900">Cordillera Weaving</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="text-slate-900 hover:text-orange-600 transition-colors font-medium">
              Marketplace
            </Link>
            <Link to="/stories" className="text-slate-900 hover:text-orange-600 transition-colors font-medium">
              Stories
            </Link>
            <Link to="/support" className="text-slate-900 hover:text-orange-600 transition-colors font-medium">
              Support
            </Link>
            <Link to="/about" className="text-slate-900 hover:text-orange-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-slate-900 hover:text-orange-600 transition-colors font-medium">
              Contact
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-900 hover:text-orange-600 transition-colors" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-900 hover:text-orange-600 transition-colors relative" aria-label="Shopping cart">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/marketplace" className="text-slate-900 hover:text-orange-600 transition-colors font-medium">
                Marketplace
              </Link>
              <Link to="/stories" className="text-slate-900 hover:text-orange-600 transition-colors font-medium">
                Stories
              </Link>
              <Link to="/support" className="text-slate-900 hover:text-orange-600 transition-colors font-medium">
                Support
              </Link>
              <Link to="/about" className="text-slate-900 hover:text-orange-600 transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="text-slate-900 hover:text-orange-600 transition-colors font-medium">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;