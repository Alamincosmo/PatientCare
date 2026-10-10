"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollCanvasProps {
  onProgress?: (progress: number) => void;
  onCriticalReady?: () => void;
}

const TOTAL_FRAMES = 253;
const CRITICAL_BURST_COUNT = 30;
const BATCH_CONCURRENCY = 6;

interface MobileHeadline {
  prefix: string;
  highlight: string;
  subtitle: string;
  badge?: string;
}

const MOBILE_HEADLINES: MobileHeadline[] = [
  {
    prefix: "Healthcare shouldn't be a",
    highlight: "race against time.",
    subtitle: "Tired of the waiting room chaos?",
  },
  {
    prefix: "Endless queues.",
    highlight: "Wasted hours.",
    subtitle: "The old way of seeing a doctor is broken.",
  },
  {
    prefix: "Take back your",
    highlight: "time.",
    subtitle: "Get digital serials in your pocket. We notify you when it's your turn.",
    badge: "Your Serial is Next",
  },
  {
    prefix: "Find the right care,",
    highlight: "right now.",
    subtitle: "Search thousands of verified specialists instantly.",
  },
];

const POPULAR_SPECIALTIES = [
  "Cardiology",
  "Gynecology",
  "Pediatrics",
  "Neurology",
  "Orthopedics",
];

