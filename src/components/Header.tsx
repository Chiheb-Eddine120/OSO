import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logos/logo.png';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`header-modern ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className={`header-logo ${isScrolled ? 'scrolled' : ''}`}>
          <img src={logo} alt="OSO Logo" className="h-8 w-auto" />
          <span>OSO</span>
        </Link>

        {/* Bouton d'action central */}
        <Link 
          to={getCTALink()} 
          className={`header-cta ${isScrolled ? 'scrolled' : ''}`}
        >
          <span>{getCTAText()}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Contact */}
        <Link 
          to="/contact" 
          className={`header-nav-link ${isScrolled ? 'scrolled' : ''}`}
        >
          Contact
        </Link>

        {/* MyOSO/Connexion */}
        {user ? (
          <Link to="/my-oso" className={`header-cta ${isScrolled ? 'scrolled' : ''}`}>
            <User className="w-4 h-4" />
            <span>My OSO</span>
          </Link>
        ) : (
          <Link to="/login" className={`header-cta ${isScrolled ? 'scrolled' : ''}`}>
            <User className="w-4 h-4" />
            <span>Connexion</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header; 