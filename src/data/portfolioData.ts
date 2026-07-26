import { Project, Review, TeamMember, ServiceItem, ProcessStep } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'dha-phase6-1kanal-villa',
    title: 'The Onyx Monolith',
    subtitle: '1 Kanal Ultra-Luxury Smart Villa in DHA Phase 6',
    category: 'Luxury Residential',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'DHA Phase 6, Sector Raya',
    city: 'Lahore',
    year: '2025',
    sqft: 6500,
    marlaSize: '1 Kanal (20 Marla)',
    architect: 'Ar. M. Zeeshan & Partners',
    completionStatus: 'Completed',
    style: 'Modern Biophilic Brutalism',
    client: 'Private Executive Family',
    description: 'Designed and built by MZ BUILT, this 1 Kanal turnkey villa combines cantilevered exposed fair-face concrete with dark thermal glass facades, double-height biophilic indoor courtyards, and state-of-the-art Crestron home automation tailored for Lahore thermal climate.',
    keyFeatures: [
      'Double-height formal lounge with 24ft floating glass waterfall',
      'Basement home cinema with acoustic suede walling',
      'Rooftop jacuzzi lounge facing Raya Fairways Golf Course',
      'Imported Spanish porcelain slab flooring & solid walnut woodwork',
      'Zero-thermal bridge insulation for 45% lower cooling bills'
    ],
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    virtual3dModelUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    specs: {
      materials: ['Exposed Fair-Face Concrete', 'Imported Italian Travertine', 'Double-Glazed Low-E Glass', 'Solid American Walnut'],
      sustainabilityScore: 'LEED Gold Standard Equivalent',
      lightingConcept: 'Lutron Smart Scene Architectural Illumination',
      estimatedValuePKR: 'PKR 14.5 Crore (Completed Turnkey)'
    },
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      afterImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      beforeLabel: 'Raw Plot Concrete Framework (Grey Structure)',
      afterLabel: 'Completed MZ BUILT Turnkey Luxury Residence'
    },
    featured: true
  },
  {
    id: 'f7-islamabad-2kanal-farmhouse',
    title: 'The Margalla Sanctuary',
    subtitle: '2 Kanal Executive Modern Manor in Sector F-7/2',
    category: 'Luxury Residential',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Sector F-7/2, Margalla Ridge',
    city: 'Islamabad',
    year: '2024',
    sqft: 11200,
    marlaSize: '2 Kanal (40 Marla)',
    architect: 'Ar. M. Zeeshan',
    completionStatus: 'Completed',
    style: 'Contemporary Organic Manor',
    client: 'Overseas Industrialist',
    description: 'Framed against the panoramic backdrop of Islamabad’s Margalla Hills, this 2 Kanal estate incorporates natural riverstone, floating infinity pool, cantilevered terrace decks, and double-insulated stone walls.',
    keyFeatures: [
      '50ft heated infinity pool overlooking the hill vistas',
      'Subterranean 6-car luxury garage with automated turntable',
      'Custom imported German Poggenpohl kitchen system',
      'Solar-powered microgrid with 30kW lithium storage'
    ],
    specs: {
      materials: ['Margalla Stone Cladding', 'Thermally Broken Glass', 'Teak Wood Paneling', 'Carrara Marble'],
      sustainabilityScore: 'Net-Zero Solar Powered',
      lightingConcept: 'Warm Linear Accent LED Cavity Lighting',
      estimatedValuePKR: 'PKR 28.0 Crore'
    },
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      beforeLabel: 'Initial Excavation & Hill Retaining Structure',
      afterLabel: 'Finished Estate with Infinity Edge Pool'
    },
    featured: true
  },
  {
    id: 'gulberg-boulevard-commercial-headquarters',
    title: 'Aura Plaza & Corporate Atrium',
    subtitle: '7-Story Commercial Landmark on Main Boulevard Gulberg III',
    category: 'Commercial & Retail',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Main Boulevard, Gulberg III',
    city: 'Lahore',
    year: '2025',
    sqft: 34000,
    marlaSize: '4 Kanal Commercial Plot',
    architect: 'MZ BUILT Commercial Team',
    completionStatus: 'Completed',
    style: 'Parametric Glass & Bronze Facade',
    client: 'Consortium Real Estate Holdings',
    description: 'A striking commercial headquarters featuring a dynamic copper-bronze sun-shading louver facade, high-speed elevator banks, central atrium skygarden, and boutique retail storefronts on ground level.',
    keyFeatures: [
      'Dynamic solar louvers reducing internal cooling loads by 38%',
      'Triple-height central glass lobby with marble water curtain',
      '3 Underground parking floors with EV charging stations',
      'State-of-the-art building management system (BMS)'
    ],
    specs: {
      materials: ['Anodized Bronze Aluminum Louvers', 'Structural Glass Curtain Wall', 'Absolute Black Granite'],
      sustainabilityScore: 'EDGE Certified Green Commercial Building',
      lightingConcept: 'Dynamic Architectural Facade Projection',
      estimatedValuePKR: 'PKR 85.0 Crore'
    },
    featured: true
  },
  {
    id: 'model-town-heritage-renovation',
    title: 'The Pavilion Residence',
    subtitle: 'Complete Architecture & Interior Overhaul of a 2 Kanal Estate',
    category: 'Restoration & Renovation',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Block H, Model Town',
    city: 'Lahore',
    year: '2024',
    sqft: 8500,
    marlaSize: '2 Kanal',
    architect: 'Ar. M. Zeeshan',
    completionStatus: 'Completed',
    style: 'Neoclassical Fusion with Modern Interior',
    client: 'Prominent Industrialist Family',
    description: 'Transforming an outdated 1980s 2-Kanal structure into an open-plan contemporary masterpiece. MZ BUILT reinforced the load-bearing pillars, replaced brick exterior with floor-to-ceiling glass and Spanish marble cladding.',
    keyFeatures: [
      'Total floor layout expansion with open courtyard',
      'Restoration of mature heritage mango trees surrounding new patio',
      'Custom acoustic home theater lounge',
      'Smart HVAC VRF air purification system'
    ],
    specs: {
      materials: ['Crema Marfil Marble', 'Custom Ash Wood Wall Panels', 'Steel Beam Structural Retrofits'],
      sustainabilityScore: 'Retrofit High Efficiency',
      lightingConcept: 'Cove Accent Lighting & Sculptural Chandeliers',
      estimatedValuePKR: 'PKR 6.8 Crore (Renovation Budget)'
    },
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      beforeLabel: '1980s Outdated Masonry Villa',
      afterLabel: 'Modern Glass & Travertine Revitalized Residence'
    },
    featured: true
  },
  {
    id: 'raya-fairways-penthouse-interior',
    title: 'The Sky Sanctuary Penthouse',
    subtitle: 'Bespoke Interior Architecture & Custom Furniture in Raya Golf Resort',
    category: 'Interior Architecture',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'DHA Raya Fairways Commercial Penthouses',
    city: 'Lahore',
    year: '2025',
    sqft: 4200,
    architect: 'MZ BUILT Interior Atelier',
    completionStatus: 'Completed',
    style: 'Modern Minimal Luxury',
    client: 'Tech Entrepreneur',
    description: 'An expansive penthouse interior where custom brass accents, hand-stitched leather wall panels, and backlit onyx dining islands create a warm, opulent atmosphere overlooking golf course greens.',
    keyFeatures: [
      'Backlit translucent Onyx wet bar counter',
      'Motorized hidden television and floating library',
      'Bespoke Italian velvet modular sectional sofas'
    ],
    specs: {
      materials: ['Pakistani Honey Onyx', 'Brushed Champagne Metal', 'Smoked Oak Flooring'],
      sustainabilityScore: 'Low VOC Eco Paint & Materials',
      lightingConcept: 'Hidden Magnetic Track Lighting',
      estimatedValuePKR: 'PKR 2.4 Crore Interior Package'
    },
    featured: false
  },
  {
    id: 'dha-phase-8-parkview-villa',
    title: 'The Glass Pavilion 10 Marla Modern Villa',
    subtitle: '10 Marla Compact Architectural Masterpiece',
    category: 'Luxury Residential',
    heroImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'DHA Phase 8, Sector C',
    city: 'Lahore',
    year: '2024',
    sqft: 3800,
    marlaSize: '10 Marla',
    architect: 'Ar. M. Zeeshan',
    completionStatus: 'Completed',
    style: 'Compact Linear Modernism',
    client: 'Young Doctor Couple',
    description: 'Proving that high-end luxury architecture can excel on a 10 Marla plot. Clever spatial zoning creates triple-height vertical light wells, a sunken garden patio, and 4 master ensuite bedrooms.',
    keyFeatures: [
      'Triple-height lightwell bringing natural light into basement lounge',
      'Floating open tread wooden staircase with structural glass balustrades',
      'Minimalist grey porcelain exterior tile cladding'
    ],
    specs: {
      materials: ['Porcelain Slabs', 'Powder Coated Metal Louvers', 'Microcement Finish'],
      sustainabilityScore: 'High Natural Ventilation Efficiency',
      lightingConcept: 'Integrated Step Lights & Perimeter Grazers',
      estimatedValuePKR: 'PKR 5.2 Crore Turnkey'
    },
    featured: false
  },
  {
    id: 'gulberg-artisan-cafe-interior',
    title: 'MIRA Artisan Bistro & Cafe',
    subtitle: 'Hospitality Architecture & Luxury Interior Experience',
    category: 'Hospitality & Cafes',
    heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'MM Alam Road, Gulberg',
    city: 'Lahore',
    year: '2025',
    sqft: 2800,
    architect: 'MZ BUILT Commercial Team',
    completionStatus: 'Completed',
    style: 'Wabi-Sabi Warm Terracotta & Olive',
    client: 'Gourmet Culinary Group',
    description: 'An iconic dining venue designed with curved plastered archways, custom terrazzo tables, ambient olive greenery, and warm micro-textured acoustic plaster.',
    keyFeatures: [
      'Handmade terrazzo espresso bar counter',
      'Acoustic ceiling baffles for intimate conversation acoustics',
      'Outdoor climate-controlled dining terrace with vertical botanical garden'
    ],
    specs: {
      materials: ['Lime Plaster', 'Custom Terrazzo', 'Fluted Teak Wood', 'Antique Brass'],
      sustainabilityScore: 'Acoustically Treated Indoor Comfort',
      lightingConcept: '2700K Warm Dimming Scene Controls',
      estimatedValuePKR: 'PKR 1.8 Crore Commercial Fitout'
    },
    featured: false
  },
  {
    id: 'bahria-town-dha-landscape-villa',
    title: 'Verdant Estate Courtyard & Pool',
    subtitle: 'Landscape Architecture, Water Cascades & Outdoor Kitchen',
    category: 'Landscape & Pool',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Bahria Town Executive Enclave',
    city: 'Lahore',
    year: '2024',
    sqft: 4500,
    marlaSize: '1 Kanal Outdoor Zone',
    architect: 'MZ BUILT Landscape Atelier',
    completionStatus: 'Completed',
    style: 'Zen Mediterranean Oasis',
    client: 'Private Estate Owner',
    description: 'A tranquil private oasis incorporating floating concrete stepping slabs over a Koi pond, a heated overflow lap pool, gazebos with motorized louvers, and native climate-hardy flora.',
    keyFeatures: [
      'Heated saltwater swimming pool with glass tile mosaic',
      'Outdoor BBQ lounge with built-in stone pizza oven',
      'Automated drip irrigation & landscape night mood lighting'
    ],
    specs: {
      materials: ['Basalt Paving Stones', 'Glass Tile Mosaic', 'Solid Teak Louvers'],
      sustainabilityScore: 'Recirculating Water Ponds & Native Plants',
      lightingConcept: 'Submersible Underwater LED & Tree Up-Lighting',
      estimatedValuePKR: 'PKR 95 Lacs Landscape Package'
    },
    featured: false
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Chaudhry Farhan & Family',
    role: 'Homeowner, 1 Kanal Villa',
    company: 'DHA Phase 6, Sector Raya',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    projectTitle: 'The Onyx Monolith Villa',
    projectType: 'Turnkey Luxury Construction',
    location: 'Lahore',
    rating: 5,
    quote: 'MZ BUILT executed our 1 Kanal villa in Raya Phase 6 with zero flaws. They managed everything from grey structure to final Italian tile finishes on schedule!',
    fullReview: 'Building a home in Lahore can be daunting with material price fluctuations and contractor delays. Working with Ar. Zeeshan and the team at MZ BUILT was a breath of fresh air. They provided fixed transparent BOQs, daily WhatsApp drone updates, and incredible architectural aesthetics. We moved in 2 months ahead of schedule. Truly the finest architects in Lahore!',
    date: 'January 2026',
    verifiedClient: true,
    featured: true,
    projectImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    hasVideoTestimonial: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rev-2',
    author: 'Brig. (R) Tariq Mahmood',
    role: 'Owner, Margalla Sanctuary Manor',
    company: 'Sector F-7/2, Islamabad',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    projectTitle: '2 Kanal Executive Estate',
    projectType: 'Architectural Design & Turnkey Build',
    location: 'Islamabad',
    rating: 5,
    quote: 'The Margalla view integration and infinity pool engineering exceeded all expectations. Exceptional craftsmanship and integrity.',
    fullReview: 'As an overseas Pakistani based in Dubai, managing a 2 Kanal build in Islamabad F-7 required immense trust. MZ BUILT took full ownership. Their structural engineers ensured earthquakes and rain drainage were handled impeccably. Every guest visiting our estate asks for their contact!',
    date: 'December 2025',
    verifiedClient: true,
    featured: true,
    projectImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    hasVideoTestimonial: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rev-3',
    author: 'Salman Sheikh',
    role: 'Director, Real Estate Holdings',
    company: 'Gulberg III, Lahore',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    projectTitle: 'Aura Plaza Commercial Headquarters',
    projectType: 'Commercial Architecture & Construction',
    location: 'Lahore',
    rating: 5,
    quote: 'Their parametric facade design became an instant landmark in Gulberg. Commercial rental yield increased by 35% due to building prestige.',
    fullReview: 'MZ BUILT delivered an iconic 7-story commercial plaza on Main Boulevard Gulberg. The louvers and high-speed energy efficient design reduced our operating expenses while attracting top corporate tenants.',
    date: 'November 2025',
    verifiedClient: true,
    featured: true,
    projectImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    hasVideoTestimonial: false
  },
  {
    id: 'rev-4',
    author: 'Dr. Ayesha & Hamza Malik',
    role: 'Homeowners, Model Town',
    company: 'Model Town Block H',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    projectTitle: 'Heritage Villa Complete Renovation',
    projectType: 'Restoration & Modern Renovation',
    location: 'Lahore',
    rating: 5,
    quote: 'They converted our 40-year-old traditional brick home into a sunlit glass and travertine modern sanctuary.',
    fullReview: 'We loved our old location in Model Town but hated the cramped dark rooms. MZ BUILT redesigned the layout effortlessly without breaking structural load-bearing walls. Amazing team and continuous support!',
    date: 'October 2025',
    verifiedClient: true,
    featured: false,
    projectImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'm-zeeshan',
    name: 'Ar. M. Zeeshan',
    role: 'Founder & Chief Executive Officer (CEO) / Principal Architect',
    specialty: 'Contemporary Luxury Residential & Biophilic Architecture',
    bio: 'With over 16 years of architectural practice across Pakistan, UAE, and the UK, Ar. Zeeshan pioneered the biophilic modern villa aesthetic in DHA Lahore, Islamabad, and Dubai. Member of PCATP and IAP.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    yearsOfExperience: 16,
    signatureProject: 'The Onyx Monolith Villa (DHA Phase 6)',
    awards: ['IAP Excellence in Residential Design 2024', 'Lahore Architectural Heritage Honor']
  },
  {
    id: 'eng-usman',
    name: 'Engr. Usman Bukhari',
    role: 'Chief Technology Officer (CTO) & Structural Director',
    specialty: 'High-Grade Concrete Engineering, Cantilevered Decks & Earthquake Resilience',
    bio: 'Lead Structural Engineer overseeing 100+ turnkey residential and commercial structural executions in Lahore, Islamabad, and Dubai with zero structural concessions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    yearsOfExperience: 14,
    signatureProject: 'Aura Plaza 7-Story Commercial Plaza',
    awards: ['PEC Certified Senior Consultant', 'Structural Innovation Gold Medal']
  },
  {
    id: 'tariq-mansoor',
    name: 'Tariq Al-Mansoor',
    role: 'Chief Financial Officer (CFO) & Investment Director',
    specialty: 'Capital Allocation, Turnkey BOQ Financial Governance & Dubai Expansion',
    bio: 'Former senior financial strategist for Dubai real estate funds. Tariq manages capital structures, transparent material BOQ guarantees, and international investor client accounts.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    yearsOfExperience: 18,
    signatureProject: 'Palm Jumeirah Waterfront Sky Villa (Dubai)',
    awards: ['Fellow Chartered Accountant (FCA)', 'GDF Real Estate Leadership Award']
  },
  {
    id: 'interior-zainab',
    name: 'Zainab Qureshi',
    role: 'Head of Interior Architecture & Atelier',
    specialty: 'Custom Furniture Joinery, Onyx & Travertine Finishes',
    bio: 'Graduated from NCA Lahore and Milan Design Academy. Zainab curates bespoke furniture collections, acoustic paneling, and luxury ambient lighting scenes.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    yearsOfExperience: 10,
    signatureProject: 'Sky Sanctuary Penthouse Interior',
    awards: ['Milan Design Week Pakistan Showcase 2023']
  },
  {
    id: 'farooq-hassan',
    name: 'Dr. Farooq Hassan',
    role: 'Lead MEP & Sustainable Energy Director',
    specialty: 'Zero-Energy HVAC Microgrids, Crestron Smart Automation & VRF Engineering',
    bio: 'Doctorate in Building Thermal Dynamics from Imperial College London. Spearheads sustainable MEP designs that slash cooling costs by up to 45% in South Asian and Gulf climates.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    yearsOfExperience: 15,
    signatureProject: 'Margalla Sanctuary Net-Zero Manor',
    awards: ['ASHRAE Distinguished Engineer Award']
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Director of Overseas Client Relations & International Affairs',
    specialty: 'White-Glove Overseas Construction Management & Drone Site Reports',
    bio: 'Coordinates white-glove communication, daily WhatsApp video site logs, and legal escrow compliance for overseas Pakistanis and international estate buyers in Dubai, London, and North America.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    yearsOfExperience: 11,
    signatureProject: 'International Client Portfolio Network',
    awards: ['Excellence in Overseas Service Honor']
  }
];

