import React, { useState } from 'react';
import { X, Star, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Review } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmitReview }) => {
  if (!isOpen) return null;

  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectType, setProjectType] = useState('Luxury Residential Penthouse');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [fullReview, setFullReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !quote || !fullReview) return;

    const newReview: Review = {
      id: `rev-user-${Date.now()}`,
      author,
      role: role || 'Private Estate Patron',
      company: company || 'Private Client',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80`,
      projectTitle: projectTitle || 'Custom Architectural Estate',
      projectType,
      location: location || 'International',
      rating,
      quote,
      fullReview,
      date: 'Just Now',
      verifiedClient: true,
      featured: true,
      projectImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    };

    onSubmitReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-[#12141a] border border-[#c5a059]/40 rounded-sm shadow-2xl p-6 sm:p-8 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 border border-[#c5a059] text-[#c5a059] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-luxury text-3xl text-white">Review Submitted</h3>
            <p className="text-sm text-gray-300 font-light">
              Thank you for sharing your experience with AURA Studio. Your testimonial has been verified and added to our client showcase.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[#c5a059] text-xs uppercase tracking-widest font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Client Testimonial</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
                Share Your Architectural Journey
              </h3>
              <p className="text-xs text-gray-400 font-light mt-1">
                Your feedback helps future estate patrons understand our spatial craftsmanship.
              </p>
            </div>

            {/* Rating Stars */}
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-medium uppercase tracking-wider block">
                Overall Experience Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-[#c5a059] hover:scale-125 transition-transform"
                  >
                    <Star className={`w-6 h-6 ${star <= rating ? 'fill-[#c5a059]' : 'opacity-30'}`} />
                  </button>
                ))}
                <span className="text-xs text-gray-400 ml-2">{rating} / 5 Stars</span>
              </div>
            </div>

            {/* Author Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-300 block">Your Name / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Harrison Sterling"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#c5a059] text-xs text-white p-2.5 rounded-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-300 block">Role / Company</label>
                <input
                  type="text"
                  placeholder="e.g. Managing Director, Private Estate"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#c5a059] text-xs text-white p-2.5 rounded-sm outline-none"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-300 block">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. The Solstice Penthouse"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#c5a059] text-xs text-white p-2.5 rounded-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-300 block">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Zurich, Switzerland"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#c5a059] text-xs text-white p-2.5 rounded-sm outline-none"
                />
              </div>
            </div>

            {/* Highlight Headline Quote */}
            <div className="space-y-1">
              <label className="text-xs text-gray-300 block">Highlight Summary Quote *</label>
              <input
                type="text"
                required
                placeholder="e.g. 'AURA did not just design a residence—they crafted timeless spatial poetry.'"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-[#c5a059] text-xs text-white p-2.5 rounded-sm outline-none"
              />
            </div>

            {/* Full Review Text */}
            <div className="space-y-1">
              <label className="text-xs text-gray-300 block">Detailed Review & Experience *</label>
              <textarea
                required
                rows={4}
                placeholder="Describe the architectural process, material quality, timeliness, and team communication..."
                value={fullReview}
                onChange={(e) => setFullReview(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-[#c5a059] text-xs text-white p-2.5 rounded-sm outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#c5a059] to-[#dfba73] text-black font-semibold text-xs uppercase tracking-widest rounded-sm hover:from-[#d4af37] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Publish Verified Review</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
