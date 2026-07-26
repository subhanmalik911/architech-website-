import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Calendar, Heart, Shield, Sun, Moon, Menu, X, Users, Calculator } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { MagneticWrapper } from './MagneticWrapper';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenSavedDrawer: () => void;
  onOpenAdminPanel: () => void;
  savedCount: number;
  currentPage: string;
  onNavigate: (page: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenSavedDrawer,
  onOpenAdminPanel,
  savedCount,
  currentPage,
  onNavigate,
  theme,
  onToggleTheme
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const defaultWhatsappMsg = encodeURIComponent(
    `Hello ${SITE_CONFIG.brandName}! I want to inquire about architectural design and construction services.`
  );

  const handleNavClick = (page: string, sectionId?: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(page);
    if (sectionId && page === 'home') {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans ${
        isScrolled
          ? isDark 
            ? 'bg-[#181B20]/95 backdrop-blur-md border-b border-[#2E3440] py-3 shadow-2xl text-gray-200'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm text-gray-900'
          : 'bg-gradient-to-b from-[#181B20]/90 via-[#181B20]/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* BRAND LOGO: MZ BUILT */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <span className={`font-serif-luxury text-2xl tracking-[0.25em] font-extrabold ${
            isScrolled && !isDark ? 'text-[#181B20]' : 'text-white'
          } group-hover:text-gray-400 transition-colors`}>
            MZ BUILT<span className="text-[#3B4252]">.</span>
          </span>
        </button>

        {/* DESKTOP NAVIGATION LINKS */}
        <div className={`hidden lg:flex items-center gap-7 text-xs font-semibold tracking-widest uppercase ${
          isScrolled && !isDark ? 'text-gray-800' : 'text-gray-200'
        }`}>
          <button
            onClick={() => handleNavClick('home')}
            className={`hover:text-gray-500 dark:hover:text-white transition-colors ${currentPage === 'home' ? 'text-gray-900 dark:text-white border-b-2 border-[#2D3436] pb-0.5 font-bold' : ''}`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('home', 'services')}
            className="hover:text-gray-500 dark:hover:text-white transition-colors"
          >
            Services
          </button>

          <button
            onClick={() => handleNavClick('home', 'portfolio')}
            className="hover:text-gray-500 dark:hover:text-white transition-colors"
          >
            Portfolio
          </button>

          <button
            onClick={() => handleNavClick('home', 'before-after')}
            className="hover:text-gray-500 dark:hover:text-white transition-colors"
          >
            Transformations
          </button>

          <button
            onClick={() => handleNavClick('calculator')}
            className={`hover:opacity-90 transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
              currentPage === 'calculator'
                ? 'bg-[#2D3436] text-white border-[#2D3436] font-bold shadow-sm'
                : isScrolled && !isDark
                  ? 'border-gray-300 text-gray-800 hover:bg-gray-100'
                  : 'border-white/20 text-gray-200 hover:bg-white/10'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculator</span>
          </button>

          <button
            onClick={() => handleNavClick('team')}
            className={`hover:opacity-90 transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
              currentPage === 'team'
                ? 'bg-[#2D3436] text-white border-[#2D3436] font-bold shadow-sm'
                : isScrolled && !isDark
                  ? 'border-gray-300 text-gray-800 hover:bg-gray-100'
                  : 'border-white/20 text-gray-200 hover:bg-white/10'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team</span>
          </button>
        </div>

        {/* RIGHT ACTION BUTTONS */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Saved Items Bookmark Drawer Trigger */}
          <button
            onClick={onOpenSavedDrawer}
            className={`p-2 rounded-lg transition-colors border relative ${
              isScrolled && !isDark
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
            title="Saved Projects / Moodboard"
          >
            <Heart className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2D3436] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* WhatsApp Button with Magnetic Effect */}
          <MagneticWrapper strength={0.3} radius={90}>
            <a
              href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${defaultWhatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
          </MagneticWrapper>

          {/* Call Button */}
          <a
            href={`tel:${SITE_CONFIG.phoneNumber}`}
            className="py-2 px-3.5 bg-[#2D3436] hover:bg-[#1E2325] text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-md transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden xl:inline">Call Now</span>
          </a>

          {/* Free Site Visit CTA */}
          <button
            onClick={onOpenConsultation}
            className={`py-2 px-3.5 font-semibold text-xs rounded-lg border flex items-center gap-1.5 transition-colors ${
              isScrolled && !isDark
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
          >
            <Calendar className="w-4 h-4 text-gray-300" />
            <span className="hidden md:inline">Book Visit</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-colors border ${
              isScrolled && !isDark
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-gray-300" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Theme Toggle Button for Mobile */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-colors border ${
              isScrolled && !isDark
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-gray-300" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>

          {/* Saved Items Button for Mobile */}
          <button
            onClick={onOpenSavedDrawer}
            className={`p-2 rounded-lg transition-colors border relative ${
              isScrolled && !isDark
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
            aria-label="Saved Items"
          >
            <Heart className={`w-4 h-4 ${isScrolled && !isDark ? 'text-gray-800' : 'text-white'}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2D3436] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors border ${
              isScrolled && !isDark
                ? 'bg-gray-100 text-gray-900 border-gray-300'
                : 'bg-white/10 text-white border-white/20'
            }`}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#181B20] border-b border-[#2E3440] p-5 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="flex flex-col space-y-2.5 text-xs font-semibold uppercase tracking-wider text-gray-200">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('home', 'services')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            >
              Services Offering
            </button>
            <button
              onClick={() => handleNavClick('home', 'portfolio')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            >
              Monograph Portfolio
            </button>
            <button
              onClick={() => handleNavClick('home', 'before-after')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            >
              Renovation Transformations
            </button>
            <button
              onClick={() => handleNavClick('calculator')}
              className="text-left py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-gray-300" />
              <span>Cost Estimator & BOQ</span>
            </button>
            <button
              onClick={() => handleNavClick('team')}
              className="text-left py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-gray-300" />
              <span>Our Leadership & Team</span>
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <a
              href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${defaultWhatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#25D366] text-black font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Now</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${SITE_CONFIG.phoneNumber}`}
                className="py-2.5 bg-[#2D3436] text-white font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="py-2.5 bg-white/10 text-white font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 border border-white/15"
              >
                <Calendar className="w-3.5 h-3.5 text-gray-300" />
                <span>Book Visit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
