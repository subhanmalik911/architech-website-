import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProjectTitle?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  prefilledProjectTitle
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneWhatsApp: '',
    email: '',
    city: 'Lahore',
    projectType: '1 Kanal Luxury Villa',
    plotSize: '1 Kanal (20 Marla)',
    budgetRange: 'PKR 10 Crore - PKR 15 Crore',
    preferredDate: '',
    notes: prefilledProjectTitle ? `Inquiring for: ${prefilledProjectTitle}` : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendWhatsAppDirect = () => {
    const text = `Assalam-o-Alaikum MZ BUILT, I booked a Free Site Visit:\n- Name: ${formData.name}\n- WhatsApp: ${formData.phoneWhatsApp}\n- City: ${formData.city}\n- Project Type: ${formData.projectType}\n- Plot Size: ${formData.plotSize}\n- Preferred Date: ${formData.preferredDate || 'Earliest Available'}\n- Notes: ${formData.notes}`;
    window.open(`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(text)}`, '_blank');
  };

  // Google Calendar Event Generator Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Architectural Consultation & Site Visit - ${SITE_CONFIG.brandName}`);
    const details = encodeURIComponent(`Free Site Visit & BOQ Consultation with Ar. M. Zeeshan & MZ BUILT team for ${formData.projectType} in ${formData.city}.`);
    const location = encodeURIComponent(`${formData.city}, Pakistan`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      <div className="relative w-full max-w-2xl bg-[#181B20] border border-[#333A48] rounded-2xl overflow-hidden shadow-2xl my-auto text-white">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#232830] border-b border-[#333A48] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Book Free Site Visit & Consultation
              </h3>
              <p className="text-xs text-gray-300 font-light">
                Meet Principal Architects in Lahore, Islamabad, or on your plot.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {submitted ? (
            <div className="text-center py-8 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif-luxury text-2xl font-bold text-white">
                  Consultation Request Received!
                </h4>
                <p className="text-xs text-gray-300 font-light max-w-md mx-auto">
                  Our Senior Project Director will call you on <span className="text-white font-mono font-bold">{formData.phoneWhatsApp}</span> within 30 minutes to confirm your plot site visit.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleSendWhatsAppDirect}
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Confirm Instantly on WhatsApp</span>
                </button>

                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#232830] hover:bg-white/10 border border-[#333A48] text-white font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Add to Google Calendar</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mian Usman Ali"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#232830] border border-[#333A48] focus:border-white text-xs text-white p-3 rounded-xl outline-none"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={formData.phoneWhatsApp}
                    onChange={(e) => setFormData({ ...formData, phoneWhatsApp: e.target.value })}
                    className="w-full bg-[#232830] border border-[#333A48] focus:border-white text-xs text-white p-3 rounded-xl outline-none font-mono"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* City */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">City / Location *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#232830] border border-[#333A48] focus:border-white text-xs text-white p-3 rounded-xl outline-none"
                  >
                    <option value="Lahore">Lahore (Gulberg / DHA / Model Town / Bahria)</option>
                    <option value="Islamabad">Islamabad (Sector F-6/7/8 / CDA / E-11)</option>
                    <option value="Rawalpindi">Rawalpindi & Bahria Town</option>
                    <option value="Karachi">Karachi (DHA / Clifton)</option>
                    <option value="Multan">Multan & DHA Multan</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Overseas / International">Overseas (UAE / UK / USA)</option>
                  </select>
                </div>

                {/* Project Type */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">Project Category *</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#232830] border border-[#333A48] focus:border-white text-xs text-white p-3 rounded-xl outline-none"
                  >
                    <option value="1 Kanal Luxury Villa">1 Kanal Luxury Villa</option>
                    <option value="2 Kanal Farmhouse">2 Kanal Farmhouse Estate</option>
                    <option value="10 Marla Modern House">10 Marla Modern House</option>
                    <option value="Commercial Plaza & Retail">Commercial Plaza & Retail</option>
                    <option value="Restaurant / Cafe Design">Restaurant / Cafe Fitout</option>
                    <option value="Interior Architecture & Joinery">Interior Architecture</option>
                    <option value="Complete House Renovation">Complete Renovation</option>
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Budget Range */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">Estimated Budget (PKR)</label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-[#232830] border border-[#333A48] focus:border-white text-xs text-white p-3 rounded-xl outline-none"
                  >
                    <option value="Under PKR 5 Crore">Under PKR 5 Crore</option>
                    <option value="PKR 5 Crore - PKR 10 Crore">PKR 5 Crore - PKR 10 Crore</option>
                    <option value="PKR 10 Crore - PKR 20 Crore">PKR 10 Crore - PKR 20 Crore</option>
                    <option value="PKR 20 Crore+ Custom">PKR 20 Crore+ Executive</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">Preferred Site Visit Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#232830] border border-[#333A48] focus:border-white text-xs text-white p-3 rounded-xl outline-none"
                  />
                </div>

              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">Specific Requirements / Plot Details</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Corner plot in DHA Phase 6 Raya, interested in double-height lounge and basement cinema..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#232830] border border-[#333A48] focus:border-white text-xs text-white p-3 rounded-xl outline-none resize-none"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2D3436] hover:bg-[#1E2325] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg"
                >
                  Schedule Free Site Visit
                </button>

                <a
                  href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent("Assalam-o-Alaikum, I want to book a Free Site Visit for my plot.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3.5 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Instead</span>
                </a>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
