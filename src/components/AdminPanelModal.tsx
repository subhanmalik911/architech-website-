import React, { useState } from 'react';
import { X, Shield, Phone, MessageCircle, Calendar, Users, DollarSign, BarChart3, CheckCircle2, Clock, Sparkles, Filter, Plus, Edit2, Search, ArrowUpRight, Check, Trash2, Sliders } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  projectType: string;
  sqft: number;
  budgetPKR: string;
  source: 'WhatsApp' | 'Call' | 'Site Visit Form' | 'Cost Calculator';
  date: string;
  status: 'New' | 'Contacted' | 'Site Visit Fixed' | 'Contract Signed';
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'packages' | 'settings'>('leads');
  const [leadFilter, setLeadFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample leads database
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'LD-101',
      name: 'Mian Farhan Raza',
      phone: '+92 301 845 1122',
      city: 'DHA Phase 6, Lahore',
      projectType: '1-Kanal Luxury Villa',
      sqft: 4500,
      budgetPKR: '145,000,000',
      source: 'WhatsApp',
      date: '2026-07-24',
      status: 'Site Visit Fixed'
    },
    {
      id: 'LD-102',
      name: 'Chaudhry Bilal Nisar',
      phone: '+92 321 445 8899',
      city: 'Gulberg III, Lahore',
      projectType: '7-Story Commercial Plaza',
      sqft: 28000,
      budgetPKR: '380,000,000',
      source: 'Cost Calculator',
      date: '2026-07-24',
      status: 'Contacted'
    },
    {
      id: 'LD-103',
      name: 'Dr. Tariq Mahmood',
      phone: '+92 300 998 7766',
      city: 'Sector F-7, Islamabad',
      projectType: 'Hillside Modern Residence',
      sqft: 8500,
      budgetPKR: '190,000,000',
      source: 'Site Visit Form',
      date: '2026-07-23',
      status: 'New'
    },
    {
      id: 'LD-104',
      name: 'Hassan Al-Maktoum',
      phone: '+971 50 123 4567',
      city: 'Bahria Town, Lahore',
      projectType: '2-Kanal Farmhouse Estate',
      sqft: 14000,
      budgetPKR: '260,000,000',
      source: 'WhatsApp',
      date: '2026-07-22',
      status: 'Contract Signed'
    }
  ]);

  if (!isOpen) return null;

  const handleUpdateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.city.toLowerCase().includes(searchQuery.toLowerCase()) || l.projectType.toLowerCase().includes(searchQuery.toLowerCase());
    if (leadFilter === 'all') return matchesSearch;
    return matchesSearch && l.status === leadFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#090b10] border border-[#c5a059]/40 rounded-2xl overflow-hidden shadow-2xl text-white flex flex-col h-[90vh]">
        
        {/* HEADER BAR */}
        <div className="p-5 sm:p-6 bg-[#0e1017] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#c5a059]/20 border border-[#c5a059]/50 flex items-center justify-center text-[#c5a059]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-white flex items-center gap-2">
                <span>{SITE_CONFIG.brandName} Executive Admin Console</span>
                <span className="text-[10px] bg-[#25D366]/20 text-[#25D366] px-2 py-0.5 rounded font-mono border border-[#25D366]/30">Live Sync</span>
              </h3>
              <p className="text-xs text-gray-400">Manage incoming WhatsApp leads, site visits, packages & client analytics</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* METRICS SUMMARY BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#0b0d13] border-b border-white/10 text-xs shrink-0">
          <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-gray-400 text-[10px] uppercase font-mono block">Total Inquiries</span>
            <span className="text-xl font-serif font-bold text-white">{leads.length} Active Leads</span>
            <span className="text-[10px] text-[#25D366] flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +18% this month
            </span>
          </div>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-gray-400 text-[10px] uppercase font-mono block">Site Visits Fixed</span>
            <span className="text-xl font-serif font-bold text-[#c5a059]">
              {leads.filter((l) => l.status === 'Site Visit Fixed').length} Scheduled
            </span>
            <span className="text-[10px] text-gray-400">Lahore & Islamabad</span>
          </div>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-gray-400 text-[10px] uppercase font-mono block">Contract Value</span>
            <span className="text-xl font-serif font-bold text-emerald-400">PKR 975M</span>
            <span className="text-[10px] text-gray-400">Turnkey Projects</span>
          </div>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-gray-400 text-[10px] uppercase font-mono block">Google Rating</span>
            <span className="text-xl font-serif font-bold text-[#c5a059]">4.9 ★★★★★</span>
            <span className="text-[10px] text-gray-400">184 Verified Reviews</span>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex items-center gap-2 px-6 pt-4 bg-[#0e1017] border-b border-white/10 shrink-0 overflow-x-auto">
          {[
            { id: 'leads', label: 'Lead Management & WhatsApp Inquiries', icon: Users },
            { id: 'analytics', label: 'Futuristic Pipeline Analytics', icon: BarChart3 },
            { id: 'packages', label: 'Pricing Package Editor', icon: Sliders }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#c5a059] text-[#c5a059] bg-[#c5a059]/10 rounded-t-lg'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS CONTAINER */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#090b10]">
          
          {/* TAB 1: LEADS MANAGEMENT */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              
              {/* Search & Status Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search lead name, city, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-[#c5a059] outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                  {['all', 'New', 'Contacted', 'Site Visit Fixed', 'Contract Signed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-medium uppercase tracking-wider transition-colors border ${
                        leadFilter === st
                          ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {st === 'all' ? 'All Leads' : st}
                    </button>
                  ))}
                </div>

              </div>

              {/* Leads Table */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0c0e14]">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-[#12141d] border-b border-white/10 text-[10px] uppercase tracking-wider text-gray-400 font-mono">
                    <tr>
                      <th className="p-4">Lead ID & Client Name</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Location & Project</th>
                      <th className="p-4">Covered Area / Budget</th>
                      <th className="p-4">Source</th>
                      <th className="p-4">Pipeline Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5">
                    {filteredLeads.map((ld) => (
                      <tr key={ld.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium text-white">
                          <span className="font-mono text-[10px] text-[#c5a059] block">{ld.id}</span>
                          <span className="font-serif text-sm">{ld.name}</span>
                        </td>

                        <td className="p-4">
                          <div className="space-y-1">
                            <span className="block font-mono text-white">{ld.phone}</span>
                            <span className="text-[10px] text-gray-500">{ld.date}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="text-white font-medium block">{ld.city}</span>
                          <span className="text-[11px] text-gray-400">{ld.projectType}</span>
                        </td>

                        <td className="p-4">
                          <span className="text-[#c5a059] font-semibold block">PKR {ld.budgetPKR}</span>
                          <span className="text-[10px] text-gray-400">{ld.sqft.toLocaleString()} sqft</span>
                        </td>

                        <td className="p-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${
                            ld.source === 'WhatsApp' ? 'bg-[#25D366]/20 text-[#25D366] border-[#25D366]/40' : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                          }`}>
                            {ld.source}
                          </span>
                        </td>

                        <td className="p-4">
                          <select
                            value={ld.status}
                            onChange={(e) => handleUpdateLeadStatus(ld.id, e.target.value as any)}
                            className="bg-black/80 border border-white/20 text-white text-[11px] p-1.5 rounded outline-none focus:border-[#c5a059]"
                          >
                            <option value="New">New Lead</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Site Visit Fixed">Site Visit Fixed</option>
                            <option value="Contract Signed">Contract Signed</option>
                          </select>
                        </td>

                        <td className="p-4 text-right space-x-2">
                          <a
                            href={`https://api.whatsapp.com/send?phone=${ld.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(`Hello ${ld.name}, this is ${SITE_CONFIG.brandName} Atelier regarding your project in ${ld.city}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-black rounded-lg inline-flex items-center transition-colors"
                            title="Open WhatsApp Chat"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`tel:${ld.phone}`}
                            className="p-2 bg-[#c5a059]/20 text-[#c5a059] hover:bg-[#c5a059] hover:text-black rounded-lg inline-flex items-center transition-colors"
                            title="Direct Call"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 2: FUTURISTIC ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Visual Chart Simulation 1: Inquiries by Area */}
                <div className="p-6 bg-[#0d0f16] border border-white/10 rounded-xl space-y-4">
                  <h4 className="font-serif text-base font-semibold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#c5a059]" />
                    <span>Project Distribution by Location</span>
                  </h4>

                  <div className="space-y-3 pt-2">
                    {[
                      { area: 'DHA Phase 6 & 8 Lahore', pct: 42, count: '38 Villas' },
                      { area: 'Gulberg III Commercial', pct: 28, count: '14 Plazas' },
                      { area: 'Bahria Town & Farmhouses', pct: 18, count: '12 Estates' },
                      { area: 'Islamabad F-7 & Blue Area', pct: 12, count: '8 Projects' }
                    ].map((item) => (
                      <div key={item.area} className="space-y-1 text-xs">
                        <div className="flex justify-between text-gray-300">
                          <span>{item.area}</span>
                          <span className="text-[#c5a059] font-mono">{item.pct}% ({item.count})</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#c5a059] to-[#d4af37]" style={{ width: `${item.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Chart Simulation 2: Lead Conversion Funnel */}
                <div className="p-6 bg-[#0d0f16] border border-white/10 rounded-xl space-y-4">
                  <h4 className="font-serif text-base font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#25D366]" />
                    <span>Lead Conversion Funnel</span>
                  </h4>

                  <div className="space-y-3 pt-2">
                    {[
                      { step: 'WhatsApp & Website Traffic', val: '1,420 Visitors/mo', pct: '100%' },
                      { step: 'Direct WhatsApp & Call Inquiries', val: '184 Leads', pct: '65%' },
                      { step: 'Scheduled Free Site Visits', val: '48 Site Visits', pct: '35%' },
                      { step: 'Signed Turnkey Contracts', val: '16 Contracts', pct: '18%' }
                    ].map((step, idx) => (
                      <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between text-xs">
                        <span className="text-gray-300">{step.step}</span>
                        <div className="text-right">
                          <span className="font-semibold text-white block">{step.val}</span>
                          <span className="text-[10px] text-[#c5a059] font-mono">{step.pct} rate</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: PACKAGES EDITOR */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div className="p-6 bg-[#0d0f16] border border-white/10 rounded-xl space-y-4">
                <h4 className="font-serif text-base font-semibold text-white">
                  Active Package Pricing Rates (PKR per Sq Ft)
                </h4>
                <p className="text-xs text-gray-400">
                  Update default construction package rates. These automatically sync with the client budget calculator on the front page.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  {SITE_CONFIG.pricingPackages.map((pkg) => (
                    <div key={pkg.id} className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-3 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-semibold text-white text-sm">{pkg.name}</span>
                        <span className="text-[10px] bg-[#c5a059]/20 text-[#c5a059] px-2 py-0.5 rounded font-mono">Active</span>
                      </div>
                      <div className="text-xl font-bold text-[#c5a059]">{pkg.pricePerSqFt}</div>
                      <p className="text-[11px] text-gray-400">{pkg.tagline}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER BAR */}
        <div className="p-4 bg-[#0e1017] border-t border-white/10 flex items-center justify-between text-xs text-gray-400 shrink-0">
          <span>{SITE_CONFIG.brandName} Atelier Security Protocol 256-bit</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium"
          >
            Close Console
          </button>
        </div>

      </div>
    </div>
  );
};
