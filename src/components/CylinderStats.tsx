"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeartPulse, Activity, UserCheck, ShieldPlus, ArrowRight, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  id: string;
  badge: string;
  targetNumber: number;
  suffix: string;
  label: string;
  sublabel: string;
  description: string;
  icon: typeof HeartPulse;
  pillColor: string;
  accentBg: string;
  statHighlight: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: "doctors",
    badge: "VERIFIED PRACTITIONERS",
    targetNumber: 72,
    suffix: "+",
    label: "Doctors & Specialists",
    sublabel: "Available on platform",
    description: "BMDC registered specialist doctors across Dhaka and all divisional cities, ready for digital queue serials.",
    icon: HeartPulse,
    pillColor: "text-[#0d5c46] border-[#0d5c46]/20 bg-[#0d5c46]/5",
    accentBg: "from-[#0d5c46] to-[#08382b]",
    statHighlight: "72+ Specialist Doctors"
  },
  {
    id: "specialties",
    badge: "COMPREHENSIVE CARE",
    targetNumber: 20,
    suffix: "",
    label: "Medical Specialties",
    sublabel: "All under one roof",
    description: "From Cardiology to Pediatrics, Gynecology and Orthopedics — verified diagnosis and treatment for your entire family.",
    icon: Activity,
    pillColor: "text-[#0c6a4d] border-[#0c6a4d]/20 bg-[#0c6a4d]/5",
    accentBg: "from-[#0a4735] to-[#062c21]",
    statHighlight: "20 Major Departments"
  },
  {
    id: "satisfaction",
    badge: "PATIENT HAPPINESS",
    targetNumber: 99,
    suffix: "%",
    label: "Satisfaction Rate",
    sublabel: "Verified feedback",
    description: "Zero waiting room hassle, instant digital queue SMS, and secure lifetime health records keep our patients smiling.",
    icon: UserCheck,
    pillColor: "text-emerald-700 border-emerald-600/20 bg-emerald-50",
    accentBg: "from-emerald-800 to-[#0a4735]",
    statHighlight: "99% On-time Appointments"
  }
];

export default function CylinderStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Animated display numbers
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([0, 0, 0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || cards.length === 0) return;

    const numCards = STATS_DATA.length;
    // Current drum progress proxy object
    const drum = { progress: 0 };
    // Track previous integer step to trigger number counter animation
    const numbersCounted: boolean[] = [false, false, false];

    const triggerCounter = (index: number) => {
      const target = STATS_DATA[index].targetNumber;
      const counterObj = { val: 0 };

      gsap.to(counterObj, {
        val: target,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: () => {
          setAnimatedNumbers((prev) => {
            const next = [...prev];
            next[index] = Math.round(counterObj.val);
            return next;
          });
        }
      });
    };

    // Cylinder math update function
    const updateCylinder = () => {
      const isMobile = window.innerWidth < 768;
      const spacing = isMobile ? 320 : 500;

      const closestIndex = Math.round(drum.progress);
      setActiveIndex(Math.min(numCards - 1, Math.max(0, closestIndex)));

      cards.forEach((card, i) => {
        const diff = i - drum.progress;
        const absDiff = Math.abs(diff);

        // Cylinder rotary transformation (Zero-Degree Focus Rule)
        // Center active card: rotateY = 0deg, translateZ = 0, scale = 1, blur = 0
        // Side cards: curve into 3D cylinder depth
        const rotateY = diff * (isMobile ? 28 : 34);
        const translateX = diff * spacing;
        const translateZ = -absDiff * (isMobile ? 120 : 180);
        const scale = Math.max(0.72, 1 - absDiff * 0.16);
        const opacity = Math.max(0.12, 1 - absDiff * 0.45);
        const blur = absDiff > 0.35 ? absDiff * 3.5 : 0;
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
        });

        // Trigger counter when card is near the center
        if (absDiff < 0.3 && !numbersCounted[i]) {
          numbersCounted[i] = true;
          triggerCounter(i);
        } else if (absDiff > 0.8) {
          // Reset so scrolling back can re-animate
          numbersCounted[i] = false;
        }
      });
    };

    // Initial render
    updateCylinder();
    // Trigger first counter immediately
    triggerCounter(0);
    numbersCounted[0] = true;

    // Pinning with ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${numCards * 750}`,
      pin: true,
      scrub: 1.0,
      anticipatePin: 1,
      onUpdate: (self) => {
        drum.progress = self.progress * (numCards - 1);
        updateCylinder();
      },
    });

    const handleResize = () => {
      updateCylinder();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F4F1EA] overflow-hidden flex flex-col justify-between py-8 select-none"
    >
      {/* Background Decorative Rings / Cassette Axis */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[850px] h-[850px] rounded-full border border-[#0d5c46]/10 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[620px] h-[620px] rounded-full border border-dashed border-[#0d5c46]/15" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#0d5c46]/10" />
      </div>

      {/* Top Header & Context */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-4 pt-4 sm:pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0d5c46]/20 bg-white/80 backdrop-blur-md shadow-xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#0d5c46]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#0d5c46]">
            Impact In Numbers • Live Network
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Care that delivers <span className="italic text-[#0d5c46]">every second</span>.
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Scroll down to see the real metrics powering Bangladesh’s smoothest healthcare journey.
        </p>

        {/* Rotary Step Indicator */}
        <div className="mt-4 inline-flex items-center gap-2 p-1 bg-white/90 backdrop-blur-md rounded-full border border-[#E5E5E5] shadow-sm">
          {STATS_DATA.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeIndex === idx
                  ? "bg-[#0d5c46] text-white shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <span>0{idx + 1}</span>
              <span className="hidden sm:inline font-medium">{item.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Cylinder Rotary Carousel Stage */}
      <div
        ref={containerRef}
        className="relative w-full flex-1 flex items-center justify-center my-2"
        style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
      >
        {STATS_DATA.map((item, index) => {
          const IconComponent = item.icon;
          const displayNum = animatedNumbers[index];

          return (
            <div
              key={item.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="absolute w-[92vw] max-w-[480px] sm:max-w-[540px] rounded-[36px] bg-white/95 backdrop-blur-2xl border border-white/80 p-7 sm:p-9 shadow-[0_30px_70px_rgba(13,92,70,0.12)] cursor-grab active:cursor-grabbing"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity, filter",
              }}
            >
              {/* Badge + Icon */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border ${item.pillColor}`}
                >
                  <ShieldPlus className="w-3.5 h-3.5" />
                  {item.badge}
                </span>

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0d5c46]/10 to-[#0d5c46]/5 flex items-center justify-center text-[#0d5c46] border border-[#0d5c46]/15 shadow-xs">
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>

              {/* Huge Counter Display */}
              <div className="flex items-baseline gap-2 mb-2">
                <span
                  ref={(el) => {
                    numberRefs.current[index] = el;
                  }}
                  className="font-serif text-6xl sm:text-7xl lg:text-8xl font-black text-[#0d5c46] tracking-tight drop-shadow-xs"
                >
                  {displayNum}
                </span>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#0d5c46]/80">
                  {item.suffix}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {item.label}
              </h3>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0d5c46] mt-0.5 mb-3">
                {item.sublabel}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {item.description}
              </p>

              {/* Bottom Card Footer with pill status */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-gray-700">
                    {item.statHighlight}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#0d5c46]">
                  <span>Live Serial Sync</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className="relative z-20 text-center pb-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500">
          <span className="inline-block w-2 h-2 rounded-full bg-[#0d5c46] animate-ping" />
          <span>Keep scrolling down to rotate the cylinder & discover all metrics</span>
        </div>
      </div>
    </section>
  );
}
