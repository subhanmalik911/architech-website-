import React from 'react';
import { X, Bookmark, Trash2, Calendar, MapPin } from 'lucide-react';
import { Project } from '../types';

interface SavedFavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProjects: Project[];
  onRemoveProject: (projectId: string) => void;
  onSelectProject: (project: Project) => void;
  onOpenConsultationWithBatch: (projectTitles: string[]) => void;
}

export const SavedFavoritesDrawer: React.FC<SavedFavoritesDrawerProps> = ({
  isOpen,
  onClose,
  savedProjects,
  onRemoveProject,
  onSelectProject,
  onOpenConsultationWithBatch
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#181B20] border-l border-[#333A48] shadow-2xl flex flex-col justify-between text-white">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#333A48] bg-[#232830] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-white" />
              <h3 className="font-serif-luxury text-xl text-white font-bold">
                Saved Moodboard ({savedProjects.length})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {savedProjects.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Bookmark className="w-12 h-12 text-gray-600 mx-auto" />
                <h4 className="font-serif-luxury text-xl text-white font-light">Your Moodboard is Empty</h4>
                <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                  Click the bookmark icon on any project card in our portfolio to save it to your private design collection.
                </p>
              </div>
            ) : (
              savedProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-[#232830] border border-[#333A48] rounded-xl hover:border-gray-500 transition-colors flex gap-4 items-center justify-between"
                >
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-16 object-cover rounded-lg border border-[#333A48] shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] uppercase text-gray-400 font-bold block">
                      {project.category}
                    </span>
                    <h4
                      onClick={() => {
                        onClose();
                        onSelectProject(project);
                      }}
                      className="text-xs text-white font-bold truncate cursor-pointer hover:text-gray-300"
                    >
                      {project.title}
                    </h4>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-white" />
                      {project.location}
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveProject(project.id)}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer CTA */}
          {savedProjects.length > 0 && (
            <div className="p-6 border-t border-[#333A48] bg-[#232830] space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultationWithBatch(savedProjects.map((p) => p.title));
                }}
                className="w-full py-3.5 bg-[#2D3436] hover:bg-[#1E2325] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Inquire For Saved Moodboard ({savedProjects.length})</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