export default function HeroScrollCanvas({
  onProgress,
  onCriticalReady,
}: HeroScrollCanvasProps) {
  // Desktop Canvas Refs
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameObjRef = useRef({ frame: 1 });

  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);

  // Mobile Video & Headline Refs
  const mobileHeadlineRef = useRef<HTMLDivElement>(null);
  const mobileMarkerRef = useRef<HTMLSpanElement>(null);
  const [mobileHeadlineIdx, setMobileHeadlineIdx] = useState(0);

  const getFramePath = useCallback((index: number) => {
    const paddedIndex = String(index).padStart(4, "0");
    return `/frames-desktop/frame_${paddedIndex}.webp`;
  }, []);

  // ════════════════════════════════════════════════════════════════
  // 1. DESKTOP ONLY (>= 1024px): 253-FRAME HIGH-END SCROLL SEQUENCE
  // ════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) {
      // For mobile/tablet, immediately inform preloader that hero is ready
      onProgress?.(100);
      onCriticalReady?.();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;

    const drawImageCover = (img: HTMLImageElement) => {
      const cWidth = canvas.width;
      const cHeight = canvas.height;
      if (cWidth === 0 || cHeight === 0) return;

      const hRatio = cWidth / img.naturalWidth;
      const vRatio = cHeight / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);

      const drawWidth = img.naturalWidth * ratio;
      const drawHeight = img.naturalHeight * ratio;
      const centerShiftX = (cWidth - drawWidth) / 2;
      const centerShiftY = (cHeight - drawHeight) / 2;

      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        centerShiftX,
        centerShiftY,
        drawWidth,
        drawHeight
      );
    };

    const renderFrame = (frameIndex: number) => {
      const clamped = Math.max(1, Math.min(frameIndex, TOTAL_FRAMES));
      const targetImg = images[clamped - 1];
      if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
        drawImageCover(targetImg);
      }
    };

    const resizeCanvas = () => {
      if (!canvas || !desktopContainerRef.current) return;
      const rect = desktopContainerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      renderFrame(frameObjRef.current.frame);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let loadedCount = 0;
    let isCriticalNotified = false;
    let isCancelled = false;

    const loadSingleImage = (index: number, priority: "high" | "auto"): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.fetchPriority = priority;
        img.src = getFramePath(index);

        img.onload = async () => {
          if ("decode" in img) {
            try { await img.decode(); } catch {}
          }
          images[index - 1] = img;
          loadedCount++;

          const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          onProgress?.(percent);

          if (index === 1) {
            resizeCanvas();
            renderFrame(1);
          }

          if (!isCriticalNotified && loadedCount >= CRITICAL_BURST_COUNT) {
            isCriticalNotified = true;
            onCriticalReady?.();
          }
          resolve();
        };
        img.onerror = () => { loadedCount++; resolve(); };
      });
    };

    const startPreloadPipeline = async () => {
      const criticalPromises: Promise<void>[] = [];
      for (let i = 1; i <= Math.min(CRITICAL_BURST_COUNT, TOTAL_FRAMES); i++) {
        criticalPromises.push(loadSingleImage(i, "high"));
      }
      await Promise.all(criticalPromises);

      for (let i = CRITICAL_BURST_COUNT + 1; i <= TOTAL_FRAMES; i += BATCH_CONCURRENCY) {
        if (isCancelled) break;
        const batch: Promise<void>[] = [];
        for (let j = i; j < i + BATCH_CONCURRENCY && j <= TOTAL_FRAMES; j++) {
          batch.push(loadSingleImage(j, "auto"));
        }
        await Promise.all(batch);
      }
    };

    startPreloadPipeline();

    // GSAP Desktop ScrollTrigger
    const ctxAnim = gsap.context(() => {
      gsap.set([stage1Ref.current, stage2Ref.current, stage3Ref.current, stage4Ref.current], { 
        autoAlpha: 0, 
        y: 80 
      });

      const createAnim = (stageRef: React.RefObject<HTMLDivElement | null>) => {
        const tl = gsap.timeline({ paused: true });
        if (stageRef.current) {
          tl.to(stageRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" });
          const markers = stageRef.current.querySelectorAll('.marker-bg');
          if (markers.length > 0) {
            tl.to(markers, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");
          }
        }
        return tl;
      };

      const anims = [
        createAnim(stage1Ref),
        createAnim(stage2Ref),
        createAnim(stage3Ref),
        createAnim(stage4Ref)
      ];

      let activeStage = -1;

      gsap.to(frameObjRef.current, {
        frame: TOTAL_FRAMES,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: desktopContainerRef.current,
          start: "top top",
          end: "+=6000",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            renderFrame(frameObjRef.current.frame);
            const p = self.progress;
            let newStage = -1;
            if (p > 0.01 && p < 0.15) newStage = 0;      
            else if (p >= 0.25 && p < 0.38) newStage = 1; 
            else if (p >= 0.48 && p < 0.65) newStage = 2; 
            else if (p >= 0.78 && p <= 1.0) newStage = 3; 

            if (newStage !== activeStage) {
              if (activeStage !== -1) anims[activeStage].reverse();
              if (newStage !== -1) anims[newStage].play();
              activeStage = newStage;
            }
          },
        },
      });
    }, desktopContainerRef);

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", resizeCanvas);
      ctxAnim.revert();
    };
  }, [getFramePath, onProgress, onCriticalReady]);

  // ════════════════════════════════════════════════════════════════
  // 2. MOBILE ONLY (< 1024px): AUTO-CYCLING FIVERR-STYLE HEADLINES
  // ════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;

    const timer = setInterval(() => {
      if (mobileHeadlineRef.current) {
        gsap.to(mobileHeadlineRef.current, {
          y: -24,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setMobileHeadlineIdx((prev) => (prev + 1) % MOBILE_HEADLINES.length);
          },
        });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;

    if (mobileHeadlineRef.current) {
      gsap.fromTo(
        mobileHeadlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
    if (mobileMarkerRef.current) {
      gsap.fromTo(
        mobileMarkerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.55, delay: 0.2, ease: "power2.out" }
      );
    }
  }, [mobileHeadlineIdx]);

  const activeMobile = MOBILE_HEADLINES[mobileHeadlineIdx];

  return (
    <>
      {/* ── MOBILE & TABLET (< 1024px): COMPACT 60% HEIGHT FIVERR-STYLE VIDEO HERO ── */}
      <div className="lg:hidden relative w-full min-h-[500px] h-[62vh] max-h-[640px] bg-[#F9F8F6] overflow-hidden select-none flex items-center">
        {/* Background High-Definition Auto-Playing Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        {/* Subtle Cinematic Dark Tint (No Milky White Sheet - Video Remains Sharp & Clear) */}
        <div className="pointer-events-none absolute inset-0 bg-black/30 z-10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#F9F8F6] to-transparent z-10" />

        {/* Foreground Content */}
        <div className="relative z-20 w-full px-5 sm:px-8 flex flex-col justify-center h-full pt-16 sm:pt-20">
          {/* Rotating Headline Block */}
          <div className="min-h-[140px] sm:min-h-[150px] flex flex-col justify-center">
            <div ref={mobileHeadlineRef} className="flex flex-col gap-2">
              {activeMobile.badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-black/40 backdrop-blur-md shadow-md border border-white/20 text-xs font-bold text-emerald-300 w-fit mb-1 transform -rotate-1">
                  <div className="bg-[#0d5c46] text-white rounded-lg p-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>{activeMobile.badge}</span>
                </div>
              )}

              <h1 className="font-yeseva text-3xl sm:text-4xl text-white tracking-tight leading-[1.12] drop-shadow-md">
                {activeMobile.prefix}
                <br />
                <span className="relative z-10 inline-block mt-1">
                  <span className="font-merienda text-emerald-300 italic pr-2 drop-shadow-sm">
                    {activeMobile.highlight}
                  </span>
                  <span
                    ref={mobileMarkerRef}
                    className="absolute bottom-1 left-0 w-full h-[45%] bg-emerald-500/40 -z-10 origin-left rounded-sm"
                  />
                </span>
              </h1>

              <div className="flex items-center gap-2 mt-1">
                <div className="h-0.5 w-7 bg-emerald-400 rounded-full shrink-0" />
                <p className="text-xs sm:text-sm text-gray-200 font-medium drop-shadow-xs">
                  {activeMobile.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Persistent Search Bar (Always Visible) */}
          <div className="w-full mt-4">
            <div className="w-full flex items-center bg-white/95 backdrop-blur-2xl rounded-2xl pl-3.5 pr-0 py-0 shadow-[0_14px_40px_rgba(0,0,0,0.25)] border border-white/40 ring-4 ring-black/10 transition-all focus-within:ring-emerald-500/30 focus-within:bg-white h-13 overflow-hidden">
              <div className="pr-2 text-emerald-700">
                <Search className="w-5 h-5 stroke-[2.5]" />
              </div>
              <input
                type="text"
                placeholder="e.g. Cardiologist in Dhaka..."
                className="flex-1 h-full bg-transparent border-none outline-none text-gray-900 text-xs sm:text-sm placeholder:text-gray-400 min-w-0 font-medium"
              />
              <a
                href="/doctors"
                className="bg-[#0d5c46] hover:bg-[#0a4735] text-white px-5 sm:px-7 font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 h-full flex items-center justify-center rounded-none border-l border-[#0d5c46]/20"
              >
                Search
              </a>
            </div>

            {/* Persistent Popular Specialties Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <span className="text-[10px] font-bold text-gray-200 uppercase tracking-wider drop-shadow-xs">
                Popular:
              </span>
              {POPULAR_SPECIALTIES.map((spec) => (
                <a
                  key={spec}
                  href={`/doctors?specialty=${encodeURIComponent(spec)}`}
                  className="text-[11px] font-semibold text-[#0c4a38] bg-white/90 hover:bg-white px-3 py-1 rounded-full border border-white/60 shadow-xs transition-all"
                >
                  {spec}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP (>= 1024px): 100% UNTOUCHED 253-FRAME SCROLL-CANVAS SEQUENCE ── */}
      <div
        ref={desktopContainerRef}
        className="hidden lg:block relative w-full h-screen bg-[#F9F8F6] overflow-hidden select-none"
      >
        <canvas ref={canvasRef} className="w-full h-full block object-cover" />

        <div className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-[70%] bg-gradient-to-r from-white/70 via-white/30 to-transparent z-10 mix-blend-screen" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-white/20 blur-3xl z-10" />

        <div className="absolute inset-0 z-20 flex items-center p-8 md:p-24 pointer-events-none">
          <div className="max-w-3xl w-full relative h-full">
            
            {/* Stage 1 */}
            <div ref={stage1Ref} className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-6">
              <h2 className="font-yeseva text-5xl md:text-7xl text-[#0c4a38] tracking-tight leading-[1.1]">
                Healthcare shouldn't be a<br />
                <span className="relative z-10 inline-block mt-2">
                  <span className="font-merienda text-[#0c4a38] italic pr-2">race against time.</span>
                  <span className="marker-bg absolute bottom-2 left-0 w-full h-[45%] bg-emerald-300/60 -z-10 origin-left scale-x-0 rounded-sm" />
                </span>
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="h-0.5 w-12 bg-[#0c4a38] rounded-full"></div>
                <p className="text-xl md:text-2xl text-gray-800 font-medium">
                  Tired of the waiting room chaos?
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div ref={stage2Ref} className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-6">
              <h2 className="font-yeseva text-5xl md:text-7xl text-[#0c4a38] tracking-tight leading-[1.1]">
                Endless queues.<br />
                <span className="text-[#133023]">Wasted hours.</span>
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="h-0.5 w-12 bg-gray-500 rounded-full"></div>
                <p className="text-xl md:text-2xl text-gray-800 font-medium">
                  The old way of seeing a doctor is broken.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="absolute inset-0 pointer-events-none">
              <div ref={stage3Ref} className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-6 items-start">
                <div className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white flex items-center gap-3 mb-2 transform -rotate-2">
                  <div className="bg-[#0c4a38] text-white rounded-xl p-2 shadow-inner">
                    <CheckCircle className="w-5 h-5"/>
                  </div>
                  <div className="text-base font-bold text-[#0c4a38] pr-2">Your Serial is Next</div>
                </div>
                <h2 className="font-yeseva text-5xl md:text-7xl text-[#0c4a38] tracking-tight leading-[1.1]">
                  Take back your<br />
                  <span className="relative z-10 inline-block mt-2">
                    <span className="font-merienda text-emerald-700 italic pr-2">time.</span>
                    <span className="marker-bg absolute bottom-3 left-0 w-full h-[45%] bg-emerald-300/50 -z-10 origin-left scale-x-0 rounded-sm" />
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-800 font-medium max-w-lg mt-2 leading-relaxed">
                  Get digital serials in your pocket. We notify you exactly when it's your turn.
                </p>
              </div>
            </div>

            {/* Stage 4 */}
            <div ref={stage4Ref} className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-8 items-start pointer-events-auto w-full max-w-[650px]">
              <div className="flex flex-col gap-4">
                <h2 className="font-yeseva text-5xl md:text-7xl text-[#0c4a38] tracking-tight leading-[1.1]">
                  Find the right care,<br />
                  <span className="relative z-10 inline-block mt-1">
                    <span className="font-merienda text-emerald-700 italic pr-2">right now.</span>
                    <span className="marker-bg absolute bottom-2 left-0 w-full h-[45%] bg-emerald-300/50 -z-10 origin-left scale-x-0 rounded-sm" />
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-800 font-medium">
                  Search thousands of verified specialists instantly.
                </p>
              </div>
              
              <div className="w-full flex items-center bg-white/95 backdrop-blur-2xl rounded-[18px] pl-5 pr-0 py-0 shadow-2xl border border-emerald-900/10 ring-4 ring-black/5 transition-all focus-within:ring-emerald-500/20 focus-within:bg-white h-16 overflow-hidden">
                <div className="pr-3 text-emerald-700">
                  <Search className="w-6 h-6 stroke-[2.5]" />
                </div>
                <input 
                  type="text" 
                  placeholder="e.g. Cardiologist in Dhaka..."
                  className="flex-1 h-full bg-transparent border-none outline-none text-gray-900 text-lg placeholder:text-gray-400 min-w-0 font-medium"
                />
                <a
                  href="/doctors"
                  className="bg-[#0d5c46] hover:bg-[#0a4735] text-white px-10 font-bold text-lg shadow-md transition-all shrink-0 h-full flex items-center justify-center rounded-none border-l border-[#0d5c46]/20"
                >
                  Search
                </a>
              </div>

              <div className="flex flex-wrap gap-2.5 mt-2">
                {POPULAR_SPECIALTIES.map((spec) => (
                  <a
                    key={spec}
                    href={`/doctors?specialty=${encodeURIComponent(spec)}`}
                    className="text-base font-semibold text-[#0c4a38] bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#0c4a38]/10 hover:bg-white cursor-pointer transition-colors shadow-sm"
                  >
                    {spec}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
