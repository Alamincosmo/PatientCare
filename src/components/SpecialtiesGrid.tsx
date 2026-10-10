"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SpecialtyItem {
  id: string;
  step: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  stat: string;
  statLabel: string;
  image: string;
  glowBg: string;
}

const SPECIALTIES: SpecialtyItem[] = [
  {
    id: "medicine",
    step: "01",
    tag: "PRIMARY CARE",
    title: "INTERNAL MEDICINE",
    subtitle: "General Diagnosis & Chronic Disease Care",
    desc: "Your first line of defense for acute illness, lifestyle diseases, and comprehensive adult healthcare.",
    stat: "24/7",
    statLabel: "EXPERT PHYSICIANS",
    image: "/Internal Medicine.webp",
    glowBg: "bg-emerald-400/25",
  },
  {
    id: "pediatrics",
    step: "02",
    tag: "CHILD HEALTH",
    title: "PEDIATRICIAN",
    subtitle: "Neonatal, Infant & Adolescent Care",
    desc: "Specialized pediatric consultations covering growth milestones, immunization, and child illness management.",
    stat: "100%",
    statLabel: "GENTLE CHILD CARE",
    image: "/Pediatrics.webp",
    glowBg: "bg-amber-400/25",
  },
  {
    id: "gynecology",
    step: "03",
    tag: "WOMEN'S CARE",
    title: "GYNECOLOGY & OBSTETRICS",
    subtitle: "Women's Wellness & Maternal Care",
    desc: "Dedicated clinical care for expectant mothers, prenatal screening, fertility, and reproductive health.",
    stat: "TOP TIER",
    statLabel: "MATERNAL SPECIALISTS",
    image: "/Gynecology & Obstetrics.webp",
    glowBg: "bg-rose-400/25",
  },
  {
    id: "cardiology",
    step: "04",
    tag: "CARDIAC CARE",
    title: "CARDIOLOGY",
    subtitle: "Cardiovascular Health & Heart Science",
    desc: "Advanced management of hypertension, chest pain, coronary risks, and rapid computerized ECG chamber queues.",
    stat: "< 10M",
    statLabel: "INSTANT ECG QUEUE",
    image: "/Cardiology.webp",
    glowBg: "bg-red-400/25",
  },
  {
    id: "orthopedics",
    step: "05",
    tag: "BONE & JOINT",
    title: "ORTHOPEDICS",
    subtitle: "Joint, Spine & Trauma Specialists",
    desc: "Comprehensive diagnosis and physical recovery for sports injuries, joint arthritis, fractures, and back pain.",
    stat: "BMDC",
    statLabel: "VERIFIED SURGEONS",
    image: "/Orthopedics.webp",
    glowBg: "bg-blue-400/25",
  },
  {
    id: "eye",
    step: "06",
    tag: "OPHTHALMOLOGY",
    title: "EYE SPECIALIST",
    subtitle: "Vision Correction & Retina Diagnostics",
    desc: "Precision ophthalmology care for refractive errors, cataract evaluation, glaucoma, and modern laser therapies.",
    stat: "HD VISION",
    statLabel: "PRECISION LASER CARE",
    image: "/Ophthalmology.webp",
    glowBg: "bg-teal-400/25",
  },
];

interface FrostedCylinderCardProps {
  feature: SpecialtyItem;
  cardRef?: (el: HTMLDivElement | null) => void;
  isCompact?: boolean;
}

