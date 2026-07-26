import React, { useState } from 'react';
import { Calculator, Check, Sparkles, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface PricingPackagesProps {
  onOpenConsultationWithQuote: (quoteDetails: string) => void;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({ onOpenConsultationWithQuote }) => {
  // Calculator state
  const [sqft, setSqft] = useState<number>(4500); // Default ~1 Kanal house covered area
  const [selectedPackageId, setSelectedPackageId] = useState<string>('turnkey-luxury');
  const [selectedCity, setSelectedCity] = useState<string>('DHA Lahore');

  const packages = SITE_CONFIG.pricingPackages;
  const currentPackage = packages.find((p) => p.id === selectedPackageId) || packages[1];

  // Calculated estimate
  const totalEstimatePKR = (sqft * currentPackage.rawPrice).toLocaleString();

  const handleSendCalculatorQuote = () => {
    const text = `Quote Estimate from ${SITE_CONFIG.brandName} Calculator:
- Package: ${currentPackage.name}
- Covered Area: ${sqft.toLocaleString()} sq. ft. (${selectedCity})
- Rate: ${currentPackage.pricePerSqFt}
- Estimated Budget: PKR ${totalEstimatePKR}
Please confirm site visit & detailed BOQ.`;

    onOpenConsultationWithQuote(text);
  };

  return (
    <section id="pricing" className="py-24 bg-[#181B20] text-white relative border-t border-[#333A48] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs text-gray-200 font-medium tracking-widest uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>Transparent Pricing & Packages</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
            Turnkey Construction & Architectural Packages
          </h2>

          <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
            Zero hidden costs. Guaranteed A+ grade materials, structural engineering standards, and complete project transparency across Lahore, Islamabad & UAE.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {packages.map((pkg) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 relative flex flex-col justify-between transition-all duration-300 border ${
                  isPopular
                    ? 'bg-[#232830] border-2 border-gray-400 shadow-2xl transform -translate-y-2'
                    : 'bg-[#232830] border-[#333A48] hover:border-gray-500'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2D3436] text-white font-bold text-[10px] tracking-widest uppercase px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular Turnkey Choice</span>
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-xl font-semibold text-white mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-[11px] text-gray-300 font-light mb-4 min-h-[32px]">
                    {pkg.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-b border-[#333A48]">
                    <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-bold text-white font-serif">
                      <span>{pkg.pricePerSqFt}</span>
                    </div>
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider block mt-1">
                      {pkg.unit}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8 text-xs text-gray-300">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-light leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPackageId(pkg.id);
                    onOpenConsultationWithQuote(
                      `Inquiry for Package: ${pkg.name} (${pkg.pricePerSqFt}). Please share detailed BOQ.`
                    );
                  }}
                  className="w-full py-3 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all bg-[#2D3436] hover:bg-[#1E2325] text-white shadow-md"
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Interactive Cost Calculator Widget */}
        <div className="bg-[#232830] border border-[#333A48] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs text-gray-300 font-semibold uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Instant Interactive Estimator</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                Estimate Your Luxury Villa or Project Budget
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Covered Area Input */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-medium block">
                    Covered Area (Sq. Ft.): <span className="text-white font-bold">{sqft.toLocaleString()} sq.ft.</span>
                  </label>
                  <input
                    type="range"
                    min={1500}
                    max={25000}
                    step={250}
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full accent-[#2D3436] bg-white/10 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>10 Marla (2,250 sqft)</span>
                    <span>1 Kanal (4,500 sqft)</span>
                    <span>2 Kanal (9,000 sqft)</span>
                  </div>
                </div>

                {/* Package Dropdown Selection */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-medium block">
                    Select Architectural Package:
                  </label>
                  <select
                    value={selectedPackageId}
                    onChange={(e) => setSelectedPackageId(e.target.value)}
                    className="w-full bg-[#181B20] border border-[#333A48] text-white text-xs p-3 rounded-xl focus:border-white outline-none"
                  >
                    {packages.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#181B20] text-white">
                        {p.name} ({p.pricePerSqFt})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Location */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-medium block">
                    Project Location / Society:
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-[#181B20] border border-[#333A48] text-white text-xs p-3 rounded-xl focus:border-white outline-none"
                  >
                    <option value="DHA Phase 6, Lahore">DHA Phase 6 & 8, Lahore</option>
                    <option value="Gulberg III, Lahore">Gulberg III, Lahore</option>
                    <option value="Bahria Town, Lahore">Bahria Town / Orchard, Lahore</option>
                    <option value="F-7 / Blue Area Islamabad">F-7 / Blue Area, Islamabad</option>
                    <option value="Dubai / Overseas">Dubai / UAE / Overseas</option>
                  </select>
                </div>

                {/* Turnkey Warranty Badge */}
                <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                  <ShieldCheck className="w-8 h-8 text-gray-300 shrink-0" />
                  <div className="text-[11px] text-gray-300">
                    <span className="font-semibold text-white block">10-Year Structural Guarantee</span>
                    Includes PCATP certified drawings & daily site logs.
                  </div>
                </div>

              </div>

            </div>

            {/* Live Result Summary Box */}
            <div className="lg:col-span-5 bg-[#181B20] border border-[#333A48] rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-center space-y-6 shadow-xl">
              
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-widest text-gray-400 block font-medium">
                  Estimated Total Investment
                </span>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  PKR {totalEstimatePKR}
                </div>
                <p className="text-xs text-gray-400 font-light">
                  Based on <strong className="text-white">{sqft.toLocaleString()} sq.ft.</strong> under {currentPackage.name} rate ({currentPackage.pricePerSqFt}) in {selectedCity}.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#333A48]">
                <button
                  onClick={handleSendCalculatorQuote}
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-transform transform active:scale-95 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Quote to WhatsApp</span>
                </button>

                <a
                  href={`tel:${SITE_CONFIG.phoneNumber}`}
                  className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-colors block"
                >
                  <span>Discuss With Architect ({SITE_CONFIG.displayPhone})</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
