import React, { useState, useEffect, useRef } from 'react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  blurDataUrl?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

// Architectural luxury dark base64 SVG blurred placeholder
export const DEFAULT_ARCHITECTURAL_BLUR_BASE64 = 
  "data:image/svg+xml;base64," + 
  btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" width="16" height="10">
      <filter id="blur" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
      <rect width="100%" height="100%" fill="#0d0e12"/>
      <rect width="80%" height="80%" x="10%" y="10%" fill="#8c6b47" opacity="0.35" filter="url(#blur)"/>
      <path d="M 0 10 L 8 2 L 16 10 Z" fill="#c5a059" opacity="0.25" filter="url(#blur)"/>
    </svg>
  `);

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  blurDataUrl = DEFAULT_ARCHITECTURAL_BLUR_BASE64,
  className = '',
  containerClassName = '',
  aspectRatio,
  onClick,
  referrerPolicy = 'no-referrer',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (imgRef.current) observer.unobserve(imgRef.current);
          }
        });
      },
      {
        rootMargin: '250px 0px', // Preload images 250px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden bg-[#0d0e12] ${containerClassName}`}
      style={{ aspectRatio }}
    >
      {/* Blurred Base64 Placeholder Layer */}
      <img
        src={blurDataUrl}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover filter blur-xl scale-110 transition-opacity duration-700 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Subtle Shimmer loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
      )}

      {/* Actual Image with Lazy Intersection Loading & Smooth Blur-Up Transition */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          referrerPolicy={referrerPolicy}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onClick={onClick}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded
              ? 'opacity-100 filter-none scale-100'
              : 'opacity-0 filter blur-md scale-105'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
