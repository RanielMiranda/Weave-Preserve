// File: src/components/Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Heart, User, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = ({ 
    isLoggedIn = false,
    onLogout = () => console.log("Logout triggered"),
}) => {
  const location = useLocation();
  const currentPage = location.pathname.replace("/", "") || "home";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path.startsWith("/") ? path : `/${path}`);
    setIsMenuOpen(false);
  };

  const NavLink = ({ to, children }) => {
    const normalizedTo = to === "" ? "home" : to;

    return (
      <button
        onClick={() => navigateTo(to)}
        className={`transition-colors font-medium ${
          currentPage === normalizedTo
            ? "text-orange-600 font-bold border-b-2 border-orange-600 pb-1"
            : "text-slate-900 hover:text-orange-600"
        }`}
      >
        {children}
      </button>
    );
  };

  const MobileNavLink = ({ to, children }) => (
    <button
      onClick={() => navigateTo(to)}
      className="text-slate-900 hover:text-orange-600 transition-colors font-medium py-2 block text-left"
    >
      {children}
    </button>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-sm">CW</span>
            </div>
            <span className="text-xl font-bold text-slate-900">
              Cordillera Weaving
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="">Home</NavLink>
            <NavLink to="marketplace">Marketplace</NavLink>
            <NavLink to="stories">Stories</NavLink>
            <NavLink to="campaigns">Support</NavLink>

            <div className="flex items-center space-x-4">
              <button
                className="p-2 text-slate-900 hover:text-orange-600 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>

              <button
                className="p-2 text-slate-900 hover:text-orange-600 transition-colors relative"
                aria-label="Shopping cart"
                onClick={() => navigateTo("checkout")}
              >
                
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white">
                  0
                </span>
              </button>

              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <NavLink to="admin">Admin</NavLink>
                  <button
                    onClick={onLogout}
                    className="p-2 text-slate-900 hover:text-orange-600 transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigateTo("auth")}
                  className="text-slate-900 hover:text-orange-600 transition-colors font-medium flex items-center space-x-1"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100 py-4 border-t" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-2">
            <MobileNavLink to="marketplace">Marketplace</MobileNavLink>
            <MobileNavLink to="stories">Stories</MobileNavLink>
            <MobileNavLink to="campaigns">Support</MobileNavLink>

            {isLoggedIn ? (
              <>
                <MobileNavLink to="admin">Admin Dashboard</MobileNavLink>
                <button
                  onClick={onLogout}
                  className="text-slate-900 hover:text-orange-600 transition-colors font-medium text-left py-2 w-full flex items-center space-x-2"
                >
                  <LogOut className="w-5 h-5 inline mr-1" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <MobileNavLink to="auth">Login / Register</MobileNavLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
