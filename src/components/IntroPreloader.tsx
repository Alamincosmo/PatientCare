"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface IntroPreloaderProps {
  onComplete: () => void;
  loadProgress?: number;
}

export default function IntroPreloader({ onComplete, loadProgress = 0 }: IntroPreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textWordRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (progressLineRef.current) {
      progressLineRef.current.style.width = `${Math.max(loadProgress, 14)}%`;
    }
  }, [loadProgress]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const container = containerRef.current;
    const stage = stageRef.current;
    const socket = socketRef.current;
    const shockwave = shockwaveRef.current;
    const icon = iconRef.current;
    const textContainer = textContainerRef.current;
    const textWord = textWordRef.current;

    if (!container || !stage || !socket || !shockwave || !icon || !textContainer || !textWord) return;

    // --- INITIAL STATES (PURE SCREEN-WIDE MOTION) ---
    // Icon starts at the absolute bottom of the entire screen
    gsap.set(icon, {
      y: 720,
      opacity: 0,
      scale: 0.68,
      rotationZ: -16,
      transformOrigin: "center bottom",
    });

    gsap.set(shockwave, {
      scale: 0.8,
      opacity: 0,
    });

    // Text container uses clipPath curtain so the entire word is NEVER cut off
    gsap.set(textContainer, {
      clipPath: "inset(0% 100% 0% 0%)",
      opacity: 0,
    });

    gsap.set(textWord, {
      x: -45,
      opacity: 0,
      filter: "blur(14px)",
    });

    // Master Timeline (4.0s)
    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        document.body.style.overflow = "";
        onCompleteRef.current?.();
      },
    });

    // ── 1. TRUE SCREEN-BOTTOM BALLISTIC THROW (0.05s -> 1.15s) ──
    // Makes icon visible immediately upon takeoff from bottom of screen
    tl.to(
      icon,
      {
        opacity: 1,
        duration: 0.18,
        ease: "power1.out",
      },
      0.05
    )
    // Shoots upward all the way to an apex above the center socket
    .to(
      icon,
      {
        y: -26, // Apex above the socket
        scale: 1.04,
        rotationZ: 4,
        duration: 0.95,
        ease: "power2.out",
      },
      0.05
    )
    // Terminal gravitational snap straight down into the socket floor
    .to(icon, {
      y: 0,
      rotationZ: 0,
      scale: 1,
      duration: 0.24,
      ease: "power3.in",
    })

    // ── 2. TERMINAL IMPACT, SQUASH-STRETCH & THUD (1.15s -> 1.55s) ──
    // A. Vertical Squash & Horizontal Bulge on hard impact
    .to(icon, {
      scaleY: 0.74,
      scaleX: 1.24,
      duration: 0.08,
      ease: "power4.out",
    })
    // B. Shockwave energy pulse
    .to(
      shockwave,
      {
        scale: 1.5,
        opacity: 0.8,
        duration: 0.12,
        ease: "power2.out",
      },
      "<"
    )
    .to(
      shockwave,
      {
        opacity: 0,
        scale: 1.85,
        duration: 0.35,
        ease: "power2.out",
      },
      ">"
    )
    // C. Micro-haptic camera thud (Screen shakes 3px on impact)
    .to(
      stage,
      {
        y: 3,
        duration: 0.06,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      },
      "<"
    )
    // D. Heavy elastic rebound to rest flush in socket
    .to(
      icon,
      {
        scaleY: 1,
        scaleX: 1,
        duration: 0.45,
        ease: "elastic.out(1.2, 0.4)",
      },
      "-=0.3"
    )

    // ── 3. DELIBERATE 500MS REST IN SOCKET (1.55s -> 2.15s) ──
    .to({}, { duration: 0.6 })

    // ── 4. KINETIC IMPULSE KICK & UNTRUNCATED TEXT REVEAL (2.15s -> 2.95s) ──
    // Wind-up anticipation
    .to(icon, {
      rotationZ: -6,
      x: -8,
      scale: 1.03,
      duration: 0.16,
      ease: "power2.in",
    })
    // Hard physical kick right!
    .to(icon, {
      rotationZ: 14,
      rotationY: 22,
      x: 22,
      scale: 1.08,
      duration: 0.22,
      ease: "power3.out",
    })
    // Text container curtain reveals smoothly with clip-path (Entire word "PatientCare" completely visible!)
    .to(
      textContainer,
      {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.75,
        ease: "power3.out",
      },
      "<0.04"
    )
    // Text slides out smoothly without being cut off
    .to(
      textWord,
      {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "power3.out",
      },
      "<"
    )
    // Icon recoils back into socket
    .to(
      icon,
      {
        rotationZ: 0,
        rotationY: 0,
        x: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.45)",
      },
      "-=0.4"
    )

    // ── 5. BRAND LOCKUP HOLD (2.95s -> 3.45s) ──
    .to({}, { duration: 0.5 })

    // ── 6. LUXURIOUS FADE TRANSITION OUT (3.45s -> 4.0s) ──
    .to(container, {
      opacity: 0,
      scale: 1.03,
      duration: 0.55,
      ease: "power2.inOut",
    });

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center select-none pointer-events-auto"
      style={{
        // 100% Solid Opaque background with subtle 5% nature-green radiant gradient (ZERO transparency)
        background: "radial-gradient(circle at 50% 50%, #ECF3EF 0%, #F3F7F5 45%, #F8FAF9 100%)",
        backgroundColor: "#F8FAF9",
      }}
    >
      {/* Center Stage Container with Impact Shake (NO overflow-hidden, free screen travel) */}
      <div ref={stageRef} className="relative flex items-center justify-center px-4 sm:px-6">
        
        {/* ── THE INSET SOCKET CAVITY & FREE BALLISTIC PROJECTILE ── */}
        <div className="relative shrink-0 flex items-center justify-center [perspective:1000px]">
          {/* Shockwave Energy Ripple on Heavy Impact */}
          <div
            ref={shockwaveRef}
            className="absolute inset-0 rounded-[20px] sm:rounded-[24px] md:rounded-[26px] border-2 border-emerald-400/60 pointer-events-none -z-10 shadow-[0_0_30px_rgba(16,185,129,0.35)]"
            style={{ opacity: 0, transform: "scale(0.8)" }}
          />

          {/* The Debossed Cavity Slot (Exact outline of the SVG icon, visible from 0.0s. NO OVERFLOW-HIDDEN!) */}
          <div
            ref={socketRef}
            className="w-[88px] h-[85px] sm:w-[104px] sm:h-[100px] md:w-[116px] md:h-[111px] rounded-[20px] sm:rounded-[24px] md:rounded-[26px] flex items-center justify-center relative select-none will-change-transform"
            style={{
              backgroundColor: "#E4EDE8",
              boxShadow: "inset 5px 5px 14px 0px rgba(0, 0, 0, 0.22), inset -4px -4px 10px 0px rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(13, 92, 70, 0.08)",
            }}
          >
            {/* The SVG Logo Icon: Free to fly from bottom of the screen with ZERO box clipping! */}
            <div
              ref={iconRef}
              className="w-full h-full p-0 flex items-center justify-center relative select-none will-change-transform z-20"
              style={{
                opacity: 0,
                transform: "translate3d(0, 720px, 0)",
                willChange: "transform, opacity",
              }}
            >
              <img
                src="/patientCare%20logo.svg"
                alt="PatientCare Logo"
                className="w-full h-full object-fill pointer-events-none rounded-[19px] sm:rounded-[23px] md:rounded-[25px]"
              />
            </div>
          </div>
        </div>

        {/* ── KINETIC TEXT REVEAL: CLIP-PATH CURTAIN (FULL WORD 'PATIENTCARE' VISIBLE WITHOUT TRUNCATION!) ── */}
        <div
          ref={textContainerRef}
          className="flex items-center pl-4 sm:pl-6 select-none"
          style={{
            opacity: 0,
            clipPath: "inset(0% 100% 0% 0%)", // Smooth left-to-right reveal without cramped width clipping
            willChange: "clip-path, opacity",
          }}
        >
          <div className="py-2 px-1 whitespace-nowrap">
            <span
              ref={textWordRef}
              className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0d4a38] tracking-tight inline-block select-none will-change-transform drop-shadow-[0_3px_12px_rgba(13,92,70,0.18)]"
              style={{
                opacity: 0,
                transform: "translate3d(-45px, 0, 0)",
                filter: "blur(14px)",
                willChange: "transform, opacity, filter",
              }}
            >
              Patient Care
            </span>
          </div>
        </div>
      </div>

      {/* Discreet Bottom Buffer Bar */}
      <div className="absolute bottom-12 inset-x-0 mx-auto max-w-[200px] flex flex-col items-center gap-2">
        <div className="w-full h-[2.5px] bg-[#0d5c46]/10 rounded-full overflow-hidden">
          <div
            ref={progressLineRef}
            className="h-full bg-[#0d5c46] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(loadProgress, 14)}%` }}
          />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-[#0d5c46]/50 uppercase font-semibold">
          Loading {loadProgress}%
        </span>
      </div>
    </div>
  );
}
