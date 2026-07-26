import React, { useRef, useState, useEffect } from 'react';

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number; // Magnetic pull intensity (default 0.35)
  radius?: number;   // Detection radius in pixels around element center (default 100)
  className?: string;
  disabled?: boolean;
}

export const MagneticWrapper: React.FC<MagneticWrapperProps> = ({
  children,
  strength = 0.35,
  radius = 110,
  className = '',
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMagneticActive, setIsMagneticActive] = useState(false);

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      setIsMagneticActive(false);
      return;
    }

    const element = ref.current;
    if (!element) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < radius) {
        setIsMagneticActive(true);
        // Calculate offset with subtle magnetic dampening
        const targetX = dx * strength;
        const targetY = dy * strength;

        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          setPosition({ x: targetX, y: targetY });
        });
      } else {
        if (isMagneticActive) {
          setIsMagneticActive(false);
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(() => {
            setPosition({ x: 0, y: 0 });
          });
        }
      }
    };

    const handleMouseLeave = () => {
      setIsMagneticActive(false);
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: 0, y: 0 });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [disabled, radius, strength, isMagneticActive]);

  return (
    <div
      ref={ref}
      className={`inline-block ${
        isMagneticActive
          ? 'transition-transform duration-75 ease-out'
          : 'transition-transform duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      } ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
