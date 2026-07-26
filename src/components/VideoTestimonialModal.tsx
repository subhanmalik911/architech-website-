import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Star, CheckCircle, MapPin, Building, Sparkles } from 'lucide-react';
import { Review } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

interface VideoTestimonialModalProps {
  review: Review | null;
  onClose: () => void;
}

export const VideoTestimonialModal: React.FC<VideoTestimonialModalProps> = ({ review, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0f1117] border border-[#c5a059]/50 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Close Video Testimonial"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Area (MD 7 Cols) */}
        <div className="md:col-span-7 bg-black relative min-h-[320px] sm:min-h-[420px] flex items-center justify-center overflow-hidden">
          {/* Simulated HD Video Stream with Client Overlay */}
          <img
            src={review.projectImage || review.avatar}
            alt={review.author}
            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100 filter brightness-75'}`}
          />

          {/* Video Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* 5-Star Video Badge */}
          <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md border border-[#c5a059]/50 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-[#c5a059]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Verified 5★ Video Review</span>
          </div>

          {/* Video Control Center */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="pointer-events-auto w-16 h-16 rounded-full bg-[#c5a059] hover:bg-[#d4af37] text-black flex items-center justify-center shadow-2xl transition-transform transform hover:scale-110 active:scale-95"
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
            </button>
          </div>

          {/* Video Bottom Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[11px] font-mono">4K Ultra HD | 01:45</span>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Client Review Details Area (MD 5 Cols) */}
        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#0b0c10] border-t md:border-t-0 md:border-l border-white/10">
          
          <div className="space-y-6">
            {/* Google Review Verification */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-xs text-gray-300 font-medium">Verified Google Review</span>
              </div>
              <div className="flex items-center gap-1 text-[#c5a059]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            {/* Client Profile */}
            <div className="flex items-center gap-3">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#c5a059]"
              />
              <div>
                <h4 className="font-serif text-base font-semibold text-white flex items-center gap-1.5">
                  <span>{review.author}</span>
                  {review.verifiedClient && (
                    <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0" title="Verified Owner" />
                  )}
                </h4>
                <p className="text-xs text-gray-400">{review.role}</p>
                <div className="flex items-center gap-1 text-[11px] text-[#c5a059] mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{review.location}</span>
                </div>
              </div>
            </div>

            {/* Review Statement */}
            <div className="space-y-2 bg-white/5 border border-white/5 p-4 rounded-xl">
              <p className="font-serif italic text-sm text-gray-200 leading-relaxed">
                "{review.fullReview}"
              </p>
              <div className="text-[11px] text-[#c5a059] font-medium pt-1">
                Project: {review.projectTitle}
              </div>
            </div>

          </div>

          {/* Action CTA */}
          <div className="pt-6 border-t border-white/10 space-y-2">
            <a
              href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(`Hi ${SITE_CONFIG.brandName}, I saw ${review.author}'s video review for ${review.projectTitle}. I want similar luxury quality for my plot.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>Build Like This With {SITE_CONFIG.brandName}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
