import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, Calendar, X, Send, Sparkles, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { MagneticWrapper } from './MagneticWrapper';

interface FloatingWhatsAppProps {
  onOpenSiteVisit: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.96,
    transition: {
      duration: 0.2,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenSiteVisit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsTyping(false);
      return;
    }

    // Initial delay before showing typing state
    const initialTimeout = setTimeout(() => {
      setIsTyping(true);
    }, 1000);

    // Random toggle interval between 3s and 6s
    const interval = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 4500);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isOpen]);

  // Subtle luxury hover sound generator using Web Audio API
  const playHoverSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      // Ultra-soft smooth frequency glide (580Hz -> 880Hz over 80ms)
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      // Low gain envelope for subtle, elegant feedback
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);

      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 150);
    } catch {
      // Silently ignore if audio context is restricted
    }
  };

  const defaultMsg = encodeURIComponent(
    `Hello ${SITE_CONFIG.brandName}! I am interested in architectural design & luxury construction for my plot/project. Please share details.`
  );

  const handleSendCustomMsg = (e: React.FormEvent) => {
    e.preventDefault();
    const text = customMsg.trim() 
      ? encodeURIComponent(`Hello ${SITE_CONFIG.brandName}! ${customMsg}`)
      : defaultMsg;
    window.open(`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${text}`, '_blank');
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Floating Button Group */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-3 font-sans">
        
        {/* Expanded Quick Contact Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-[#0f1117] border border-[#c5a059]/40 rounded-xl shadow-2xl p-4 sm:p-5 text-white max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 sm:mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs sm:text-sm font-semibold text-white tracking-wide flex items-center gap-1.5">
                      <span>{SITE_CONFIG.brandName} WhatsApp</span>
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse inline-block" />
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-gray-400">Architects & Site Engineers Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Quick Greeting */}
              <motion.div variants={itemVariants} className="bg-white/5 border border-white/5 rounded-lg p-2.5 sm:p-3 text-xs text-gray-300 space-y-1 mb-3 sm:mb-4">
                <div className="flex items-center gap-1.5 text-[#c5a059] font-medium text-[10px] sm:text-[11px]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Lahore, Islamabad & Global Ateliers</span>
                </div>
                <p className="leading-relaxed text-[11px] sm:text-xs">
                  Welcome to {SITE_CONFIG.brandName}! Chat directly with our principal architects for instant project estimates & site visits.
                </p>
              </motion.div>

              {/* Quick Action Buttons */}
              <motion.div variants={itemVariants} className="space-y-2 mb-3 sm:mb-4">
                <a
                  href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${defaultMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs rounded-lg flex items-center justify-between transition-colors shadow-lg shadow-[#25D366]/20"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Inquiry</span>
                  </span>
                  <span className="hidden md:inline-block text-[10px] bg-black/20 px-1.5 py-0.5 rounded text-black font-bold">Fast Reply</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phoneNumber}`}
                  onMouseEnter={playHoverSound}
                  className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white font-medium text-xs rounded-lg flex items-center gap-2 border border-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#c5a059]" />
                  <span className="truncate">Call Architect ({SITE_CONFIG.displayPhone})</span>
                </a>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenSiteVisit();
                  }}
                  onMouseEnter={playHoverSound}
                  className="w-full py-2.5 px-3 bg-[#c5a059]/20 hover:bg-[#c5a059]/30 text-[#c5a059] font-medium text-xs rounded-lg flex items-center justify-between border border-[#c5a059]/40 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Book Free Site Visit</span>
                  </span>
                  <Sparkles className="w-3.5 h-3.5 hidden md:block" />
                </button>
              </motion.div>

              {/* Quick Message Input */}
              <motion.div variants={itemVariants} className="pt-1">
                {isTyping && (
                  <div className="flex items-center gap-1.5 text-[10px] text-[#25D366] font-medium mb-1.5 px-1 animate-in fade-in duration-300">
                    <span className="font-sans">Architect is typing</span>
                    <span className="flex gap-0.5 items-center">
                      <span className="w-1 h-1 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-1 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-1 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                )}
                <form onSubmit={handleSendCustomMsg} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type location or plot size..."
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    className="flex-1 bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-[#25D366] outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#25D366] text-black p-2 rounded-lg hover:bg-[#20bd5a] transition-colors"
                    title="Send via WhatsApp"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button with Magnetic Effect */}
        <MagneticWrapper strength={0.35} radius={110}>
          <div className="flex items-center gap-2">
            {!isOpen && (
              <div className="hidden md:flex items-center gap-2 bg-[#0d0e12]/90 backdrop-blur-md border border-[#c5a059]/40 px-3 py-1.5 rounded-full shadow-xl text-xs text-white pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span className="font-medium text-gray-200">Chat with {SITE_CONFIG.brandName}</span>
              </div>
            )}

            <div className="relative group">
              {/* Ambient Pulsating Outer Ring in Closed State (desktop only) */}
              {!isOpen && (
                <span className="hidden md:block absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none -z-10" />
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={playHoverSound}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black shadow-2xl flex items-center justify-center transition-all duration-300 ease-out hover:scale-105 active:scale-95 border-2 border-white/20 relative ${
                  !isOpen ? 'animate-whatsapp-pulse' : 'hover:rotate-90'
                }`}
                aria-label="WhatsApp Contact"
              >
                {isOpen ? (
                  <X className="w-5 h-5 md:w-6 md:h-6 text-black transition-transform duration-300" />
                ) : (
                  <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-black fill-current transition-transform duration-300 group-hover:scale-110" />
                )}

                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-black shadow-sm">
                  1
                </span>
              </button>
            </div>
          </div>
        </MagneticWrapper>

      </div>

      {/* Mobile Sticky Contact Bar at Screen Bottom - Hidden as per user preference */}
      <div className="hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0c0d12]/95 backdrop-blur-lg border-t border-[#c5a059]/30 p-2.5 items-center gap-2">
        <a
          href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${defaultMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 bg-[#25D366] text-black font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Now</span>
        </a>

        <a
          href={`tel:${SITE_CONFIG.phoneNumber}`}
          className="flex-1 py-2.5 px-2 bg-[#c5a059] text-black font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4" />
          <span>Call Now</span>
        </a>

        <button
          onClick={onOpenSiteVisit}
          className="py-2.5 px-3 bg-white/10 text-white font-medium text-xs rounded-lg flex items-center justify-center border border-white/10 active:scale-95 transition-transform"
          title="Free Site Visit"
        >
          <Calendar className="w-4 h-4 text-[#c5a059]" />
        </button>
      </div>
    </>
  );
};
