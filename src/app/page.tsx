"use client";

import { useState, useCallback } from "react";
import IntroPreloader from "@/components/IntroPreloader";
import HeroScrollCanvas from "@/components/HeroScrollCanvas";
import CelestialArcStats from "@/components/CelestialArcStats";
import SpecialtiesGrid from "@/components/SpecialtiesGrid";
import FindYourDoctorSequence from "@/components/FindYourDoctorSequence";
import FeaturedDoctorsWheel from "@/components/FeaturedDoctorsWheel";
import {
  ChevronDown,
  Menu,
  Check,
  FileText,
  ClipboardList,
  LayoutDashboard,
  ArrowRight,
  HeartHandshake,
  Activity,
  MapPin,
  CalendarCheck,
  Users,
  Search,
  Mail,
} from "lucide-react";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [bufferProgress, setBufferProgress] = useState(0);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  const handleBufferProgress = useCallback((progress: number) => {
    setBufferProgress(progress);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* 3-Second Brand Intro Preloader */}
      <IntroPreloader
        onComplete={handlePreloaderComplete}
        loadProgress={bufferProgress}
      />

      {/* Minimal Topbar: 100% Transparent Floating Header with Reduced Height */}
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-auto bg-transparent transition-all">
        <div className="mx-auto flex h-[50px] sm:h-[56px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand Name */}
          <a className="flex shrink-0 items-center gap-2 transition-transform hover:scale-105" href="/">
            <img src="/patientCare logo.svg" alt="Patient Care" className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-xs" />
            <div className="flex flex-col leading-none">
              <span className="font-sans font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-[#064e3b] via-[#0d5c46] to-[#10b981] bg-clip-text text-transparent drop-shadow-2xs">
                Patient Care
              </span>
            </div>
          </a>

          {/* Top-Right Quick Actions: Sign In & Book Now */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href="/login"
              className="px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-emerald-950 border border-emerald-900/25 bg-white/70 hover:bg-white backdrop-blur-md rounded-full transition-all shadow-2xs"
            >
              Sign In
            </a>
            <a
              href="/doctors"
              className="px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-bold text-white bg-[#0d5c46] hover:bg-[#0a4735] shadow-xs hover:shadow-md rounded-full transition-all"
            >
              Book Now
            </a>
          </div>
        </div>
      </header>

      {/* 100% Clean Hero Section with GSAP Canvas Scroll Sequence */}
      <HeroScrollCanvas onProgress={setBufferProgress} />

      {/* Deferred Lower Sections: Only mounted once preloader completes to ensure Zero-Lag */}
      {preloaderDone && (
        <div className="transition-opacity duration-700 ease-out opacity-100">
          {/* Unified Seamless "Why Choose PatientCare" Title Reveal & Celestial Arc Stats */}
          <CelestialArcStats />

          {/* Unified Seamless "EVERY SPECIALTY" Title Reveal & 3D Cylinder Specialties Carousel */}
          <SpecialtiesGrid />

          {/* Cinematic Search Sequence */}
          <FindYourDoctorSequence />



          {/* Featured Doctors Section: Keynote Reveal & 3D Radial Orbital Wheel */}
          <FeaturedDoctorsWheel />

      {/* Patient Dashboard */}
      <section className="bg-[#EAE8E1] py-20 border-t border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0d5c46]">Patient dashboard</span>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-black sm:text-4xl">Your Health. All in One Place.</h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-gray-700">
                After your appointment, your prescription, lab results, and visit history live securely in your personal dashboard — accessible from any device.
              </p>
              <ul className="mt-8 space-y-6">
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0d5c46] shadow-sm"><FileText className="w-5 h-5" /></span>
                  <div>
                    <p className="text-base font-bold text-black">Digital Prescriptions</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">View and download all past prescriptions from your doctors.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0d5c46] shadow-sm"><CalendarCheck className="w-5 h-5" /></span>
                  <div>
                    <p className="text-base font-bold text-black">Appointment History</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">Full history across all doctors, with upcoming reminders.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0d5c46] shadow-sm"><ClipboardList className="w-5 h-5" /></span>
                  <div>
                    <p className="text-base font-bold text-black">Lab Reports</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">Upload and organize all your medical documents securely.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0d5c46] shadow-sm"><Users className="w-5 h-5" /></span>
                  <div>
                    <p className="text-base font-bold text-black">Family Members</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">Manage health records for your entire family in one account.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <a className="inline-flex items-center gap-2 rounded-full bg-[#0d5c46] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a4735]" href="/patient-login">
                  <LayoutDashboard className="w-4 h-4" /> Open dashboard
                </a>
                <a className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-7 py-3.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50" href="/doctors">
                  Find a Doctor
                </a>
              </div>
            </div>
            <div className="w-full flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-[290px] sm:max-w-[310px] lg:max-w-[325px] rounded-[32px] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.09)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.14)]">
                <img
                  src="/Dashboard.png"
                  alt="Patient Care Portal Dashboard"
                  className="w-full h-auto object-contain rounded-[32px] transition-transform duration-500 hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Doctors Section */}
      <section className="bg-[#1f2937] py-24 text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a7f3d0]">For doctors</span>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Are You a Doctor?</h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-300">
                Join DoctorsHero — Bangladesh's EMR platform. Manage prescriptions, patients, and appointments from one powerful desktop app.
              </p>
              <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-gray-100">
                Learn About DoctorsHero <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-800/80 p-5 border border-gray-700 backdrop-blur-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-700 text-[#a7f3d0]"><FileText className="w-5 h-5" /></span>
                <p className="mt-4 text-sm font-bold leading-tight text-white">Digital Prescriptions</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">Write and issue prescriptions digitally from your desktop.</p>
              </div>
              <div className="rounded-2xl bg-gray-800/80 p-5 border border-gray-700 backdrop-blur-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-700 text-[#a7f3d0]"><Users className="w-5 h-5" /></span>
                <p className="mt-4 text-sm font-bold leading-tight text-white">Patient Queue Manager</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">Real-time queue display for your waiting room.</p>
              </div>
              <div className="rounded-2xl bg-gray-800/80 p-5 border border-gray-700 backdrop-blur-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-700 text-[#a7f3d0]"><HeartHandshake className="w-5 h-5" /></span>
                <p className="mt-4 text-sm font-bold leading-tight text-white">Offline-First Desktop App</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">Works without internet. Syncs automatically when online.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#F9F8F6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[40px] bg-[#0c4a38] px-6 py-20 text-center sm:px-10 lg:py-24 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[64px]">
                Your health, finally in <span className="font-serif italic text-[#a7f3d0]">your</span> hands.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">Book, track, and keep every record in one place. No registration needed to start.</p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a className="inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-4 text-base font-bold text-[#0c4a38] transition-colors hover:bg-gray-100" href="/doctors">
                  <CalendarCheck className="w-5 h-5" /> Book an appointment
                </a>
                <a className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-9 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10" href="/patient-login">
                  Open dashboard <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#113a2d] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-6">
            <div className="col-span-2 lg:col-span-2">
              <a className="mb-6 inline-flex items-center gap-2" href="/">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#113a2d]">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-sans text-xl font-black tracking-tight text-white">Patient Care</span>
                </div>
              </a>
              <p className="mb-6 text-sm leading-relaxed text-gray-300 max-w-xs">
                Bangladesh's trusted patient portal. Book doctor appointments, view prescriptions, and manage your health — all in one place.
              </p>
              <div className="mb-6 flex items-center gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                </a>
              </div>
              <a href="mailto:info@patientcare.com.bd" className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white">
                <Mail className="w-4 h-4 text-[#a7f3d0]" />
                info@patientcare.com.bd
              </a>
            </div>
            
            <div className="lg:col-span-1">
              <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-400">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="text-gray-300 transition-colors hover:text-white" href="/">Home</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="/doctors">Find a Doctor</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="/book">Book Appointment</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="/patient-login">Patient Login</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="/dashboard">My Dashboard</a></li>
              </ul>
            </div>
            
            <div className="lg:col-span-1">
              <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-400">Specialties</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Cardiology</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Neurology</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Pediatrics</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Gynecology</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Orthopedics</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Dermatology</a></li>
              </ul>
            </div>
            
            <div className="lg:col-span-1">
              <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-400">Find by City</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Doctors in Dhaka</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Doctors in Chittagong</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Doctors in Sylhet</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Doctors in Rajshahi</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Doctors in Comilla</a></li>
              </ul>
            </div>
            
            <div className="lg:col-span-1">
              <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-400">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">About Us</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Privacy Policy</a></li>
                <li><a className="text-gray-300 transition-colors hover:text-white" href="#">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 transition-colors hover:text-white">For Doctors</a></li>
              </ul>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="mb-1 text-[11px] uppercase tracking-wider text-gray-400">Powered by</p>
                <a href="https://doctorshero.com" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#a7f3d0] transition-colors hover:text-white">
                  DoctorsHero EMR Platform →
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-sm text-gray-400">© 2026 PatientCare.com.bd — All rights reserved.</p>
            <p className="text-sm text-gray-400">Made with care for Bangladesh 🇧🇩</p>
          </div>
        </div>
      </footer>
        </div>
      )}
    </div>
  );
}


