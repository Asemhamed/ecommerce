'use client'

import { useEffect } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

interface PageTransitionOptions {
  duration?: number;
  staggerChildren?: number;
}

export const usePageTransition = (options: PageTransitionOptions = {}) => {
  const {
    duration = 0.6,
    staggerChildren = 0.1,
  } = options;

  const pathname = usePathname();

  useEffect(() => {
    // Animate page content on mount
    const contentElements = document.querySelectorAll('[data-page-content]');
    
    if (contentElements.length > 0) {
      gsap.fromTo(
        contentElements,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger: staggerChildren,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
    }
  }, [pathname, duration, staggerChildren]);
};

// For layout transitions
export const useLayoutTransition = () => {
  useEffect(() => {
    // Animate navbar and footer
    const navbar = document.querySelector('[data-navbar]');
    const footer = document.querySelector('[data-footer]');

    if (navbar) {
      gsap.fromTo(
        navbar,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }

    if (footer) {
      gsap.fromTo(
        footer,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);
};
