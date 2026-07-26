import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Project } from '../types';
import { PortfolioCard } from './PortfolioCard';

interface PortfolioProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  savedProjectIds: string[];
  onToggleSave: (projectId: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  projects,
  onSelectProject,
  savedProjectIds,
  onToggleSave
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const categories = [
    'All',
    'Luxury Residential',
    'Commercial & Retail',
    'Interior Architecture',
    'Restoration & Renovation',
    'Landscape & Pool',
    'Hospitality & Cafes'
  ];

  const cities = ['All', 'Lahore', 'Islamabad', 'Dubai'];

  const filteredProjects = projects.filter((p) => {
    const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
    const cityMatch = selectedCity === 'All' || p.city === selectedCity;
    return categoryMatch && cityMatch;
  });

  return (
    <section id="portfolio" className="py-24 relative border-t border-gray-200 dark:border-[#333A48] bg-white dark:bg-[#181B20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-full text-xs text-gray-800 dark:text-gray-200 font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Monograph Portfolio</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#181B20] dark:text-white">
              Architectural Works & Estates
            </h2>

            <p className="text-sm sm:text-base text-gray-900 dark:text-gray-300 font-normal">
              Explore 1 Kanal & 2 Kanal turnkey residences, commercial plazas, and penthouse interiors in Lahore, Islamabad, and Dubai.
            </p>
          </div>

          {/* City Quick Filter Badges */}
          <div className="flex items-center gap-2 bg-[#F2F0EB] dark:bg-[#232830] p-1.5 rounded-xl border border-gray-300 dark:border-[#333A48] self-start md:self-auto">
            <span className="text-[11px] uppercase tracking-wider text-gray-800 dark:text-gray-300 px-2 font-bold">City:</span>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCity === city
                    ? 'bg-[#2D3436] text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar border-b border-gray-200 dark:border-[#333A48]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2D3436] text-white shadow-md'
                  : 'bg-gray-100 dark:bg-[#232830] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-[#333A48] hover:border-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid with Intersection Observer Lazy-Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={index}
              isSaved={savedProjectIds.includes(project.id)}
              onSelectProject={onSelectProject}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
