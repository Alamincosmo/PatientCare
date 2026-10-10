"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SpecialtiesTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;

      if (isMobile) {
        // Mobile & Tablet: Time-based entrance animation without scrolljacking/pinning
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        mobileTl
          .fromTo(
            word1Ref.current,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
          )
          .fromTo(
            word2Ref.current,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            subtitleRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          );

        return;
      }

      // Desktop: Master cinematic pinned scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=360%", // Pinned scrub range for deliberate step-by-step reading & exit
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // ==========================================
      // PHASE 1: STEP-BY-STEP ENTRANCE REVEAL
      // ==========================================

      // 1. First scroll gesture: Reveal "EVERY"
      tl.fromTo(
        word1Ref.current,
        { yPercent: 140, skewY: 10, opacity: 0 },
        { yPercent: 0, skewY: 0, opacity: 1, ease: "power3.out", duration: 1.2 }
      );

      // Breathing gap before the next word
      tl.to({}, { duration: 0.8 });

      // 2. Second scroll gesture: Reveal "SPECIALTY." in Nature Green Gradient
      tl.fromTo(
        word2Ref.current,
        { yPercent: 140, skewY: 8, opacity: 0 },
        { yPercent: 0, skewY: 0, opacity: 1, ease: "power3.out", duration: 1.3 }
      );

      // 3. Subtle tagline reveal
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.8 },
        "-=0.3"
      );

      // ==========================================
      // PHASE 2: REST / HOLD STAGE (User reads)
      // ==========================================
      tl.to({}, { duration: 1.4 });

      // ==========================================
      // PHASE 3: REVERSE EXIT ANIMATION ON SCROLL DOWN
      // Clears out smoothly before the doctor specialties grid arrives
      // ==========================================
      tl.to(subtitleRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
      });

      tl.to(
        word2Ref.current,
        {
          yPercent: -140,
          skewY: -8,
          opacity: 0,
          duration: 1.0,
          ease: "power3.in",
        },
        "-=0.5"
      );

      tl.to(
        word1Ref.current,
        {
          yPercent: -140,
          skewY: -10,
          opacity: 0,
          duration: 1.0,
          ease: "power3.in",
        },
        "-=0.6"
      );

      // Clean padding at the end of the pin before unpinning
      tl.to({}, { duration: 0.4 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[auto] py-20 lg:py-0 lg:h-screen bg-[#F9F8F6] flex flex-col items-center justify-center overflow-hidden z-20"
    >
      {/* Subtle radial ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(244,241,234,0.5)_100%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto">
        {/* Row 1: Word 1 "EVERY" */}
        <div className="overflow-hidden py-1 sm:py-2">
          <span
            ref={word1Ref}
            className="inline-block font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] tracking-tight uppercase text-[#0B0F19] leading-none will-change-transform"
          >
            EVERY
          </span>
        </div>

        {/* Row 2: Word 2 "SPECIALTY." with Nature Green Gradient */}
        <div className="overflow-hidden py-2 sm:py-4 mt-1 sm:mt-2">
          <span
            ref={word2Ref}
            className="inline-block font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] tracking-tight uppercase leading-none bg-gradient-to-r from-[#064e3b] via-[#0d5c46] to-[#10b981] bg-clip-text text-transparent pb-2 will-change-transform"
          >
            SPECIALTY.
          </span>
        </div>

        {/* Minimal High-End Subtitle / Tagline */}
        <div ref={subtitleRef} className="mt-6 sm:mt-10 overflow-hidden">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-gray-400 uppercase">
            CARE FOR EVERY CORNER OF HEALTH • 20+ DEPARTMENTS
          </p>
        </div>
      </div>
    </div>
  );
}
