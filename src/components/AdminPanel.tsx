import React, { useState } from 'react';
import { X, LayoutDashboard, Users, MessageSquare, DollarSign, Settings, Sparkles, CheckCircle2, Phone, MessageCircle, BarChart3, Plus, Trash2, Edit3, ShieldCheck, Globe } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectSeoManager } from './ProjectSeoManager';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'leads' | 'reviews' | 'pricing' | 'seo' | 'config'>('leads');

  // Sample leads data for demonstration
  const [leads, setLeads] = useState([
    {
      id: 'lead-101',
      name: 'Mian Usman Ali',
      phoneWhatsApp: '+92 300 1234567',
      city: 'Lahore',
      plotSize: '1 Kanal (DHA Phase 6 Raya)',
      package: 'Turnkey Luxury Villa',
      budget: 'PKR 14 Crore',
      status: 'Site Visit Scheduled',
      date: 'Today, 2:30 PM'
    },
    {
      id: 'lead-102',
      name: 'Dr. Shahzad Overseas',
      phoneWhatsApp: '+971 50 8901122',
      city: 'Islamabad',
      plotSize: '2 Kanal (Sector F-7/2)',
      package: 'Architectural Design & BIM',
      budget: 'PKR 28 Crore',
      status: 'New Inquiry',
      date: 'Yesterday'
    },
    {
      id: 'lead-103',
      name: 'Chaudhry Rameez',
      phoneWhatsApp: '+92 321 8899001',
      city: 'Lahore',
      plotSize: '10 Marla (Gulberg III)',
      package: 'Commercial Plaza Fitout',
      budget: 'PKR 6 Crore',
      status: 'BOQ Sent',
      date: '2 days ago'
    }
  ]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      <div className="relative w-full max-w-6xl bg-[#090b0e] border border-[#c5a059]/50 rounded-2xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col font-sans">
        
        {/* Top Header */}
        <div className="p-5 bg-[#101218] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-[#c5a059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                  {SITE_CONFIG.brandName} Executive Admin Console
                </h2>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold rounded-full">
                  LIVE ENGINE
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-light">
                Lead management, 5-star review moderation, PKR BOQ rates, and site configuration.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation Bar */}
        <div className="px-6 bg-[#0c0e12] border-b border-white/10 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'leads', label: 'Lead Inquiries & Calls', icon: Users, badge: '3 New' },
            { id: 'reviews', label: 'Client Video Reviews', icon: MessageSquare },
            { id: 'pricing', label: 'PKR Package Rates', icon: DollarSign },
            { id: 'seo', label: 'SEO & Canonical Links', icon: Globe, badge: 'Indexer' },
            { id: 'config', label: 'Code Template Config', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/5'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.5 bg-[#c5a059] text-black font-bold text-[9px] rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* TAB 1: Leads Console */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              
              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#12141c] border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Total Inquiries Today</span>
                  <div className="text-2xl font-bold text-white font-mono">14 Inquiries</div>
                  <p className="text-[10px] text-emerald-400">8 WhatsApp • 4 Direct Calls • 2 Forms</p>
                </div>

                <div className="p-4 bg-[#12141c] border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Scheduled Site Visits</span>
                  <div className="text-2xl font-bold text-[#c5a059] font-mono">6 Site Visits</div>
                  <p className="text-[10px] text-gray-400">DHA Phase 6, Raya & Margalla Islamabad</p>
                </div>

                <div className="p-4 bg-[#12141c] border border-white/10 rounded-xl space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Pipeline BOQ Value</span>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">PKR 48.5 Crore</div>
                  <p className="text-[10px] text-gray-400">Active High-Net-Worth Quotations</p>
                </div>
              </div>

              {/* Leads Table */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0d0e12]">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-[#14161f] text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">Client Name & Contact</th>
                      <th className="p-4">Location & Plot Size</th>
                      <th className="p-4">Package</th>
                      <th className="p-4">Estimated Budget</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{lead.name}</div>
                          <div className="text-[11px] text-[#c5a059] font-mono">{lead.phoneWhatsApp}</div>
                        </td>
                        <td className="p-4">
                          <div>{lead.plotSize}</div>
                          <div className="text-[10px] text-gray-500">{lead.city}</div>
                        </td>
                        <td className="p-4 font-medium">{lead.package}</td>
                        <td className="p-4 font-mono font-bold text-emerald-400">{lead.budget}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-[#c5a059]/20 border border-[#c5a059] text-[#c5a059] font-semibold text-[10px] rounded-full">
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 flex items-center gap-2">
                          <a
                            href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-emerald-500 text-black rounded-md"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`tel:${SITE_CONFIG.phoneNumber}`}
                            className="p-2 bg-white/10 text-white rounded-md"
                            title="Call Now"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 2: Reviews Moderator */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-white">Verified 5-Star Testimonial Moderation</h3>
                  <p className="text-xs text-gray-400">Manage client video testimonials and Google Review Sync badges.</p>
                </div>
                <button className="px-4 py-2 bg-[#c5a059] text-black font-bold text-xs uppercase tracking-widest rounded-md flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Review</span>
                </button>
              </div>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>Google Review API Sync Active (4.9 Stars, 184 Total Client Reviews).</span>
              </div>
            </div>
          )}

          {/* TAB 3: Pricing Packages Manager */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <h3 className="font-serif-luxury text-lg font-bold text-white">PKR Construction Rates & Packages</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SITE_CONFIG.pricingPackages.map((pkg) => (
                  <div key={pkg.id} className="p-4 bg-[#12141c] border border-white/10 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{pkg.name}</h4>
                      <span className="text-[#c5a059] font-mono font-bold">{pkg.pricePerSqFt}</span>
                    </div>
                    <p className="text-xs text-gray-400">{pkg.tagline}</p>
                    <button className="text-[11px] text-[#c5a059] hover:underline flex items-center gap-1 font-medium">
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Package BOQ Specifications</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Project SEO & Canonical Links Manager */}
          {activeTab === 'seo' && (
            <ProjectSeoManager projects={PROJECTS_DATA} />
          )}

          {/* TAB 5: Code Template Config */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                <h3 className="font-serif-luxury text-base font-bold text-white">Template Customization Guide</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  This website is designed as a modular, production-ready template. You can customize company name, logo typography, WhatsApp phone numbers, and location details directly in:
                </p>
                <div className="p-3 bg-black border border-white/10 rounded-md font-mono text-xs text-[#c5a059]">
                  /src/config/siteConfig.ts
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
