export interface SeoMetadataOptions {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

export interface ProjectSeoConfig {
  projectId: string;
  pageTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  keywords: string;
  ogImage?: string;
}

/**
 * Dynamically updates document head elements including title, meta description,
 * canonical link tag, keywords, and OpenGraph social metadata.
 */
export function updateSeoMetadata(options: SeoMetadataOptions | ProjectSeoConfig): void {
  if (typeof document === 'undefined') return;

  const title = 'pageTitle' in options ? options.pageTitle : options.title;
  const description = 'metaDescription' in options ? options.metaDescription : options.description;

  // 1. Document Title
  if (title) {
    document.title = title;

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // Twitter Title
    let twTitle = document.querySelector('meta[property="twitter:title"]');
    if (!twTitle) {
      twTitle = document.createElement('meta');
      twTitle.setAttribute('property', 'twitter:title');
      document.head.appendChild(twTitle);
    }
    twTitle.setAttribute('content', title);
  }

  // 2. Meta Description
  if (description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Twitter Description
    let twDesc = document.querySelector('meta[property="twitter:description"]');
    if (!twDesc) {
      twDesc = document.createElement('meta');
      twDesc.setAttribute('property', 'twitter:description');
      document.head.appendChild(twDesc);
    }
    twDesc.setAttribute('content', description);
  }

  // 3. Canonical Link Tag
  if (options.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', options.canonicalUrl);

    // OpenGraph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', options.canonicalUrl);

    // Twitter URL
    let twUrl = document.querySelector('meta[property="twitter:url"]');
    if (!twUrl) {
      twUrl = document.createElement('meta');
      twUrl.setAttribute('property', 'twitter:url');
      document.head.appendChild(twUrl);
    }
    twUrl.setAttribute('content', options.canonicalUrl);
  }

  // 4. Meta Keywords
  if (options.keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', options.keywords);
  }

  // 5. OpenGraph & Twitter Image
  if (options.ogImage) {
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute('content', options.ogImage);

    let twImg = document.querySelector('meta[property="twitter:image"]');
    if (!twImg) {
      twImg = document.createElement('meta');
      twImg.setAttribute('property', 'twitter:image');
      document.head.appendChild(twImg);
    }
    twImg.setAttribute('content', options.ogImage);
  }
}

/**
 * Generate standard canonical URL for a given project ID or slug.
 */
export function getProjectCanonicalUrl(projectId: string, baseUrl = 'https://mzbuilt.com'): string {
  const cleanId = projectId.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return `${baseUrl}/portfolio/${cleanId}`;
}

/**
 * Generate default SEO metadata configuration for a project item.
 */
export function generateDefaultProjectSeo(project: {
  id: string;
  title: string;
  category: string;
  location: string;
  city: string;
  description: string;
  heroImage: string;
}): ProjectSeoConfig {
  const canonicalUrl = getProjectCanonicalUrl(project.id);
  const pageTitle = `${project.title} | ${project.category} in ${project.location}, ${project.city} - MZ BUILT`;
  const metaDescription = `${project.description} Explore structural floor plans, 3D renderings, and turnkey BOQ estimates by MZ BUILT atelier.`;
  const keywords = `${project.title}, Architect in ${project.city}, ${project.category}, ${project.location} Villa, Luxury Construction Pakistan, MZ BUILT`;

  return {
    projectId: project.id,
    pageTitle,
    metaDescription,
    canonicalUrl,
    keywords,
    ogImage: project.heroImage,
  };
}
