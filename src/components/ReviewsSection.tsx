import React, { useState } from 'react';
import { Star, Play, CheckCircle2, X, ExternalLink, Sparkles } from 'lucide-react';
import { Review } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

interface ReviewsSectionProps {
  reviews: Review[];
  onOpenWriteReview: () => void;
  theme?: 'dark' | 'light';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenWriteReview,
  theme = 'light'
}) => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const isDark = theme === 'dark';

  return (
    <section id="reviews" className={`py-24 relative border-t transition-colors ${
      isDark ? 'bg-[#181B20] border-[#333A48] text-white' : 'bg-[#FAF9F5] border-gray-200 text-[#181B20]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Google Review Badge Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pb-12 border-b border-gray-200 dark:border-[#333A48]">
          
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-full text-xs text-gray-800 dark:text-gray-200 font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Pakistani Estate Client Endorsements</span>
            </div>

            <h2 className={`font-serif-luxury text-3xl sm:text-5xl font-bold ${
              isDark ? 'text-white' : 'text-[#181B20]'
            }`}>
              5-Star Video & Client Testimonials
            </h2>

            <p className={`text-sm sm:text-base font-normal ${
              isDark ? 'text-gray-300' : 'text-black'
            }`}>
              Real estate homeowners from DHA Lahore, Sector F-7 Islamabad, Gulberg, and Bahria Town share their experience with MZ BUILT.
            </p>
          </div>

          {/* Google Review Badge Box */}
          <div className={`p-5 rounded-2xl border shadow-xl flex items-center gap-5 shrink-0 ${
            isDark ? 'bg-[#232830] border-[#333A48]' : 'bg-white border-gray-200'
          }`}>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 shadow-md border border-gray-100">
              {/* Google G Logo SVG */}
              <svg viewBox="0 0 24 24" className="w-7 h-7">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-sm">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className={`ml-1 font-mono ${isDark ? 'text-white' : 'text-[#181B20]'}`}>4.9 / 5.0</span>
              </div>
              <p className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>184+ Verified Google Reviews</p>
              <a
                href={SITE_CONFIG.googleReviews.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#2D3436] dark:text-gray-300 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className={`rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl border ${
                isDark
                  ? 'bg-[#232830] border-[#333A48] hover:border-gray-500'
                  : 'bg-white border-gray-200 hover:border-gray-400 shadow-md'
              }`}
            >
              
              {/* Top Video or House Image Frame */}
              <div className="relative h-56 bg-black overflow-hidden">
                <img
                  src={rev.projectImage || rev.avatar}
                  alt={rev.projectTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

                {/* Verified Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-emerald-400 text-[10px] font-semibold rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified House Owner</span>
                </div>

                {/* Location Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#2D3436] text-white text-[10px] font-bold rounded-full">
                  {rev.location}
                </div>

                {/* 5-Star Video Testimonial Play Button Overlay */}
                {rev.hasVideoTestimonial && rev.videoUrl && (
                  <button
                    onClick={() => setActiveVideoUrl(rev.videoUrl!)}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#2D3436] hover:bg-[#1E2325] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 group-hover:animate-pulse"
                    title="Play 5-Star Video Testimonial"
                  >
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </button>
                )}
              </div>

              {/* Review Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <h3 className={`font-serif-luxury text-base font-bold transition-colors group-hover:text-gray-500 dark:group-hover:text-gray-300 ${
                    isDark ? 'text-white' : 'text-[#181B20]'
                  }`}>
                    "{rev.quote}"
                  </h3>

                  <p className={`text-xs font-normal leading-relaxed line-clamp-4 ${
                    isDark ? 'text-gray-300' : 'text-black'
                  }`}>
                    {rev.fullReview}
                  </p>
                </div>

                {/* Client Profile */}
                <div className="pt-4 border-t border-gray-200 dark:border-[#333A48] flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                  />
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-[#181B20]'}`}>{rev.author}</h4>
                    <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-900 font-semibold'}`}>{rev.role} • {rev.company}</p>
                    <p className={`text-[9px] font-bold ${isDark ? 'text-gray-300' : 'text-black'}`}>{rev.projectTitle}</p>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center space-y-4">
          <button
            onClick={onOpenWriteReview}
            className="px-6 py-3 bg-[#2D3436] hover:bg-[#1E2325] text-xs font-bold uppercase tracking-widest text-white rounded-xl transition-colors shadow-md"
          >
            Submit Client Feedback
          </button>
        </div>

      </div>

      {/* Video Modal Popup */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-[#181B20] border border-[#333A48] rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#232830] flex items-center justify-between border-b border-[#333A48]">
              <span className="text-xs text-white uppercase tracking-widest font-semibold flex items-center gap-2">
                <Play className="w-4 h-4" />
                <span>Verified 5-Star Video Testimonial • MZ BUILT</span>
              </span>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
                src={activeVideoUrl}
              >
                Your browser does not support HTML5 video.
              </video>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
