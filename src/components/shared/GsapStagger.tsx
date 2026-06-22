'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapStaggerProps {
  children: React.ReactNode;
  staggerAmount?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
  triggerOnScroll?: boolean;
}

export default function GsapStagger({
  children,
  staggerAmount = 0.08,
  direction = 'up',
  duration = 0.6,
  delay = 0,
  distance = 25,
  className = '',
  triggerOnScroll = true,
}: GsapStaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const childrenElements = Array.from(container.children);
    if (!childrenElements.length) return;

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
      gsap.fromTo(
        childrenElements,
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          stagger: staggerAmount,
          ease: 'power2.out',
          delay,
          scrollTrigger: triggerOnScroll
            ? {
                trigger: container,
                start: 'top 90%',
                toggleActions: 'play none none none',
              }
            : undefined,
        }
      );
    }, container);

    return () => ctx.revert();
  }, [staggerAmount, direction, duration, delay, distance, triggerOnScroll]);

  return (
    <div ref={containerRef} className={`[&>*]:opacity-0 ${className}`}>
      {children}
    </div>
  );
}
