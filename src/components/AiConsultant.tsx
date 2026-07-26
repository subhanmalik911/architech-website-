import React, { useState } from 'react';
import { Sparkles, Compass, Loader2, CheckCircle2, Lightbulb, Layers, ShieldCheck } from 'lucide-react';
import { SpatialEstimateResult } from '../types';
import { ARCHITECTURAL_STYLES } from '../data/portfolioData';

interface AiConsultantProps {
  theme?: 'dark' | 'light';
}

export const AiConsultant: React.FC<AiConsultantProps> = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';
  const [propertyType, setPropertyType] = useState('Luxury Private Villa');
  const [sqft, setSqft] = useState(7500);
  const [selectedStyle, setSelectedStyle] = useState('Organic Warm Modernism');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([
    'Roman Travertine',
    'Brushed Champagne Bronze',
    'Smoked European Oak'
  ]);
  const [location, setLocation] = useState('DHA Phase 6, Lahore');
  const [userPrompt, setUserPrompt] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpatialEstimateResult | null>(null);

  const availableMaterials = [
    'Roman Travertine',
    'Calacatta Viola Marble',
    'Brushed Champagne Bronze',
    'Smoked European Oak',
    'Charred Yakisugi Cedar',
    'Board-Formed Concrete',
    'Nero Marquina Marble',
    'Anodized Titanium',
    'Low-E Electrochromic Glass'
  ];

  const toggleMaterial = (mat: string) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/ai-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyType,
          sqft,
          style: selectedStyle,
          materials: selectedMaterials,
          location,
          userPrompt
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error generating AI consultation:', err);
      setResult({
        aiDesignAdvice: `For your ${sqft} sq.ft. ${propertyType} in ${location}, an architectural concept anchored in ${selectedStyle} will synthesize grand double-height volumes with low-glare natural lighting. We recommend framing structural glass with ${selectedMaterials.join(', ')}.`,
        recommendedMaterials: selectedMaterials,
        lightingStrategy: 'Circadian indirect LED channels paired with museum-grade spotlights for textured stone wall washing.',
        keyArchitecturalFocus: 'Cantilevered infinity outdoor terrace with acoustic glass barriers.',
        estimatedBudgetRange: `PKR ${Math.round((sqft * 7500) / 1000000)}M - PKR ${Math.round((sqft * 9500) / 1000000)}M (Turnkey Execution)`
      });
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (presetName: string) => {
    if (presetName === 'miami') {
      setPropertyType('Oceanfront Sky Penthouse');
      setSqft(9200);
      setSelectedStyle('Organic Warm Modernism');
      setSelectedMaterials(['Roman Travertine', 'Brushed Champagne Bronze', 'Low-E Electrochromic Glass']);
      setLocation('DHA Phase 8, Lahore');
      setUserPrompt('Need 18ft ceilings, private rooftop plunge pool, and motorized acoustic bronze louvers.');
    } else if (presetName === 'kyoto') {
      setPropertyType('Hillside Bio-Climatic Residence');
      setSqft(6500);
      setSelectedStyle('Neo-Japandi & Zen Timber');
      setSelectedMaterials(['Charred Yakisugi Cedar', 'Smoked European Oak', 'Board-Formed Concrete']);
      setLocation('Sector F-7, Islamabad');
      setUserPrompt('Require geothermal heated plunge pool integration and Shoji glass sliding panels.');
    } else if (presetName === 'alps') {
      setPropertyType('Cantilevered Cliffside Sanctuary');
      setSqft(8800);
      setSelectedStyle('Contemporary Alpine Brutalism');
      setSelectedMaterials(['Anodized Titanium', 'Board-Formed Concrete', 'Calacatta Viola Marble']);
      setLocation('Gulberg III, Lahore');
      setUserPrompt('Need radiant heated stone terraces and 35ft glass box projection overlooking lush gardens.');
    }
  };

  return (
    <section id="ai-advisor" className={`py-24 relative border-t transition-colors ${
      isDark ? 'bg-[#181B20] border-[#333A48] text-white' : 'bg-[#FAF9F5] border-gray-200 text-[#181B20]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-300 dark:border-white/20 bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-200 text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>AI Spatial Architecture Advisor</span>
          </div>
          <h2 className={`font-serif-luxury text-3xl sm:text-5xl font-bold leading-tight ${
            isDark ? 'text-white' : 'text-[#181B20]'
          }`}>
            Generate Your Custom Architectural Concept & Budget Matrix.
          </h2>
          <p className={`text-sm font-light leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Specify your site location, volumetric square footage, material preferences, and architectural vision to receive an instant bespoke brief.
          </p>
        </div>

        {/* Presets Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <span className="text-xs uppercase tracking-widest opacity-80 font-semibold mr-2">Try Inspiration Presets:</span>
          <button
            onClick={() => applyPreset('miami')}
            className="px-3.5 py-1.5 text-xs rounded-lg transition-all border bg-white dark:bg-[#232830] border-gray-200 dark:border-[#333A48] hover:border-[#2D3436] text-gray-800 dark:text-gray-200 shadow-sm"
          >
            DHA Lahore 1-Kanal Villa
          </button>
          <button
            onClick={() => applyPreset('kyoto')}
            className="px-3.5 py-1.5 text-xs rounded-lg transition-all border bg-white dark:bg-[#232830] border-gray-200 dark:border-[#333A48] hover:border-[#2D3436] text-gray-800 dark:text-gray-200 shadow-sm"
          >
            Islamabad F-7 Hillside Estate
          </button>
          <button
            onClick={() => applyPreset('alps')}
            className="px-3.5 py-1.5 text-xs rounded-lg transition-all border bg-white dark:bg-[#232830] border-gray-200 dark:border-[#333A48] hover:border-[#2D3436] text-gray-800 dark:text-gray-200 shadow-sm"
          >
            Gulberg Commercial Glass Tower
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Controls */}
          <div className={`lg:col-span-6 border p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl ${
            isDark
              ? 'bg-[#232830] border-[#333A48]'
              : 'bg-white border-gray-200'
          }`}>
            <form onSubmit={handleGenerate} className="space-y-6">
              
              {/* Property Type & SqFt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs opacity-80 font-medium block">Property Classification</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className={`w-full text-xs p-3 rounded-xl outline-none border ${
                      isDark
                        ? 'bg-[#181B20] border-[#333A48] focus:border-white text-white'
                        : 'bg-gray-50 border-gray-200 focus:border-[#2D3436] text-black'
                    }`}
                  >
                    <option value="Luxury Private Villa">Luxury Private Villa</option>
                    <option value="1 Kanal Smart Residence">1 Kanal Smart Residence</option>
                    <option value="2 Kanal Executive Estate">2 Kanal Executive Estate</option>
                    <option value="Commercial Plaza & Office">Commercial Plaza & Office</option>
                    <option value="Boutique Cafe & Restaurant">Boutique Cafe & Restaurant</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs opacity-80 font-medium flex justify-between">
                    <span>Target Area (SQFT)</span>
                    <span className="text-[#2D3436] dark:text-white font-bold">{sqft.toLocaleString()} SQFT</span>
                  </label>
                  <input
                    type="range"
                    min={2000}
                    max={50000}
                    step={500}
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full accent-[#2D3436] cursor-pointer mt-2"
                  />
                </div>
              </div>

              {/* Architectural Style */}
              <div className="space-y-2">
                <label className="text-xs opacity-80 font-medium block">Architectural Aesthetic Philosophy</label>
                <div className="grid grid-cols-1 gap-2">
                  {ARCHITECTURAL_STYLES.map((style) => (
                    <button
                      type="button"
                      key={style.id}
                      onClick={() => setSelectedStyle(style.name)}
                      className={`p-3 text-left border rounded-xl transition-all flex items-start justify-between ${
                        selectedStyle === style.name
                          ? isDark
                            ? 'bg-[#181B20] border-white text-white'
                            : 'bg-[#F2F0EB] border-[#2D3436] text-black font-semibold'
                          : isDark
                            ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:text-black'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-semibold block">{style.name}</span>
                        <span className="text-[10px] font-light opacity-70 block mt-0.5">{style.description}</span>
                      </div>
                      {selectedStyle === style.name && (
                        <CheckCircle2 className="w-4 h-4 text-[#2D3436] dark:text-white shrink-0 mt-0.5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selection Chips */}
              <div className="space-y-2">
                <label className="text-xs opacity-80 font-medium block">Select Preferred Materials</label>
                <div className="flex flex-wrap gap-2">
                  {availableMaterials.map((mat) => {
                    const active = selectedMaterials.includes(mat);
                    return (
                      <button
                        type="button"
                        key={mat}
                        onClick={() => toggleMaterial(mat)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-all border ${
                          active
                            ? 'bg-[#2D3436] text-white font-semibold border-[#2D3436]'
                            : isDark
                              ? 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                              : 'bg-gray-100 text-gray-700 border-gray-200 hover:text-black'
                        }`}
                      >
                        {mat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location & Custom Notes */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs opacity-80 font-medium block">Site Location / City Context</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. DHA Phase 6 Lahore, F-7 Islamabad, Gulberg III"
                    className={`w-full text-xs p-3 rounded-xl outline-none border ${
                      isDark
                        ? 'bg-[#181B20] border-[#333A48] focus:border-white text-white'
                        : 'bg-gray-50 border-gray-200 focus:border-[#2D3436] text-black'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs opacity-80 font-medium block">Specific Requirements / Wishlist</label>
                  <textarea
                    rows={3}
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="e.g. Double height living room, swimming pool terrace, basement cinema room..."
                    className={`w-full text-xs p-3 rounded-xl outline-none border ${
                      isDark
                        ? 'bg-[#181B20] border-[#333A48] focus:border-white text-white'
                        : 'bg-gray-50 border-gray-200 focus:border-[#2D3436] text-black'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#2D3436] hover:bg-[#1E2325] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Spatial Concept...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Spatial Concept Brief</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Results Output Canvas */}
          <div className={`lg:col-span-6 border p-6 sm:p-8 rounded-2xl space-y-6 min-h-[580px] flex flex-col justify-between shadow-xl relative overflow-hidden ${
            isDark
              ? 'bg-[#232830] border-[#333A48] text-white'
              : 'bg-white border-gray-200 text-[#181B20]'
          }`}>
            
            {result ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-[#333A48]">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">
                      Generated Architectural Brief
                    </span>
                    <h3 className={`font-serif-luxury text-2xl font-bold mt-0.5 ${
                      isDark ? 'text-white' : 'text-[#181B20]'
                    }`}>
                      {propertyType} Concept
                    </h3>
                  </div>

                  <span className="px-3 py-1 bg-[#2D3436] text-white text-xs font-semibold rounded-lg">
                    {sqft.toLocaleString()} SQFT
                  </span>
                </div>

                {/* Estimated Budget Box */}
                <div className="p-4 bg-[#F2F0EB] dark:bg-[#181B20] border-l-4 border-[#2D3436] rounded-r-xl space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 block font-medium">
                    Turnkey Architectural & Interior Valuation Range
                  </span>
                  <span className={`font-serif-luxury text-2xl font-bold block ${
                    isDark ? 'text-white' : 'text-[#181B20]'
                  }`}>
                    {result.estimatedBudgetRange}
                  </span>
                </div>

                {/* AI Design Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-gray-500 font-semibold flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#2D3436] dark:text-white" />
                    <span>Spatial & Architectural Philosophy</span>
                  </h4>
                  <p className={`text-xs sm:text-sm font-light leading-relaxed whitespace-pre-line p-4 rounded-xl border ${
                    isDark
                      ? 'bg-[#181B20] border-[#333A48] text-gray-200'
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    {result.aiDesignAdvice}
                  </p>
                </div>

                {/* Lighting & Structural Focus */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl space-y-1 border ${
                    isDark ? 'bg-[#181B20] border-[#333A48]' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Lighting Strategy</span>
                    </span>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-light">{result.lightingStrategy}</p>
                  </div>

                  <div className={`p-4 rounded-xl space-y-1 border ${
                    isDark ? 'bg-[#181B20] border-[#333A48]' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Structural Highlight</span>
                    </span>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-light">{result.keyArchitecturalFocus}</p>
                  </div>
                </div>

                {/* Recommended Materials */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-gray-500 font-medium block">
                    Curated Materiality Pairing
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {result.recommendedMaterials.map((m, i) => (
                      <span key={i} className={`px-3 py-1 text-xs font-medium rounded-lg border ${
                        isDark
                          ? 'bg-[#181B20] border-[#333A48] text-white'
                          : 'bg-gray-100 border-gray-200 text-gray-800'
                      }`}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="my-auto text-center space-y-4 py-12">
                <Compass className="w-12 h-12 text-gray-400 mx-auto animate-spin-slow" />
                <h3 className={`font-serif-luxury text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-[#181B20]'
                }`}>Spatial Engine Ready</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Adjust parameter controls on the left or select an inspiration preset to generate a full spatial concept, lighting manifesto, and turnkey budget matrix.
                </p>
              </div>
            )}

            {result && (
              <div className="pt-4 border-t border-gray-200 dark:border-[#333A48] flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#2D3436] dark:text-white" />
                  MZ BUILT Certified Calculation
                </span>
                <a
                  href="#contact"
                  className="text-[#2D3436] dark:text-white hover:underline uppercase tracking-widest text-[11px] font-bold"
                >
                  Discuss With Principal Architect &rrarr;
                </a>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
