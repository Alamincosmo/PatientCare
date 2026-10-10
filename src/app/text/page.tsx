"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TextAnimationsPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // 1. Z-Axis Deep Dive
      const tl1 = gsap.timeline({
        scrollTrigger: { trigger: ".s1-trigger", start: "top top", end: "+=150%", scrub: 1, pin: true },
      });
      tl1.fromTo(".s1-text", { z: -3500, opacity: 0, filter: "blur(20px)" }, { z: 0, opacity: 1, filter: "blur(0px)", duration: 0.5 })
         .to(".s1-text", { z: 1500, opacity: 0, filter: "blur(15px)", duration: 0.5 });

      // 2. Glass Mask Reveal
      const tl2 = gsap.timeline({
        scrollTrigger: { trigger: ".s2-trigger", start: "top top", end: "+=150%", scrub: 1, pin: true },
      });
      tl2.fromTo(".s2-mask", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(150% at 50% 50%)", duration: 1 });

      // 3. Laser Slice & Offset
      const tl3 = gsap.timeline({
        scrollTrigger: { trigger: ".s3-trigger", start: "top top", end: "+=150%", scrub: 1, pin: true },
      });
      tl3.fromTo(".s3-top", { x: -80, y: -40, opacity: 0, filter: "blur(10px)" }, { x: 0, y: 0, opacity: 1, filter: "blur(0px)", duration: 1 }, 0)
         .fromTo(".s3-bottom", { x: 80, y: 40, opacity: 0, filter: "blur(10px)" }, { x: 0, y: 0, opacity: 1, filter: "blur(0px)", duration: 1 }, 0);

      // 4. Variable Liquid Stretch
      const tl4 = gsap.timeline({
        scrollTrigger: { trigger: ".s4-trigger", start: "top top", end: "+=150%", scrub: 1, pin: true },
      });
      tl4.fromTo(".s4-text", { scaleY: 4, scaleX: 0.1, opacity: 0, filter: "blur(15px)" }, { scaleY: 1, scaleX: 1, opacity: 1, filter: "blur(0px)", duration: 1, ease: "elastic.out(1, 0.4)" });

      // 5. HUD Medical Scanner
      const tl5 = gsap.timeline({
        scrollTrigger: { trigger: ".s5-trigger", start: "top top", end: "+=150%", scrub: 1, pin: true },
      });
      tl5.fromTo(".s5-laser", { top: "0%", opacity: 0 }, { top: "100%", opacity: 1, duration: 1 }, 0)
         .fromTo(".s5-solid", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1 }, 0);

      // 6. Giant Text Window (Scale through)
      const tl6 = gsap.timeline({
        scrollTrigger: { trigger: ".s6-trigger", start: "top top", end: "+=200%", scrub: 1, pin: true },
      });
      tl6.fromTo(".s6-text", { scale: 1 }, { scale: 60, opacity: 0, duration: 1, ease: "power3.in" });

      // 7. Chromatic Glitch Resolve
      const tl7 = gsap.timeline({
        scrollTrigger: { trigger: ".s7-trigger", start: "top top", end: "+=100%", scrub: 1, pin: true },
      });
      tl7.fromTo(".s7-r", { x: -80, y: 30, skewX: 30, opacity: 0 }, { x: 0, y: 0, skewX: 0, opacity: 1, duration: 0.4, ease: "power4.out" }, 0)
         .fromTo(".s7-b", { x: 80, y: -30, skewX: -30, opacity: 0 }, { x: 0, y: 0, skewX: 0, opacity: 1, duration: 0.4, ease: "power4.out" }, 0)
         .fromTo(".s7-g", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power4.out" }, 0)
         .to(".s7-w", { opacity: 1, duration: 0.1 }, 0.4);

      // 8. Gravity Bounce Physics
      const tl8 = gsap.timeline({
        scrollTrigger: { trigger: ".s8-trigger", start: "top top", end: "+=150%", scrub: 1, pin: true },
      });
      tl8.fromTo(".s8-word", 
        { y: -600, rotation: () => Math.random() * 120 - 60, opacity: 0 }, 
        { y: 0, rotation: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "bounce.out" }
      );

      // 9. Rolling Kinetic Cylinder
      const tl9 = gsap.timeline({
        scrollTrigger: { trigger: ".s9-trigger", start: "top top", end: "+=150%", scrub: 1, pin: true },
      });
      tl9.fromTo(".s9-text", { rotateX: -100, opacity: 0 }, { rotateX: 0, opacity: 1, duration: 1, ease: "back.out(1.2)" });

      // 10. Volumetric Light & Extrusion
      const tl10 = gsap.timeline({
        scrollTrigger: { trigger: ".s10-trigger", start: "top top", end: "+=150%", scrub: 1, pin: true },
      });
      tl10.to(".s10-text", {
        color: "#10b981", // Emerald 500
        textShadow: "1px 1px 0 #064e3b, 2px 2px 0 #064e3b, 3px 3px 0 #064e3b, 4px 4px 0 #064e3b, 5px 5px 0 #064e3b, 6px 6px 0 #064e3b, 8px 8px 0 #064e3b, 10px 10px 0 #064e3b, 15px 15px 15px rgba(0,0,0,0.6)",
        duration: 1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const badgeStyle = "absolute top-8 left-8 text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-950/50 px-4 py-2 rounded-full border border-emerald-900/50 z-50 backdrop-blur-md";

  return (
    <div ref={containerRef} className="bg-slate-950 text-white min-h-screen overflow-x-hidden selection:bg-emerald-500/30">
      
      {/* 1. Z-Axis Deep Dive */}
      <section className="s1-trigger relative w-full h-screen flex items-center justify-center bg-black overflow-hidden" style={{ perspective: "1000px" }}>
        <div className={badgeStyle}>01 // Z-AXIS FLY-THROUGH</div>
        <h1 className="s1-text font-yeseva text-5xl md:text-8xl tracking-tight text-white drop-shadow-2xl text-center" style={{ transformStyle: "preserve-3d" }}>
          Why Choose PatientCare?
        </h1>
      </section>

      {/* 2. Glass Mask Reveal */}
      <section className="s2-trigger relative w-full h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className={badgeStyle}>02 // LOMA MATTE GLASS REVEAL</div>
        {/* Background Dim Text */}
        <h1 className="absolute font-yeseva text-5xl md:text-8xl tracking-tight text-white/5 text-center">
          Why Choose PatientCare?
        </h1>
        {/* Masked Glass Text */}
        <div className="s2-mask absolute inset-0 flex items-center justify-center backdrop-blur-xl bg-white/5 border border-white/10 z-10">
          <h1 className="font-yeseva text-5xl md:text-8xl tracking-tight text-white text-center drop-shadow-lg">
            Why Choose PatientCare?
          </h1>
        </div>
      </section>

      {/* 3. Laser Slice */}
      <section className="s3-trigger relative w-full h-screen flex items-center justify-center bg-[#050505] overflow-hidden">
        <div className={badgeStyle}>03 // LASER SLICE & OFFSET</div>
        <h1 
          className="s3-top absolute font-yeseva text-5xl md:text-8xl tracking-tight text-emerald-400 text-center"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 60%)" }}
        >
          Why Choose PatientCare?
        </h1>
        <h1 
          className="s3-bottom absolute font-yeseva text-5xl md:text-8xl tracking-tight text-emerald-400 text-center"
          style={{ clipPath: "polygon(0 60%, 100% 40%, 100% 100%, 0 100%)" }}
        >
          Why Choose PatientCare?
        </h1>
        {/* Laser line effect behind */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
      </section>

      {/* 4. Liquid Stretch */}
      <section className="s4-trigger relative w-full h-screen flex items-center justify-center bg-zinc-950 overflow-hidden">
        <div className={badgeStyle}>04 // LIQUID / RUBBER STRETCH</div>
        <h1 className="s4-text font-yeseva text-5xl md:text-8xl tracking-tight text-white text-center origin-center will-change-transform">
          Why Choose PatientCare?
        </h1>
      </section>

      {/* 5. HUD Scanner */}
      <section className="s5-trigger relative w-full h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className={badgeStyle}>05 // HUD MEDICAL SCANNER</div>
        <div className="relative">
          {/* Wireframe Text */}
          <h1 
            className="font-yeseva text-5xl md:text-8xl tracking-tight text-transparent text-center opacity-60"
            style={{ WebkitTextStroke: "1.5px rgba(16, 185, 129, 0.4)" }}
          >
            Why Choose PatientCare?
          </h1>
          {/* Solid Text masked by clip-path */}
          <h1 
            className="s5-solid absolute inset-0 font-yeseva text-5xl md:text-8xl tracking-tight text-emerald-400 text-center drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          >
            Why Choose PatientCare?
          </h1>
          {/* Laser Line */}
          <div className="s5-laser absolute inset-x-[-20%] h-[3px] bg-emerald-300 shadow-[0_0_30px_10px_rgba(16,185,129,0.6)] z-20" />
        </div>
      </section>

      {/* 6. Giant Window */}
      <section className="s6-trigger relative w-full h-screen flex items-center justify-center bg-white overflow-hidden">
        <div className="absolute top-8 left-8 text-xs font-mono font-bold tracking-widest text-slate-800 bg-slate-100 px-4 py-2 rounded-full border border-slate-300 z-50 shadow-sm">
          06 // TEXT AS A WINDOW (GIANT ZOOM)
        </div>
        {/* Fake abstract medical video background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 via-sky-100 to-indigo-100 opacity-60" />
        <h1 className="s6-text font-yeseva text-[10vw] leading-[0.9] tracking-tighter text-slate-950 text-center origin-center mix-blend-screen bg-white w-full h-full flex flex-col items-center justify-center">
          <span>WHY</span>
          <span>CHOOSE</span>
          <span>PATIENTCARE</span>
        </h1>
      </section>

      {/* 7. Chromatic Glitch */}
      <section className="s7-trigger relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className={badgeStyle}>07 // CHROMATIC GLITCH RESOLVE</div>
        <div className="relative">
          <h1 className="s7-r absolute inset-0 font-yeseva text-5xl md:text-8xl tracking-tight text-red-600 mix-blend-screen text-center">
            Why Choose PatientCare?
          </h1>
          <h1 className="s7-g absolute inset-0 font-yeseva text-5xl md:text-8xl tracking-tight text-green-600 mix-blend-screen text-center">
            Why Choose PatientCare?
          </h1>
          <h1 className="s7-b absolute inset-0 font-yeseva text-5xl md:text-8xl tracking-tight text-blue-600 mix-blend-screen text-center">
            Why Choose PatientCare?
          </h1>
          <h1 className="s7-w relative font-yeseva text-5xl md:text-8xl tracking-tight text-white text-center drop-shadow-md">
            Why Choose PatientCare?
          </h1>
        </div>
      </section>

      {/* 8. Gravity Bounce Physics */}
      <section className="s8-trigger relative w-full h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className={badgeStyle}>08 // GRAVITY BOUNCE PHYSICS</div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-4">
          {["Why", "Choose", "PatientCare?"].map((word, i) => (
            <span key={i} className="s8-word font-yeseva text-5xl md:text-8xl tracking-tight text-white inline-block drop-shadow-xl">
              {word}
            </span>
          ))}
        </div>
      </section>

      {/* 9. Rolling Cylinder */}
      <section className="s9-trigger relative w-full h-screen flex items-center justify-center bg-zinc-900 overflow-hidden" style={{ perspective: "1200px" }}>
        <div className={badgeStyle}>09 // ROLLING CYLINDER</div>
        <h1 
          className="s9-text font-yeseva text-5xl md:text-8xl tracking-tight text-white text-center" 
          style={{ transformOrigin: "50% 100% -150px", transformStyle: "preserve-3d" }}
        >
          Why Choose PatientCare?
        </h1>
      </section>

      {/* 10. Volumetric Light & Extrusion */}
      <section className="s10-trigger relative w-full h-screen flex items-center justify-center bg-[#030712] overflow-hidden">
        <div className={badgeStyle}>10 // VOLUMETRIC LIGHT & 3D EXTRUSION</div>
        <h1 className="s10-text font-yeseva text-5xl md:text-8xl tracking-tight text-slate-800 text-center transition-colors duration-300">
          Why Choose PatientCare?
        </h1>
      </section>
      
      {/* Footer spacer to scroll out cleanly */}
      <div className="h-40 bg-black flex items-center justify-center text-slate-500 font-mono text-sm">
        END OF PLAYGROUND
      </div>

    </div>
  );
}
