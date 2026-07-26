// MZ BUILT Template Configuration
// You can change company name, logo typography, contact numbers, and keywords here.

export const SITE_CONFIG = {
  brandName: "MZ BUILT",
  brandSubtitle: "Architects & Luxury Master Builders",
  tagline: "Crafting Iconic Architectural Masterpieces & Luxury Estates",
  locationTagline: "Premier Architects & Turnkey Construction Specialists in Lahore & Globally",
  
  // Primary Contact Methods (WhatsApp, Phone, Email, Address)
  whatsappNumber: "+923008459911", // Direct WhatsApp number format without spaces/plus for api.whatsapp.com
  displayWhatsapp: "+92 300 845 9911",
  phoneNumber: "+923008459911",
  displayPhone: "+92 300 845 9911",
  email: "info@mzbuilt.com",
  consultationEmail: "consult@mzbuilt.com",
  
  // Head Office & Atelier Locations
  primaryAddress: "74-Main Boulevard, Gulberg III, Lahore, Pakistan",
  ateliers: [
    {
      city: "Lahore (Head Atelier)",
      area: "Gulberg III & DHA Phase 6 Executive Office",
      address: "74-Main Boulevard, Gulberg III, Lahore",
      phone: "+92 300 845 9911",
      mapsUrl: "https://maps.google.com/?q=Gulberg+3+Lahore"
    },
    {
      city: "Islamabad",
      area: "Sector F-7/2 & Blue Area",
      address: "12-Main Executive Plaza, F-7 Markaz, Islamabad",
      phone: "+92 300 845 9922",
      mapsUrl: "https://maps.google.com/?q=F-7+Markaz+Islamabad"
    },
    {
      city: "Dubai",
      area: "DIFC Gate Precinct Building 4",
      address: "Suite 1204, DIFC, Dubai, UAE",
      phone: "+971 4 890 1100",
      mapsUrl: "https://maps.google.com/?q=DIFC+Dubai"
    }
  ],

  // Targeted Keywords & SEO Highlights
  keywords: [
    "Architect in Lahore",
    "Luxury Villa Construction Lahore",
    "DHA Phase 6 & 8 Architect",
    "Turnkey Construction Company",
    "Commercial Architecture Gulberg",
    "1 Kanal Modern Villa Design",
    "2 Kanal Farmhouse Architecture",
    "Grey Structure & Finishing Packages"
  ],

  // Google Reviews Summary
  googleReviews: {
    rating: 4.9,
    totalReviews: 184,
    googleMapsUrl: "https://maps.google.com",
    badgeText: "Google Verified 5-Star Architectural Firm"
  },

  // Package Pricing (PKR per Sq Ft / Package estimates)
  pricingPackages: [
    {
      id: "grey-structure",
      name: "Grey Structure Executive",
      pricePerSqFt: "PKR 2,250",
      rawPrice: 2250,
      unit: "per sq. ft.",
      popular: false,
      tagline: "Solid Engineering & High-Grade Concrete Framework",
      features: [
        "A+ Grade Bricks & ISO Certified Steel Reinforcement",
        "Poreless Concrete Slab Casting & Termite Proofing",
        "Complete Underground Piping & Conduit Layout",
        "Boundary Wall, Underground Water Tank & Overheads",
        "Dedicated Structural Engineer On-Site Supervision",
        "Architectural Working Drawings & Submission Approval"
      ],
      idealFor: "Homeowners looking for robust, zero-compromise structural execution."
    },
    {
      id: "turnkey-luxury",
      name: "Turnkey Luxury Villa",
      pricePerSqFt: "PKR 4,850",
      rawPrice: 4850,
      unit: "per sq. ft.",
      popular: true,
      tagline: "Move-In Ready Architectural Elegance & Premium Finishes",
      features: [
        "Everything in Grey Structure Included",
        "Imported Spanish/Italian Porcelain Flooring & Wall Tiles",
        "Custom Solid Oak/Ash Wood Doors, Wardrobes & Kitchen Cabinets",
        "Double Glazed Thermally Insulated Aluminum Windows",
        "Grohe/Kohler Sanitary Ware & Smart Concealed Fixtures",
        "Complete Landscape Architecture & Accent Illumination",
        "10-Year Structural Warranty & 2-Year Maintenance Guarantee"
      ],
      idealFor: "Discerning clients seeking end-to-end luxury with zero stress."
    },
    {
      id: "architectural-design-monograph",
      name: "Architectural & Interior Design",
      pricePerSqFt: "PKR 250",
      rawPrice: 250,
      unit: "per sq. ft.",
      popular: false,
      tagline: "Complete 2D/3D BIM Drawings & Photorealistic Walkthroughs",
      features: [
        "Full Architectural Floor Plans & Elevations",
        "High-Resolution 3D Exterior & Interior Renderings",
        "4K Cinematic Video Walkthrough Animation",
        "MEP (Mechanical, Electrical, Plumbing) Engineering Sheets",
        "Material Selection Schedule & Cost BOQ Estimation",
        "Town Planning & Housing Society Approval Drawings (DHA/Bahria/LDA)"
      ],
      idealFor: "Clients wanting world-class design before commencement."
    },
    {
      id: "estate-masterplan",
      name: "Executive Master Estate (2 Kanal+)",
      pricePerSqFt: "Custom Quote",
      rawPrice: 5800,
      unit: "custom luxury package",
      popular: false,
      tagline: "Bespoke Farmhouses, Penthouse Patios & Grand Manors",
      features: [
        "Custom Infinity Pools, Thermal Saunas & Private Elevators",
        "Imported Natural Marble, Travertine Facades & Curved Glass",
        "Integrated Smart Home Automation (Crestron/Lutron)",
        "Biophilic Courtyards & Rooftop Entertainment Lounges",
        "VIP Project Director & Daily HD Drone Site Reports",
        "Unlimited Revisions & Concierge Material Procurement"
      ],
      idealFor: "Ultra-high-net-worth clients building legacy landmarks."
    }
  ]
};