// Declared outside to satisfy React 19 fast-refresh & avoid state resets
function FrostedCylinderCard({ feature, cardRef, isCompact = false }: FrostedCylinderCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = (y / rect.height - 0.5) * -12;
    const rotY = (x / rect.width - 0.5) * 12;
    setTilt({ x: rotX, y: rotY, glareX: x, glareY: y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
    setIsHovered(false);
  };

  const containerClasses = cardRef
    ? isCompact
      ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[260px] h-[330px] sm:h-[350px] pointer-events-auto"
      : "absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] sm:w-[380px] md:w-[410px] h-[450px] sm:h-[470px] md:h-[490px] pointer-events-auto"
    : isCompact
    ? "relative w-full h-[330px] pointer-events-auto"
    : "relative w-full h-[470px] pointer-events-auto";

  return (
    <div
      ref={cardRef}
      className={containerClasses}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative w-full h-full ${
          isCompact ? "rounded-[28px] p-4 sm:p-5" : "rounded-[32px] md:rounded-[36px] p-6 md:p-8"
        } flex flex-col justify-between transition-all duration-200 ease-out overflow-hidden group cursor-pointer`}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.70) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          boxShadow:
            "inset 0 1px 2px 0 rgba(255, 255, 255, 0.9), 0 20px 40px rgba(6, 78, 59, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04)",
        }}
      >
        {/* Specular Glare */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px] md:rounded-[36px] transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 280px at ${tilt.glareX}px ${tilt.glareY}px, rgba(255, 255, 255, 0.7), transparent 80%)`,
          }}
        />

        {/* Card Top */}
        <div className={`w-full flex items-center justify-between border-b border-[#064e3b]/10 ${isCompact ? "pb-2" : "pb-3"} z-10`}>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#064e3b] font-bold bg-[#064e3b]/5 backdrop-blur-md px-3 py-0.5 rounded-full border border-[#064e3b]/15 shadow-2xs">
            {feature.tag}
          </span>
          <span className="text-[10px] font-mono font-bold text-gray-400">
            {feature.step} / 06
          </span>
        </div>

        {/* Centerpiece */}
        <div className="relative my-auto flex flex-col items-center justify-center z-10 py-1">
          <div className={`relative ${isCompact ? "w-24 h-24" : "w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44"} flex items-center justify-center`}>
            <div
              className={`absolute inset-0 rounded-full filter blur-xl pointer-events-none opacity-40 ${feature.glowBg}`}
            />
            <div className={`relative ${isCompact ? "w-20 h-20" : "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                sizes={isCompact ? "90px" : "(max-width: 768px) 140px, 180px"}
                className="object-contain drop-shadow-[0_12px_22px_rgba(6,78,59,0.18)]"
                priority
              />
            </div>
          </div>

          <div className="mt-1 text-center flex flex-col items-center">
            <div className={`${isCompact ? "text-2xl" : "text-3xl md:text-4xl"} font-black tracking-tight text-[#0B0F19] leading-none font-sans`}>
              {feature.stat}
            </div>
            <span className="text-[9px] uppercase tracking-widest font-bold text-[#064e3b]/80 mt-0.5">
              {feature.statLabel}
            </span>
          </div>
        </div>

        {/* Card Bottom */}
        <div className="w-full text-center z-10 pt-1">
          <h3 className={`${isCompact ? "text-sm sm:text-base" : "text-lg md:text-xl"} font-bold tracking-tight uppercase text-[#0B0F19] font-sans leading-tight`}>
            {feature.title}
          </h3>
          <p className="text-[10px] font-semibold tracking-wider text-[#064e3b] italic mt-0.5 mb-1 truncate">
            {feature.subtitle}
          </p>
          <p className={`text-[11px] text-slate-600 font-medium leading-relaxed max-w-[260px] mx-auto ${isCompact ? "line-clamp-2" : "line-clamp-3"}`}>
            {feature.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SpecialtiesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Title Phase Refs
  const titleStageRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  // Desktop 3D Cylinder Phase Refs
  const cylinderStageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomDotsRef = useRef<HTMLDivElement>(null);

  // Mobile 3D Cylinder Controller
  const mobileCylinderCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCylinderDrumRef = useRef({ progress: 0 });
  const [mobileActiveSpecialty, setMobileActiveSpecialty] = useState(0);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInteractingRef = useRef<boolean>(false);

  const updateMobileCylinder = (prog: number) => {
    const cards = mobileCylinderCardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const numCards = SPECIALTIES.length;
    const closestIdx = Math.min(numCards - 1, Math.max(0, Math.round(prog)));
    setMobileActiveSpecialty(closestIdx);

    // Spacious horizontal spacing (~275px) so adjacent cards have clean breathing room and zero overlapping clutter
    const spacing = 275;

    cards.forEach((card, i) => {
      const diff = i - prog;
      const absDiff = Math.abs(diff);

      const rotateY = diff * 26;
      const translateX = diff * spacing;
      const translateZ = -absDiff * 115;
      const scale = Math.max(0.72, 1 - absDiff * 0.20);
      const opacity = Math.max(0, 1 - absDiff * 0.72);
      const blur = absDiff > 0.3 ? (absDiff - 0.3) * 5 : 0;
      const zIndex = Math.round(50 - absDiff * 10);
      const isVisible = absDiff < 1.35;

      gsap.set(card, {
        x: translateX,
        z: translateZ,
        rotationY: rotateY,
        scale: scale,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        zIndex: zIndex,
        pointerEvents: absDiff < 0.25 ? "auto" : "none",
        transformOrigin: "50% 50%",
        visibility: isVisible ? "visible" : "hidden",
      });
    });
  };

  const goToMobileSpecialty = (targetIdx: number) => {
    const clamped = Math.min(SPECIALTIES.length - 1, Math.max(0, targetIdx));
    gsap.to(mobileCylinderDrumRef.current, {
      progress: clamped,
      duration: 0.55,
      ease: "power2.out",
      onUpdate: () => {
        updateMobileCylinder(mobileCylinderDrumRef.current.progress);
      },
    });
  };

  const startAutoSlide = useCallback(() => {
    if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    autoSlideTimerRef.current = setInterval(() => {
      if (isInteractingRef.current) return;
      const current = Math.round(mobileCylinderDrumRef.current.progress);
      const next = (current + 1) % SPECIALTIES.length;
      goToMobileSpecialty(next);
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
        goToMobileSpecialty(mobileActiveSpecialty + 1);
      } else {
        goToMobileSpecialty(mobileActiveSpecialty - 1);
      }
    }
    setTimeout(() => {
      isInteractingRef.current = false;
      startAutoSlide();
    }, 2500);
  };

  const [activeSpecialtyIndex, setActiveSpecialtyIndex] = useState(0);

  const scrollToSpecialty = (index: number) => {
    setActiveSpecialtyIndex(index);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        updateMobileCylinder(0);
        startAutoSlide();
        return () => {
          stopAutoSlide();
        };
      }

      const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const numCards = SPECIALTIES.length;

      // Single continuous master scene timeline controller
      const updateScene = (progress: number) => {
        // ==============================================================
        // PHASE 1: STEP-BY-STEP TITLE REVEAL (progress: 0.00 -> 0.24)
        // ==============================================================
        const p1 = Math.min(1, Math.max(0, progress / 0.12));
        const ease1 = gsap.parseEase("power3.out")(p1);
        if (word1Ref.current) {
          gsap.set(word1Ref.current, {
            yPercent: 120 * (1 - ease1),
            skewY: 8 * (1 - ease1),
            opacity: ease1,
          });
        }

        const p2 = Math.min(1, Math.max(0, (progress - 0.08) / 0.14));
        const ease2 = gsap.parseEase("power3.out")(p2);
        if (word2Ref.current) {
          gsap.set(word2Ref.current, {
            yPercent: 120 * (1 - ease2),
            skewY: 6 * (1 - ease2),
            opacity: ease2,
          });
        }

        const pSub = Math.min(1, Math.max(0, (progress - 0.16) / 0.08));
        const easeSub = gsap.parseEase("power2.out")(pSub);
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, {
            y: 20 * (1 - easeSub),
            opacity: easeSub,
          });
        }

        // ==============================================================
        // PHASE 2 & 3: TITLE FLOAT UP & DISSOLVE EXIT (progress: 0.28 -> 0.40)
        // ==============================================================
        const exitP = Math.min(1, Math.max(0, (progress - 0.28) / 0.12));
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
        // PHASE 4: THE LUXURY BLANK BREATHING HOLD (progress: 0.40 -> 0.46)
        // Clean off-white luxury canvas holds briefly for cognitive transition
        // ==============================================================

        // ==============================================================
        // PHASE 5: CARDS STAGE EMERGENCE (progress: 0.46 -> 0.54)
        // ==============================================================
        const stageP = Math.min(1, Math.max(0, (progress - 0.46) / 0.08));
        const stageEase = gsap.parseEase("power3.out")(stageP);
        if (cylinderStageRef.current) {
          gsap.set(cylinderStageRef.current, {
            opacity: stageEase,
            visibility: stageEase > 0.01 ? "visible" : "hidden",
            pointerEvents: stageEase > 0.7 ? "auto" : "none",
          });
        }
        if (bottomDotsRef.current) {
          gsap.set(bottomDotsRef.current, {
            opacity: stageEase,
            y: 16 * (1 - stageEase),
          });
        }

        // ==============================================================
        // PHASE 6: 3D CYLINDER ROTARY DRUM CAROUSEL (progress: 0.50 -> 1.00)
        // ==============================================================
        const drumProgress = Math.min(1, Math.max(0, (progress - 0.50) / 0.50)) * (numCards - 1);
        const activeIdx = Math.min(
          numCards - 1,
          Math.max(0, Math.round(drumProgress))
        );
        setActiveSpecialtyIndex(activeIdx);

        const spacing = 440; // Desktop horizontal spacing

        cardEls.forEach((card, i) => {
          const diff = i - drumProgress;
          const absDiff = Math.abs(diff);

          // Zero-Degree Focus Rule:
          // Active center card: diff = 0 -> rotateY: 0deg, z: 0px, blur: 0px, scale: 1.0
          // Side cards: curve into cylinder depth, positive diff comes in from the right (+X, +rotateY)
          const rotateY = diff * 30;
          const translateX = diff * spacing;
          const translateZ = -absDiff * 140;
          const scale = Math.max(0.74, 1 - absDiff * 0.15);
          const opacity = Math.max(0.12, 1 - absDiff * 0.44) * stageEase;
          const blur = absDiff > 0.35 ? (absDiff * 3) : 0;
          const zIndex = Math.round(50 - absDiff * 10);

          gsap.set(card, {
            x: translateX,
            z: translateZ,
            rotationY: rotateY,
            scale: scale,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            zIndex: zIndex,
            transformOrigin: "50% 50%",
            visibility: opacity > 0.02 ? "visible" : "hidden",
          });
        });
      };

      // Initial frame setup
      updateScene(0);

      // Single pinned ScrollTrigger: perfectly smooth, no unpinning jump!
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=5400",
        pin: true,
        scrub: 1.0,
        anticipatePin: 1,
        onUpdate: (self) => {
          updateScene(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[auto] py-14 lg:py-0 lg:h-screen overflow-hidden bg-gradient-to-b from-[#F9F8F6] via-white to-[#F2EFE9] flex flex-col items-center justify-center font-sans select-none"
    >
      {/* Ambient Atmospheric Light Orbs for Frosted Glass Refraction */}
      <div className="absolute top-1/4 left-1/4 w-[350px] lg:w-[480px] h-[350px] lg:h-[480px] bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] lg:w-[500px] h-[380px] lg:h-[500px] bg-teal-400/10 rounded-full blur-[110px] pointer-events-none" />

      {/* ── MOBILE VIEW: UNPINNED CLEAN FLOW (TITLE + SWIPE TRACK) ── */}
      <div className="lg:hidden w-full flex flex-col items-center z-10 px-4">
        {/* Mobile Header */}
        <div className="w-full text-center mb-5">
          <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-[#0B0F19]">
            EVERY <span className="bg-gradient-to-r from-[#064e3b] via-[#0d5c46] to-[#10b981] bg-clip-text text-transparent">SPECIALTY.</span>
          </h2>
          <p className="mt-1 text-xs font-semibold tracking-wider text-emerald-900/60 uppercase">
            Care for every corner of health • 20+ departments
          </p>
        </div>

        {/* 3D Rotary Drum Carousel Stage (Mobile & Medium devices) */}
        <div
          className="relative w-full h-[360px] sm:h-[380px] flex items-center justify-center overflow-visible touch-pan-y my-2"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {SPECIALTIES.map((spec, i) => (
            <FrostedCylinderCard
              key={spec.id}
              feature={spec}
              cardRef={(el) => {
                mobileCylinderCardsRef.current[i] = el;
              }}
              isCompact
            />
          ))}
        </div>

        {/* Mobile Pagination Indicator & Nav Chevrons */}
        <div className="flex items-center justify-center gap-3 mt-4 z-10">
          <button
            onClick={() => goToMobileSpecialty(mobileActiveSpecialty - 1)}
            disabled={mobileActiveSpecialty === 0}
            className="w-8 h-8 rounded-full bg-white/90 border border-emerald-100 shadow-2xs flex items-center justify-center text-emerald-950 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors"
            aria-label="Previous specialty"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-emerald-100/60 shadow-2xs backdrop-blur-md">
            {SPECIALTIES.map((spec, i) => (
              <button
                key={spec.id}
                onClick={() => goToMobileSpecialty(i)}
                aria-label={`Go to specialty ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  mobileActiveSpecialty === i
                    ? "w-5 h-1.5 bg-[#064e3b]"
                    : "w-1.5 h-1.5 bg-[#064e3b]/25 hover:bg-[#064e3b]/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goToMobileSpecialty(mobileActiveSpecialty + 1)}
            disabled={mobileActiveSpecialty === SPECIALTIES.length - 1}
            className="w-8 h-8 rounded-full bg-white/90 border border-emerald-100 shadow-2xs flex items-center justify-center text-emerald-950 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors"
            aria-label="Next specialty"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile View All Specialists Link */}
        <div className="mt-4">
          <a
            href="/doctors"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#064e3b] bg-white/80 hover:bg-white px-4 py-2 rounded-full border border-emerald-100 shadow-2xs transition-colors"
          >
            Show all specialists
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── DESKTOP VIEW: SEAMLESS MASTER PINNED COMPOSITION ── */}
      <div className="hidden lg:contents">
        
        {/* STAGE A: THE KINETIC TITLE REVEAL ("EVERY SPECIALTY.") */}
        <div
          ref={titleStageRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          {/* Row 1: Word 1 "EVERY" */}
          <div className="overflow-hidden py-1 sm:py-2">
            <span
              ref={word1Ref}
              className="inline-block font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[8rem] tracking-tight uppercase text-[#0B0F19] leading-none will-change-transform"
              style={{ opacity: 0 }}
            >
              EVERY
            </span>
          </div>

          {/* Row 2: Word 2 "SPECIALTY." in Nature Green Gradient */}
          <div className="overflow-hidden py-2 sm:py-4 mt-1 sm:mt-2">
            <span
              ref={word2Ref}
              className="inline-block font-sans font-black text-7xl sm:text-9xl md:text-[10rem] lg:text-[9.5rem] tracking-tight uppercase leading-none bg-gradient-to-r from-[#064e3b] via-[#0d5c46] to-[#10b981] bg-clip-text text-transparent pb-2 will-change-transform"
              style={{ opacity: 0 }}
            >
              SPECIALTY.
            </span>
          </div>

          {/* Subtitle Tagline */}
          <div ref={subtitleRef} className="mt-6 sm:mt-10 overflow-hidden" style={{ opacity: 0 }}>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-gray-400 uppercase">
              CARE FOR EVERY CORNER OF HEALTH • 20+ DEPARTMENTS
            </p>
          </div>
        </div>

        {/* STAGE B: 3D CYLINDER CAROUSEL STAGE (ARRIVES AFTER BLANK BREATH) */}
        <div
          ref={cylinderStageRef}
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{ perspective: "1400px", transformStyle: "preserve-3d", opacity: 0, visibility: "hidden" }}
        >
          {/* The 6 Stacked 3D Cards */}
          {SPECIALTIES.map((spec, i) => (
            <FrostedCylinderCard
              key={spec.id}
              feature={spec}
              cardRef={(el) => {
                cardsRef.current[i] = el;
              }}
            />
          ))}

          {/* Bottom Controls */}
          <div
            ref={bottomDotsRef}
            className="absolute bottom-4 sm:bottom-6 md:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2.5 pointer-events-auto opacity-0"
          >
            {/* Apple-style Dots (Compact & Elegant) */}
            <div className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-2xs">
              {SPECIALTIES.map((spec, i) => {
                const isActive = activeSpecialtyIndex === i;
                return (
                  <button
                    key={spec.id}
                    onClick={() => scrollToSpecialty(i)}
                    aria-label={`Go to ${spec.title}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? "w-5 h-1.5 bg-[#064e3b]"
                        : "w-1.5 h-1.5 bg-[#064e3b]/25 hover:bg-[#064e3b]/50"
                    }`}
                  />
                );
              })}
            </div>

            {/* Show all specialists button (Compact & Clean) */}
            <a
              href="/doctors"
              className="flex items-center justify-center px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-2xs font-sans font-bold text-[11px] text-[#064e3b] hover:bg-white transition-colors uppercase tracking-wider"
            >
              Show all specialists
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
