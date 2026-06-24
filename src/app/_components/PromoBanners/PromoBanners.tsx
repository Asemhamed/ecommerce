'use client';

import Link from "next/link";
import { Flame, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const promos = [
  {
    tag: "Deal of the Day",
    tagIcon: <Flame className="w-3.5 h-3.5" />,
    tagBg: "bg-white/20",
    title: "Fresh Organic Fruits",
    desc: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    bg: "bg-green-600",
    accent: "bg-green-500",
    href: "/products",
    slideFrom: "left", // slide in from left
  },
  {
    tag: "New Arrivals",
    tagIcon: <Sparkles className="w-3.5 h-3.5" />,
    tagBg: "bg-white/20",
    title: "Exotic Vegetables",
    desc: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    bg: "bg-orange-500",
    accent: "bg-orange-400",
    href: "/products",
    slideFrom: "right", // slide in from right
  },
];

function PromoCard({ promo, index }: { promo: (typeof promos)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const discountRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const xFrom = promo.slideFrom === "left" ? -80 : 80;

    const ctx = gsap.context(() => {
      // Card slides in from left or right
      gsap.fromTo(
        card,
        { opacity: 0, x: xFrom, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // Decorative circles pulse in
      gsap.fromTo(
        [circle1Ref.current, circle2Ref.current],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          stagger: 0.15,
          delay: 0.3,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // Inner elements stagger up
      gsap.fromTo(
        [tagRef.current, titleRef.current, descRef.current, discountRef.current, ctaRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.25,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // Continuous floating animation for circle1
      gsap.to(circle1Ref.current, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Continuous floating animation for circle2 (offset)
      gsap.to(circle2Ref.current, {
        y: 8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }, card);

    return () => ctx.revert();
  }, [promo.slideFrom]);

  return (
    <div
      ref={cardRef}
      style={{ opacity: 0 }}
      className={`relative ${promo.bg} rounded-2xl overflow-hidden p-7 flex flex-col gap-4 shadow-lg`}
    >
      {/* Decorative circles */}
      <div
        ref={circle1Ref}
        className={`absolute -top-8 -right-8 w-40 h-40 rounded-full ${promo.accent} opacity-40`}
        style={{ opacity: 0 }}
      />
      <div
        ref={circle2Ref}
        className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${promo.accent} opacity-30`}
        style={{ opacity: 0 }}
      />

      {/* Tag */}
      <span
        ref={tagRef}
        style={{ opacity: 0 }}
        className={`inline-flex items-center gap-1.5 text-white/90 text-xs font-bold ${promo.tagBg} backdrop-blur-sm rounded-full px-3 py-1 w-fit`}
      >
        {promo.tagIcon}
        {promo.tag}
      </span>

      {/* Text */}
      <div>
        <h3
          ref={titleRef}
          style={{ opacity: 0 }}
          className="text-white text-2xl font-extrabold leading-tight mb-1"
        >
          {promo.title}
        </h3>
        <p
          ref={descRef}
          style={{ opacity: 0 }}
          className="text-white/80 text-sm"
        >
          {promo.desc}
        </p>
      </div>

      {/* Discount + Code */}
      <div ref={discountRef} style={{ opacity: 0 }} className="flex items-center gap-3">
        <span className="text-white text-xl font-black">{promo.discount}</span>
        <span className="text-white/80 text-xs">
          Use code:{" "}
          <span className="bg-white/20 text-white font-bold rounded px-2 py-0.5 ml-0.5">
            {promo.code}
          </span>
        </span>
      </div>

      {/* CTA */}
      <Link
        ref={ctaRef}
        href={promo.href}
        style={{ opacity: 0 }}
        className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-sm rounded-full px-5 py-2.5 w-fit hover:bg-gray-100 transition-colors shadow-sm"
      >
        Explore Now →
      </Link>
    </div>
  );
}

export default function PromoBanners() {
  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {promos.map((promo, i) => (
          <PromoCard key={i} promo={promo} index={i} />
        ))}
      </div>
    </div>
  );
}
