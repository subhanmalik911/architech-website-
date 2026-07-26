import React, { useState } from 'react';
import { MapPin, Send, CheckCircle2, MessageCircle, ExternalLink, Linkedin, Facebook, Instagram, Users, Calculator } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 3000);
  };

  const handleLinkClick = (page: string, sectionId?: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    if (sectionId && page === 'home') {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#181B20] text-gray-300 pt-16 pb-12 border-t border-[#333A48] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP GRID: BRAND, QUICK NAVIGATION & NEWSLETTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#333A48]">
          
          {/* BRAND & NEWSLETTER */}
          <div className="lg:col-span-5 space-y-6">
            <button
              onClick={() => handleLinkClick('home')}
              className="inline-block group text-left focus:outline-none"
            >
              <span className="font-serif-luxury text-3xl tracking-[0.25em] font-extrabold text-white group-hover:text-gray-400 transition-colors">
                MZ BUILT<span className="text-gray-400">.</span>
              </span>
            </button>

            <p className="text-xs text-gray-400 font-light max-w-sm leading-relaxed">
              Premier architectural atelier & turnkey construction specialists in Lahore, Islamabad & Dubai. Crafting iconic 1 Kanal & 2 Kanal modern villas, commercial plazas, and luxury estates.
            </p>

            {/* Social Media Links Bar */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] uppercase tracking-widest text-gray-300 font-bold block">
                Connect With Atelier:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-black transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#232830] border border-[#333A48] text-gray-300 rounded-lg hover:border-gray-400 hover:text-white transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#232830] border border-[#333A48] text-gray-300 rounded-lg hover:border-gray-400 hover:text-white transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#232830] border border-[#333A48] text-gray-300 rounded-lg hover:border-gray-400 hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={SITE_CONFIG.googleReviews.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#232830] border border-[#333A48] text-gray-300 rounded-lg hover:border-gray-400 hover:text-white transition-colors"
                  title="Google Maps Location"
                >
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase tracking-widest text-white font-medium block">
                The MZ BUILT Monograph
              </span>
              <p className="text-[11px] text-gray-400 font-light">
                Subscribe for private architectural portfolios and market BOQ reports.
              </p>

              {subscribed ? (
                <div className="p-3 bg-white/10 border border-white/20 text-xs text-white rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-gray-300" />
                  <span>Subscribed to private architectural monographs.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#232830] border border-[#333A48] focus:border-white text-xs text-white p-3 rounded-xl outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#2D3436] hover:bg-[#1E2325] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center gap-2 shadow-md"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* QUICK LINKS & TEAM / CALCULATOR PAGES */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Nav Pages Link Column */}
            <div className="space-y-3 p-5 bg-[#232830] border border-[#333A48] rounded-2xl">
              <h4 className="text-xs uppercase tracking-widest text-gray-300 font-bold">
                Main Pages
              </h4>
              <ul className="space-y-2 text-xs text-gray-300 font-medium">
                <li>
                  <button
                    onClick={() => handleLinkClick('home')}
                    className="hover:text-white transition-colors"
                  >
                    Homepage
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('team')}
                    className="text-white hover:text-gray-300 font-bold flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span>Our Team Page</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('calculator')}
                    className="text-white hover:text-gray-300 font-bold flex items-center gap-1.5"
                  >
                    <Calculator className="w-3.5 h-3.5 text-gray-400" />
                    <span>Cost Calculator Page</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('home', 'services')}
                    className="hover:text-white transition-colors"
                  >
                    Services Offered
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('home', 'portfolio')}
                    className="hover:text-white transition-colors"
                  >
                    Architectural Monograph
                  </button>
                </li>
              </ul>
            </div>

            {/* Global Atelier Offices */}
            {SITE_CONFIG.ateliers.slice(0, 2).map((office) => (
              <div key={office.city} className="space-y-2 p-5 bg-[#232830] border border-[#333A48] rounded-2xl">
                <div className="flex items-center gap-2 text-white font-serif-luxury text-base font-bold">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{office.city}</span>
                </div>
                <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                  {office.address}
                </p>
                <p className="text-[11px] text-gray-300 font-medium font-mono pt-1">
                  {office.phone}
                </p>
                <a
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1 pt-1 underline"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-light">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.brandName} Architecture & Turnkey Construction Atelier. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button onClick={() => handleLinkClick('home')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => handleLinkClick('team')} className="text-gray-300 hover:underline font-bold">Team Page</button>
            <button onClick={() => handleLinkClick('calculator')} className="text-gray-300 hover:underline font-bold">Calculator Page</button>
            <button onClick={() => handleLinkClick('home', 'services')} className="hover:text-white transition-colors">Services</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
