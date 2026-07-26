import React from 'react';
import { Compass, Building2, Sofa, Store, Sparkles, Trees, CheckCircle2, MessageCircle } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';
import { SITE_CONFIG } from '../config/siteConfig';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenConsultation }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass': return <Compass className="w-6 h-6 text-[#2D3436] dark:text-gray-200" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-[#2D3436] dark:text-gray-200" />;
      case 'Sofa': return <Sofa className="w-6 h-6 text-[#2D3436] dark:text-gray-200" />;
      case 'Store': return <Store className="w-6 h-6 text-[#2D3436] dark:text-gray-200" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#2D3436] dark:text-gray-200" />;
      case 'Trees': return <Trees className="w-6 h-6 text-[#2D3436] dark:text-gray-200" />;
      default: return <Compass className="w-6 h-6 text-[#2D3436] dark:text-gray-200" />;
    }
  };

  return (
    <section id="services" className="py-24 border-t border-gray-200 dark:border-[#333A48] relative bg-[#FAF9F5] dark:bg-[#181B20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-full text-xs text-gray-800 dark:text-gray-200 font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Spectrum Atelier Capabilities</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#181B20] dark:text-white">
            Comprehensive Architectural & Construction Services
          </h2>

          <p className="text-sm sm:text-base text-gray-900 dark:text-gray-300 font-normal">
            Targeting luxury homeowners, villa developers, commercial plaza investors, restaurants, cafes, corporate offices, and boutique hotel operators across Pakistan.
          </p>
        </div>

        {/* Target Client Categories Bar */}
        <div className="mb-12 p-4 bg-[#F2F0EB] dark:bg-[#232830] border border-gray-300 dark:border-[#333A48] rounded-2xl flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-[#2D3436] dark:text-gray-300 font-bold uppercase tracking-wider">Serving Ideal Clients:</span>
          {['Luxury Villa Homeowners', '1 & 2 Kanal Estates', 'Restaurants & Cafes', 'Corporate Offices', 'Boutique Hotels', 'Commercial Plazas'].map((client, idx) => (
            <span key={idx} className="px-3.5 py-1.5 bg-white dark:bg-[#181B20] text-[#181B20] dark:text-white border border-gray-200 dark:border-[#333A48] rounded-full font-bold shadow-sm">
              • {client}
            </span>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((srv) => (
            <div
              key={srv.id}
              className="bg-white dark:bg-[#232830] text-[#181B20] dark:text-white border border-gray-200 dark:border-[#333A48] hover:border-[#2D3436] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-md hover:shadow-xl"
            >
              
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute top-4 left-4 p-3 rounded-xl bg-white/90 dark:bg-[#181B20]/90 backdrop-blur-md border border-gray-200 dark:border-[#333A48] shadow-xl">
                  {getIcon(srv.iconName)}
                </div>
              </div>

              {/* Service Info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#181B20] dark:text-white group-hover:text-black dark:group-hover:text-gray-300 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-gray-900 dark:text-gray-300 font-normal leading-relaxed">
                    {srv.fullDesc}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-[#333A48]">
                  <ul className="space-y-1.5">
                    {srv.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2D3436] dark:text-gray-300 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action Bar */}
                <div className="pt-4 flex items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(`Assalam-o-Alaikum, I am inquiring about ${srv.title} by MZ BUILT.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-widest rounded-lg text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Inquire</span>
                  </a>

                  <button
                    onClick={onOpenConsultation}
                    className="py-2.5 px-3 bg-[#2D3436] hover:bg-[#1E2325] text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                  >
                    Site Visit
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
