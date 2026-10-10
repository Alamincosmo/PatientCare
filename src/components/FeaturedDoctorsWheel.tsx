"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ShieldCheck, 
  MapPin, 
  CalendarCheck, 
  ArrowRight, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Activity
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DoctorItem {
  id: string;
  initials: string;
  name: string;
  specialty: string;
  degrees: string;
  designation: string;
  hospital: string;
  chamber: string;
  fee: string;
  timing: string;
  queueStatus: string;
  rating: string;
  reviewsCount: string;
  bmdcReg: string;
  accentColor: string;
  glowColor: string;
}

const DOCTORS: DoctorItem[] = [
  {
    id: "dr-kalam",
    initials: "AK",
    name: "Prof. Dr. Abul Kalam",
    specialty: "Cardiology",
    degrees: "MBBS, FCPS, MD (Cardiology), FACC (USA)",
    designation: "Senior Consultant & Head of Cardiology",
    hospital: "National Heart Foundation & Research Institute",
    chamber: "Popular Diagnostic Center, Dhanmondi",
    fee: "৳ 1,200",
    timing: "Today 06:00 PM - 09:30 PM",
    queueStatus: "Serial #04 Calling • Queue Active",
    rating: "99.4%",
    reviewsCount: "1,480+ verified patients",
    bmdcReg: "BMDC A-34192",
    accentColor: "#064e3b",
    glowColor: "rgba(6, 78, 59, 0.4)",
  },
  {
    id: "dr-aysha",
    initials: "AA",
    name: "Dr. Aysha Akter",
    specialty: "Gynecology & Obstetrics",
    degrees: "MBBS, BCS (Health), FCPS (Obs & Gynae)",
    designation: "Associate Professor, Gynecology",
    hospital: "Dhaka Medical College & Hospital",
    chamber: "Central Hospital, Green Road, Dhanmondi",
    fee: "৳ 800",
    timing: "Tomorrow 05:00 PM - 08:30 PM",
    queueStatus: "Serial #02 Calling • Fast Queue",
    rating: "99.1%",
    reviewsCount: "2,100+ verified patients",
    bmdcReg: "BMDC A-41820",
    accentColor: "#0d5c46",
    glowColor: "rgba(13, 92, 70, 0.4)",
  },
  {
    id: "dr-farzana",
    initials: "FH",
    name: "Dr. Farzana Haq",
    specialty: "Dermatology & Laser Surgery",
    degrees: "MBBS, DDV, MD (Dermatology), Fellow Laser (Bangkok)",
    designation: "Senior Consultant Dermatologist",
    hospital: "Square Hospital & Diagnostic Center",
    chamber: "Square Hospital, Panthapath & Gulshan",
    fee: "৳ 1,000",
    timing: "Today 07:00 PM - 10:00 PM",
    queueStatus: "Serial #07 Calling • 15m Est. Wait",
    rating: "98.8%",
    reviewsCount: "980+ verified patients",
    bmdcReg: "BMDC A-52910",
    accentColor: "#047857",
    glowColor: "rgba(4, 120, 87, 0.4)",
  },
  {
    id: "dr-rafiqul",
    initials: "RI",
    name: "Dr. Rafiqul Islam",
    specialty: "Neurology & Brain Sciences",
    degrees: "MBBS, MD (Neurology), PhD (Neuroscience, Japan)",
    designation: "Professor & Clinical Neurophysiologist",
    hospital: "Bangabandhu Sheikh Mujib Medical University (PG Hospital)",
    chamber: "Medinova Medical Services, Banani",
    fee: "৳ 1,500",
    timing: "Thursday 04:00 PM - 08:00 PM",
    queueStatus: "Serial #01 Available • Instant Slot",
    rating: "99.6%",
    reviewsCount: "1,650+ verified patients",
    bmdcReg: "BMDC A-29401",
    accentColor: "#0f766e",
    glowColor: "rgba(15, 118, 110, 0.4)",
  },
  {
    id: "dr-zafar",
    initials: "AZ",
    name: "Dr. S.M. Abu Zafar",
    specialty: "Orthopedics & Spine Trauma",
    degrees: "MBBS, MS (Orthopedics), AO Spine Fellow (Switzerland)",
    designation: "Associate Professor, Orthopedic Surgery",
    hospital: "National Institute of Traumatology (NITOR)",
    chamber: "Labaid Specialized Hospital, Uttara",
    fee: "৳ 1,000",
    timing: "Today 08:00 PM - 10:30 PM",
    queueStatus: "Serial #05 Calling • On Schedule",
    rating: "99.0%",
    reviewsCount: "1,320+ verified patients",
    bmdcReg: "BMDC A-38104",
    accentColor: "#065f46",
    glowColor: "rgba(6, 95, 70, 0.4)",
  },
  {
    id: "dr-nusrat",
    initials: "NJ",
    name: "Dr. Nusrat Jahan",
    specialty: "Pediatrics & Neonatal Care",
    degrees: "MBBS, DCH, FCPS (Pediatrics), Neonatology Specialist",
    designation: "Senior Specialist, Child Health & Immunization",
    hospital: "Dhaka Shishu Hospital",
    chamber: "Ibn Sina Diagnostic Center, Badda",
    fee: "৳ 800",
    timing: "Tomorrow 04:30 PM - 07:30 PM",
    queueStatus: "Serial #03 Calling • Priority Child Care",
    rating: "99.7%",
    reviewsCount: "2,400+ verified patients",
    bmdcReg: "BMDC A-49112",
    accentColor: "#047857",
    glowColor: "rgba(4, 120, 87, 0.4)",
  },
];

