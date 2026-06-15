'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HoverAnimationOptions {
  scale?: number;
  duration?: number;
  rotateZ?: number;
  shadowIntensity?: number;
}

export const useHoverAnimation = (options: HoverAnimationOptions = {}) => {
  const {
    scale = 1.05,
    duration = 0.3,
    rotateZ = 0,
    shadowIntensity = 0,
  } = options;

  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        rotateZ,
        duration,
        overwrite: 'auto',
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        rotateZ: 0,
        duration,
        overwrite: 'auto',
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scale, duration, rotateZ]);

  return elementRef;
};
