import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Calendar, Sparkles, MapPin, ArrowRight, Star, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface HeroProps {
  onOpenConsultation: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90',
    title: 'The Onyx Monolith Villa',
    subtitle: 'DHA Phase 6, Sector Raya • Lahore',
    type: '1 Kanal Ultra-Luxury Smart Residence'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90',
    title: 'The Margalla Sanctuary Manor',
    subtitle: 'Sector F-7/2 • Islamabad',
    type: '2 Kanal Executive Modern Manor'
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=90',
    title: 'The Palm Sky Mansion',
    subtitle: 'Frond N, Palm Jumeirah • Dubai',
    type: 'Waterfront Modern Architecture'
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=90',
    title: 'Aura Commercial Plaza',
    subtitle: 'Main Boulevard, Gulberg III • Lahore',
    type: '7-Story Glass & Steel Facade'
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automated 5-second slide transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const defaultWhatsappMsg = encodeURIComponent(
    `Hello ${SITE_CONFIG.brandName}! I want to discuss architectural design & construction for my plot.`
  );

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center bg-[#181B20] text-white overflow-hidden pt-24 pb-16">
      
      {/* AUTOMATED SLIDESHOW BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-105 transition-transform duration-[10000ms]' : 'opacity-0 scale-100 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-75"
            />
            {/* Dark Vignette Overlay for Crisp Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181B20] via-[#181B20]/60 to-[#181B20]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#181B20]/80 via-transparent to-[#181B20]/80" />
          </div>
        ))}
      </div>

      {/* FLOATING SLIDE CONTROL ARROWS & PROGRESS DOTS */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-4 bg-[#232830]/80 backdrop-blur-md border border-[#333A48] px-4 py-2 rounded-full">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="p-1 text-gray-300 hover:text-white transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="p-1 text-gray-300 hover:text-white transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* HERO MAIN CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 text-center sm:text-left">
        
        {/* Top Badges & Google Reviews */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs text-gray-200 font-semibold tracking-widest uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-gray-300" />
            <span>Monograph Architecture & Turnkey Construction</span>
          </div>

          {/* Google Review Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#232830]/80 border border-[#333A48] rounded-full text-xs text-white backdrop-blur-md">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span className="font-bold text-white">4.9 ★</span>
            </div>
            <span className="text-gray-300 text-[11px] font-light">184+ Verified Client Reviews</span>
          </div>

        </div>

        {/* MAIN TYPOGRAPHY HEADLINE */}
        <div className="max-w-4xl space-y-3">
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            <span className="text-white block">
              MZ BUILT<span className="text-gray-400">.</span>
            </span>
            <span className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light text-gray-200 block mt-2">
              Architectural Works & Turnkey Estates
            </span>
          </h1>

          {/* Dynamic Active Slide Label */}
          <div className="pt-2 text-xs text-gray-300 font-mono flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
            <span>Featured Project: {HERO_SLIDES[currentSlide].title} ({HERO_SLIDES[currentSlide].subtitle})</span>
          </div>

          <p className="text-gray-300 text-base sm:text-xl font-light leading-relaxed max-w-2xl pt-2">
            Designing and constructing iconic 1-Kanal to 2-Kanal luxury mansions, commercial towers, and resort farmhouses across Lahore, Islamabad & Dubai.
          </p>
        </div>

        {/* PRIMARY CTA BUTTON GROUP */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
          
          <a
            href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${defaultWhatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-4 px-8 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-transform transform active:scale-95 shadow-xl font-sans"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>WhatsApp Now</span>
          </a>

          <a
            href={`tel:${SITE_CONFIG.phoneNumber}`}
            className="w-full sm:w-auto py-4 px-8 bg-[#2D3436] hover:bg-[#1E2325] text-white font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-transform transform active:scale-95 shadow-xl font-sans"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now ({SITE_CONFIG.displayPhone})</span>
          </a>

          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto py-4 px-6 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded-xl border border-white/20 flex items-center justify-center gap-2 backdrop-blur-md transition-all"
          >
            <Calendar className="w-4 h-4 text-gray-300" />
            <span>Book Site Visit</span>
            <ArrowRight className="w-4 h-4 text-gray-300" />
          </button>

        </div>

        {/* ATELIER LOCATIONS & CERTIFICATION */}
        <div className="pt-8 border-t border-[#333A48] w-full flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-xs text-gray-400 font-light">
          <div className="flex items-center gap-1.5 text-gray-300">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-white">Atelier Locations:</span> Lahore (DHA Ph 6 & Gulberg III) • Islamabad (Sector F-7) • Dubai
          </div>
          <div className="hidden sm:inline text-gray-600">•</div>
          <div className="flex items-center gap-1 text-gray-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
            <span>PCATP & PEC Registered Firm</span>
          </div>
        </div>

      </div>
    </div>
  );
};
