import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sliders, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface BeforeAfterSliderProps {
  projects: Project[];
  theme?: 'dark' | 'light';
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ projects, theme = 'light' }) => {
  const isDark = theme === 'dark';

  // Filter projects with beforeAfter data
  const comparisonProjects = projects.filter((p) => p.beforeAfter);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    comparisonProjects[0]?.id || projects[0]?.id
  );
  
  const currentProject = comparisonProjects.find((p) => p.id === selectedProjectId) || comparisonProjects[0];
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  // Global listener while dragging to handle cursor leaving the box seamlessly
  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
      if (clientX !== undefined) {
        handleMove(clientX);
      }
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchmove', onPointerMove);
    window.addEventListener('touchend', onPointerUp);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [isDragging, handleMove]);

  if (!currentProject || !currentProject.beforeAfter) return null;

  const { beforeImage, afterImage, beforeLabel, afterLabel } = currentProject.beforeAfter;

  return (
    <section id="before-after" className={`py-24 relative border-t border-b transition-colors ${
      isDark ? 'bg-[#161e2f] border-[#2d3436] text-white' : 'bg-[#FAF9F5] border-gray-200 text-[#161e2f]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#c5a059] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              <Sliders className="w-4 h-4 text-[#c5a059]" />
              <span>Transformation Monograph</span>
            </div>
            <h2 className={`font-serif-luxury text-3xl sm:text-5xl font-bold leading-tight ${
              isDark ? 'text-white' : 'text-[#161e2f]'
            }`}>
              From Raw Concept to Architectural Mastery.
            </h2>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {comparisonProjects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${
                  selectedProjectId === proj.id
                    ? 'bg-[#c5a059] text-black font-bold shadow-md'
                    : isDark
                      ? 'bg-[#1f293d] text-gray-400 hover:text-white border border-[#2d3436]'
                      : 'bg-white text-gray-700 hover:text-black border border-gray-200'
                }`}
              >
                {proj.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Slider Display */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={(e) => {
                setIsDragging(true);
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                setIsDragging(true);
                if (e.touches[0]) handleMove(e.touches[0].clientX);
              }}
              className="relative h-[380px] sm:h-[500px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-[#c5a059]/30 shadow-2xl group touch-none"
            >
              {/* After Image (Full Background) */}
              <img
                src={afterImage}
                alt={afterLabel}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              />

              {/* Before Image (Overlay clipped precisely with CSS clip-path inset) */}
              <img
                src={beforeImage}
                alt={beforeLabel}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              />

              {/* Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.8)] z-10 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Draggable Handle Badge */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#161e2f] border-2 border-[#c5a059] flex items-center justify-center text-[#c5a059] shadow-2xl group-hover:scale-110 transition-transform">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 bg-black/80 backdrop-blur-md border border-[#c5a059]/40 text-[10px] uppercase tracking-widest text-[#c5a059] rounded-full font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>{beforeLabel}</span>
              </div>

              <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 bg-[#161e2f] border border-[#c5a059]/40 text-[#c5a059] text-[10px] uppercase tracking-widest font-bold rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{afterLabel}</span>
              </div>

              {/* Instructions Prompt */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 bg-black/80 backdrop-blur-md border border-white/20 text-gray-200 text-xs tracking-wider rounded-full pointer-events-none flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Drag slider horizontally to compare raw space vs completed luxury design</span>
              </div>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
                {currentProject.category} • {currentProject.location}
              </span>
              <h3 className={`font-serif-luxury text-2xl sm:text-3xl font-bold ${
                isDark ? 'text-white' : 'text-[#161e2f]'
              }`}>
                {currentProject.title}
              </h3>
              <p className={`text-sm leading-relaxed font-light ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {currentProject.description}
              </p>
            </div>

            {/* Key Innovations */}
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-[#2d3436]">
              <h4 className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">
                Structural & Architectural Innovations
              </h4>
              <ul className="space-y-2">
                {currentProject.keyFeatures.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Materials */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-2">
                Primary Materials
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentProject.specs.materials.map((mat, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 text-[11px] rounded-lg border ${
                      isDark
                        ? 'bg-[#1f293d] border-[#2d3436] text-gray-200'
                        : 'bg-white border-gray-200 text-gray-800'
                    }`}
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
