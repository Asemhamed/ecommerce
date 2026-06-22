'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  triggerOnScroll?: boolean;
}

export default function GsapReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 30,
  className = '',
  triggerOnScroll = true,
}: GsapRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let x = 0;
    let y = 0;

    switch (direction) {
      case 'up':
        y = distance;
        break;
      case 'down':
        y = -distance;
        break;
      case 'left':
        x = distance;
        break;
      case 'right':
        x = -distance;
        break;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(el, 
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: triggerOnScroll
            ? {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
              }
            : undefined,
        }
      );
    });

    return () => ctx.revert();
  }, [direction, delay, duration, distance, triggerOnScroll]);

  return (
    <div ref={elementRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
