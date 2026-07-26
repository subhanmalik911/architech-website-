import React, { useState } from 'react';
import { TEAM_DATA } from '../data/portfolioData';
import { Award, Compass, Building2, UserCheck, Linkedin, Mail, MessageCircle, X, ShieldCheck, Users } from 'lucide-react';
import { TeamMember } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

interface TeamSectionProps {
  isFullPage?: boolean;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ isFullPage = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMemberModal, setActiveMemberModal] = useState<TeamMember | null>(null);

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
    <section id="team" className={`${isFullPage ? 'pt-28 pb-24' : 'py-24'} bg-[#0a0b0e] relative border-t border-[#9E7B5B]/20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Full Page Header Banner if on dedicated page */}
        {isFullPage && (
          <div className="text-center space-y-4 max-w-3xl mx-auto pb-6 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#9E7B5B]/15 border border-[#9E7B5B]/40 rounded-full text-xs text-[#9E7B5B] font-bold uppercase tracking-widest">
              <Users className="w-4 h-4" />
              <span>Dedicated Leadership Directory</span>
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl text-white font-extrabold leading-tight">
              Meet Our Atelier Team
            </h1>
            <p className="text-base text-gray-300 font-light leading-relaxed">
              Discover the visionaries, principal architects, structural engineers, and project leaders driving architectural excellence at {SITE_CONFIG.brandName}.
            </p>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9E7B5B]/10 border border-[#9E7B5B]/30 rounded-full text-xs text-[#9E7B5B] font-semibold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>Leadership & Atelier Directors</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-bold leading-tight">
              Executive Board & Master Craftsmen
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-light">
              Our multi-disciplinary executive suite brings together decades of architectural mastery across Pakistan, UAE, and Europe.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-lg border border-white/10 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#9E7B5B] text-white shadow-lg font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeam.map((member) => (
            <div
              key={member.id}
              className="bg-[#12141a] border border-white/10 hover:border-[#9E7B5B]/70 rounded-2xl overflow-hidden p-6 space-y-6 shadow-2xl transition-all duration-500 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Image Frame */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black border border-white/10 cursor-pointer" onClick={() => setActiveMemberModal(member)}>
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-md text-[#9E7B5B] text-[10px] font-bold uppercase tracking-widest border border-[#9E7B5B]/40 rounded-full">
                    {member.yearsOfExperience} Yrs Experience
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs text-[#9E7B5B] font-bold uppercase tracking-wider flex items-center gap-1">
                      <UserCheck className="w-4 h-4" />
                      <span>View Full Profile & Accreditations</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h3
                    onClick={() => setActiveMemberModal(member)}
                    className="font-serif-luxury text-2xl text-white font-bold group-hover:text-[#9E7B5B] transition-colors cursor-pointer"
                  >
                    {member.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#9E7B5B] font-semibold">
                    {member.role}
                  </p>
                </div>

                <p className="text-xs text-gray-300 font-light leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Signature Project & Honors */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold block">
                    Signature Project
                  </span>
                  <span className="text-xs text-gray-200 font-medium flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#9E7B5B]" />
                    {member.signatureProject}
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setActiveMemberModal(member)}
                    className="text-xs text-[#9E7B5B] hover:underline font-semibold"
                  >
                    Read Bio & Honors →
                  </button>

                  <a
                    href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(`Assalam-o-Alaikum, I would like to schedule a consultation with ${member.name} (${member.role}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500 hover:text-black transition-colors"
                    title={`Consult with ${member.name}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* MEMBER DETAILS MODAL */}
        {activeMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#12141a] border border-[#9E7B5B]/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setActiveMemberModal(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={activeMemberModal.image}
                  alt={activeMemberModal.name}
                  referrerPolicy="no-referrer"
                  className="w-32 h-40 object-cover rounded-xl border border-[#9E7B5B]/40 shadow-lg shrink-0"
                />

                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 bg-[#9E7B5B]/20 text-[#9E7B5B] border border-[#9E7B5B]/40 rounded-full font-semibold">
                    {activeMemberModal.yearsOfExperience} Years Master Practice
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-bold text-white">
                    {activeMemberModal.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#9E7B5B] font-semibold">
                    {activeMemberModal.role}
                  </p>
                  <p className="text-xs text-gray-400">
                    Specialization: <span className="text-gray-200 font-medium">{activeMemberModal.specialty}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-widest text-[#9E7B5B] font-semibold">
                  Executive Biography & Portfolio Role
                </h4>
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  {activeMemberModal.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 block">
                    Signature Architectural Landmark
                  </span>
                  <span className="text-xs text-white font-semibold flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#9E7B5B]" />
                    {activeMemberModal.signatureProject}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 block">
                    Accreditations & Honors
                  </span>
                  <div className="space-y-1">
                    {activeMemberModal.awards.map((award, idx) => (
                      <span key={idx} className="text-xs text-gray-300 block flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#9E7B5B]" />
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveMemberModal(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs text-white rounded-lg"
                >
                  Close
                </button>
                <a
                  href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(`Assalam-o-Alaikum, I would like to schedule an executive consultation with ${activeMemberModal.name} (${activeMemberModal.role}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest rounded-lg flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book Consultation with {activeMemberModal.name.split(' ')[0]}</span>
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
