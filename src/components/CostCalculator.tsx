import React, { useState } from 'react';
import { Calculator, CheckCircle2, MessageCircle, Phone, Sparkles, Building2, Layers, DollarSign } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface CostCalculatorProps {
  isFullPage?: boolean;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ isFullPage = false }) => {
  const [plotSize, setPlotSize] = useState<'10marla' | '1kanal' | '2kanal' | 'custom'>('1kanal');
  const [customSqft, setCustomSqft] = useState<number>(6500);
  const [selectedPackage, setSelectedPackage] = useState<'grey' | 'turnkey' | 'design'>('turnkey');
  const [cityArea, setCityArea] = useState<string>('DHA Lahore / Raya');
  const [basement, setBasement] = useState<boolean>(false);

  // Sqft lookup per plot type
  const getSqft = () => {
    if (plotSize === '10marla') return 3800;
    if (plotSize === '1kanal') return basement ? 8500 : 6500;
    if (plotSize === '2kanal') return basement ? 14000 : 11000;
    return customSqft;
  };

  const sqftVal = getSqft();

  // Rates in PKR per sqft
  const rates = {
    grey: 2250,
    turnkey: 4850,
    design: 250
  };

  const currentRate = rates[selectedPackage];
  const totalCostPKR = sqftVal * currentRate;

  // Format PKR into Lakhs or Crores
  const formatPKR = (amount: number) => {
    if (amount >= 10000000) {
      const crore = (amount / 10000000).toFixed(2);
      return `PKR ${crore} Crore`;
    } else if (amount >= 100000) {
      const lakh = (amount / 100000).toFixed(2);
      return `PKR ${lakh} Lakh`;
    }
    return `PKR ${amount.toLocaleString()}`;
  };

  const handleWhatsAppQuote = () => {
    const text = `Assalam-o-Alaikum MZ BUILT, I used your website Cost Calculator:\n- Plot/Project: ${plotSize.toUpperCase()} (${sqftVal} sqft)\n- Location: ${cityArea}\n- Package: ${selectedPackage.toUpperCase()} (PKR ${currentRate}/sqft)\n- Estimated Cost: ${formatPKR(totalCostPKR)}\n\nPlease send me a detailed BOQ breakdown.`;
    window.open(`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="calculator" className={`${isFullPage ? 'pt-28 pb-24' : 'py-24'} bg-[#0b0c0e] border-t border-white/10 relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9E7B5B]/15 border border-[#9E7B5B]/30 rounded-full text-xs text-[#9E7B5B] font-bold uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
            <span>Pakistan Construction BOQ Estimator</span>
          </div>

          <h1 className={`font-serif-luxury ${isFullPage ? 'text-4xl sm:text-6xl' : 'text-3xl sm:text-5xl'} font-bold text-white`}>
            Construction Cost & BOQ Calculator
          </h1>

          <p className="text-sm sm:text-base text-gray-300 font-light">
            Estimate material & turnkey construction budget for plots in Lahore (DHA, Gulberg, Model Town, Bahria), Islamabad (F-7, E-11, CDA), and across Pakistan.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#12141a] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Plot Size Selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest text-[#9E7B5B] font-semibold block">
                1. Select Plot Size / Covered Area
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: '10marla', label: '10 Marla', sqft: '3,800 sq ft' },
                  { id: '1kanal', label: '1 Kanal', sqft: '6,500 sq ft' },
                  { id: '2kanal', label: '2 Kanal', sqft: '11,000 sq ft' },
                  { id: 'custom', label: 'Custom', sqft: 'Input sq ft' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPlotSize(item.id as any)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      plotSize === item.id
                        ? 'bg-[#9E7B5B] text-white border-[#9E7B5B] font-bold shadow-lg'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-[11px] opacity-80 font-light">{item.sqft}</div>
                  </button>
                ))}
              </div>

              {plotSize === 'custom' && (
                <div className="pt-2">
                  <label className="text-xs text-gray-400 block mb-1">Enter Total Covered Area (Sq Ft):</label>
                  <input
                    type="number"
                    value={customSqft}
                    onChange={(e) => setCustomSqft(Number(e.target.value))}
                    className="w-full bg-black/50 border border-white/20 p-3 rounded-md text-white font-mono text-sm focus:border-[#9E7B5B] outline-none"
                    placeholder="e.g. 5000"
                  />
                </div>
              )}

              {/* Basement Toggle Option */}
              <div className="pt-2 flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-md">
                <span className="text-xs text-gray-300 font-medium">Include Basement Floor Area (+2,000 sqft)?</span>
                <button
                  onClick={() => setBasement(!basement)}
                  className={`px-3 py-1 rounded-sm text-xs font-bold transition-colors ${
                    basement ? 'bg-emerald-500 text-black' : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {basement ? 'YES (Included)' : 'NO'}
                </button>
              </div>
            </div>

            {/* 2. Package Tier Selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest text-[#9E7B5B] font-semibold block">
                2. Select Construction & Design Package
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'grey', label: 'Grey Structure', rate: 'PKR 2,250/sqft', desc: 'Concrete, A+ Bricks, Steel, Piping' },
                  { id: 'turnkey', label: 'Turnkey Luxury', rate: 'PKR 4,850/sqft', desc: 'Imported Tiles, Solid Wood, Finished' },
                  { id: 'design', label: 'Design Only', rate: 'PKR 250/sqft', desc: '2D/3D BIM, Renders & Map Approval' }
                ].map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id as any)}
                    className={`p-3.5 rounded-lg border text-left transition-all ${
                      selectedPackage === pkg.id
                        ? 'bg-[#9E7B5B]/20 border-[#9E7B5B] text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-sm font-semibold text-white flex items-center justify-between">
                      <span>{pkg.label}</span>
                      {selectedPackage === pkg.id && <CheckCircle2 className="w-4 h-4 text-[#9E7B5B]" />}
                    </div>
                    <div className="text-xs text-[#9E7B5B] font-mono mt-1">{pkg.rate}</div>
                    <div className="text-[10px] text-gray-400 font-light mt-1">{pkg.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Location Dropdown */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#9E7B5B] font-semibold block">
                3. Housing Society / City Location
              </label>

              <select
                value={cityArea}
                onChange={(e) => setCityArea(e.target.value)}
                className="w-full bg-black/60 border border-white/15 p-3 rounded-md text-xs text-white outline-none focus:border-[#9E7B5B]"
              >
                <option value="DHA Lahore (Phase 1-9 & Raya)">DHA Lahore (Phase 1-9 & Raya Fairways)</option>
                <option value="Gulberg III / MM Alam Lahore">Gulberg III & MM Alam Road, Lahore</option>
                <option value="Model Town / Garden Town Lahore">Model Town & Garden Town, Lahore</option>
                <option value="Bahria Town & Lake City Lahore">Bahria Town & Lake City, Lahore</option>
                <option value="Islamabad Sector F-6, F-7, F-8, E-11">Islamabad (Sector F-6/7/8 & Margalla)</option>
                <option value="Rawalpindi & Bahria Town Islamabad">Rawalpindi & Bahria Town Islamabad</option>
                <option value="Other Societies across Pakistan">Other Societies across Pakistan</option>
              </select>
            </div>

          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#1a1c24] to-[#0e0f14] border border-[#9E7B5B]/40 rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs uppercase tracking-widest text-gray-400">Estimated Project BOQ</span>
                <Sparkles className="w-4 h-4 text-[#9E7B5B]" />
              </div>

              <div>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Estimated Total Investment</span>
                <div className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#9E7B5B] mt-1 font-mono">
                  {formatPKR(totalCostPKR)}
                </div>
                <p className="text-[11px] text-gray-400 font-light mt-1">
                  Based on ~{sqftVal.toLocaleString()} sq ft @ PKR {currentRate}/sq ft
                </p>
              </div>

              <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-gray-400">Selected Package:</span>
                  <span className="font-semibold text-white capitalize">{selectedPackage} Package</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Covered Area:</span>
                  <span className="font-semibold text-white font-mono">{sqftVal.toLocaleString()} Sq Ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="font-semibold text-white">{cityArea}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-md text-[11px] text-emerald-400 space-y-1">
                <p className="font-semibold">✓ Guaranteed Fixed Rate BOQ</p>
                <p className="font-light text-gray-300">Includes material testing, structural engineering drawings, and daily supervisor logs.</p>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleWhatsAppQuote}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest rounded-md transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Detailed BOQ on WhatsApp</span>
              </button>

              <a
                href={`tel:${SITE_CONFIG.phoneNumber}`}
                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#9E7B5B]" />
                <span>Call Senior Architect Now</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
