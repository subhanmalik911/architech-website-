export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Luxury Residential' | 'Commercial & Retail' | 'Interior Architecture' | 'Restoration & Renovation' | 'Landscape & Pool' | 'Hospitality & Cafes';
  heroImage: string;
  gallery: string[];
  location: string;
  city: 'Lahore' | 'Islamabad' | 'Karachi' | 'Rawalpindi' | 'Dubai' | 'International';
  year: string;
  sqft: number;
  marlaSize?: string; // e.g. "1 Kanal", "2 Kanal", "10 Marla", "5 Kanal Farmhouse"
  architect: string;
  completionStatus: 'Completed' | 'Under Construction' | 'In Design';
  style: string;
  client: string;
  description: string;
  keyFeatures: string[];
  floorPlanUrl?: string;
  virtual3dModelUrl?: string;
  specs: {
    materials: string[];
    sustainabilityScore: string;
    lightingConcept: string;
    estimatedValuePKR: string;
  };
  beforeAfter?: {
    beforeImage: string;
    afterImage: string;
    beforeLabel: string;
    afterLabel: string;
  };
  featured?: boolean;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  company?: string;
  avatar: string;
  projectTitle: string;
  projectType: string;
  location: string;
  rating: number; // 1-5
  quote: string;
  fullReview: string;
  date: string;
  verifiedClient: boolean;
  featured?: boolean;
  projectImage?: string;
  videoUrl?: string; // For 5-star video testimonial
  videoThumbnail?: string;
  hasVideoTestimonial?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
  yearsOfExperience: number;
  signatureProject: string;
  awards: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  targetClients: string[];
  features: string[];
  image: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  phoneWhatsApp: string;
  email: string;
  city: string;
  projectType: string;
  plotSizeSqft: number;
  estimatedBudgetPKR: string;
  preferredDate?: string;
  notes?: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Site Visit Scheduled' | 'BOQ Sent';
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyDeliverable: string;
  duration: string;
  image: string;
}

export interface SpatialEstimateResult {
  estimatedBudgetRange: string;
  recommendedMaterials: string[];
  lightingStrategy: string;
  keyArchitecturalFocus: string;
  aiDesignAdvice: string;
}
