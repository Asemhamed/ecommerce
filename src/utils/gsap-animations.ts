import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Stagger animation for multiple elements
 */
export const animateStagger = (
  elements: Element[],
  fromState: any,
  toState: any,
  stagger: number = 0.1,
  duration: number = 0.6
) => {
  gsap.fromTo(
    elements,
    fromState,
    {
      ...toState,
      duration,
      stagger,
      ease: 'power2.out',
    }
  );
};

/**
 * Scroll-triggered animation
 */
export const animateOnScroll = (
  element: Element,
  fromState: any,
  toState: any,
  duration: number = 0.6,
  trigger: string = 'top 80%'
) => {
  gsap.fromTo(
    element,
    fromState,
    {
      ...toState,
      duration,
      scrollTrigger: {
        trigger: element,
        start: trigger,
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Button click animation
 */
export const animateButtonClick = (element: Element) => {
  gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power1.inOut',
  });
};

/**
 * Icon pulse animation
 */
export const pulseAnimation = (element: Element) => {
  gsap.to(element, {
    scale: 1.2,
    duration: 0.5,
    yoyo: true,
    repeat: 1,
    ease: 'power2.out',
  });
};

/**
 * Text reveal animation
 */
export const revealText = (element: Element, duration: number = 0.6) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      ease: 'power2.out',
    }
  );
};

/**
 * Modal entrance animation
 */
export const animateModalEntrance = (element: Element, duration: number = 0.4) => {
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9, y: -20 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration,
      ease: 'back.out(1.7)',
    }
  );
};

/**
 * Modal exit animation
 */
export const animateModalExit = (element: Element, duration: number = 0.3) => {
  return gsap.to(element, {
    opacity: 0,
    scale: 0.9,
    y: -20,
    duration,
    ease: 'power2.in',
  });
};

/**
 * Smooth scroll to element
 */
export const scrollToElement = (element: Element, duration: number = 1) => {
  gsap.to(window, {
    scrollTo: { y: element, offsetY: 100 },
    duration,
    ease: 'power2.inOut',
  });
};

/**
 * Timeline animation for complex sequences
 */
export const createTimeline = () => {
  return gsap.timeline();
};