export default function FeaturedDoctorsWheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Keynote Stage Refs
  const titleStageRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  // Doctors Stage Refs
  const doctorsStageRef = useRef<HTMLDivElement>(null);
  const leftDossierRef = useRef<HTMLDivElement>(null);
  const rightArcRef = useRef<HTMLDivElement>(null);
  const arcCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Active state
  const [activeDoctorIndex, setActiveDoctorIndex] = useState(0);
  const activeDoc = DOCTORS[activeDoctorIndex];

  // Mobile 3D Celestial Horizon Arc Controller
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileDrumRef = useRef({ progress: 0 });
  const [mobileActiveIdx, setMobileActiveIdx] = useState<number>(0);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInteractingRef = useRef<boolean>(false);

  const updateMobileArc = useCallback((prog: number) => {
    const cards = mobileCardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const numCards = DOCTORS.length;
    const closestIdx = Math.min(numCards - 1, Math.max(0, Math.round(prog)));
    setMobileActiveIdx(closestIdx);

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
    });
  }, []);

  const goToMobileCard = useCallback((targetIdx: number) => {
    const clamped = Math.min(DOCTORS.length - 1, Math.max(0, targetIdx));
    gsap.to(mobileDrumRef.current, {
      progress: clamped,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        updateMobileArc(mobileDrumRef.current.progress);
      },
    });
  }, [updateMobileArc]);

  const startAutoSlide = useCallback(() => {
    if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    autoSlideTimerRef.current = setInterval(() => {
      if (isInteractingRef.current) return;
      const current = Math.round(mobileDrumRef.current.progress);
      const next = (current + 1) % DOCTORS.length;
      goToMobileCard(next);
    }, 4500);
  }, [goToMobileCard]);

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

  // Smooth jump to a specific doctor
  const scrollToDoctor = (index: number) => {
    if (!scrollTriggerRef.current) {
      setActiveDoctorIndex(index);
      return;
    }
    const st = scrollTriggerRef.current;
    // Progress 0.44 -> 1.00 maps to doctor 0 -> doctor 5
    const docProgress = 0.44 + (index / (DOCTORS.length - 1)) * 0.56;
    const targetY = st.start + docProgress * (st.end - st.start);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        updateMobileArc(0);
        startAutoSlide();
        return () => {
          stopAutoSlide();
        };
      }

      const arcCardsEls = arcCardsRef.current.filter(Boolean) as HTMLDivElement[];
      const totalDocs = DOCTORS.length;

      const updateScene = (progress: number) => {
        // ==============================================================
        // PHASE 1: KEYNOTE TITLE REVEAL (progress: 0.00 -> 0.22)
        // ==============================================================
        const p1 = Math.min(1, Math.max(0, progress / 0.11));
        const ease1 = gsap.parseEase("power3.out")(p1);
        if (word1Ref.current) {
          gsap.set(word1Ref.current, {
            yPercent: 120 * (1 - ease1),
            skewY: 7 * (1 - ease1),
            opacity: ease1,
          });
        }

        const p2 = Math.min(1, Math.max(0, (progress - 0.07) / 0.13));
        const ease2 = gsap.parseEase("power3.out")(p2);
        if (word2Ref.current) {
          gsap.set(word2Ref.current, {
            yPercent: 120 * (1 - ease2),
            skewY: 6 * (1 - ease2),
            opacity: ease2,
          });
        }

        const pSub = Math.min(1, Math.max(0, (progress - 0.14) / 0.08));
        const easeSub = gsap.parseEase("power2.out")(pSub);
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, {
            y: 20 * (1 - easeSub),
            opacity: easeSub,
          });
        }

        // ==============================================================
        // PHASE 2: TITLE FLOAT UP & BLUR DISSOLVE (progress: 0.24 -> 0.36)
        // ==============================================================
        const exitP = Math.min(1, Math.max(0, (progress - 0.24) / 0.12));
        const exitEase = gsap.parseEase("power2.inOut")(exitP);
        if (titleStageRef.current) {
          gsap.set(titleStageRef.current, {
            y: -140 * exitEase,
            opacity: Math.max(0, 1 - exitEase * 1.35),
            filter: `blur(${exitEase * 14}px)`,
            visibility: exitEase >= 0.99 ? "hidden" : "visible",
          });
        }

        // ==============================================================
        // PHASE 3: STAGE ENTRANCE CHOREOGRAPHY (progress: 0.34 -> 0.44)
        // Luxury Breathing blank and smooth dual-stage entrance
        // ==============================================================
        const entranceP = Math.min(1, Math.max(0, (progress - 0.34) / 0.10));
        const entranceEase = gsap.parseEase("power3.out")(entranceP);

        if (doctorsStageRef.current) {
          gsap.set(doctorsStageRef.current, {
            opacity: entranceEase,
            visibility: entranceEase > 0.01 ? "visible" : "hidden",
            pointerEvents: entranceEase > 0.7 ? "auto" : "none",
          });
        }

        if (leftDossierRef.current) {
          gsap.set(leftDossierRef.current, {
            x: -45 * (1 - entranceEase),
            opacity: entranceEase,
            filter: `blur(${(1 - entranceEase) * 6}px)`,
          });
        }

        if (rightArcRef.current) {
          gsap.set(rightArcRef.current, {
            x: 45 * (1 - entranceEase),
            opacity: entranceEase,
            scale: 0.92 + 0.08 * entranceEase,
            filter: `blur(${(1 - entranceEase) * 6}px)`,
          });
        }

        // ==============================================================
        // PHASE 4: 3D RADIAL ORBITAL WHEEL CAROUSEL (progress: 0.44 -> 1.00)
        // Trigonometric Arc Formula: R * sin(angle), -R * (1 - cos(angle))
        // ==============================================================
        const drumProgress = Math.min(1, Math.max(0, (progress - 0.44) / 0.56)) * (totalDocs - 1);
        const activeIdx = Math.min(totalDocs - 1, Math.max(0, Math.round(drumProgress)));
        setActiveDoctorIndex(activeIdx);

        const isTablet = window.innerWidth >= 1024 && window.innerWidth < 1280;
        const R = isTablet ? 420 : 620; // Radius of circular arc
        const angleStep = isTablet ? 26 : 28; // Degree spacing

        arcCardsEls.forEach((card, i) => {
          const diff = i - drumProgress;
          const absDiff = Math.abs(diff);
          const angleDeg = diff * angleStep;
          const angleRad = (angleDeg * Math.PI) / 180;

          // Mathematical Circle Arc Coordinates
          const x = -R * (1 - Math.cos(angleRad));
          const y = R * Math.sin(angleRad);

          // Dynamic Tangent Arc Tilt
          const maxArcTilt = 16;
          const tiltFactor = Math.min(1, Math.pow(absDiff, 1.15));
          const arcTilt = Math.sign(diff) * maxArcTilt * tiltFactor;

          // Gaussian Scale Falloff
          const scaleFalloff = Math.exp(-0.45 * absDiff * absDiff);
          const baseScale = isTablet ? 0.76 : 0.82;
          const scaleBoost = isTablet ? 0.36 : 0.42;
          const scale = baseScale + scaleBoost * scaleFalloff;

          const opacity = Math.max(0.15, 1 - absDiff * 0.42) * entranceEase;
          const blur = absDiff > 0.35 ? (absDiff - 0.35) * 4 : 0;
          const zIndex = Math.round(50 - absDiff * 10);

          gsap.set(card, {
            x: x,
            y: y,
            rotation: arcTilt,
            scale: scale,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            zIndex: zIndex,
            transformOrigin: "50% 50%",
            visibility: opacity > 0.02 ? "visible" : "hidden",
          });
        });
      };

      updateScene(0);

      const st = ScrollTrigger.create({
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

      scrollTriggerRef.current = st;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[auto] py-16 lg:py-0 lg:h-screen overflow-hidden bg-gradient-to-b from-[#F9F8F6] via-white to-[#F2EFE9] flex flex-col items-center justify-center font-sans select-none"
    >
      {/* Ambient Atmospheric Light Orbs for Frosted Glass Refraction */}
      <div className="absolute top-1/4 left-1/4 w-[360px] lg:w-[480px] h-[360px] lg:h-[480px] bg-emerald-400/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] lg:w-[500px] h-[380px] lg:h-[500px] bg-teal-400/15 rounded-full blur-[110px] pointer-events-none" />

      {/* ── MOBILE VIEW: 3D SUNRISE/SUNSET HORIZON ARC STAGE (< 1024px) ── */}
      <div className="lg:hidden w-full flex flex-col items-center z-10 px-4 py-8">
        {/* Mobile Header */}
        <div className="w-full text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2 px-3.5 py-1 rounded-full bg-white/80 border border-emerald-100 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#064e3b]">
              BMDC Verified Faculty
            </span>
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-[#0B0F19]">
            FEATURED <span className="bg-gradient-to-r from-[#064e3b] via-[#0d5c46] to-[#10b981] bg-clip-text text-transparent">DOCTORS.</span>
          </h2>
          <p className="mt-1 text-xs font-semibold tracking-wider text-emerald-900/60 uppercase">
            Top Clinical Specialists • Instant Visiting Queue
          </p>
        </div>

        {/* 3D Horizon Arc Stage with Touch Drag / Swipe */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[320px] flex items-center justify-center overflow-visible my-2 touch-pan-y"
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none transition-all duration-700 opacity-40 blur-2xl"
            style={{
              background: `radial-gradient(circle, ${DOCTORS[mobileActiveIdx].glowColor} 0%, transparent 70%)`,
            }}
          />

          {/* The Stacked Doctors Cards Along The Radial Orbit */}
          {DOCTORS.map((doc, index) => {
            const isAtZenith = mobileActiveIdx === index;

            return (
              <div
                key={doc.id}
                ref={(el) => {
                  mobileCardsRef.current[index] = el;
                }}
                onClick={() => goToMobileCard(index)}
                className={`absolute w-[280px] sm:w-[300px] h-[auto] rounded-[24px] bg-white/90 backdrop-blur-xl border p-5 flex flex-col items-center justify-center cursor-pointer select-none transition-shadow duration-500 ${
                  isAtZenith
                    ? "border-emerald-200/50 shadow-[0_18px_45px_rgba(6,78,59,0.12)]"
                    : "border-gray-200/80 shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Monogram */}
                <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-200/50 flex items-center justify-center shadow-inner border border-emerald-200/60 mb-3">
                  <span className="font-sans font-black text-2xl text-[#064e3b] tracking-wider">
                    {doc.initials}
                  </span>
                </div>
                
                {/* Specialty */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#064e3b] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100 mb-1">
                  {doc.specialty}
                </span>

                {/* Name & Degrees */}
                <h3 className="font-sans font-black text-lg text-gray-900 mt-1 text-center">
                  {doc.name}
                </h3>
                <p className="text-[11px] text-gray-500 font-medium text-center leading-tight mb-3 px-2">
                  {doc.degrees}
                </p>

                {/* Info strip */}
                <div className="w-full text-xs text-gray-600 bg-gray-50/80 rounded-xl p-2.5 border border-gray-100 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 font-medium text-gray-700">
                    <MapPin className="w-3 h-3 text-[#064e3b] shrink-0" />
                    <span className="truncate">{doc.chamber}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-200/60 text-[10px]">
                    <span className="font-bold text-[#064e3b] truncate pr-1">{doc.queueStatus.split('•')[0]}</span>
                    <span className="font-black text-gray-900 text-xs shrink-0">{doc.fee}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dial Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => goToMobileCard(mobileActiveIdx - 1)}
            disabled={mobileActiveIdx === 0}
            aria-label="Previous Doctor"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 text-xs font-bold"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {DOCTORS.map((doc, idx) => (
              <button
                key={doc.id}
                onClick={() => goToMobileCard(idx)}
                aria-label={`Go to ${doc.name}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  mobileActiveIdx === idx
                    ? "w-6 h-1.5 bg-[#064e3b]"
                    : "w-1.5 h-1.5 bg-[#064e3b]/25"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goToMobileCard(mobileActiveIdx + 1)}
            disabled={mobileActiveIdx === DOCTORS.length - 1}
            aria-label="Next Doctor"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 text-xs font-bold"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="w-full mt-4 max-w-[280px] sm:max-w-[300px]">
          <a
            href="/doctors"
            className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white py-3 rounded-xl font-sans font-bold text-[13px] flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            Book Serial with {DOCTORS[mobileActiveIdx].initials} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ── DESKTOP VIEW: SEAMLESS MASTER PINNED COMPOSITION ── */}
      <div className="hidden lg:contents">
        
        {/* STAGE A: THE KINETIC KEYNOTE TITLE REVEAL */}
        <div
          ref={titleStageRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          {/* Row 1: Word 1 "FEATURED" */}
          <div className="overflow-hidden py-1 sm:py-2">
            <span
              ref={word1Ref}
              className="inline-block font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[8rem] tracking-tight uppercase text-[#0B0F19] leading-none will-change-transform"
              style={{ opacity: 0 }}
            >
              FEATURED
            </span>
          </div>

          {/* Row 2: Word 2 "DOCTORS." with Brand Nature Gradient */}
          <div className="overflow-hidden py-2 sm:py-4 mt-1 sm:mt-2">
            <span
              ref={word2Ref}
              className="inline-block font-sans font-black text-7xl sm:text-9xl md:text-[10rem] lg:text-[9.5rem] tracking-tight uppercase leading-none bg-gradient-to-r from-[#064e3b] via-[#0d5c46] to-[#10b981] bg-clip-text text-transparent pb-2 will-change-transform"
              style={{ opacity: 0 }}
            >
              DOCTORS.
            </span>
          </div>

          {/* Subtitle Tagline */}
          <div ref={subtitleRef} className="mt-6 sm:mt-10 overflow-hidden" style={{ opacity: 0 }}>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-gray-400 uppercase">
              VERIFIED SPECIALISTS • REAL-TIME SERIAL QUEUE • 100% BMDC ACCREDITED
            </p>
          </div>
        </div>

        {/* STAGE B: THE DUAL-COLUMN ROTARY WHEEL & ETHEREAL DOSSIER STAGE */}
        <div
          ref={doctorsStageRef}
          className="w-full h-full max-w-[1540px] mx-auto px-6 lg:px-16 flex flex-row items-center justify-between relative z-10 gap-8"
          style={{ visibility: "hidden", opacity: 0 }}
        >
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT COLUMN: LIVE DOCTOR DOSSIER (PURE DATA)
             ══════════════════════════════════════════════════════════════ */}
          <div
            ref={leftDossierRef}
            className="w-[45%] xl:w-[42%] flex flex-col justify-center z-20 pointer-events-auto mt-20"
          >
            {/* Top Verified Context Pill */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#064e3b]">
                {activeDoc.bmdcReg} • BMDC VERIFIED
              </span>
            </div>

            {/* The Master Dossier Card */}
            <div className="relative rounded-[36px] p-8 md:p-9 bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_25px_60px_-15px_rgba(6,78,59,0.12)] transition-all duration-300">
              
              {/* Identity Header (No Avatar, Pure Typography Focus) */}
              <div className="border-b border-gray-100 pb-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#064e3b] bg-[#064e3b]/8 px-3 py-1 rounded-full border border-[#064e3b]/12 shadow-2xs">
                    {activeDoc.specialty}
                  </span>
                  <span className="text-xs font-sans font-black text-gray-400 tracking-widest">
                    0{activeDoctorIndex + 1} / 06
                  </span>
                </div>

                <h3 className="text-3xl xl:text-4xl font-sans font-black tracking-tight text-[#0B0F19] leading-tight flex items-center gap-3">
                  {activeDoc.name}
                  <Check className="w-6 h-6 text-white bg-[#10b981] rounded-full p-1 shadow-sm shrink-0" />
                </h3>
                <p className="text-sm font-semibold text-gray-500 mt-2 leading-snug">
                  {activeDoc.degrees}
                </p>
              </div>

              {/* Designation & Institutional Affiliation */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-[#064e3b] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">{activeDoc.designation}</span>
                    <span className="text-gray-500 font-medium">{activeDoc.hospital}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-gray-700">
                  <MapPin className="w-4 h-4 text-[#064e3b] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">Chamber Location:</span>
                    <span className="text-gray-500 font-medium">{activeDoc.chamber}</span>
                  </div>
                </div>
              </div>

              {/* Consultation Metrics & Live Queue Strip */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#F9F8F6] to-white border border-gray-100/80 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Visiting Queue</span>
                  <span className="text-xs font-bold text-[#064e3b] flex items-center gap-1.5 mt-0.5">
                    <Activity className="w-3.5 h-3.5 text-[#10b981] animate-pulse" />
                    {activeDoc.queueStatus}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Visiting Hours</span>
                  <span className="text-xs font-semibold text-gray-800 mt-0.5 block truncate">
                    {activeDoc.timing}
                  </span>
                </div>
              </div>

              {/* Fee & Action Button */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-400 block">Consultation Fee</span>
                  <span className="text-2xl font-black font-sans text-[#0B0F19] tracking-tight leading-none mt-0.5 block">
                    {activeDoc.fee}
                  </span>
                </div>

                <a
                  href="/doctors"
                  className="px-7 py-4 rounded-2xl bg-[#064e3b] hover:bg-[#043e2f] text-white font-sans font-bold text-sm tracking-wide shadow-[0_12px_24px_rgba(6,78,59,0.25)] hover:shadow-[0_16px_32px_rgba(6,78,59,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                >
                  Book Instant Serial <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Arc Jog Controls & Dial Pagination */}
            <div className="flex items-center justify-between mt-6 px-2">
              {/* Dial Dots */}
              <div className="flex items-center gap-2">
                {DOCTORS.map((d, i) => (
                  <button
                    key={d.id}
                    onClick={() => scrollToDoctor(i)}
                    aria-label={`Select ${d.name}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      activeDoctorIndex === i
                        ? "w-8 h-2 bg-[#064e3b]"
                        : "w-2 h-2 bg-[#064e3b]/20 hover:bg-[#064e3b]/40"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollToDoctor(Math.max(0, activeDoctorIndex - 1))}
                  disabled={activeDoctorIndex === 0}
                  aria-label="Previous Doctor"
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-xs flex items-center justify-center text-gray-800 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToDoctor(Math.min(DOCTORS.length - 1, activeDoctorIndex + 1))}
                  disabled={activeDoctorIndex === DOCTORS.length - 1}
                  aria-label="Next Doctor"
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-xs flex items-center justify-center text-gray-800 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT COLUMN: 3D RADIAL ORBITAL WHEEL OF DOCTORS CARDS
             ══════════════════════════════════════════════════════════════ */}
          <div
            ref={rightArcRef}
            className="w-[55%] xl:w-[58%] h-full relative flex items-center justify-center overflow-visible pointer-events-none"
          >
            {/* SVG Visual Arc Orbit Track (Trigonometric Curve Guide) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
              viewBox="0 0 800 900"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M 120,80 A 640,640 0 0,1 120,820"
                stroke="rgba(6, 78, 59, 0.4)"
                strokeWidth="2"
                strokeDasharray="6 8"
              />
              <path
                d="M 180,180 A 600,600 0 0,1 180,720"
                stroke="rgba(6, 78, 59, 0.2)"
                strokeWidth="1.5"
              />
              {/* Apex Marker */}
              <circle cx="560" cy="450" r="5" fill="#10b981" />
              <text x="575" y="454" fill="#064e3b" fontSize="11" fontFamily="sans-serif" fontWeight="bold">0° APEX FOCAL</text>
            </svg>

            {/* Ambient Focal Glow at the Apex */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full pointer-events-none transition-all duration-700 opacity-40"
              style={{
                background: `radial-gradient(circle, ${activeDoc.glowColor} 0%, transparent 70%)`,
                filter: "blur(40px)",
              }}
            />

            {/* The 6 Stacked Doctors Cards Along The Radial Orbit */}
            <div className="relative w-full h-full flex items-center justify-center">
              {DOCTORS.map((doc, i) => {
                const isActive = activeDoctorIndex === i;

                return (
                  <div
                    key={doc.id}
                    ref={(el) => { arcCardsRef.current[i] = el; }}
                    onClick={() => scrollToDoctor(i)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer select-none group flex flex-col items-center justify-center"
                    style={{
                      width: "320px",
                      willChange: "transform, opacity, filter",
                    }}
                  >
                    {/* The Cinematic Minimalist Dial Item */}
                    <div
                      className={`relative w-full rounded-[28px] p-4 transition-all duration-500 flex items-center gap-5 ${
                        isActive
                          ? "bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_20px_40px_-10px_rgba(6,78,59,0.15)] scale-110"
                          : "bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm opacity-50 group-hover:bg-white/20 group-hover:opacity-80"
                      }`}
                    >
                      {/* Ethereal Monogram (Dial Version) */}
                      <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                        {isActive && (
                          <div 
                            className="absolute inset-[-12px] rounded-full filter blur-[10px] pointer-events-none transition-all duration-700 opacity-50"
                            style={{
                              background: `radial-gradient(circle, ${doc.glowColor} 0%, transparent 70%)`,
                            }}
                          />
                        )}
                        <div className={`relative w-full h-full rounded-[20px] flex items-center justify-center shadow-inner transition-all duration-500 ${
                          isActive 
                            ? "bg-gradient-to-br from-white/95 to-emerald-50 border border-white/90 text-[#064e3b]" 
                            : "bg-white/20 border border-white/30 text-gray-700"
                        }`}>
                          <span className="font-sans font-black text-xl tracking-tight">
                            {doc.initials}
                          </span>
                        </div>
                      </div>

                      {/* Minimal Info */}
                      <div className="flex-1 text-left">
                        <span className={`text-[9px] font-bold uppercase tracking-[0.2em] block mb-1 transition-colors duration-500 ${
                          isActive ? "text-[#064e3b]" : "text-gray-400"
                        }`}>
                          {doc.specialty}
                        </span>
                        <h4 className={`font-sans font-black text-lg tracking-tight leading-none transition-colors duration-500 ${
                          isActive ? "text-[#0B0F19]" : "text-gray-500"
                        }`}>
                          {doc.name}
                        </h4>
                      </div>
                    </div>

                    {/* Realistic Ground Shadow Puddle Under Card */}
                    <div
                      className={`h-2 rounded-full blur-[6px] mx-auto mt-3 transition-all duration-500 ${
                        isActive
                          ? "bg-black/15 w-40 scale-100"
                          : "bg-black/5 w-24 scale-75 opacity-30"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
