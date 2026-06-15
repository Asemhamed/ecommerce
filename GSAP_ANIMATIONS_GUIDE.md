# GSAP Animations Implementation Guide

This guide documents all GSAP animations implemented in the FreshCart e-commerce project. GSAP (GreenSock Animation Platform) provides smooth, high-performance animations across all components.

## Installation

GSAP has been installed via npm:
```bash
npm install gsap
```

## Animation Types Implemented

### 1. **Scroll-Based Animations** (ScrollTrigger Plugin)

#### Product Cards
- **File**: `src/app/_components/ProductCard/ProductCard.tsx`
- **Animation**: Fade-in with scale and slide-up
- **Trigger**: When card enters viewport (85% from top)
- **Properties**:
  - Opacity: 0 → 1
  - Y Position: 30px → 0
  - Scale: 0.95 → 1
  - Duration: 0.6s
  - Easing: `power2.out`

#### Home Banner Features
- **File**: `src/app/_components/HomeBanner/HomeBanner.tsx`
- **Animation**: Staggered fade-in with slide-up
- **Trigger**: Individual feature card entrance
- **Properties**:
  - Opacity: 0 → 1
  - Y Position: 40px → 0
  - Duration: 0.6s
  - Stagger: 0.1s between each feature
  - Easing: `power2.out`

#### Category Slider
- **File**: `src/app/_components/Slider/Slider.tsx`
- **Animation**: Fade-in with slide-up
- **Trigger**: When slider enters viewport
- **Properties**:
  - Opacity: 0 → 1
  - Y Position: 30px → 0
  - Duration: 0.8s
  - Easing: `power2.out`

#### Footer
- **File**: `src/app/_components/Footer/FooterClient.tsx`
- **Animations**:
  - **Footer Container**: Fade-in with slide-up
    - Duration: 0.8s
    - Trigger: 90% from viewport top
  - **Footer Columns**: Staggered slide-in from left
    - Stagger: 0.1s between columns
    - Opacity: 0 → 1
    - X Position: -20px → 0
    - Duration: 0.6s

### 2. **Entrance Animations**

#### Navbar
- **File**: `src/app/_components/NavBar/Navbar.tsx`
- **Animation**: Slide down with fade-in
- **Timing**: On component mount
- **Properties**:
  - Opacity: 0 → 1
  - Y Position: -20px → 0
  - Duration: 0.6s
  - Easing: `power2.out`

#### Main Slider
- **File**: `src/app/_components/MainSlider/MianSlider.tsx`
- **Animation**: Fade-in with slide-up
- **Timing**: On component mount
- **Properties**:
  - Opacity: 0 → 1
  - Y Position: 30px → 0
  - Duration: 0.8s
  - Easing: `power2.out`

## Custom Hooks

### 1. `useScrollAnimation`
**Location**: `src/hooks/useScrollAnimation.tsx`

Hook for implementing scroll-triggered animations on multiple elements. Uses ScrollTrigger plugin for detecting viewport intersection.

**Usage**:
```tsx
const containerRef = useScrollAnimation({
  duration: 0.8,
  stagger: 0.2,
  delay: 0,
  from: false
});

return <div ref={containerRef}>
  <div data-animate="fadeIn">Content</div>
  <div data-animate="slideInUp">Content</div>
</div>
```

**Supported Animation Types**:
- `fadeIn`: Opacity only
- `slideInUp`: Fade + move up
- `slideInDown`: Fade + move down
- `slideInLeft`: Fade + move left
- `slideInRight`: Fade + move right
- `scaleIn`: Fade + scale
- `rotateIn`: Fade + rotate

### 2. `useHoverAnimation`
**Location**: `src/hooks/useHoverAnimation.tsx`

Hook for interactive hover effects with smooth transitions.

**Usage**:
```tsx
const elementRef = useHoverAnimation({
  scale: 1.05,
  duration: 0.3,
  rotateZ: 0,
  shadowIntensity: 0
});

return <div ref={elementRef}>Hover me!</div>
```

### 3. `usePageTransition`
**Location**: `src/hooks/usePageTransition.tsx`

