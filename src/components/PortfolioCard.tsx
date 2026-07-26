import React from 'react';
import { Bookmark, Eye, MapPin, MessageCircle, Image as ImageIcon } from 'lucide-react';
import { Project } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { LazyImage } from './LazyImage';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface PortfolioCardProps {
  project: Project;
  isSaved: boolean;
  onSelectProject: (project: Project) => void;
  onToggleSave: (projectId: string) => void;
  index: number;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  project,
  isSaved,
  onSelectProject,
  onToggleSave,
  index,
}) => {
  const [cardRef, isVisible] = useIntersectionObserver<HTMLDivElement>({
    rootMargin: '100px 0px',
    threshold: 0.05,
    freezeOnceVisible: true,
  });

  return (
    <div
      ref={cardRef}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
      className={`group bg-white dark:bg-[#232830] text-[#181B20] dark:text-white border border-gray-200 dark:border-[#333A48] hover:border-[#c5a059] rounded-2xl overflow-hidden transition-all duration-700 shadow-md hover:shadow-2xl flex flex-col justify-between transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Hero Image Frame */}
      <div className="relative h-72 overflow-hidden bg-black cursor-pointer" onClick={() => onSelectProject(project)}>
        <LazyImage
          src={project.heroImage}
          alt={project.title}
          preset="card"
          containerClassName="w-full h-full"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Bar Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-[#c5a059]/40 text-[#c5a059] text-[10px] uppercase tracking-widest font-bold rounded-full">
            {project.marlaSize || project.category}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(project.id);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
              isSaved ? 'bg-[#c5a059] text-black font-bold' : 'bg-black/60 text-white hover:bg-white/30'
            }`}
            title={isSaved ? "Saved in Moodboard" : "Save to Moodboard"}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <button className="px-5 py-2.5 bg-[#161e2f] border border-[#c5a059] text-[#c5a059] font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-2 shadow-2xl">
            <Eye className="w-4 h-4" />
            <span>View Monograph</span>
          </button>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-6 space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-[#c5a059] font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{project.location}, {project.city}</span>
          </div>

          <h3
            onClick={() => onSelectProject(project)}
            className="font-serif-luxury text-xl font-bold text-[#181B20] dark:text-white group-hover:text-[#c5a059] transition-colors cursor-pointer"
          >
            {project.title}
          </h3>

          <p className="text-xs text-gray-700 dark:text-gray-300 font-normal leading-relaxed line-clamp-2">
            {project.subtitle}
          </p>
        </div>

        {/* ROW IMAGES DISPLAY (Gallery Thumbnails with CDN Optimization) */}
        <div className="space-y-1.5 pt-2 border-t border-gray-200 dark:border-[#333A48]">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <ImageIcon className="w-3 h-3 text-[#c5a059]" />
              <span>Project Gallery Renders ({project.gallery.length} Images)</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {project.gallery.slice(0, 3).map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => onSelectProject(project)}
                className="h-16 rounded-lg overflow-hidden bg-black border border-gray-200 dark:border-[#333A48] cursor-pointer hover:border-[#c5a059] transition-all group/img relative"
              >
                <LazyImage
                  src={imgUrl}
                  alt={`${project.title} render ${idx + 1}`}
                  preset="thumb"
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
          <span className="text-[#c5a059] font-bold">{project.specs.estimatedValuePKR}</span>
        </div>

        {/* Direct WhatsApp Inquiry for This Project */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onSelectProject(project)}
            className="flex-1 py-2.5 bg-[#161e2f] hover:bg-[#1a2337] border border-[#c5a059]/30 text-white text-xs rounded-lg font-bold transition-colors shadow-sm"
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
};
