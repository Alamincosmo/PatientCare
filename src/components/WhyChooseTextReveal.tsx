"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhyChooseTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLSpanElement>(null);
  const chooseRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
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
            whyRef.current,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
          )
          .fromTo(
            chooseRef.current,
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            brandRef.current,
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
          end: "+=380%", // Expanded distance to comfortably allow: 1) word reveals, 2) reading hold, 3) reverse exit
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // ==========================================
      // PHASE 1: STEP-BY-STEP ENTRANCE REVEAL
      // ==========================================

      // 1. First scroll gesture: Reveal "WHY"
      tl.fromTo(
        whyRef.current,
        { yPercent: 140, skewY: 10, opacity: 0 },
        { yPercent: 0, skewY: 0, opacity: 1, ease: "power3.out", duration: 1.2 }
      );

      // Distinct breathing gap before the next word
      tl.to({}, { duration: 0.8 });

      // 2. Second scroll gesture: Reveal "CHOOSE"
      tl.fromTo(
        chooseRef.current,
        { yPercent: 140, skewY: 10, opacity: 0 },
        { yPercent: 0, skewY: 0, opacity: 1, ease: "power3.out", duration: 1.2 }
      );

      // Distinct breathing gap before the brand name
      tl.to({}, { duration: 0.8 });

      // 3. Third scroll gesture: Reveal Logo + "PatientCare"
      tl.fromTo(
        brandRef.current,
        { yPercent: 140, skewY: 8, opacity: 0 },
        { yPercent: 0, skewY: 0, opacity: 1, ease: "power3.out", duration: 1.4 }
      );

      // 4. Subtle tagline reveal
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.8 },
        "-=0.3"
      );

      // ==========================================
      // PHASE 2: REST / HOLD STAGE (User reads)
      // ==========================================
      tl.to({}, { duration: 1.5 });

      // ==========================================
      // PHASE 3: REVERSE EXIT ANIMATION ON SCROLL DOWN
      // Smoothly clears out so the transition into next section is seamless
      // ==========================================
      tl.to(subtitleRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
      });

      tl.to(
        brandRef.current,
        {
          yPercent: -140,
          skewY: -8,
          opacity: 0,
          duration: 1.1,
          ease: "power3.in",
        },
        "-=0.4"
      );

      tl.to(
        chooseRef.current,
        {
          yPercent: -140,
          skewY: -10,
          opacity: 0,
          duration: 1.0,
          ease: "power3.in",
        },
        "-=0.6"
      );

      tl.to(
        whyRef.current,
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
      tl.to({}, { duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[auto] py-20 lg:py-0 lg:h-screen bg-[#FAF9F6] flex flex-col items-center justify-center overflow-hidden z-20"
    >
      {/* Subtle ambient clinical light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(244,241,234,0.5)_100%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto">
        {/* Row 1: "WHY" and "CHOOSE" revealed one-by-one */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {/* Word 1: WHY */}
          <div className="overflow-hidden py-1 sm:py-2">
            <span
              ref={whyRef}
              className="inline-block font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase text-[#0B0F19] leading-none will-change-transform"
            >
              WHY
            </span>
          </div>

          {/* Word 2: CHOOSE */}
          <div className="overflow-hidden py-1 sm:py-2">
            <span
              ref={chooseRef}
              className="inline-block font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase text-[#0B0F19] leading-none will-change-transform"
            >
              CHOOSE
            </span>
          </div>
        </div>

        {/* Row 2: SVG Logo + "PatientCare" in Topbar Lobster Font with Nature Green Gradient */}
        <div className="overflow-hidden py-2 sm:py-4 mt-2 sm:mt-4">
          <div
            ref={brandRef}
            className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 will-change-transform"
          >
            {/* Website SVG Logo */}
            <img
              src="/patientCare logo.svg"
              alt="PatientCare Logo"
              className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain shrink-0 drop-shadow-md"
            />

            {/* Custom Brand Font: Sans-serif with Nature Green Gradient */}
            <span className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black tracking-tight leading-none bg-gradient-to-r from-[#064e3b] via-[#0d5c46] to-[#10b981] bg-clip-text text-transparent pb-1 drop-shadow-sm">
              Patient Care
            </span>
          </div>
        </div>

        {/* Subtitle / Tagline */}
        <div ref={subtitleRef} className="mt-6 sm:mt-10 overflow-hidden">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-gray-400 uppercase">
            BANGLADESH&apos;S #1 HEALTHCARE NETWORK • ZERO WAIT-TIME
          </p>
        </div>
      </div>
    </div>
  );
}
