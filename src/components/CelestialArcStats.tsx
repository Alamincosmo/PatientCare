"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatMetric {
  id: string;
  targetNumber: number;
  prefix?: string;
  suffix: string;
  title: string;
  subPre: string;
  highlightWord: string;
  subPost: string;
  themeColor: string;
}

const CELESTIAL_METRICS: StatMetric[] = [
  {
    id: "doctors",
    targetNumber: 72,
    suffix: "+",
    title: "Specialist Doctors",
    subPre: "Active Chambers Across ",
    highlightWord: "Bangladesh",
    subPost: "",
    themeColor: "#0d5c46",
  },
  {
    id: "specialties",
    targetNumber: 20,
    suffix: "",
    title: "Medical Specialties",
    subPre: "From Cardiology to ",
    highlightWord: "Pediatrics",
    subPost: "",
    themeColor: "#0c6a4d",
  },
  {
    id: "speed",
    targetNumber: 2,
    prefix: "< ",
    suffix: " Min",
    title: "Serial to SMS Confirmation",
    subPre: "Zero ",
    highlightWord: "Waiting Room",
    subPost: " Bottlenecks",
    themeColor: "#09533e",
  },
  {
    id: "satisfaction",
    targetNumber: 99,
    suffix: "%",
    title: "Patient Satisfaction",
    subPre: "Verified Across ",
    highlightWord: "10,000+ Visits",
    subPost: "",
    themeColor: "#064030",
  },
];

