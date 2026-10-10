"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Search, Calendar } from "lucide-react";
import Image from "next/image";

export default function FindYourDoctorSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Headlines
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const title3Ref = useRef<HTMLHeadingElement>(null);

  // Hero Object
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
        p2H: isMobile ? 290 : 320,
        p3S: isMobile ? 120 : 140,
        p4W: isMobile ? 300 : 420,
        p4H: isMobile ? 96 : 110,
        scrollEnd: isMobile ? "+=3000" : "+=7000",
        
        c1X: isMobile ? -40 : -60,
        c1Y: 0,
        c2X: isMobile ? -70 : -100, 
        c2Y: isMobile ? -70 : -78,
        c3X: isMobile ? 100 : 120,
        c3Y: isMobile ? -70 : -78,
        c4X: isMobile ? 120 : 165,
        c4Y: isMobile ? -5 : -10,
        c5X: isMobile ? 26 : 26,
        c5Y: isMobile ? 14 : 14,
        c6X: 0,
        c6Y: isMobile ? 70 : 80,
      };

      // 1. Initial State Setup
      gsap.set(heroRef.current, { width: 60, height: 60, borderRadius: 30, scale: 0, opacity: 0 });
      gsap.set(cursorRef.current, { x: 300, y: 300, opacity: 0 });
      
      // Hide all contents initially
      gsap.set([searchContentRef.current, formContentRef.current, checkmarkContentRef.current, cardContentRef.current], { opacity: 0 });
      gsap.set([title1Ref.current, title2Ref.current, title3Ref.current], { opacity: 0, y: 20 });
      
      gsap.set(searchTextRef.current, { textContent: "" });
      gsap.set(formNameRef.current, { textContent: "" });
      gsap.set(formAgeRef.current, { textContent: "" });
      gsap.set(formDateRef.current, { textContent: "" });
      gsap.set(calendarPopupRef.current, { opacity: 0, scale: 0.85, display: "none" });
      gsap.set(calendarDayRef.current, { backgroundColor: "transparent", color: "#111827", scale: 1 });
      
      // Checkmark SVG strokes
      gsap.set(checkCircleRef.current, { strokeDasharray: 166, strokeDashoffset: 166 });
      gsap.set(checkPathRef.current, { strokeDasharray: 48, strokeDashoffset: 48 });

      // Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: dims.scrollEnd,
          scrub: 1.2,
          pin: true,
        }
      });

      // ==========================================
      // PHASE 1: Find your doctor (Search Box)
      // ==========================================
      tl.to(title1Ref.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        .to(heroRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "<")
        .to(heroRef.current, { 
          width: dims.p1W, height: dims.p1H, borderRadius: 24, duration: 0.8, ease: "elastic.out(1, 0.75)",
          backgroundColor: "#ffffff",
          boxShadow: "0 20px 60px -15px rgba(0,0,0,0.15)"
        })
        .to(searchContentRef.current, { opacity: 1, duration: 0.3 }, "-=0.4")
        
      // Mouse Entrance & Click
      tl.to(cursorRef.current, { x: dims.c1X, y: dims.c1Y, opacity: 1, duration: 0.8, ease: "power3.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(searchCursorBlinkRef.current, { opacity: 1, duration: 0.1 })
        .to(cursorRef.current, { x: 50, y: 150, opacity: 0, duration: 0.5 }, ">0.1");

      // Typing with Jiggle
      const searchTxt = "Cardiologist in Dhaka";
      const searchObj = { length: 0 };
      const typeSearchTl = gsap.timeline();
      
      typeSearchTl.to(searchObj, {
        length: searchTxt.length,
        duration: 1.5,
        ease: "none",
        onUpdate: () => {
          if (searchTextRef.current) {
            searchTextRef.current.textContent = searchTxt.substring(0, Math.floor(searchObj.length));
          }
        }
      });
      // Micro-bounces for keystrokes
      for(let i=0; i<8; i++) {
        typeSearchTl.to(heroRef.current, {
          scale: 1.02, rotation: (Math.random() - 0.5) * 1.5, duration: 0.08, yoyo: true, repeat: 1
        }, (1.5 / 8) * i);
      }
      tl.add(typeSearchTl);

      tl.to({}, { duration: 0.5 }); // reading pause

      // Shrink to Ball
      tl.to(title1Ref.current, { opacity: 0, y: -20, duration: 0.3 })
        .to(searchContentRef.current, { opacity: 0, duration: 0.2 }, "<")
        .to(heroRef.current, { width: 60, height: 60, borderRadius: 30, rotation: 0, duration: 0.6, ease: "power4.inOut" })


      // ==========================================
      // PHASE 2: Add patient details (The Form)
      // ==========================================
      // Squash, Jump, Slam
      tl.to(heroRef.current, { y: -60, scaleY: 1.1, scaleX: 0.9, duration: 0.3, ease: "power1.out" })
        .to(heroRef.current, { y: 20, scaleY: 0.8, scaleX: 1.2, duration: 0.2, ease: "power2.in" })
        
      // Morph to Form
      tl.to(heroRef.current, { y: 0, scaleY: 1, scaleX: 1, width: dims.p2W, height: dims.p2H, borderRadius: 24, duration: 0.8, ease: "elastic.out(1, 0.75)" })
        .to(title2Ref.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.6")
        .to(formContentRef.current, { opacity: 1, duration: 0.3 }, "-=0.4")

      // Mouse enters to type Name
      tl.to(cursorRef.current, { x: dims.c2X, y: dims.c2Y, opacity: 1, duration: 0.6, ease: "power3.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
      
      const nameTxt = "Rakib Hasan";
      const nameObj = { length: 0 };
      tl.to(nameObj, {
        length: nameTxt.length, duration: 0.6, ease: "none",
        onUpdate: () => { if(formNameRef.current) formNameRef.current.textContent = nameTxt.substring(0, Math.floor(nameObj.length)); }
      });

      // Mouse moves to type Age
      tl.to(cursorRef.current, { x: dims.c3X, y: dims.c3Y, duration: 0.4, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })

      const ageTxt = "28";
      const ageObj = { length: 0 };
      tl.to(ageObj, {
        length: ageTxt.length, duration: 0.2, ease: "none",
        onUpdate: () => { if(formAgeRef.current) formAgeRef.current.textContent = ageTxt.substring(0, Math.floor(ageObj.length)); }
      });

      // 1. Mouse moves to click the Calendar Icon
      tl.to(cursorRef.current, { x: dims.c4X, y: dims.c4Y, duration: 0.5, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(calendarIconBtnRef.current, { scale: 0.88, duration: 0.1, yoyo: true, repeat: 1 }, "<");

      // 2. Calendar Popup appears with spring ease
      tl.set(calendarPopupRef.current, { display: "flex" })
        .to(calendarPopupRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.8)" });

      // 3. Mouse moves to click Date on the Calendar (Day 24)
      tl.to(cursorRef.current, { x: dims.c5X, y: dims.c5Y, duration: 0.45, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(calendarDayRef.current, { backgroundColor: "#0d5c46", color: "#ffffff", scale: 1.12, duration: 0.15 }, "<");

      // 4. Date populates into the input field!
      tl.call(() => {
        if (formDateRef.current) formDateRef.current.textContent = "Tomorrow, 10:30 AM";
      });

      // 5. Calendar popup closes smoothly
      tl.to(calendarPopupRef.current, { opacity: 0, scale: 0.88, duration: 0.25, delay: 0.15, ease: "power2.in" })
        .set(calendarPopupRef.current, { display: "none" });

      // 6. Mouse moves to Pay Button
      tl.to(cursorRef.current, { x: dims.c6X, y: dims.c6Y, duration: 0.45, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(submitBtnRef.current, { scale: 0.96, backgroundColor: "#0a4735", duration: 0.1, yoyo: true, repeat: 1 }, "<")
        .to(cursorRef.current, { opacity: 0, y: 200, duration: 0.4 }, ">0.1");

      // Form shrinks to Ball
      tl.to(title2Ref.current, { opacity: 0, y: -20, duration: 0.3 })
        .to(formContentRef.current, { opacity: 0, duration: 0.2 }, "<")
        .to(heroRef.current, { width: 60, height: 60, borderRadius: 30, duration: 0.6, ease: "power4.inOut" })


      // ==========================================
      // PHASE 3: Walk in on time (Checkmark Success)
      // ==========================================
      // Squash, Jump, Slam
      tl.to(heroRef.current, { y: -80, scaleY: 1.1, scaleX: 0.9, duration: 0.3, ease: "power1.out" })
        .to(heroRef.current, { y: 20, scaleY: 0.8, scaleX: 1.2, duration: 0.2, ease: "power2.in" })
      
      // Morph to Circle
      tl.to(heroRef.current, { y: 0, scaleY: 1, scaleX: 1, width: dims.p3S, height: dims.p3S, borderRadius: dims.p3S/2, duration: 0.8, ease: "elastic.out(1, 0.75)" })
        .to(title3Ref.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.6")
        .to(checkmarkContentRef.current, { opacity: 1, duration: 0.2 }, "-=0.4")

      // Draw SVG Checkmark
      tl.to(checkCircleRef.current, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" })
        .to(checkPathRef.current, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, "-=0.2")

      tl.to({}, { duration: 0.6 }); // Pause to admire the success state


      // ==========================================
      // PHASE 4: The Final Ticket (Notification Bar)
      // ==========================================
      tl.to(title3Ref.current, { opacity: 0, y: -20, duration: 0.3 })
        .to(checkmarkContentRef.current, { opacity: 0, scale: 0.5, duration: 0.3 }, "<")
      
      // Morph to sleek notification bar
      tl.to(heroRef.current, { 
          width: dims.p4W, height: dims.p4H, borderRadius: 28, 
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 30px 60px -15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1)",
          duration: 1, ease: "elastic.out(1, 0.7)" 
        })
        .to(cardContentRef.current, { opacity: 1, duration: 0.5 }, "-=0.6");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[auto] py-14 lg:py-0 h-screen bg-[#F9F8F6] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Ambient Atmospheric Light Orbs for Frosted Glass Background */}
      <div className="absolute top-1/4 left-1/4 w-[350px] lg:w-[480px] h-[350px] lg:h-[480px] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] lg:w-[500px] h-[380px] lg:h-[500px] bg-teal-400/20 rounded-full blur-[110px] pointer-events-none opacity-60" />

      {/* ── UNIFIED PINNED COMPOSITION ── */}
      <div className="contents">
        
        {/* Absolute Dynamic Headlines Container */}
        <div className="absolute top-16 md:top-24 lg:top-32 w-full text-center z-10 px-4">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 mb-2 px-3.5 py-1 rounded-full bg-white/80 border border-emerald-100 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#064e3b]">
                3-Step Fast Access
              </span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl uppercase tracking-tight text-[#0B0F19]">
              HOW IT <span className="bg-gradient-to-r from-[#064e3b] via-[#0d5c46] to-[#10b981] bg-clip-text text-transparent">WORKS.</span>
            </h2>
            <p className="mt-1 text-[10px] sm:text-xs font-semibold tracking-wider text-emerald-900/60 uppercase">
              Zero waiting room chaos • Instant verified confirmation
            </p>
          </div>

          <div className="relative mt-8 sm:mt-12 md:mt-16 h-16 md:h-20 w-full flex items-center justify-center">
             <h2 ref={title1Ref} className="absolute font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#0B0F19] opacity-0">Find your doctor.</h2>
             <h2 ref={title2Ref} className="absolute font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#0B0F19] opacity-0">Add patient details.</h2>
             <h2 ref={title3Ref} className="absolute font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#0B0F19] opacity-0">Walk in on time.</h2>
          </div>
        </div>

      {/* The Hero Morphing Object */}
      <div 
        ref={heroRef} 
        className="absolute z-20 bg-white backdrop-blur-xl overflow-hidden mt-16 lg:mt-0"
        style={{ transformOrigin: 'center center' }}
      >
         {/* Phase 1: Search */}
         <div ref={searchContentRef} className="absolute inset-0 flex items-center px-4 sm:px-6 opacity-0 pointer-events-none">
            <Search ref={searchIconRef} className="w-5 h-5 sm:w-6 sm:h-6 text-[#0d5c46] mr-3 sm:mr-4 shrink-0" />
            <div className="flex items-center h-full pt-1">
               <span ref={searchTextRef} className="font-sans text-gray-800 text-lg sm:text-2xl font-semibold whitespace-nowrap tracking-tight"></span>
               <span ref={searchCursorBlinkRef} className="w-[3px] h-6 sm:h-8 bg-[#10b981] ml-1 opacity-0 animate-pulse"></span>
            </div>
         </div>

         {/* Phase 2: Form */}
         <div ref={formContentRef} className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center opacity-0 pointer-events-none">
            <div className="space-y-3 w-full">
               <div className="flex gap-2 sm:gap-3">
                  <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3 flex-1 border border-gray-100 flex flex-col items-start justify-center">
                     <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">Patient Name</span>
                     <span ref={formNameRef} className="text-sm sm:text-base font-semibold text-gray-900 h-5 mt-0.5 flex items-center"></span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3 w-20 sm:w-24 border border-gray-100 flex flex-col items-start justify-center">
                     <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">Age</span>
                     <span ref={formAgeRef} className="text-sm sm:text-base font-semibold text-gray-900 h-5 mt-0.5 flex items-center"></span>
                  </div>
               </div>

               {/* Date Picker Field */}
               <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3 border border-gray-100 flex items-center justify-between relative">
                  <div className="flex flex-col items-start justify-center">
                     <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">Select Appointment Date</span>
                     <span ref={formDateRef} className="text-[11px] sm:text-sm font-semibold text-gray-900 h-5 mt-0.5 flex items-center"></span>
                  </div>
                  <div
                     ref={calendarIconBtnRef}
                     className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100/60 text-[#0d5c46] flex items-center justify-center cursor-pointer transition-transform"
                  >
                     <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
               </div>

               {/* Realistic Animated Calendar Popover */}
               <div
                  ref={calendarPopupRef}
                  className="absolute z-30 left-3 right-3 sm:left-5 sm:right-5 top-12 bg-white/95 backdrop-blur-xl rounded-xl p-3 sm:p-4 shadow-[0_20px_45px_rgba(13,92,70,0.22)] border border-emerald-900/15 flex flex-col gap-2 pointer-events-none"
                  style={{ display: "none", opacity: 0, transform: "scale(0.85)" }}
               >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                     <span className="text-[10px] sm:text-xs font-bold text-gray-900 font-sans">October 2026</span>
                     <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#0d5c46] bg-emerald-50 px-2 py-0.5 rounded-full">Available</span>
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
                     <span className="font-bold text-[#0d5c46]">10:30 AM</span>
                  </div>
               </div>

               <button ref={submitBtnRef} className="w-full bg-[#0d5c46] text-white py-2.5 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base flex justify-center items-center shadow-xs">
                  Pay
               </button>
            </div>
         </div>

         {/* Phase 3: Checkmark */}
         <div ref={checkmarkContentRef} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
             <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#10b981]" viewBox="0 0 52 52">
                <circle ref={checkCircleRef} cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="4" />
                <path ref={checkPathRef} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
             </svg>
         </div>

         {/* Phase 4: Final Serial Card (Notification Style) */}
         <div ref={cardContentRef} className="absolute inset-0 px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-3 sm:gap-4 opacity-0 pointer-events-none">
             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                <Image src="/patientCare logo.svg" width={32} height={32} alt="logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
             </div>
             <div className="flex-1 flex flex-col justify-center">
                 <div className="flex justify-between items-center mb-0.5">
                     <span className="font-sans font-bold text-[13px] sm:text-[14px] text-gray-900 tracking-tight">PatientCare</span>
                     <span className="font-sans text-[10px] sm:text-[12px] text-gray-500 font-medium">11:35 PM</span>
                 </div>
                 <h3 className="font-sans text-[15px] sm:text-[17px] font-black text-gray-900 tracking-tight leading-snug">
                     Your serial is <span className="text-[#0d5c46]">#2</span>.
                 </h3>
                 <p className="font-sans text-[12px] sm:text-[14px] text-gray-500 font-medium leading-tight mt-0.5">
                     Your slot is confirmed.
                 </p>
             </div>
         </div>
      </div>

      {/* Ghost Mouse SVG */}
      <svg 
        ref={cursorRef}
        className="absolute z-30 w-8 h-8 sm:w-10 sm:h-10 pointer-events-none drop-shadow-lg"
        viewBox="0 0 24 24" 
        fill="none" 
        style={{ left: '50%', top: '50%', transform: 'translate(40px, 30px)' }} 
      >
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 0 0-.85.35z" fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
      </div>
    </section>
  );
}
