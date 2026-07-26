import React from 'react';
import { CheckCircle2, MessageCircle, Phone, Sparkles, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface PricingSectionProps {
  onOpenConsultation: () => void;
  theme?: 'dark' | 'light';
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenConsultation, theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <section id="pricing" className={`py-24 relative transition-colors ${
      isDark ? 'bg-[#181B20] text-white' : 'bg-[#FAF9F5] text-black'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
            isDark ? 'bg-white/10 border border-white/20 text-gray-200' : 'bg-gray-200 border border-gray-300 text-black'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pakistan Market Standard Packages</span>
          </div>

          <h2 className={`font-serif-luxury text-3xl sm:text-5xl font-bold ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Transparent Architectural & Construction Pricing
          </h2>

          <p className={`text-sm sm:text-base font-normal ${
            isDark ? 'text-gray-300' : 'text-black'
          }`}>
            Fixed BOQ commitments with zero cost overruns. Designed specifically for plots in Lahore, Islamabad, Rawalpindi, and across Pakistan.
          </p>
        </div>

        {/* 4 Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] ${
                pkg.popular
                  ? isDark
                    ? 'bg-[#232830] border-2 border-white shadow-2xl'
                    : 'bg-white border-2 border-black shadow-xl'
                  : isDark
                    ? 'bg-[#232830] border border-[#333A48] hover:border-gray-500'
                    : 'bg-white border border-gray-300 hover:border-black shadow-md'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-black text-white font-bold text-[10px] uppercase tracking-widest rounded-full shadow-lg">
                  Most Popular Choice
                </div>
              )}

              <div className="space-y-6">
                
                {/* Header */}
                <div className={`space-y-2 border-b pb-4 ${
                  isDark ? 'border-[#333A48]' : 'border-gray-200'
                }`}>
                  <h3 className={`font-serif-luxury text-xl font-bold ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {pkg.name}
                  </h3>
                  <div className="pt-1">
                    <span className={`text-2xl sm:text-3xl font-bold font-mono ${
                      isDark ? 'text-white' : 'text-black'
                    }`}>
                      {pkg.pricePerSqFt}
                    </span>
                    <span className={`text-xs font-medium ml-1 ${
                      isDark ? 'text-gray-300' : 'text-black'
                    }`}>{pkg.unit}</span>
                  </div>
                  <p className={`text-[11px] font-normal leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-black'
                  }`}>
                    {pkg.tagline}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <p className={`text-[10px] uppercase tracking-wider font-bold ${
                    isDark ? 'text-gray-300' : 'text-black'
                  }`}>
                    What's Included:
                  </p>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className={`flex items-start gap-2 text-xs font-semibold ${
                        isDark ? 'text-gray-100' : 'text-black'
                      }`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isDark ? 'text-gray-300' : 'text-black'
                        }`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Buttons */}
              <div className={`pt-8 space-y-2.5 border-t mt-6 ${
                isDark ? 'border-[#333A48]' : 'border-gray-200'
              }`}>
                
                {/* WhatsApp Inquiry */}
                <a
                  href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(`Assalam-o-Alaikum, I want to inquire about the ${pkg.name} (${pkg.pricePerSqFt}) package.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Inquire on WhatsApp</span>
                </a>

                {/* Free Site Visit Modal Trigger */}
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2.5 px-4 bg-black hover:bg-gray-800 text-white font-semibold text-xs uppercase tracking-widest rounded-lg transition-colors shadow-sm"
                >
                  Book Free Site Visit
                </button>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className={`mt-12 p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left ${
          isDark
            ? 'bg-[#232830] border-[#333A48]'
            : 'bg-[#F2F0EB] border-gray-300'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 ${
              isDark ? 'bg-white/10 border-white' : 'bg-black/10 border-black'
            }`}>
              <ShieldCheck className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
            </div>
            <div>
              <h4 className={`text-sm font-bold font-serif-luxury ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                10-Year Structural Engineering & Material Warranty
              </h4>
              <p className={`text-xs font-normal ${
                isDark ? 'text-gray-300' : 'text-black'
              }`}>
                All structural concrete casting is tested at UET Lahore labs with certified steel load reports.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneNumber}`}
              className="px-5 py-3 bg-black text-white font-bold text-xs uppercase tracking-widest rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Senior Engineer</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