export const TEAM_DATA = TEAM_MEMBERS;

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Free Site Visit & Land Survey',
    subtitle: 'On-site measurement, soil testing & DHA/Society regulation review',
    description: 'Our senior architect and structural engineer conduct an on-site evaluation of your plot in Lahore, Islamabad, or surrounding regions. We review soil load-bearing capacity, sun orientation, and society bylaws.',
    keyDeliverable: 'Plot Feasibility & Land Survey Report',
    duration: '1 - 2 Days',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '02',
    title: '3D BIM Architecture & 4K Walkthrough',
    subtitle: 'Floor plans, 3D elevations, structural calculus & society approval',
    description: 'We develop custom 2D floor plans, 3D photorealistic exterior and interior renderings, and 4K video walkthroughs. We also manage complete map submission and approval with DHA, LDA, Bahria, or CDA.',
    keyDeliverable: 'Approved Map & 4K Walkthrough Video',
    duration: '2 - 3 Weeks',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '03',
    title: 'Grey Structure Construction',
    subtitle: 'A+ Grade steel, ISO concrete, underground piping & termiting',
    description: 'Execution starts with precision excavation, anti-termite treatment, ISO certified 60-grade steel reinforcement, and poreless concrete slab casting under daily engineer supervision.',
    keyDeliverable: 'Completed Grey Structure with Water-Testing Certification',
    duration: '4 - 6 Months',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '04',
    title: 'Luxury Finishing & Handover',
    subtitle: 'Imported tiles, solid wood joinery, sanitary, pool & smart home',
    description: 'White-glove finishing including imported tiles, Grohe/Kohler concealed fittings, custom wardrobes, double-glazed windows, landscape, and deep cleaning before final key handover.',
    keyDeliverable: 'Turnkey Key Handover & 10-Year Warranty Certificate',
    duration: '6 - 10 Months',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
  }
];

