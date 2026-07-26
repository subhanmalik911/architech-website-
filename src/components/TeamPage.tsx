import React, { useState } from 'react';
import { TEAM_DATA } from '../data/portfolioData';
import { Award, Compass, Building2, UserCheck, MessageCircle, X, ArrowLeft, ShieldCheck, Star } from 'lucide-react';
import { TeamMember } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

interface TeamPageProps {
  onNavigateHome: () => void;
  onOpenConsultation: () => void;
  theme?: 'dark' | 'light';
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigateHome, onOpenConsultation, theme = 'light' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMemberModal, setActiveMemberModal] = useState<TeamMember | null>(null);

  const isDark = theme === 'dark';

  const categories = ['All', 'Executive Board', 'Architectural Atelier', 'Engineering & MEP'];

  const filteredTeam = TEAM_DATA.filter((m) => {
    if (selectedCategory === 'Executive Board') {
      return m.role.includes('CEO') || m.role.includes('CTO') || m.role.includes('CFO');
    }
    if (selectedCategory === 'Architectural Atelier') {
      return m.role.includes('Architect') || m.role.includes('Interior');
    }
    if (selectedCategory === 'Engineering & MEP') {
      return m.role.includes('Structural') || m.role.includes('MEP') || m.role.includes('Technology');
    }
    return true;
  });

  return (
    <div className={`min-h-screen pt-28 pb-24 ${isDark ? 'bg-[#181B20] text-[#e2e4e9]' : 'bg-[#FAF9F5] text-[#181B20]'}`}>
      
      {/* Top Breadcrumb & Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <button
          onClick={onNavigateHome}
          className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-gray-400 hover:text-white' : 'text-[#2D3436] hover:text-black'} transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>

        <div className={`p-8 sm:p-12 rounded-3xl border ${isDark ? 'bg-[#232830] border-[#333A48]' : 'bg-[#F2F0EB] border-gray-200'} shadow-xl space-y-6 relative overflow-hidden`}>
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-full text-xs text-gray-800 dark:text-gray-200 font-bold uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>MZ BUILT Executive Board & Atelier Leadership</span>
            </div>

            <h1 className={`font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-[#181B20]'} leading-tight`}>
              The Mastermind Atelier Behind Pakistan’s Signature Estates
            </h1>

            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-black'} font-normal leading-relaxed`}>
              Our executive board brings together decades of architectural mastery, structural engineering precision, and luxury turnkey project execution across Lahore (DHA Ph 6, Gulberg III), Islamabad (F-7, Margalla), and Dubai.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>PCATP & PEC Licensed Senior Principals</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#2D3436] dark:text-gray-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>100+ Completed Luxury Villas & Commercial Plazas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-b border-gray-200 dark:border-[#333A48] pb-6">
          <div>
            <h2 className={`font-serif-luxury text-2xl font-bold ${isDark ? 'text-white' : 'text-[#181B20]'}`}>
              Meet Our Leadership & Atelier Directors
            </h2>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-900 font-semibold'}`}>
              Select a department to view specialized principals and project leads.
            </p>
          </div>

          <div className={`flex flex-wrap items-center gap-2 p-1.5 rounded-xl border ${isDark ? 'bg-[#232830] border-[#333A48]' : 'bg-white border-gray-200'} shadow-sm`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#2D3436] text-white shadow-md'
                    : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
          {filteredTeam.map((member) => (
            <div
              key={member.id}
              className={`rounded-2xl border ${
                isDark ? 'bg-[#232830] border-[#333A48] hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-400'
              } p-6 space-y-6 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group`}
            >
              <div className="space-y-4">
                {/* Image */}
                <div
                  className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 dark:bg-black border border-gray-200 dark:border-[#333A48] cursor-pointer"
                  onClick={() => setActiveMemberModal(member)}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 rounded-full backdrop-blur-md">
                    {member.yearsOfExperience} Yrs Experience
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs text-white font-bold uppercase tracking-wider flex items-center gap-1">
                      <UserCheck className="w-4 h-4" />
                      <span>View Full Bio & Accreditations</span>
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3
                    onClick={() => setActiveMemberModal(member)}
                    className={`font-serif-luxury text-2xl font-bold ${isDark ? 'text-white' : 'text-[#181B20]'} group-hover:text-gray-500 transition-colors cursor-pointer`}
                  >
                    {member.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#2D3436] dark:text-gray-300 font-bold">
                    {member.role}
                  </p>
                </div>

                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-black'} font-normal leading-relaxed line-clamp-3`}>
                  {member.bio}
                </p>
              </div>

              {/* Signature Project & Direct Action */}
              <div className={`pt-4 border-t ${isDark ? 'border-[#333A48]' : 'border-gray-200'} space-y-3`}>
                <div className="space-y-1">
                  <span className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-black'} font-bold block`}>
                    Signature Landmark Project
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#181B20]'} flex items-center gap-1.5`}>
                    <Building2 className="w-3.5 h-3.5 text-[#2D3436] dark:text-white" />
                    {member.signatureProject}
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setActiveMemberModal(member)}
                    className="text-xs text-[#2D3436] dark:text-white hover:underline font-bold"
                  >
                    Read Bio & Honors →
                  </button>

                  <a
                    href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(`Assalam-o-Alaikum, I want to consult with ${member.name} (${member.role}) regarding architectural design.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-black rounded-lg transition-colors shadow-sm"
                    title={`Consult with ${member.name}`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Executive Modal */}
        {activeMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`rounded-2xl border ${isDark ? 'bg-[#232830] border-[#333A48] text-white' : 'bg-white border-gray-200 text-[#181B20]'} max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto`}>
              
              <button
                onClick={() => setActiveMemberModal(null)}
                className={`absolute top-4 right-4 p-2 ${isDark ? 'text-gray-400 hover:text-white bg-white/5' : 'text-gray-600 hover:text-black bg-black/5'} rounded-full transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={activeMemberModal.image}
                  alt={activeMemberModal.name}
                  referrerPolicy="no-referrer"
                  className="w-32 h-40 object-cover rounded-xl border border-gray-200 dark:border-[#333A48] shadow-lg shrink-0"
                />

                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[10px] uppercase tracking-widest px-3 py-0.5 bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-white/20 rounded-full font-bold">
                    {activeMemberModal.yearsOfExperience} Years Senior Practice
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-bold">
                    {activeMemberModal.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#2D3436] dark:text-gray-300 font-bold">
                    {activeMemberModal.role}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Specialization: <span className="font-semibold">{activeMemberModal.specialty}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-[#333A48]">
                <h4 className="text-xs uppercase tracking-widest text-[#2D3436] dark:text-white font-bold">
                  Executive Biography & Architectural Portfolio
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} font-light leading-relaxed`}>
                  {activeMemberModal.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-[#333A48]">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 block font-semibold">
                    Signature Landmark Project
                  </span>
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#2D3436] dark:text-white" />
                    {activeMemberModal.signatureProject}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 block font-semibold">
                    Accreditations & Honors
                  </span>
                  <div className="space-y-1">
                    {activeMemberModal.awards.map((award, idx) => (
                      <span key={idx} className="text-xs font-medium block flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#2D3436] dark:text-white" />
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveMemberModal(null)}
                  className={`px-4 py-2 ${isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'} rounded-lg text-xs font-bold`}
                >
                  Close Profile
                </button>

                <a
                  href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(`Assalam-o-Alaikum, I want to book a consultation with ${activeMemberModal.name} (${activeMemberModal.role}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Book Consultation on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
