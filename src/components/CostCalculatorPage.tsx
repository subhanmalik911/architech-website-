import React, { useState } from 'react';
import { Calculator, CheckCircle2, MessageCircle, Phone, Sparkles, Building2, Layers, ArrowLeft, Download, FileText, HelpCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface CostCalculatorPageProps {
  onNavigateHome: () => void;
  onOpenConsultation: () => void;
  theme?: 'dark' | 'light';
}

export const CostCalculatorPage: React.FC<CostCalculatorPageProps> = ({ onNavigateHome, onOpenConsultation, theme = 'light' }) => {
  const [plotSize, setPlotSize] = useState<'10marla' | '1kanal' | '2kanal' | 'custom'>('1kanal');
  const [customSqft, setCustomSqft] = useState<number>(6500);
  const [selectedPackage, setSelectedPackage] = useState<'grey' | 'turnkey' | 'design'>('turnkey');
  const [cityArea, setCityArea] = useState<string>('DHA Lahore (Phase 1-9 & Raya)');
  const [basement, setBasement] = useState<boolean>(false);

  const isDark = theme === 'dark';

  // Sqft calculation
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

  // BOQ Itemized Estimates
  const boqBreakdown = [
    { item: 'A+ Brickwork & Concrete Foundation', percent: '28%', amount: Math.round(totalCostPKR * 0.28) },
    { item: 'Steel Reinforcement (60-Grade Deformed Bar)', percent: '18%', amount: Math.round(totalCostPKR * 0.18) },
    { item: 'Imported Porcelain Tiles & Marble Flooring', percent: '22%', amount: Math.round(totalCostPKR * 0.22) },
    { item: 'Solid Ash / Walnut Doors & Wardrobes', percent: '14%', amount: Math.round(totalCostPKR * 0.14) },
    { item: 'Electrical Wiring (PPR/PVC & Grohe/Kohler Sanitary)', percent: '12%', amount: Math.round(totalCostPKR * 0.12) },
    { item: 'Site Supervision, Testing & Map Approval', percent: '6%', amount: Math.round(totalCostPKR * 0.06) }
  ];

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
    const text = `Assalam-o-Alaikum MZ BUILT, I used your Construction BOQ Calculator:\n- Plot Size: ${plotSize.toUpperCase()} (${sqftVal.toLocaleString()} sqft)\n- Location: ${cityArea}\n- Package: ${selectedPackage.toUpperCase()} (PKR ${currentRate}/sqft)\n- Total Estimated BOQ: ${formatPKR(totalCostPKR)}\n\nPlease send me a detailed PDF BOQ breakdown for my plot.`;
    window.open(`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`min-h-screen pt-28 pb-24 ${isDark ? 'bg-[#121214] text-[#e2e4e9]' : 'bg-[#faf8f5] text-[#1a1a1a]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link & Header */}
        <button
          onClick={onNavigateHome}
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-gray-400 hover:text-white' : 'text-[#8c6b47] hover:text-[#1a1a1a]'} transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>

        <div className={`p-8 sm:p-12 rounded-3xl border ${isDark ? 'bg-[#18181b] border-[#8c6b47]/30' : 'bg-[#ede8e1] border-[#8c6b47]/20'} shadow-xl space-y-4`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8c6b47]/15 border border-[#8c6b47]/30 rounded-full text-xs text-[#8c6b47] font-bold uppercase tracking-widest">
            <Calculator className="w-4 h-4" />
            <span>Pakistan Construction BOQ Estimator</span>
          </div>

          <h1 className={`font-serif-luxury text-3xl sm:text-5xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            PKR Construction Cost Calculator
          </h1>

          <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-[#4a4a4a]'} font-light max-w-3xl leading-relaxed`}>
            Calculate current grey structure, turnkey luxury, and BIM design rates for 10 Marla, 1 Kanal, 2 Kanal, and commercial plots across DHA Lahore, Gulberg III, Sector F-7 Islamabad, and Bahria Town.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl border p-6 sm:p-10 ${
          isDark ? 'bg-[#18181b] border-white/10' : 'bg-white border-[#8c6b47]/20 shadow-xl'
        }`}>
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Plot Selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest text-[#8c6b47] font-bold block">
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
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      plotSize === item.id
                        ? 'bg-[#8c6b47] text-white border-[#8c6b47] font-bold shadow-md'
                        : isDark
                          ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          : 'bg-[#faf8f5] border-black/10 text-[#1a1a1a] hover:border-[#8c6b47]'
                    }`}
                  >
                    <div className="text-sm font-bold">{item.label}</div>
                    <div className="text-[11px] opacity-80 font-light">{item.sqft}</div>
                  </button>
                ))}
              </div>

              {plotSize === 'custom' && (
                <div className="pt-2">
                  <label className="text-xs font-semibold block mb-1">Enter Total Covered Area (Sq Ft):</label>
                  <input
                    type="number"
                    value={customSqft}
                    onChange={(e) => setCustomSqft(Number(e.target.value))}
                    className={`w-full p-3 rounded-lg border text-sm font-mono outline-none ${
                      isDark ? 'bg-black/50 border-white/20 text-white' : 'bg-[#faf8f5] border-black/20 text-[#1a1a1a]'
                    } focus:border-[#8c6b47]`}
                    placeholder="e.g. 5000"
                  />
                </div>
              )}

              {/* Basement Toggle */}
              <div className={`pt-2 flex items-center justify-between p-3.5 rounded-xl border ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-[#faf8f5] border-black/10'
              }`}>
                <span className="text-xs font-semibold">Include Basement Floor (+2,000 sqft)?</span>
                <button
                  onClick={() => setBasement(!basement)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    basement ? 'bg-[#226848] text-white' : isDark ? 'bg-white/10 text-gray-400' : 'bg-black/10 text-gray-600'
                  }`}
                >
                  {basement ? 'YES (Included)' : 'NO'}
                </button>
              </div>
            </div>

            {/* 2. Package Tier Selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-widest text-[#8c6b47] font-bold block">
                2. Select Construction Package
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'grey', label: 'Grey Structure', rate: 'PKR 2,250/sqft', desc: 'Concrete, A+ Bricks, Steel, Piping' },
                  { id: 'turnkey', label: 'Turnkey Luxury', rate: 'PKR 4,850/sqft', desc: 'Imported Tiles, Solid Wood, Finished' },
                  { id: 'design', label: 'Design BIM', rate: 'PKR 250/sqft', desc: '2D/3D BIM, Renders & Map Approval' }
                ].map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedPackage === pkg.id
                        ? 'bg-[#8c6b47]/15 border-[#8c6b47] text-[#8c6b47] shadow-sm'
                        : isDark
                          ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          : 'bg-[#faf8f5] border-black/10 text-gray-700 hover:border-[#8c6b47]'
                    }`}
                  >
                    <div className="text-sm font-bold flex items-center justify-between">
                      <span>{pkg.label}</span>
                      {selectedPackage === pkg.id && <CheckCircle2 className="w-4 h-4 text-[#8c6b47]" />}
                    </div>
                    <div className="text-xs font-mono font-bold mt-1 text-[#8c6b47]">{pkg.rate}</div>
                    <div className="text-[10px] opacity-80 font-light mt-1">{pkg.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Location Dropdown */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#8c6b47] font-bold block">
                3. Housing Society / City Location
              </label>

              <select
                value={cityArea}
                onChange={(e) => setCityArea(e.target.value)}
                className={`w-full p-3.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black/60 border-white/20 text-white' : 'bg-[#faf8f5] border-black/15 text-[#1a1a1a]'
                } focus:border-[#8c6b47] font-medium`}
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
          <div className={`lg:col-span-5 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
            isDark ? 'bg-[#121214] border-[#8c6b47]/40' : 'bg-[#ede8e1] border-[#8c6b47]/30 shadow-lg'
          }`}>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
                <span className="text-xs uppercase tracking-widest font-bold">Estimated BOQ Investment</span>
                <Sparkles className="w-4 h-4 text-[#8c6b47]" />
              </div>

              <div>
                <span className="text-[11px] opacity-70 uppercase tracking-wider block font-medium">Estimated Total Investment</span>
                <div className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#8c6b47] mt-1 font-mono">
                  {formatPKR(totalCostPKR)}
                </div>
                <p className="text-[11px] opacity-70 font-light mt-1">
                  Based on ~{sqftVal.toLocaleString()} sq ft @ PKR {currentRate}/sq ft
                </p>
              </div>

              {/* BOQ Breakdown Table */}
              <div className="space-y-2 pt-3 border-t border-black/10 dark:border-white/10">
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#8c6b47] block">
                  Estimated Itemized BOQ Distribution
                </span>
                <div className="space-y-1.5 text-xs">
                  {boqBreakdown.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px]">
                      <span className="opacity-80 truncate max-w-[200px]">{item.item}</span>
                      <span className="font-mono font-semibold">{formatPKR(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleWhatsAppQuote}
                className="w-full py-3.5 bg-[#226848] hover:bg-[#1b543a] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Get Detailed BOQ on WhatsApp</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="w-full py-3 bg-[#8c6b47] hover:bg-[#735637] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Schedule Architect BOQ Review</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
