'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  duration?: number;
  stagger?: number;
  delay?: number;
  from?: boolean;
  markers?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    duration = 0.8,
    stagger = 0.2,
    delay = 0,
    from = false,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('[data-animate]');
    if (elements.length === 0) return;

    const animateElements = () => {
      elements.forEach((element) => {
        const animationType = (element as HTMLElement).dataset.animate || 'fadeIn';

        if (from) {
          gsap.fromTo(
            element,
            getFromState(animationType),
            {
              ...getToState(animationType),
              duration,
              scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none none',
              },
            }
          );
        } else {
          gsap.to(element, {
            ...getToState(animationType),
            duration,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none none',
            },
          });
        }
      });
    };

    animateElements();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [duration, from]);

  return containerRef;
};

function getFromState(type: string) {
  switch (type) {
    case 'fadeIn':
      return { opacity: 0 };
    case 'slideInUp':
      return { opacity: 0, y: 50 };
    case 'slideInDown':
      return { opacity: 0, y: -50 };
    case 'slideInLeft':
      return { opacity: 0, x: -50 };
    case 'slideInRight':
      return { opacity: 0, x: 50 };
    case 'scaleIn':
      return { opacity: 0, scale: 0.8 };
    case 'rotateIn':
      return { opacity: 0, rotation: -45 };
    default:
      return { opacity: 0 };
  }
}

function getToState(type: string) {
  switch (type) {
    case 'fadeIn':
      return { opacity: 1 };
    case 'slideInUp':
      return { opacity: 1, y: 0 };
    case 'slideInDown':
      return { opacity: 1, y: 0 };
    case 'slideInLeft':
      return { opacity: 1, x: 0 };
    case 'slideInRight':
      return { opacity: 1, x: 0 };
    case 'scaleIn':
      return { opacity: 1, scale: 1 };
    case 'rotateIn':
      return { opacity: 1, rotation: 0 };
    default:
      return { opacity: 1 };
  }
}
