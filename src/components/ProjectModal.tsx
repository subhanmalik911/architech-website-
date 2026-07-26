import React, { useState } from 'react';
import { X, Bookmark, CheckCircle2, MessageCircle, Box } from 'lucide-react';
import { Project } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { LazyImage } from './LazyImage';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (projectId: string) => void;
  onOpenConsultationWithProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  isSaved,
  onToggleSave,
  onOpenConsultationWithProject
}) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'gallery' | '3d' | 'beforeafter' | 'floorplan'>('gallery');
  const [selectedImage, setSelectedImage] = useState<string>(project.heroImage);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      
      <div className="relative w-full max-w-6xl bg-[#181B20] border border-[#333A48] rounded-2xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col text-white">
        
        {/* Top Header Navigation */}
        <div className="p-4 sm:p-6 bg-[#232830] border-b border-[#333A48] flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold block">
              {project.category} • {project.marlaSize || `${project.sqft} Sq Ft`}
            </span>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>{project.title}</span>
              <span className="text-xs font-normal text-gray-400 font-sans">({project.location}, {project.city})</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleSave(project.id)}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-colors ${
                isSaved ? 'bg-[#2D3436] text-white border-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">{isSaved ? 'Saved in Moodboard' : 'Save Villa'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal View Mode Tabs */}
        <div className="px-4 sm:px-6 bg-[#181B20] border-b border-[#333A48] flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'gallery' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            4K Gallery & Renders
          </button>

          <button
            onClick={() => setActiveTab('3d')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === '3d' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-white" />
            <span>Interactive 3D Walkthrough</span>
          </button>

          {project.beforeAfter && (
            <button
              onClick={() => setActiveTab('beforeafter')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'beforeafter' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Before & After Transformation
            </button>
          )}

          {project.floorPlanUrl && (
            <button
              onClick={() => setActiveTab('floorplan')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'floorplan' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              BIM Architectural Floor Plans
            </button>
          )}
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* TAB 1: Gallery */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Main Featured Display Image */}
              <div className="relative h-[400px] sm:h-[500px] bg-black rounded-2xl overflow-hidden border border-[#333A48] shadow-2xl">
                <LazyImage
                  key={selectedImage}
                  src={selectedImage}
                  alt={project.title}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails row */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {[project.heroImage, ...project.gallery].map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === imgUrl ? 'border-white scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <LazyImage
                      src={imgUrl}
                      alt={`Thumbnail ${idx}`}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Interactive 3D Model Simulation */}
          {activeTab === '3d' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#232830] border border-[#333A48] rounded-xl text-xs text-gray-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Box className="w-5 h-5 text-white" />
                  <span>Interactive 3D Virtual Walkthrough • Drag to orbit and inspect materials</span>
                </div>
                <span className="text-white font-mono font-bold">4K BIM Model</span>
              </div>

              <div className="relative h-[450px] bg-black/80 rounded-2xl border border-[#333A48] overflow-hidden flex items-center justify-center">
                <LazyImage
                  src={project.heroImage}
                  alt="3D Walkthrough View"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover filter brightness-75"
                />

                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-[#2D3436] text-white flex items-center justify-center shadow-2xl animate-pulse">
                    <Box className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-xl text-white font-bold">Launch 3D Virtual Tour</h4>
                    <p className="text-xs text-gray-300 max-w-md font-light mt-1">
                      Experience photorealistic spatial lighting, material textures, and ceiling clearances before physical construction.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const text = `Assalam-o-Alaikum, I want to view the full 3D BIM walkthrough for ${project.title}.`;
                      window.open(`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-widest rounded-xl flex items-center gap-2 shadow-xl pointer-events-auto"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Request 3D Walkthrough File on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Before & After */}
          {activeTab === 'beforeafter' && project.beforeAfter && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-xs text-amber-400 font-mono font-semibold uppercase block">
                    Before: {project.beforeAfter.beforeLabel}
                  </span>
                  <div className="h-[350px] rounded-2xl overflow-hidden border border-[#333A48]">
                    <LazyImage
                      src={project.beforeAfter.beforeImage}
                      alt="Before"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-emerald-400 font-mono font-semibold uppercase block">
                    After: {project.beforeAfter.afterLabel}
                  </span>
                  <div className="h-[350px] rounded-2xl overflow-hidden border border-white">
                    <LazyImage
                      src={project.beforeAfter.afterImage}
                      alt="After"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Floor Plan */}
          {activeTab === 'floorplan' && project.floorPlanUrl && (
            <div className="space-y-4">
              <div className="h-[450px] bg-white p-4 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-200">
                <LazyImage
                  src={project.floorPlanUrl}
                  alt="Architectural Floor Plan"
                  containerClassName="max-h-full w-full h-full flex items-center justify-center bg-white"
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          )}

          {/* Detailed Project Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-[#333A48]">
            
            <div className="md:col-span-8 space-y-6">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white mb-2">Architectural Monograph & Concept</h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-white font-bold">Key Architectural Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="p-3 bg-[#232830] border border-[#333A48] rounded-xl text-xs text-gray-200 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Specs Sidebar */}
            <div className="md:col-span-4 bg-[#232830] p-6 rounded-2xl border border-[#333A48] space-y-6">
              <h3 className="font-serif-luxury text-base font-bold text-white border-b border-[#333A48] pb-3">Project Dossier</h3>

              <div className="space-y-3 text-xs text-gray-300">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-mono">Location</span>
                  <span className="font-semibold text-white">{project.location}, {project.city}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-mono">Plot Size & Covered Area</span>
                  <span className="font-semibold text-white">{project.marlaSize} • {project.sqft.toLocaleString()} Sq Ft</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-mono">Principal Architect</span>
                  <span className="font-semibold text-white">{project.architect}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-mono">Est. Turnkey Budget</span>
                  <span className="font-bold text-white font-mono text-sm">{project.specs.estimatedValuePKR}</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-4 border-t border-[#333A48] space-y-2.5">
                <a
                  href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(`Assalam-o-Alaikum, I am inquiring about construction rates for a house similar to ${project.title} in ${project.location}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onOpenConsultationWithProject(project.title);
                  }}
                  className="w-full py-3 bg-[#2D3436] hover:bg-[#1E2325] text-white font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2"
                >
                  <span>Book Site Visit For This Plot</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
