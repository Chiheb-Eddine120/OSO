import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logo from '../data/assets/logos/logo.png';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getCTAText = () => {
    if (location.pathname.includes('/pro')) {
      return 'Je choisis un stage';
    }
    return 'Je partage mon métier';
  };

  const getCTALink = () => {
    if (location.pathname.includes('/pro')) {
      return '/';
    }
    return '/pro';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="OSO Logo" className="h-8 w-auto" />
            <div className="text-white">
              <div className="text-sm font-semibold">Organisation</div>
              <div className="text-sm font-semibold">de Stages</div>
              <div className="text-sm font-semibold">d'Orientation</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-pink-600 transition-colors ${
                location.pathname === '/' ? 'text-pink-600 font-semibold' : ''
              }`}
            >
              Accueil
            </Link>
            <Link 
              to="/pro" 
              className={`text-gray-700 hover:text-pink-600 transition-colors ${
                location.pathname.includes('/pro') ? 'text-pink-600 font-semibold' : ''
              }`}
            >
              Professionnels
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/my-oso" className="btn-secondary">
                  <User className="w-4 h-4 mr-2" />
                  My OSO
                </Link>
                <button onClick={signOut} className="btn-secondary text-sm">
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link to={getCTALink()} className="btn-primary">
                {getCTAText()}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-pink-600 transition-colors ${
                  location.pathname === '/' ? 'text-pink-600 font-semibold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/pro" 
                className={`text-gray-700 hover:text-pink-600 transition-colors ${
                  location.pathname.includes('/pro') ? 'text-pink-600 font-semibold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Professionnels
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-pink-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {user ? (
                <div className="space-y-2">
                  <Link 
                    to="/my-oso" 
                    className="btn-secondary w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2 inline" />
                    My OSO
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }} 
                    className="btn-secondary w-full text-center text-sm"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <Link 
                  to={getCTALink()} 
                  className="btn-primary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getCTAText()}
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 