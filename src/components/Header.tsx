import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logoBlanc from '../assets/logos/LogoBlanc350x70.png';
import logoCouleur from '../assets/logos/LogoCouleur700x140.png';

const Header: React.FC = () => {
  const { user } = useAuth();
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
    <header className={`header-modern shadow-lg sticky top-0 z-50 ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="header-content flex flex-wrap items-center justify-between py-2 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className={`header-logo flex items-center gap-2 text-2xl font-extrabold tracking-tight ${isScrolled ? 'scrolled' : ''}`} aria-label="Accueil OSO">
          <img 
            src={isScrolled ? logoCouleur : logoBlanc} 
            alt="OSO Logo" 
            className="h-10 w-auto drop-shadow transition-all duration-300 hover:scale-105" 
            style={{ maxHeight: '40px' }}
          />
          <span className="gradient-text hidden sm:inline">OSO</span>
        </Link>
        {/* Bouton d'action central */}
        <Link 
          to={getCTALink()} 
          className={`header-cta mx-2 ${isScrolled ? 'scrolled' : ''}`}
        >
          <span>{getCTAText()}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        {/* Contact */}
        <Link 
          to="/contact" 
          className={`header-nav-link mx-2 ${isScrolled ? 'scrolled' : ''}`}
        >
          Contact
        </Link>
        {/* MyOSO/Connexion */}
        {user ? (
          <Link to="/my-oso" className={`header-cta mx-2 ${isScrolled ? 'scrolled' : ''}`}>
            <User className="w-4 h-4" />
            <span>My OSO</span>
          </Link>
        ) : (
          <Link to="/login" className={`header-cta mx-2 ${isScrolled ? 'scrolled' : ''}`}>
            <User className="w-4 h-4" />
            <span>Connexion</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header; 