import React, { useState } from 'react';
import { Bookmark, Eye, MapPin, Sparkles, MessageCircle, Image as ImageIcon } from 'lucide-react';
import { Project } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { LazyImage } from './LazyImage';

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

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isSaved = savedProjectIds.includes(project.id);

            return (
              <div
                key={project.id}
                className="group bg-white dark:bg-[#232830] text-[#181B20] dark:text-white border border-gray-200 dark:border-[#333A48] hover:border-[#2D3436] rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between"
              >
                
                {/* Hero Image Frame */}
                <div className="relative h-72 overflow-hidden bg-black cursor-pointer" onClick={() => onSelectProject(project)}>
                  <LazyImage
                    src={project.heroImage}
                    alt={project.title}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold rounded-full">
                      {project.marlaSize || project.category}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(project.id);
                      }}
                      className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                        isSaved ? 'bg-[#2D3436] text-white' : 'bg-black/60 text-white hover:bg-white/30'
                      }`}
                      title={isSaved ? "Saved in Moodboard" : "Save to Moodboard"}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <button className="px-5 py-2.5 bg-[#2D3436] hover:bg-[#1E2325] text-white font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-2 shadow-2xl">
                      <Eye className="w-4 h-4" />
                      <span>View Monograph</span>
                    </button>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-800 dark:text-gray-200 font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.location}, {project.city}</span>
                    </div>

                    <h3
                      onClick={() => onSelectProject(project)}
                      className="font-serif-luxury text-xl font-bold text-[#181B20] dark:text-white group-hover:text-black dark:group-hover:text-gray-300 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs text-gray-900 dark:text-gray-300 font-normal leading-relaxed line-clamp-2">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* ROW IMAGES DISPLAY (Gallery Thumbnails) */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-200 dark:border-[#333A48]">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1 text-gray-800 dark:text-gray-200">
                        <ImageIcon className="w-3 h-3" />
                        <span>Project Gallery Renders ({project.gallery.length} Images)</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {project.gallery.slice(0, 3).map((imgUrl, idx) => (
                        <div
                          key={idx}
                          onClick={() => onSelectProject(project)}
                          className="h-16 rounded-lg overflow-hidden bg-black border border-gray-200 dark:border-[#333A48] cursor-pointer hover:border-[#2D3436] transition-all group/img relative"
                        >
                          <LazyImage
                            src={imgUrl}
                            alt={`${project.title} render ${idx + 1}`}
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Specs */}
                  <div className="pt-2 flex items-center justify-between text-xs text-gray-800 dark:text-gray-200 font-mono font-bold">
                    <span>{project.sqft.toLocaleString()} Sq Ft</span>
                    <span>{project.style}</span>
                    <span className="text-[#2D3436] dark:text-white font-bold">{project.specs.estimatedValuePKR}</span>
                  </div>

                  {/* Direct WhatsApp Inquiry for This Project */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex-1 py-2.5 bg-[#2D3436] hover:bg-[#1E2325] text-white text-xs rounded-lg font-bold transition-colors shadow-sm"
                    >
                      Case Study & Plans
                    </button>

                    <a
                      href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(`Assalam-o-Alaikum MZ BUILT, I am interested in project: ${project.title} (${project.location}). Please share details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-black rounded-lg transition-colors shadow-sm"
                      title="Inquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