export const ARCHITECTURAL_STYLES = [
  { id: 'organic-modernism', name: '1-Kanal Modern Minimalist', description: 'Travertine facades, double-height ceilings, glass cantilevers' },
  { id: 'neo-classical', name: 'Neo-Classical Royal Luxury', description: 'Grand stone columns, double-height porticos, ornate moulding' },
  { id: 'tropical-organic', name: 'Tropical Organic & Courtyard', description: 'Internal biophilic trees, water bodies, wooden louvers' },
  { id: 'commercial-glass', name: 'Commercial High-Rise Glass', description: 'Titanium fins, curtain walls, energy-efficient glazing' },
  { id: 'farmhouse-resort', name: 'Executive Farmhouse Resort', description: 'Sprawling lawns, infinity pool, wooden pergolas, guest chalets' }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'architecture-design',
    title: 'Architectural Design & Planning',
    shortDesc: 'Bespoke 2D/3D floor plans, 4K video renders, and housing society submission approvals (DHA, Bahria, LDA, CDA).',
    fullDesc: 'We create iconic architectural concepts tailored to site contours, sun orientation, wind direction, and family lifestyles. Complete working drawings, MEP engineering, and structural details included.',
    iconName: 'Compass',
    targetClients: ['Luxury Homeowners', 'Villa Developers', 'Commercial Property Owners'],
    features: ['2D Working Floor Plans', '3D Exterior Renders', '4K Video Walkthrough Animation', 'DHA/CDA/LDA Map Approvals'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'turnkey-construction',
    title: 'Turnkey Luxury Construction',
    shortDesc: 'Complete A+ grade grey structure and luxury finishing under one roof with transparent BOQ guarantees.',
    fullDesc: 'End-to-end master construction. From excavation, steel reinforcement, and concrete casting to imported tile fitting, solid wood doors, and smart home automation.',
    iconName: 'Building2',
    targetClients: ['Villas & Farmhouses', 'Commercial Plazas', 'Overseas Pakistanis'],
    features: ['Fixed Price BOQ Guarantee', 'Daily WhatsApp Video Site Logs', '10-Year Structural Warranty', 'Zero Material Substitution'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'
  }
];

