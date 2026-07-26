/**
 * CDN Image Optimization Utility
 * 
 * Automatically applies CDN parameters (width, quality, formatting, webp)
 * to high-resolution external asset URLs (e.g., Unsplash, Cloudinary, Imgix)
 * to minimize bandwidth and accelerate render times.
 */

export type ImageSizePreset = 'thumb' | 'card' | 'hero' | 'modal' | 'avatar';

interface OptimizationOptions {
  width?: number;
  quality?: number;
  preset?: ImageSizePreset;
}

const PRESET_WIDTHS: Record<ImageSizePreset, number> = {
  avatar: 200,
  thumb: 400,
  card: 800,
  modal: 1200,
  hero: 1600,
};

/**
 * Transforms raw image URLs into CDN-optimized URLs.
 */
export function getOptimizedCdnUrl(rawUrl: string, options: OptimizationOptions = {}): string {
  if (!rawUrl) return rawUrl;

  const targetWidth = options.width || (options.preset ? PRESET_WIDTHS[options.preset] : 800);
  const targetQuality = options.quality || 80;

  try {
    // Unsplash Optimization
    if (rawUrl.includes('images.unsplash.com')) {
      const urlObj = new URL(rawUrl);
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fit', 'crop');
      urlObj.searchParams.set('w', targetWidth.toString());
      urlObj.searchParams.set('q', targetQuality.toString());
      return urlObj.toString();
    }

    // Cloudinary Optimization
    if (rawUrl.includes('res.cloudinary.com')) {
      if (rawUrl.includes('/upload/')) {
        const transformation = `f_auto,q_auto:${targetQuality},w_${targetWidth},c_limit`;
        return rawUrl.replace('/upload/', `/upload/${transformation}/`);
      }
    }

    // Generic Imgix or query-based CDNs
    if (rawUrl.includes('?') && (rawUrl.includes('w=') || rawUrl.includes('width='))) {
      const urlObj = new URL(rawUrl);
      if (urlObj.searchParams.has('w')) urlObj.searchParams.set('w', targetWidth.toString());
      if (urlObj.searchParams.has('width')) urlObj.searchParams.set('width', targetWidth.toString());
      if (urlObj.searchParams.has('q')) urlObj.searchParams.set('q', targetQuality.toString());
      return urlObj.toString();
    }
  } catch (err) {
    // Return original URL as fallback if URL parsing fails
    return rawUrl;
  }

  return rawUrl;
}
