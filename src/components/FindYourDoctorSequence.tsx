"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Search, Calendar } from "lucide-react";
import Image from "next/image";

export default function FindYourDoctorSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Stage A: Keynote Title Reveal Refs
  const titleStageRef = useRef<HTMLDivElement>(null);
  const titleStageBadgeRef = useRef<HTMLDivElement>(null);
  const stageWord1Ref = useRef<HTMLSpanElement>(null);
  const stageWord2Ref = useRef<HTMLSpanElement>(null);
  const stageSubtitleRef = useRef<HTMLDivElement>(null);

  // Stage B: Active Step Headlines (Positioned at clean Top Header)
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const title3Ref = useRef<HTMLDivElement>(null);

  // Hero Object (Positioned comfortably in middle, never overlaps text)
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Phase 1: Search
  const searchContentRef = useRef<HTMLDivElement>(null);
  const searchIconRef = useRef<SVGSVGElement>(null);
  const searchTextRef = useRef<HTMLSpanElement>(null);
  const searchCursorBlinkRef = useRef<HTMLSpanElement>(null);
  
  // Phase 2: Form
  const formContentRef = useRef<HTMLDivElement>(null);
  const formNameRef = useRef<HTMLSpanElement>(null);
  const formAgeRef = useRef<HTMLSpanElement>(null);
  const formDateRef = useRef<HTMLSpanElement>(null);
  const calendarIconBtnRef = useRef<HTMLDivElement>(null);
  const calendarPopupRef = useRef<HTMLDivElement>(null);
  const calendarDayRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  // Phase 3: Checkmark
  const checkmarkContentRef = useRef<HTMLDivElement>(null);
  const checkCircleRef = useRef<SVGCircleElement>(null);
  const checkPathRef = useRef<SVGPathElement>(null);

  // Phase 4: Final Card
  const cardContentRef = useRef<HTMLDivElement>(null);

  // Global Mouse
  const cursorRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      
      const dims = {
        p1W: isMobile ? 320 : 480,
        p1H: isMobile ? 70 : 80,
        p2W: isMobile ? 320 : 440,
        p2H: isMobile ? 295 : 320,
        p3S: isMobile ? 120 : 140,
        p4W: isMobile ? 310 : 420,
        p4H: isMobile ? 96 : 110,
        scrollEnd: isMobile ? "+=3200" : "+=6500",
        
        c1X: isMobile ? -35 : -60,
        c1Y: 0,
        c2X: isMobile ? -65 : -95, 
        c2Y: isMobile ? -65 : -75,
        c3X: isMobile ? 90 : 120,
        c3Y: isMobile ? -65 : -75,
        c4X: isMobile ? 115 : 160,
        c4Y: isMobile ? -5 : -5,
        c5X: isMobile ? 24 : 24,
        c5Y: isMobile ? 12 : 12,
        c6X: 0,
        c6Y: isMobile ? 70 : 80,
      };

      // 1. Initial State Setup
      // Stage A: Keynote Title
      gsap.set(titleStageRef.current, { y: 0, opacity: 1, filter: "blur(0px)", visibility: "visible" });
      gsap.set(titleStageBadgeRef.current, { opacity: 0, y: 15 });
      gsap.set(stageWord1Ref.current, { yPercent: 120, skewY: 8, opacity: 0 });
      gsap.set(stageWord2Ref.current, { yPercent: 120, skewY: 6, opacity: 0 });
      gsap.set(stageSubtitleRef.current, { opacity: 0, y: 20 });

      // Stage B: Hero Morphing Object & Mouse
      // NATIVE GSAP CENTERING: Using xPercent: -50, yPercent: -50 ensures it remains 100% DEAD-CENTERED on every frame
      gsap.set(heroRef.current, { 
        xPercent: -50, 
        yPercent: -50, 
        left: "50%", 
        top: isMobile ? "60%" : "62%", 
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        scale: 0, 
        opacity: 0,
        x: 0,
        y: 0,
      });

      gsap.set(cursorRef.current, { 
        xPercent: -50, 
        yPercent: -50, 
        left: "50%", 
        top: isMobile ? "60%" : "62%", 
        x: 300, 
        y: 300, 
        opacity: 0 
      });
      
      // Stage B Step Titles
      gsap.set([title1Ref.current, title2Ref.current, title3Ref.current], { opacity: 0, y: 20 });

      // Hide all card inner contents initially
      gsap.set([searchContentRef.current, formContentRef.current, checkmarkContentRef.current, cardContentRef.current], { opacity: 0 });
      
      gsap.set(searchTextRef.current, { textContent: "" });
      gsap.set(formNameRef.current, { textContent: "" });
      gsap.set(formAgeRef.current, { textContent: "" });
      gsap.set(formDateRef.current, { textContent: "" });
      gsap.set(calendarPopupRef.current, { opacity: 0, scale: 0.85, display: "none" });
      gsap.set(calendarDayRef.current, { backgroundColor: "transparent", color: "#064e3b", scale: 1 });
      
      // Checkmark SVG strokes
      gsap.set(checkCircleRef.current, { strokeDasharray: 166, strokeDashoffset: 166 });
      gsap.set(checkPathRef.current, { strokeDasharray: 48, strokeDashoffset: 48 });

      // Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: dims.scrollEnd,
          scrub: 1.0,
          pin: true,
          anticipatePin: 1,
        }
      });

      // ==============================================================
      // STAGE A: THE KINETIC KEYNOTE TITLE REVEAL ("HOW IT WORKS.")
      // Exactly matches CelestialArcStats, SpecialtiesGrid, & FeaturedDoctors
      // ==============================================================
      tl.to(titleStageBadgeRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
        .to(stageWord1Ref.current, { yPercent: 0, skewY: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "<0.08")
        .to(stageWord2Ref.current, { yPercent: 0, skewY: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "<0.12")
        .to(stageSubtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<0.16")
        .to({}, { duration: isMobile ? 0.35 : 0.65 }) // Keynote reading hold
        
        // Float Up & Blur Dissolve Exit
        .to(titleStageRef.current, { 
          y: isMobile ? -80 : -140, 
          opacity: 0, 
          filter: "blur(14px)", 
          duration: 0.7, 
          ease: "power2.inOut" 
        })
        .set(titleStageRef.current, { visibility: "hidden" });

      // ==============================================================
      // STAGE B: 3-STEP MORPHING PRODUCT INTERACTION
      // Step titles sit cleanly at the Top; Hero Box is centered below
      // ZERO OVERLAP, 100% VISIBILITY
      // ==============================================================

      // ──────────────────────────────────────────
      // PHASE 1: Find your doctor (Search Box)
      // ──────────────────────────────────────────
      tl.to(title1Ref.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        .to(heroRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "<")
        .to(heroRef.current, { 
          width: dims.p1W, height: dims.p1H, borderRadius: 24, duration: 0.75, ease: "elastic.out(1, 0.75)",
          backgroundColor: "#ffffff",
          boxShadow: "0 25px 60px -15px rgba(6,78,59,0.12)"
        })
        .to(searchContentRef.current, { opacity: 1, duration: 0.3 }, "-=0.35");
        
      // Mouse Entrance & Click
      tl.to(cursorRef.current, { x: dims.c1X, y: dims.c1Y, opacity: 1, duration: 0.7, ease: "power3.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(searchCursorBlinkRef.current, { opacity: 1, duration: 0.1 })
        .to(cursorRef.current, { x: 50, y: 150, opacity: 0, duration: 0.4 }, ">0.1");

      // Typing with Jiggle
      const searchTxt = "Cardiologist in Dhaka";
      const searchObj = { length: 0 };
      const typeSearchTl = gsap.timeline();
      
      typeSearchTl.to(searchObj, {
        length: searchTxt.length,
        duration: 1.3,
        ease: "none",
        onUpdate: () => {
          if (searchTextRef.current) {
            searchTextRef.current.textContent = searchTxt.substring(0, Math.floor(searchObj.length));
          }
        }
      });
      for(let i = 0; i < 6; i++) {
        typeSearchTl.to(heroRef.current, {
          scale: 1.015, rotation: (Math.random() - 0.5) * 1.2, duration: 0.08, yoyo: true, repeat: 1
        }, (1.3 / 6) * i);
      }
      tl.add(typeSearchTl);

      tl.to({}, { duration: 0.4 }); // reading pause

      // Shrink to Ball & transition Step 1 Title out
      tl.to(title1Ref.current, { opacity: 0, y: -20, duration: 0.3 })
        .to(searchContentRef.current, { opacity: 0, duration: 0.2 }, "<")
        .to(heroRef.current, { width: 60, height: 60, borderRadius: 30, rotation: 0, duration: 0.5, ease: "power4.inOut" });

      // ──────────────────────────────────────────
      // PHASE 2: Add patient details (The Form)
      // ──────────────────────────────────────────
      // Squash, Jump, Slam
      tl.to(heroRef.current, { y: -50, scaleY: 1.1, scaleX: 0.9, duration: 0.25, ease: "power1.out" })
        .to(heroRef.current, { y: 15, scaleY: 0.85, scaleX: 1.15, duration: 0.2, ease: "power2.in" });
        
      // Morph to Form
      tl.to(heroRef.current, { y: 0, scaleY: 1, scaleX: 1, width: dims.p2W, height: dims.p2H, borderRadius: 24, duration: 0.75, ease: "elastic.out(1, 0.75)" })
        .to(title2Ref.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.5")
        .to(formContentRef.current, { opacity: 1, duration: 0.3 }, "-=0.35");

      // Mouse enters to type Name
      tl.to(cursorRef.current, { x: dims.c2X, y: dims.c2Y, opacity: 1, duration: 0.5, ease: "power3.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 });
      
      const nameTxt = "Rakib Hasan";
      const nameObj = { length: 0 };
      tl.to(nameObj, {
        length: nameTxt.length, duration: 0.5, ease: "none",
        onUpdate: () => { if(formNameRef.current) formNameRef.current.textContent = nameTxt.substring(0, Math.floor(nameObj.length)); }
      });

      // Mouse moves to type Age
      tl.to(cursorRef.current, { x: dims.c3X, y: dims.c3Y, duration: 0.35, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 });

      const ageTxt = "28";
      const ageObj = { length: 0 };
      tl.to(ageObj, {
        length: ageTxt.length, duration: 0.2, ease: "none",
        onUpdate: () => { if(formAgeRef.current) formAgeRef.current.textContent = ageTxt.substring(0, Math.floor(ageObj.length)); }
      });

      // 1. Mouse moves to click the Calendar Icon
      tl.to(cursorRef.current, { x: dims.c4X, y: dims.c4Y, duration: 0.45, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(calendarIconBtnRef.current, { scale: 0.88, duration: 0.1, yoyo: true, repeat: 1 }, "<");

      // 2. Calendar Popup appears with spring ease
      tl.set(calendarPopupRef.current, { display: "flex" })
        .to(calendarPopupRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)" });

      // 3. Mouse moves to click Date on Calendar (Day 24)
      tl.to(cursorRef.current, { x: dims.c5X, y: dims.c5Y, duration: 0.4, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(calendarDayRef.current, { backgroundColor: "#064e3b", color: "#ffffff", scale: 1.12, duration: 0.15 }, "<");

      // 4. Date populates into input field
      tl.call(() => {
        if (formDateRef.current) formDateRef.current.textContent = "Tomorrow, 10:30 AM";
      });

      // 5. Calendar popup closes smoothly
      tl.to(calendarPopupRef.current, { opacity: 0, scale: 0.88, duration: 0.2, delay: 0.15, ease: "power2.in" })
        .set(calendarPopupRef.current, { display: "none" });

      // 6. Mouse moves to Pay Button
      tl.to(cursorRef.current, { x: dims.c6X, y: dims.c6Y, duration: 0.4, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(submitBtnRef.current, { scale: 0.96, backgroundColor: "#043e2f", duration: 0.1, yoyo: true, repeat: 1 }, "<")
        .to(cursorRef.current, { opacity: 0, y: 180, duration: 0.35 }, ">0.1");

      // Form shrinks to Ball & transition Step 2 Title out
      tl.to(title2Ref.current, { opacity: 0, y: -20, duration: 0.3 })
        .to(formContentRef.current, { opacity: 0, duration: 0.2 }, "<")
        .to(heroRef.current, { width: 60, height: 60, borderRadius: 30, duration: 0.5, ease: "power4.inOut" });

      // ──────────────────────────────────────────
      // PHASE 3: Walk in on time (Checkmark Success)
      // ──────────────────────────────────────────
      // Squash, Jump, Slam
      tl.to(heroRef.current, { y: -60, scaleY: 1.1, scaleX: 0.9, duration: 0.25, ease: "power1.out" })
        .to(heroRef.current, { y: 15, scaleY: 0.85, scaleX: 1.15, duration: 0.2, ease: "power2.in" });
      
      // Morph to Circle
      tl.to(heroRef.current, { y: 0, scaleY: 1, scaleX: 1, width: dims.p3S, height: dims.p3S, borderRadius: dims.p3S / 2, duration: 0.7, ease: "elastic.out(1, 0.75)" })
        .to(title3Ref.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.5")
        .to(checkmarkContentRef.current, { opacity: 1, duration: 0.2 }, "-=0.35");

      // Draw SVG Checkmark
      tl.to(checkCircleRef.current, { strokeDashoffset: 0, duration: 0.55, ease: "power2.out" })
        .to(checkPathRef.current, { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, "-=0.2");

      tl.to({}, { duration: 0.5 }); // Admiration pause

      // ──────────────────────────────────────────
      // PHASE 4: The Final Ticket (Notification Bar)
      // ──────────────────────────────────────────
      tl.to(title3Ref.current, { opacity: 0, y: -20, duration: 0.3 })
        .to(checkmarkContentRef.current, { opacity: 0, scale: 0.5, duration: 0.25 }, "<");
      
      // Morph to sleek notification bar
      tl.to(heroRef.current, { 
          width: dims.p4W, height: dims.p4H, borderRadius: 28, 
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 30px 60px -15px rgba(6,78,59,0.15), inset 0 1px 0 rgba(255,255,255,1)",
          duration: 0.8, ease: "elastic.out(1, 0.7)" 
        })
        .to(cardContentRef.current, { opacity: 1, duration: 0.4 }, "-=0.45");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F9F8F6] overflow-hidden flex flex-col items-center justify-center select-none font-sans">
      
      {/* Ambient Atmospheric Light Orbs for Frosted Glass Background */}
      <div className="absolute top-1/4 left-1/4 w-[350px] lg:w-[480px] h-[350px] lg:h-[480px] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] lg:w-[500px] h-[380px] lg:h-[500px] bg-teal-400/20 rounded-full blur-[110px] pointer-events-none opacity-60" />

      {/* ══════════════════════════════════════════════════════════════
          STAGE A: THE KINETIC KEYNOTE TITLE REVEAL ("HOW IT WORKS.")
          Full screen keynote typography with Brand Nature Palette
         ══════════════════════════════════════════════════════════════ */}
      <div
        ref={titleStageRef}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
      >
        {/* Top Context Pill */}
        <div ref={titleStageBadgeRef} className="mb-3 sm:mb-4 opacity-0 will-change-transform">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-emerald-100 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#064e3b]">
              3-Step Fast Access
            </span>
          </div>
        </div>

        {/* Row 1: Word 1 "HOW IT" */}
        <div className="overflow-hidden py-1 sm:py-2">
          <span
            ref={stageWord1Ref}
            className="inline-block font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight uppercase text-[#064e3b] leading-none will-change-transform"
            style={{ opacity: 0 }}
          >
            HOW IT
          </span>
        </div>

        {/* Row 2: Word 2 "WORKS." with Brand Nature Gradient */}
        <div className="overflow-hidden py-1 sm:py-3 mt-1 sm:mt-2">
          <span
            ref={stageWord2Ref}
            className="inline-block font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] tracking-tight uppercase leading-none bg-gradient-to-r from-[#064e3b] via-[#0d5c46] to-[#10b981] bg-clip-text text-transparent pb-2 will-change-transform"
            style={{ opacity: 0 }}
          >
            WORKS.
          </span>
        </div>

        {/* Subtitle Tagline */}
        <div ref={stageSubtitleRef} className="mt-4 sm:mt-8 overflow-hidden opacity-0 will-change-transform">
          <p className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-[#064e3b]/70 uppercase">
            ZERO WAITING ROOM CHAOS • INSTANT VERIFIED CONFIRMATION
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          STAGE B: ACTIVE STEP HEADLINES (Clean Top Header Area)
          Always positioned cleanly at the top with matching brand theme!
         ══════════════════════════════════════════════════════════════ */}
      <div className="absolute top-8 sm:top-10 md:top-12 lg:top-14 inset-x-0 w-full flex items-center justify-center pointer-events-none z-10 px-4">
        <div className="relative w-full max-w-xl h-20 flex items-center justify-center text-center">
          
          {/* Step 1 Title: Find your doctor */}
          <div ref={title1Ref} className="absolute inset-x-0 flex flex-col items-center justify-center opacity-0 will-change-transform">
            <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#064e3b] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 shadow-2xs mb-2">
              Step 01 • Search
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-[#064e3b]">
              Find your <span className="bg-gradient-to-r from-[#0d5c46] via-[#10b981] to-[#0d5c46] bg-clip-text text-transparent">doctor.</span>
            </h2>
          </div>

          {/* Step 2 Title: Add patient details */}
          <div ref={title2Ref} className="absolute inset-x-0 flex flex-col items-center justify-center opacity-0 will-change-transform">
            <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#064e3b] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 shadow-2xs mb-2">
              Step 02 • One-Tap Booking
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-[#064e3b]">
              Add patient <span className="bg-gradient-to-r from-[#0d5c46] via-[#10b981] to-[#0d5c46] bg-clip-text text-transparent">details.</span>
            </h2>
          </div>

          {/* Step 3 Title: Walk in on time */}
          <div ref={title3Ref} className="absolute inset-x-0 flex flex-col items-center justify-center opacity-0 will-change-transform">
            <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#064e3b] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 shadow-2xs mb-2">
              Step 03 • Confirmed
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-[#064e3b]">
              Walk in on <span className="bg-gradient-to-r from-[#0d5c46] via-[#10b981] to-[#0d5c46] bg-clip-text text-transparent">time.</span>
            </h2>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          THE HERO MORPHING OBJECT
          100% DEAD-CENTERED (Horizontal & Vertical) via GSAP xPercent/yPercent
         ══════════════════════════════════════════════════════════════ */}
      <div 
        ref={heroRef} 
        className="absolute z-20 bg-white/95 backdrop-blur-2xl border border-emerald-950/10 shadow-[0_25px_60px_-15px_rgba(6,78,59,0.14)] overflow-hidden pointer-events-auto"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Phase 1: Search Box */}
        <div ref={searchContentRef} className="absolute inset-0 flex items-center px-4 sm:px-6 opacity-0 pointer-events-none">
          <Search ref={searchIconRef} className="w-5 h-5 sm:w-6 sm:h-6 text-[#0d5c46] mr-3 sm:mr-4 shrink-0" />
          <div className="flex items-center h-full pt-1">
            <span ref={searchTextRef} className="font-sans text-[#064e3b] text-lg sm:text-2xl font-bold whitespace-nowrap tracking-tight"></span>
            <span ref={searchCursorBlinkRef} className="w-[3px] h-6 sm:h-8 bg-[#10b981] ml-1 opacity-0 animate-pulse"></span>
          </div>
        </div>

        {/* Phase 2: Booking Form */}
        <div ref={formContentRef} className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center opacity-0 pointer-events-none">
          <div className="space-y-2.5 sm:space-y-3 w-full">
            <div className="flex gap-2 sm:gap-3">
              <div className="bg-emerald-50/50 rounded-xl p-2.5 sm:p-3 flex-1 border border-emerald-100/80 flex flex-col items-start justify-center">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#064e3b]/60 tracking-wider">Patient Name</span>
                <span ref={formNameRef} className="text-sm sm:text-base font-bold text-[#064e3b] h-5 mt-0.5 flex items-center"></span>
              </div>
              <div className="bg-emerald-50/50 rounded-xl p-2.5 sm:p-3 w-18 sm:w-24 border border-emerald-100/80 flex flex-col items-start justify-center">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#064e3b]/60 tracking-wider">Age</span>
                <span ref={formAgeRef} className="text-sm sm:text-base font-bold text-[#064e3b] h-5 mt-0.5 flex items-center"></span>
              </div>
            </div>

            {/* Date Picker Field */}
            <div className="bg-emerald-50/50 rounded-xl p-2.5 sm:p-3 border border-emerald-100/80 flex items-center justify-between relative">
              <div className="flex flex-col items-start justify-center">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#064e3b]/60 tracking-wider">Select Appointment Date</span>
                <span ref={formDateRef} className="text-[11px] sm:text-sm font-bold text-[#064e3b] h-5 mt-0.5 flex items-center"></span>
              </div>
              <div
                ref={calendarIconBtnRef}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100/80 text-[#064e3b] flex items-center justify-center cursor-pointer transition-transform"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>

            {/* Realistic Animated Calendar Popover */}
            <div
              ref={calendarPopupRef}
              className="absolute z-30 left-2 right-2 sm:left-4 sm:right-4 top-10 sm:top-12 bg-white/95 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-[0_20px_45px_rgba(6,78,59,0.22)] border border-emerald-900/15 flex flex-col gap-2 pointer-events-none"
              style={{ display: "none", opacity: 0, transform: "scale(0.85)" }}
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-[10px] sm:text-xs font-bold text-[#064e3b] font-sans">October 2026</span>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#064e3b] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">Available</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <span key={day} className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase">{day}</span>
                ))}
                {[20, 21, 22, 23].map((d) => (
                  <div key={d} className="w-5 h-5 sm:w-7 sm:h-7 mx-auto rounded-lg flex items-center justify-center text-[10px] sm:text-[11px] font-semibold text-gray-400">{d}</div>
                ))}
                {/* Day 24 (Selected date) */}
                <div
                  ref={calendarDayRef}
                  className="w-5 h-5 sm:w-7 sm:h-7 mx-auto rounded-lg flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-gray-800 transition-all cursor-pointer ring-1 ring-emerald-600/30"
                >
                  24
                </div>
                {[25, 26].map((d) => (
                  <div key={d} className="w-5 h-5 sm:w-7 sm:h-7 mx-auto rounded-lg flex items-center justify-center text-[10px] sm:text-[11px] font-semibold text-gray-600">{d}</div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-gray-500 pt-1 border-t border-gray-100">
                <span>Slot: Morning</span>
                <span className="font-bold text-[#064e3b]">10:30 AM</span>
              </div>
            </div>

            <button ref={submitBtnRef} className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white py-2.5 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base flex justify-center items-center shadow-[0_10px_20px_rgba(6,78,59,0.22)] transition-colors">
              Pay
            </button>
          </div>
        </div>

        {/* Phase 3: Checkmark Success */}
        <div ref={checkmarkContentRef} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#10b981]" viewBox="0 0 52 52">
            <circle ref={checkCircleRef} cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="4" />
            <path ref={checkPathRef} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        {/* Phase 4: Final Serial Card (Notification Bar Style) */}
        <div ref={cardContentRef} className="absolute inset-0 px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-3 sm:gap-4 opacity-0 pointer-events-none">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-sm border border-emerald-100 flex items-center justify-center shrink-0">
            <Image src="/patientCare logo.svg" width={32} height={32} alt="logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-0.5">
              <span className="font-sans font-bold text-[13px] sm:text-[14px] text-[#064e3b] tracking-tight">PatientCare</span>
              <span className="font-sans text-[10px] sm:text-[12px] text-gray-500 font-medium">11:35 PM</span>
            </div>
            <h3 className="font-sans text-[15px] sm:text-[17px] font-black text-gray-900 tracking-tight leading-snug">
              Your serial is <span className="text-[#064e3b]">#2</span>.
            </h3>
            <p className="font-sans text-[12px] sm:text-[14px] text-gray-500 font-medium leading-tight mt-0.5">
              Your slot is confirmed.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          GHOST MOUSE CURSOR
          Centered with matching brand forest green fill & white stroke
         ══════════════════════════════════════════════════════════════ */}
      <svg 
        ref={cursorRef}
        className="absolute z-30 w-8 h-8 sm:w-10 sm:h-10 pointer-events-none drop-shadow-xl"
        viewBox="0 0 24 24" 
        fill="none" 
      >
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 0 0-.85.35z" fill="#064e3b" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    </section>
  );
}
