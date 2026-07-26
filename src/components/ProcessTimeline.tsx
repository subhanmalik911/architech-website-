import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { Compass, FileText, ArrowRight } from 'lucide-react';

interface ProcessTimelineProps {
  theme?: 'dark' | 'light';
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ theme = 'light' }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];
  const isDark = theme === 'dark';

  return (
    <section id="process" className={`py-24 relative border-t border-b transition-colors ${
      isDark ? 'bg-[#181B20] border-[#333A48] text-white' : 'bg-[#FAF9F5] border-gray-200 text-[#181B20]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-black dark:text-gray-300 text-xs uppercase tracking-[0.2em] font-bold">
            <Compass className="w-4 h-4 text-[#2D3436] dark:text-white" />
            <span>Uncompromising Design Journey</span>
          </div>
          <h2 className={`font-serif-luxury text-3xl sm:text-5xl font-bold leading-tight ${
            isDark ? 'text-white' : 'text-[#181B20]'
          }`}>
            From Blueprint Concept to Turnkey Mastery.
          </h2>
          <p className={`text-sm font-normal ${
            isDark ? 'text-gray-300' : 'text-black'
          }`}>
            Our four-phase architectural framework guarantees zero-tolerance structural precision and complete financial clarity.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {PROCESS_STEPS.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-5 rounded-2xl border text-left transition-all relative ${
                idx === activeStepIndex
                  ? isDark
                    ? 'bg-[#232830] border-white shadow-xl'
                    : 'bg-white border-[#2D3436] shadow-lg'
                  : isDark
                    ? 'bg-white/5 border-white/10 hover:border-white/30 text-gray-400'
                    : 'bg-gray-100 border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-serif-luxury text-2xl font-bold ${
                  idx === activeStepIndex ? 'text-[#2D3436] dark:text-white' : 'text-gray-400'
                }`}>
                  {step.number}
                </span>
                <span className="text-[10px] uppercase tracking-widest opacity-70 font-medium">{step.duration}</span>
              </div>
              <h3 className={`text-xs uppercase tracking-wider font-semibold line-clamp-1 ${
                idx === activeStepIndex
                  ? isDark ? 'text-white' : 'text-[#181B20]'
                  : 'opacity-80'
              }`}>
                {step.title}
              </h3>
              {idx === activeStepIndex && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2D3436] dark:bg-white rounded-b-2xl" />
              )}
            </button>
          ))}
        </div>

        {/* Active Step Details Canvas */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border p-6 sm:p-10 rounded-2xl shadow-xl ${
          isDark
            ? 'bg-[#232830] border-[#333A48] text-white'
            : 'bg-white border-gray-200 text-[#181B20]'
        }`}>
          
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className={`text-xs uppercase tracking-[0.25em] ${isDark ? 'text-gray-400' : 'text-black'} font-bold block`}>
                Phase {activeStep.number} • {activeStep.duration}
              </span>
              <h3 className={`font-serif-luxury text-3xl sm:text-4xl font-bold ${
                isDark ? 'text-white' : 'text-[#181B20]'
              }`}>
                {activeStep.title}
              </h3>
              <p className={`text-xs uppercase tracking-widest font-semibold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                {activeStep.subtitle}
              </p>
            </div>

            <p className={`text-sm font-normal leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-black'
            }`}>
              {activeStep.description}
            </p>

            <div className={`p-4 border rounded-xl space-y-2 ${
              isDark
                ? 'bg-[#181B20] border-[#333A48]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#2D3436] dark:text-white font-bold">
                <FileText className="w-4 h-4" />
                <span>Primary Deliverable</span>
              </div>
              <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-black'}`}>{activeStep.keyDeliverable}</p>
            </div>

            {/* Next Step Trigger */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs opacity-60">Step {activeStepIndex + 1} of 4</span>
              <button
                onClick={() => setActiveStepIndex((prev) => (prev + 1) % PROCESS_STEPS.length)}
                className="text-xs text-[#2D3436] dark:text-white hover:opacity-80 font-bold uppercase tracking-widest flex items-center gap-2 group"
              >
                <span>Advance to Next Phase</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 dark:border-[#333A48] shadow-2xl">
              <img
                src={activeStep.image}
                alt={activeStep.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur-md border border-white/15 text-xs text-gray-300 rounded-xl">
                MZ BUILT Architectural Quality Standard 2026
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