export default function CelestialArcStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Title Phase Refs ("WHY CHOOSE PatientCare")
  const titleStageRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLSpanElement>(null);
  const chooseRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  // Celestial Arc Stage Refs
  const arcStageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const auraRef = useRef<HTMLDivElement>(null);

  // Desktop States
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([0, 0, 0, 0]);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  // Mobile 3D Celestial Horizon Arc Controller
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileDrumRef = useRef({ progress: 0 });
  const [mobileActiveIdx, setMobileActiveIdx] = useState<number>(0);
  const [mobileAnimatedNumbers, setMobileAnimatedNumbers] = useState<number[]>([72, 0, 0, 0]);
  const mobileNumbersTriggered = useRef<boolean[]>([true, false, false, false]);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInteractingRef = useRef<boolean>(false);

  const triggerMobileCounter = (index: number) => {
    const target = CELESTIAL_METRICS[index].targetNumber;
    const counterObj = { val: 0 };

    gsap.to(counterObj, {
      val: target,
      duration: 0.9,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: () => {
        setMobileAnimatedNumbers((prev) => {
          const updated = [...prev];
          updated[index] = Math.round(counterObj.val);
          return updated;
        });
      },
    });
  };

  const updateMobileArc = (prog: number) => {
    const cards = mobileCardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const numCards = CELESTIAL_METRICS.length;
    const closestIdx = Math.min(numCards - 1, Math.max(0, Math.round(prog)));
    setMobileActiveIdx(closestIdx);

    // Spacious horizontal spacing (~265px) so adjacent cards have clean breathing room and zero overlap
    const spacing = 265;

    cards.forEach((card, i) => {
      const diff = i - prog;
      const absDiff = Math.abs(diff);

      const posX = diff * spacing;
      const posY = Math.pow(absDiff, 1.35) * 36;
      const posZ = -Math.min(300, Math.pow(absDiff, 1.2) * 140);

      const scale = Math.max(0.72, 1.0 - absDiff * 0.22);
      const rotZ = diff * 9;
      const rotY = -diff * 16;
      const rotX = Math.abs(diff) * 4;

      // Adjacent cards stay soft and muted in the background (opacity 0.28, blur 4px)
      const opacity = Math.max(0, 1 - absDiff * 0.72);
      const blur = absDiff > 0.28 ? Math.min(6, (absDiff - 0.28) * 5.5) : 0;
      const zIndex = Math.round(100 - absDiff * 25);
      const isVisible = absDiff < 1.35;

      gsap.set(card, {
        x: posX,
        y: posY,
        z: posZ,
        rotationZ: rotZ,
        rotationY: rotY,
        rotationX: rotX,
        scale: scale,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        zIndex: zIndex,
        pointerEvents: absDiff < 0.25 ? "auto" : "none",
        transformOrigin: "50% 50%",
        visibility: isVisible ? "visible" : "hidden",
      });

      if (absDiff < 0.25 && !mobileNumbersTriggered.current[i]) {
        mobileNumbersTriggered.current[i] = true;
        triggerMobileCounter(i);
      } else if (absDiff > 0.5) {
        mobileNumbersTriggered.current[i] = false;
      }
    });
  };

  const goToMobileCard = (targetIdx: number) => {
    const clamped = Math.min(CELESTIAL_METRICS.length - 1, Math.max(0, targetIdx));
    gsap.to(mobileDrumRef.current, {
      progress: clamped,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        updateMobileArc(mobileDrumRef.current.progress);
      },
    });
  };

  const startAutoSlide = useCallback(() => {
    if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    autoSlideTimerRef.current = setInterval(() => {
      if (isInteractingRef.current) return;
      const current = Math.round(mobileDrumRef.current.progress);
      const next = (current + 1) % CELESTIAL_METRICS.length;
      goToMobileCard(next);
    }, 4500);
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = null;
    }
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    isInteractingRef.current = true;
    stopAutoSlide();
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToMobileCard(mobileActiveIdx + 1);
      } else {
        goToMobileCard(mobileActiveIdx - 1);
      }
    }
    setTimeout(() => {
      isInteractingRef.current = false;
      startAutoSlide();
    }, 2500);
  };

  // Smooth number counter surge up to target
  const triggerCounter = (index: number) => {
    const target = CELESTIAL_METRICS[index].targetNumber;
    const counterObj = { val: 0 };

    gsap.to(counterObj, {
      val: target,
      duration: 1.0,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: () => {
        setAnimatedNumbers((prev) => {
          const updated = [...prev];
          updated[index] = Math.round(counterObj.val);
          return updated;
        });
      },
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Small & medium devices use high-performance unpinned touch flow
      // Big devices (>= 1024px) retain the exact master cinematic 3D celestial arc
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        // Initialize mobile 3D sunrise/zenith/sunset arc and auto-slide
        updateMobileArc(0);
        startAutoSlide();
        return () => {
          stopAutoSlide();
        };
      }

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const numCards = CELESTIAL_METRICS.length;

      // Track whether counter has fired for a card entering zenith
      const numbersTriggered: boolean[] = [false, false, false, false];

      const updateScene = (progress: number) => {
        // ==============================================================
        // PHASE 1: TITLE ENTRANCE REVEAL ("WHY CHOOSE PatientCare")
        // progress: 0.00 -> 0.22
        // ==============================================================
        const pWhy = Math.min(1, Math.max(0, progress / 0.10));
        const easeWhy = gsap.parseEase("power3.out")(pWhy);
        if (whyRef.current) {
          gsap.set(whyRef.current, {
            yPercent: 120 * (1 - easeWhy),
            skewY: 8 * (1 - easeWhy),
            opacity: easeWhy,
          });
        }

        const pChoose = Math.min(1, Math.max(0, (progress - 0.06) / 0.10));
        const easeChoose = gsap.parseEase("power3.out")(pChoose);
        if (chooseRef.current) {
          gsap.set(chooseRef.current, {
            yPercent: 120 * (1 - easeChoose),
            skewY: 8 * (1 - easeChoose),
            opacity: easeChoose,
          });
        }

        const pBrand = Math.min(1, Math.max(0, (progress - 0.12) / 0.10));
        const easeBrand = gsap.parseEase("power3.out")(pBrand);
        if (brandRef.current) {
          gsap.set(brandRef.current, {
            yPercent: 120 * (1 - easeBrand),
            skewY: 6 * (1 - easeBrand),
            opacity: easeBrand,
          });
        }

        const pSub = Math.min(1, Math.max(0, (progress - 0.18) / 0.06));
        const easeSub = gsap.parseEase("power2.out")(pSub);
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, {
            y: 20 * (1 - easeSub),
            opacity: easeSub,
          });
        }

        // ==============================================================
        // PHASE 2 & 3: TITLE FLOAT UP & DISSOLVE EXIT
        // progress: 0.26 -> 0.38
        // ==============================================================
        const exitP = Math.min(1, Math.max(0, (progress - 0.26) / 0.12));
        const exitEase = gsap.parseEase("power2.inOut")(exitP);
        if (titleStageRef.current) {
          gsap.set(titleStageRef.current, {
            y: -140 * exitEase,
            opacity: Math.max(0, 1 - exitEase * 1.3),
            filter: `blur(${exitEase * 14}px)`,
            visibility: exitEase >= 0.99 ? "hidden" : "visible",
          });
        }

        // ==============================================================
        // PHASE 4: THE LUXURY BLANK BREATHING HOLD
        // progress: 0.38 -> 0.44
        // Screen is clean and blank
        // ==============================================================

        // ==============================================================
        // PHASE 5: CELESTIAL ARC STAGE ENTRANCE
        // progress: 0.44 -> 0.52
        // ==============================================================
        const stageP = Math.min(1, Math.max(0, (progress - 0.44) / 0.08));
        const stageEase = gsap.parseEase("power3.out")(stageP);
        if (arcStageRef.current) {
          gsap.set(arcStageRef.current, {
            opacity: stageEase,
            visibility: stageEase > 0.01 ? "visible" : "hidden",
            pointerEvents: stageEase > 0.7 ? "auto" : "none",
          });
        }

        // ==============================================================
        // PHASE 6: CELESTIAL ARC ROTATION (ZERO BOUNCE, SILKY SMOOTH)
        // progress: 0.48 -> 1.00
        // ==============================================================
        const drumProgress = Math.min(1, Math.max(0, (progress - 0.48) / 0.52)) * (numCards - 1);
        const closestIndex = Math.min(
          numCards - 1,
          Math.max(0, Math.round(drumProgress))
        );
        setActiveIdx(closestIndex);

        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        const Rx = isMobile ? 380 : isTablet ? 560 : 780;
        const Ry = isMobile ? 220 : isTablet ? 300 : 360;
        const spacingDeg = isMobile ? 65 : isTablet ? 54 : 48;

        // Background solar aura
        if (auraRef.current) {
          const auraColor = CELESTIAL_METRICS[closestIndex].themeColor;
          gsap.to(auraRef.current, {
            background: `radial-gradient(ellipse at 50% 30%, ${auraColor}33 0%, rgba(244,241,234,0) 70%)`,
            duration: 0.6,
            ease: "power2.out",
          });
        }

        cards.forEach((card, i) => {
          const diff = i - drumProgress;
          const absDiff = Math.abs(diff);

          const angleDeg = diff * spacingDeg;
          const angleRad = (angleDeg * Math.PI) / 180;

          // Parabolic trajectory with ZERO vertical bouncy jump
          const posX = Math.sin(angleRad) * Rx;
          const posY = (1 - Math.cos(angleRad)) * Ry;

          // 3D Z-Depth
          const maxDepth = isMobile ? 480 : 700;
          const posZ = absDiff < 0.05 ? 10 : 10 - Math.min(maxDepth, Math.pow(absDiff, 1.35) * maxDepth);

          // Perspective scale
          const scale = Math.max(0.58, 1.02 - absDiff * 0.36);

          // 3D Rotations
          const rotZ = angleDeg * (isMobile ? 0.65 : 0.58);
          const rotY = -angleDeg * (isMobile ? 0.36 : 0.32);
          const rotX = Math.abs(angleDeg) * 0.12;

          // Focal opacity
          const opacity = Math.max(
            0,
            Math.pow(Math.max(0, 1 - absDiff * 1.05), 1.7)
          ) * stageEase;

          const blur = absDiff > 0.14 ? Math.min(10, (absDiff - 0.14) * 8.5) : 0;
          const zIndex = Math.round(150 - absDiff * 60);

          gsap.set(card, {
            x: posX,
            y: posY,
            z: posZ,
            rotationZ: rotZ,
            rotationY: rotY,
            rotationX: rotX,
            scale: scale,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            zIndex: zIndex,
            pointerEvents: absDiff < 0.25 ? "auto" : "none",
            transformOrigin: "50% 50%",
          });

          // NUMBER COUNTER LOGIC:
          // When card is approaching the center zenith (absDiff < 0.25), smoothly count UP to target!
          // When card is off-center (absDiff > 0.45), reset to 0 so it never awkwardly decreases when re-entering!
          if (absDiff < 0.25 && !numbersTriggered[i] && stageEase > 0.5) {
            numbersTriggered[i] = true;
            triggerCounter(i);
          } else if (absDiff > 0.45) {
            numbersTriggered[i] = false;
            setAnimatedNumbers((prev) => {
              if (prev[i] === 0) return prev;
              const copy = [...prev];
              copy[i] = 0;
              return copy;
            });
          }
        });
      };

      updateScene(0);

      // Single pinned ScrollTrigger
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=5200",
        pin: true,
        scrub: 1.0,
        anticipatePin: 1,
        onUpdate: (self) => {
          updateScene(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[auto] py-14 lg:py-0 lg:h-screen overflow-hidden bg-[#F9F8F6] flex flex-col justify-between select-none"
    >
      {/* Background Solar Aura Glow */}
      <div
        ref={auraRef}
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(13,92,70,0.18) 0%, rgba(244,241,234,0) 70%)",
        }}
      />

      {/* ── MOBILE VIEW: 3D SUNRISE/SUNSET HORIZON ARC STAGE (< 1024px) ── */}
      <div className="lg:hidden w-full flex flex-col items-center z-10 px-4 py-8">
        {/* Mobile Header */}
        <div className="w-full text-center mb-4">
          <h2 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#0B0F19]">
            WHY CHOOSE{" "}
            <span className="font-sans font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-[#064e3b] via-[#0d5c46] to-[#10b981] bg-clip-text text-transparent block sm:inline">
              PATIENT CARE
            </span>
          </h2>
          <p className="mt-1 text-[11px] font-semibold tracking-wider text-emerald-900/60 uppercase">
            Bangladesh&apos;s Healthcare Standard • Digital Chamber Access
          </p>
        </div>

        {/* 3D Horizon Arc Stage with Touch Drag / Swipe */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[250px] flex items-center justify-center overflow-visible my-1 touch-pan-y"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {/* Subtle Ambient Parabolic Arc Orbit Guide */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
            viewBox="0 0 400 200"
            fill="none"
          >
            <path
              d="M 20,165 Q 200,25 380,165"
              stroke="#0d5c46"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
          </svg>

          {/* Focal Solar Glow at Zenith */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none transition-all duration-700 opacity-40 blur-2xl"
            style={{
              background: `radial-gradient(circle, ${CELESTIAL_METRICS[mobileActiveIdx].themeColor} 0%, transparent 70%)`,
            }}
          />

          {/* The 4 Floating 3D Cards in Parabolic Orbit */}
          {CELESTIAL_METRICS.map((item, index) => {
            const displayVal = mobileAnimatedNumbers[index];
            const isAtZenith = mobileActiveIdx === index;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  mobileCardsRef.current[index] = el;
                }}
                onClick={() => goToMobileCard(index)}
                className={`absolute w-[245px] sm:w-[265px] h-[190px] sm:h-[200px] rounded-[24px] bg-white border p-4 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-shadow duration-500 ${
                  isAtZenith
                    ? "border-[#0d5c46]/40 shadow-[0_18px_45px_rgba(13,92,70,0.18)]"
                    : "border-gray-200/80 shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Metric Counter */}
                <div className="flex items-baseline justify-center gap-1 mb-1.5">
                  {item.prefix && (
                    <span className="font-sans text-2xl font-black text-gray-400">
                      {item.prefix}
                    </span>
                  )}
                  <span
                    className="font-sans text-5xl sm:text-[3.2rem] font-black tracking-tight"
                    style={{ color: item.themeColor }}
                  >
                    {displayVal}
                  </span>
                  <span
                    className="font-sans text-2xl font-black opacity-80"
                    style={{ color: item.themeColor }}
                  >
                    {item.suffix}
                  </span>
                </div>

                {/* Metric Headline */}
                <h3 className="text-base sm:text-lg font-black text-gray-900 tracking-tight leading-snug font-sans">
                  {item.title}
                </h3>

                {/* Subtitle with highlighted marker */}
                <div className="mt-1.5 text-[11px] sm:text-xs font-medium text-gray-600 tracking-normal flex flex-wrap items-center justify-center font-sans">
                  <span>{item.subPre}</span>
                  <span className="relative inline-block px-1 py-0.5 mx-0.5 italic font-bold">
                    <span className="relative z-10 text-emerald-950">
                      {item.highlightWord}
                    </span>
                    <span
                      className={`absolute inset-0 bg-emerald-200/70 rounded-md -z-0 transition-transform duration-500 ease-out origin-left ${
                        isAtZenith ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                      }`}
                    />
                  </span>
                  <span>{item.subPost}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dial Controls (Dots + Prev/Next Arrows) */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            onClick={() => goToMobileCard(mobileActiveIdx - 1)}
            disabled={mobileActiveIdx === 0}
            aria-label="Previous Metric"
            className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 text-xs font-bold"
          >
            ←
          </button>

          <div className="flex items-center gap-1.5">
            {CELESTIAL_METRICS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => goToMobileCard(idx)}
                aria-label={`Go to metric ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  mobileActiveIdx === idx
                    ? "w-6 h-1.5 bg-[#0d5c46]"
                    : "w-1.5 h-1.5 bg-[#0d5c46]/25"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goToMobileCard(mobileActiveIdx + 1)}
            disabled={mobileActiveIdx === CELESTIAL_METRICS.length - 1}
            aria-label="Next Metric"
            className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 text-xs font-bold"
          >
            →
          </button>
        </div>
      </div>

      {/* ── DESKTOP VIEW: SEAMLESS MASTER PINNED COMPOSITION ── */}
      <div className="hidden lg:contents">
        {/* ── STAGE A: "WHY CHOOSE PatientCare" TITLE REVEAL ── */}
        <div
          ref={titleStageRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <div className="overflow-hidden py-1 sm:py-2">
            <span
              ref={whyRef}
              className="inline-block font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] tracking-tight uppercase text-[#0B0F19] leading-none will-change-transform"
              style={{ opacity: 0 }}
            >
              WHY
            </span>
          </div>
          <div className="overflow-hidden py-1 sm:py-2">
            <span
              ref={chooseRef}
              className="inline-block font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] tracking-tight uppercase text-[#0B0F19] leading-none will-change-transform"
              style={{ opacity: 0 }}
            >
              CHOOSE
            </span>
          </div>
        </div>

        {/* Brand Lockup: Logo + "PatientCare" in Topbar Lobster font with Nature Green Gradient */}
        <div className="overflow-hidden py-2 sm:py-4 mt-2 sm:mt-4">
          <div
            ref={brandRef}
            className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 will-change-transform"
            style={{ opacity: 0 }}
          >
            <img
              src="/patientCare%20logo.svg"
              alt="PatientCare Logo"
              className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain shrink-0 drop-shadow-md"
            />
            <span className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tight leading-none bg-gradient-to-r from-[#064e3b] via-[#0d5c46] to-[#10b981] bg-clip-text text-transparent pb-1 drop-shadow-sm">
              Patient Care
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div ref={subtitleRef} className="mt-4 sm:mt-8 overflow-hidden" style={{ opacity: 0 }}>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-gray-400 uppercase">
            BANGLADESH&apos;S HEALTHCARE STANDARD • DIGITAL CHAMBER ACCESS
          </p>
        </div>
      </div>

      {/* ── STAGE B: CELESTIAL ARC HORIZON CARDS STAGE ── */}
      <div
        ref={arcStageRef}
        className="relative w-full h-full flex flex-col justify-between py-8 z-10"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        {/* Subtle Horizon Arc Line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0">
          <svg
            className="w-full max-w-6xl h-48 opacity-30"
            viewBox="0 0 1000 200"
            fill="none"
          >
            <path
              d="M 50,180 Q 500,20 950,180"
              stroke="#0d5c46"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
          </svg>
        </div>

        {/* 3D Arc Floating Cards Container */}
        <div
          ref={containerRef}
          className="relative w-full flex-1 flex items-center justify-center"
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
        >
          {CELESTIAL_METRICS.map((item, index) => {
            const displayVal = animatedNumbers[index];
            const isAtZenith = activeIdx === index;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`absolute w-[86vw] max-w-[340px] sm:max-w-[365px] md:max-w-[375px] h-[280px] sm:h-[300px] rounded-[32px] bg-white border border-gray-200/90 p-6 sm:p-8 transition-[box-shadow] duration-500 cursor-pointer flex flex-col items-center justify-center text-center ${
                  isAtZenith
                    ? "shadow-[0_25px_60px_rgba(13,92,70,0.18)] border-[#0d5c46]/30"
                    : "shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Centered Zenith Metric Counter - Clean Geometric Sans-Serif Typography */}
                <div className="flex items-baseline justify-center gap-1 sm:gap-2 mb-3">
                  {item.prefix && (
                    <span className="font-sans text-3xl sm:text-4xl font-black text-gray-400">
                      {item.prefix}
                    </span>
                  )}
                  <span
                    className="font-sans text-6xl sm:text-7xl lg:text-[5.2rem] font-black tracking-tight drop-shadow-xs"
                    style={{ color: item.themeColor }}
                  >
                    {displayVal}
                  </span>
                  <span
                    className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black opacity-80"
                    style={{ color: item.themeColor }}
                  >
                    {item.suffix}
                  </span>
                </div>

                {/* Main Headline */}
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug font-sans">
                  {item.title}
                </h3>

                {/* Sub-headline with Italic Emphasis and Animated Marker Highlighter */}
                <div className="mt-2.5 text-xs sm:text-sm font-medium text-gray-600 tracking-normal flex flex-wrap items-center justify-center font-sans">
                  <span>{item.subPre}</span>
                  <span className="relative inline-block px-1.5 py-0.5 mx-1 italic font-bold">
                    <span className="relative z-10 text-emerald-950">
                      {item.highlightWord}
                    </span>
                    {/* Glowing Animated Highlighter Sweep */}
                    <span
                      className={`absolute inset-0 bg-emerald-200/70 rounded-md -z-0 transition-transform duration-700 ease-out origin-left ${
                        isAtZenith ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                      }`}
                    />
                  </span>
                  <span>{item.subPost}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sleek Step Dial Dots */}
        <div className="relative z-20 flex items-center justify-center gap-2 pt-2">
          {CELESTIAL_METRICS.map((_, idx) => (
            <div
              key={idx}
              className={`transition-all duration-300 rounded-full ${
                activeIdx === idx
                  ? "w-7 h-2 bg-[#0d5c46]"
                  : "w-2 h-2 bg-[#0d5c46]/20"
              }`}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