Hook for page-level transition animations when navigating between routes.

**Usage**:
```tsx
usePageTransition({
  duration: 0.6,
  staggerChildren: 0.1
});
```

## Utility Functions

**Location**: `src/utils/gsap-animations.ts`

Reusable animation utilities for common patterns:

### Available Functions:

1. **`animateStagger`** - Stagger multiple elements with custom animations
2. **`animateOnScroll`** - Trigger animations when elements enter viewport
3. **`animateButtonClick`** - Quick press/release animation for buttons
4. **`pulseAnimation`** - Pulse effect for icons/badges
5. **`revealText`** - Text reveal animation
6. **`animateModalEntrance`** - Modal open animation with bounce
7. **`animateModalExit`** - Modal close animation
8. **`scrollToElement`** - Smooth scroll to target element
9. **`createTimeline`** - Create complex animation sequences

## Plugin Registration

ScrollTrigger plugin is registered globally in components that need scroll-based animations:

```tsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

## Performance Considerations

### Best Practices Implemented:

1. **Plugin Registration**: Only registered in components that need it
2. **Cleanup**: ScrollTrigger animations are properly cleaned up on unmount
3. **GPU Acceleration**: Using `transform` properties (opacity, scale, x, y) for optimal performance
4. **Staggering**: Used to distribute animation timing and reduce jank
5. **Duration**: Kept between 0.3s-0.8s for smooth but not sluggish animations
6. **Easing**: Using `power2.out` for natural-feeling animations

## Browser Compatibility

GSAP supports all modern browsers:
- Chrome 40+
- Firefox 29+
- Safari 9+
- Edge 12+
- Mobile browsers (iOS Safari, Android Chrome)

## Animation Triggers

### Scroll Triggers
- **Start**: `top 80-90%` - Elements animate when 80-90% from top of viewport
- **ToggleActions**: `play none none none` - Plays on enter, no reverse on exit

### Entrance Animations
- Run on component mount using `useEffect`
- No scroll trigger needed
- Immediate execution

## Adding New Animations

### Template for Scroll Animation:

```tsx
'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <div ref={containerRef}>Content</div>;
}
```

## Easing Options

Common easing functions used in this project:
- `power0.none` - Linear
- `power1.out` - Slight ease
- `power2.out` - Moderate ease (most common)
- `power3.out` - Strong ease
- `back.out(1.7)` - Bouncy ease
- `power2.in` - Ease in for exits
- `power1.inOut` - Smooth in/out

## Testing Animations

To test animations in development:

1. Open the dev server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Scroll down to trigger scroll-based animations
4. Open DevTools to inspect animation performance in Performance tab
5. Check for smooth 60fps animations

## Common Issues & Solutions

### ScrollTrigger not triggering
- Ensure `gsap.registerPlugin(ScrollTrigger)` is called before creating triggers
- Verify `ref` is attached to correct DOM element
- Check that element has height and is within viewport

### Animations laggy
- Use `transform` properties (opacity, scale, x, y) instead of position/width
- Reduce number of simultaneously animating elements
- Check CPU usage in DevTools Performance tab

### Animations not cleaning up
- Always return cleanup function that kills ScrollTrigger instances
- Use `.forEach((trigger) => trigger.kill())` pattern

## Resources

- **GSAP Documentation**: https://greensock.com/docs/
- **ScrollTrigger Plugin**: https://greensock.com/docs/v3/Plugins/ScrollTrigger
- **GSAP Easing**: https://greensock.com/docs/v3/Eases

## Summary of Implementations

| Component | Animation Type | Trigger | Status |
|-----------|----------------|---------|--------|
| Navbar | Slide down fade-in | Mount | ✓ |
| Main Slider | Fade-in slide-up | Mount | ✓ |
| Home Banner | Staggered fade-in | Scroll | ✓ |
| Category Slider | Fade-in slide-up | Scroll | ✓ |
| Product Cards | Scale fade-in | Scroll | ✓ |
| Footer | Staggered slide-in | Scroll | ✓ |
| Hover States | Scale/rotate | Mouse over | ✓ (via CSS) |

All animations are fully functional and optimized for performance!
