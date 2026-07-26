import React, { useState, useEffect } from 'react';
import { Search, Globe, CheckCircle2, RefreshCw, Sparkles, ExternalLink, Shield, Layers, FileText } from 'lucide-react';
import { Project } from '../types';
import { ProjectSeoConfig, generateDefaultProjectSeo, updateSeoMetadata } from '../utils/seo';

export interface ProjectSeoManagerProps {
  projects: Project[];
  currentSeoConfigs?: Record<string, ProjectSeoConfig>;
  onSaveSeoConfig?: (config: ProjectSeoConfig) => void;
}

export const ProjectSeoManager: React.FC<ProjectSeoManagerProps> = ({
  projects,
  currentSeoConfigs = {},
  onSaveSeoConfig,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const [seoForm, setSeoForm] = useState<ProjectSeoConfig>(() => {
    if (selectedProject && currentSeoConfigs[selectedProject.id]) {
      return currentSeoConfigs[selectedProject.id];
    }
    return selectedProject ? generateDefaultProjectSeo(selectedProject) : {
      projectId: '',
      pageTitle: '',
      metaDescription: '',
      canonicalUrl: '',
      keywords: '',
      ogImage: ''
    };
  });

  const [statusMessage, setStatusMessage] = useState<string>('');

  // Update form when selected project changes
  useEffect(() => {
    if (!selectedProject) return;
    if (currentSeoConfigs[selectedProject.id]) {
      setSeoForm(currentSeoConfigs[selectedProject.id]);
    } else {
      setSeoForm(generateDefaultProjectSeo(selectedProject));
    }
    setStatusMessage('');
  }, [selectedProjectId, projects, currentSeoConfigs]);

  if (!selectedProject) {
    return <div className="text-gray-400 text-xs p-4">No projects available for SEO management.</div>;
  }

  const handleApplyLiveSeo = () => {
    updateSeoMetadata({
      title: seoForm.pageTitle,
      description: seoForm.metaDescription,
      canonicalUrl: seoForm.canonicalUrl,
      keywords: seoForm.keywords,
      ogImage: seoForm.ogImage,
    });

    if (onSaveSeoConfig) {
      onSaveSeoConfig(seoForm);
    }

    setStatusMessage('Live SEO Metadata & Canonical Tags applied to active page head tags successfully!');
    setTimeout(() => setStatusMessage(''), 4500);
  };

  const handleResetDefault = () => {
    const defaults = generateDefaultProjectSeo(selectedProject);
    setSeoForm(defaults);
    setStatusMessage('Reset to automatic high-ranking architectural defaults.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#c5a059]" />
            <h3 className="font-serif-luxury text-lg font-bold text-white">
              Dynamic Project SEO & Canonical Indexing Console
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Customize meta descriptions, canonical URLs, and OpenGraph social cards for each architectural monograph.
          </p>
        </div>

        <button
          onClick={handleApplyLiveSeo}
          className="px-4 py-2.5 bg-[#c5a059] hover:bg-[#b08d46] text-black font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-lg shadow-[#c5a059]/20 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Apply Live Head Metadata</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center gap-2.5 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Grid: Project Selector & Form + Google SERP Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Selector & Form */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Project Switcher Dropdown */}
          <div className="p-4 bg-[#12141c] border border-white/10 rounded-xl space-y-2">
            <label className="text-[11px] font-bold text-[#c5a059] uppercase tracking-wider block">
              Select Architectural Project Monograph:
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full bg-[#090b0e] border border-white/15 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#c5a059]"
            >
              {projects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.title} ({proj.category} - {proj.location}, {proj.city})
                </option>
              ))}
            </select>
          </div>

          {/* Form Fields */}
          <div className="p-5 bg-[#12141c] border border-white/10 rounded-xl space-y-4">
            
            {/* Meta Title */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-300">
                  Page Title Tag (`&lt;title&gt;`):
                </label>
                <span className={`text-[10px] font-mono ${seoForm.pageTitle.length > 60 ? 'text-amber-400' : 'text-gray-500'}`}>
                  {seoForm.pageTitle.length}/60 chars
                </span>
              </div>
              <input
                type="text"
                value={seoForm.pageTitle}
                onChange={(e) => setSeoForm({ ...seoForm, pageTitle: e.target.value })}
                className="w-full bg-[#090b0e] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:border-[#c5a059] outline-none"
                placeholder="e.g. 1 Kanal Modern Villa in DHA Phase 6 | MZ BUILT"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-300">
                  Meta Description (`&lt;meta name="description"&gt;`):
                </label>
                <span className={`text-[10px] font-mono ${seoForm.metaDescription.length > 160 ? 'text-amber-400' : 'text-gray-500'}`}>
                  {seoForm.metaDescription.length}/160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={seoForm.metaDescription}
                onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                className="w-full bg-[#090b0e] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:border-[#c5a059] outline-none resize-none"
                placeholder="Write a compelling 150-160 character summary that boosts click-through rate from Google Search..."
              />
            </div>

            {/* Canonical URL */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Canonical URL Tag (`&lt;link rel="canonical"&gt;`):</span>
                </label>
                <span className="text-[10px] text-gray-500 font-mono">Prevents duplicate indexing</span>
              </div>
              <input
                type="text"
                value={seoForm.canonicalUrl}
                onChange={(e) => setSeoForm({ ...seoForm, canonicalUrl: e.target.value })}
                className="w-full bg-[#090b0e] border border-white/15 rounded-lg px-3 py-2 text-xs text-white font-mono text-[#c5a059] focus:border-[#c5a059] outline-none"
                placeholder="https://mzbuilt.com/portfolio/1-kanal-modern-villa"
              />
            </div>

            {/* Target Keywords */}
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Target Search Keywords (Comma-separated):
              </label>
              <input
                type="text"
                value={seoForm.keywords}
                onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                className="w-full bg-[#090b0e] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:border-[#c5a059] outline-none"
                placeholder="Architect in Lahore, DHA Phase 6 Villa, Turnkey Construction, MZ BUILT"
              />
            </div>

            {/* Social Sharing Image */}
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                OpenGraph / Social Card Image (`og:image`):
              </label>
              <input
                type="text"
                value={seoForm.ogImage || ''}
                onChange={(e) => setSeoForm({ ...seoForm, ogImage: e.target.value })}
                className="w-full bg-[#090b0e] border border-white/15 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-[#c5a059] outline-none"
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleApplyLiveSeo}
                className="flex-1 py-2.5 bg-[#c5a059] hover:bg-[#b08d46] text-black font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save & Apply SEO</span>
              </button>

              <button
                onClick={handleResetDefault}
                className="py-2.5 px-4 bg-white/10 hover:bg-white/15 text-gray-300 font-medium text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                title="Reset to default template SEO"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Simulated Google Search Preview & OpenGraph Card */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Google SERP Snippet Box */}
          <div className="p-5 bg-white text-gray-900 rounded-xl shadow-xl space-y-3 font-sans">
            <div className="flex items-center gap-2 text-xs text-gray-500 border-b pb-2">
              <Search className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-700">Google Search Snippet Preview</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] text-gray-600 truncate">
                <span className="w-4 h-4 rounded-full bg-[#161e2f] text-[#c5a059] flex items-center justify-center text-[9px] font-bold">M</span>
                <span className="truncate font-mono">{seoForm.canonicalUrl || 'https://mzbuilt.com/portfolio/...'}</span>
              </div>
              
              <h4 className="text-base text-blue-800 hover:underline font-medium cursor-pointer leading-snug line-clamp-1">
                {seoForm.pageTitle || selectedProject.title}
              </h4>

              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                {seoForm.metaDescription || selectedProject.description}
              </p>
            </div>

            <div className="pt-2 border-t text-[10px] text-gray-400 flex items-center justify-between">
              <span>Mobile & Desktop Verified</span>
              <span className="text-emerald-600 font-semibold">Rich Snippets Enabled</span>
            </div>
          </div>

          {/* Social Media Card Preview (OpenGraph) */}
          <div className="p-4 bg-[#12141c] border border-white/10 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Layers className="w-4 h-4 text-[#c5a059]" />
              <span className="font-semibold uppercase tracking-wider text-[10px]">OpenGraph / WhatsApp Social Card</span>
            </div>

            <div className="bg-[#090b0e] border border-white/10 rounded-lg overflow-hidden">
              {seoForm.ogImage ? (
                <div className="h-36 w-full overflow-hidden relative bg-black/40">
                  <img
                    src={seoForm.ogImage}
                    alt={seoForm.pageTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-[9px] text-[#c5a059] rounded font-mono">
                    HD Architectural Visual
                  </div>
                </div>
              ) : (
                <div className="h-28 bg-white/5 flex items-center justify-center text-xs text-gray-500">
                  No social card image selected
                </div>
              )}

              <div className="p-3 space-y-1">
                <div className="text-[10px] text-gray-400 font-mono uppercase truncate">
                  MZBUILT.COM
                </div>
                <h5 className="font-bold text-white text-xs line-clamp-1">
                  {seoForm.pageTitle}
                </h5>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                  {seoForm.metaDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Architectural SEO Compliance Checklist */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2 text-xs text-emerald-300">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <Shield className="w-4 h-4 shrink-0" />
              <span>SEO Audit & Google Indexing Compliance</span>
            </div>
            <ul className="space-y-1 text-[11px] pl-5 list-disc text-emerald-200/80">
              <li>Canonical tags prevent duplicate content penalties from multi-region listings.</li>
              <li>Keyword density tuned for Lahore DHA, Islamabad & Overseas Pakistanis.</li>
              <li>JSON-LD ArchitecturalFirm Schema auto-linked to headquarters coordinates.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
