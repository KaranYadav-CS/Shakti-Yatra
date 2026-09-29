'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Compass,
  Calendar,
  ChevronDown,
  Bot,
  Flame,
  Camera,
  MapPin,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Hero3DCanvas } from '@/components/3d/Hero3DCanvas';
import { SolarDestinationNavigator } from '@/components/3d/SolarDestinationNavigator';
import { TempleStoryTimeline } from '@/components/temple/TempleStoryTimeline';
import { TempleCard } from '@/components/temple/TempleCard';
import { InteractivePilgrimageMap } from '@/components/map/InteractivePilgrimageMap';
import { MaaVindhyavasiniGallery } from '@/components/temple/MaaVindhyavasiniGallery';
import { VindhyachalHistoryModule } from '@/components/history/VindhyachalHistoryModule';
import { GooglePlacesExplorer } from '@/components/places/GooglePlacesExplorer';
import { fetchDestinations, fetchDestinationDetail, Destination } from '@/lib/api';

export default function HomePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [vindhyachalData, setVindhyachalData] = useState<Destination | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const dests = await fetchDestinations();
        setDestinations(dests);
        const vindh = await fetchDestinationDetail('vindhyachal');
        setVindhyachalData(vindh);
      } catch (err) {
        console.error("Failed to load homepage data", err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* ========================================================
          1. HERO SECTION WITH 3D WEBGL PILGRIMAGE ENVIRONMENT
         ======================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Three.js Background Canvas */}
        <Hero3DCanvas />

        {/* Ambient Radial Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-shakti-600/18 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[130px] pointer-events-none" />

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-7">
          {/* Badge with Developer Accreditation */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-shakti-950/90 via-slate-900 to-amber-950/90 border border-amber-400/40 text-amber-200 shadow-2xl backdrop-blur-xl animate-float-slow">
            <Flame className="w-4 h-4 text-shakti-400 animate-pulse" />
            <span>Smart Pilgrimage Platform • Developed by Karan Yadav</span>
          </div>

          {/* Main Title & Tagline with readable medium sizing */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight">
              Welcome to <span className="bg-gradient-to-r from-shakti-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">Vindhyachal</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-amber-100 font-serif italic max-w-3xl mx-auto leading-relaxed">
              &ldquo;Your intelligent companion for a meaningful pilgrimage.&rdquo;
            </p>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            Discover the eternal sanctum of Adi Shakti Maa Vindhyavasini on the sacred banks of the Ganges.
            Walk the holy Trikona Yatra with verified Aarti schedules, 3D interactive guidance, and accessibility-tailored planning.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/destinations/vindhyachal"
              className="px-8 py-4 rounded-2xl font-serif font-bold text-base text-white bg-gradient-to-r from-shakti-600 via-shakti-500 to-amber-600 hover:from-shakti-500 hover:to-amber-500 shadow-2xl shadow-shakti-950/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 glow-shakti"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Vindhyachal</span>
            </Link>

            {/* Option to view Maa Vindhyavasini photos */}
            <a
              href="#maa-vindhyavasini-photos"
              className="px-7 py-4 rounded-2xl font-serif font-bold text-base text-amber-200 bg-gradient-to-r from-amber-950/80 to-slate-900/90 hover:bg-slate-800 border-2 border-amber-400/50 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <Camera className="w-5 h-5 text-amber-400" />
              <span>View Maa Photos</span>
            </a>

            {/* Dedicated History & Utpatti Module Link */}
            <a
              href="#history-vindhyachal"
              className="px-7 py-4 rounded-2xl font-serif font-bold text-base text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border-2 border-amber-500/40 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>History & Utpatti</span>
            </a>

            <Link
              href="/plan"
              className="px-7 py-4 rounded-2xl font-serif font-semibold text-base text-slate-100 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>Plan My Yatra</span>
            </Link>

            <button
              onClick={() => {
                const btn = document.querySelector('button[aria-label="Ask Shakti Pilgrimage Assistant"]') as HTMLButtonElement;
                btn?.click();
              }}
              className="px-6 py-4 rounded-2xl text-sm font-semibold text-amber-200 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span>Ask Shakti Assistant</span>
            </button>
          </div>

          {/* Key Facts 3D Zoom Cards Grid */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="card-3d p-4 rounded-3xl glass-panel border border-slate-800 cursor-pointer">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Sacred Sanctum</span>
              <div className="text-base sm:text-lg font-bold text-white mt-1">Siddhpeeth</div>
              <div className="text-xs sm:text-sm text-slate-300">Mahalakshmi Swaroop</div>
            </div>

            <div className="card-3d p-4 rounded-3xl glass-panel border border-slate-800 cursor-pointer">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Holy Geometry</span>
              <div className="text-base sm:text-lg font-bold text-white mt-1">Trikona Yatra</div>
              <div className="text-xs sm:text-sm text-slate-300">3 Devi Manifestations</div>
            </div>

            <div className="card-3d p-4 rounded-3xl glass-panel border border-slate-800 cursor-pointer">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Accessibility</span>
              <div className="text-base sm:text-lg font-bold text-white mt-1">Aerial Ropeway</div>
              <div className="text-xs sm:text-sm text-slate-300">Senior Citizen Friendly</div>
            </div>

            <div className="card-3d p-4 rounded-3xl glass-panel border border-slate-800 cursor-pointer">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Verification</span>
              <div className="text-base sm:text-lg font-bold text-emerald-400 mt-1">100% Grounded</div>
              <div className="text-xs sm:text-sm text-slate-300">Zero Hallucinations</div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-4 flex justify-center animate-bounce">
            <a href="#maa-vindhyavasini-photos" className="text-slate-400 hover:text-amber-400 transition-colors" aria-label="Scroll to exploration">
              <ChevronDown className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. NEW DEDICATED MODULE: MAA VINDHYAVASINI PHOTO GALLERY
         ======================================================== */}
      <MaaVindhyavasiniGallery />

      {/* ========================================================
          3. NEW DEDICATED MODULE: HISTORY OF VINDHYACHAL & MAA UTPATTI
         ======================================================== */}
      <VindhyachalHistoryModule />

      {/* ========================================================
          4. GOOGLE MAPS & NEIGHBOR LOCATIONS / HOTELS FINDER
         ======================================================== */}
      <GooglePlacesExplorer />

      {/* ========================================================
          5. SOLAR-SYSTEM-STYLE DESTINATION NAVIGATION
         ======================================================== */}
      <div id="solar-orbit">
        <SolarDestinationNavigator destinations={destinations} />
      </div>

      {/* ========================================================
          4. SACRED TEMPLES & THE TRIKONA YATRA SHOWCASE
         ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-shakti-400 bg-shakti-500/10 border border-shakti-500/20 mb-3">
              <Sparkles className="w-4 h-4" />
              <span>The Tri-Devi Pilgrimage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
              The Holy Shrines of Vindhyachal
            </h2>
            <p className="text-slate-300 mt-3 max-w-2xl text-base sm:text-lg leading-relaxed">
              Each shrine is an authentic vertex of the eternal Trikona Yatra. Hover over any sanctum to experience 3D depth and verified Aarti information.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all self-start md:self-auto shadow-md"
          >
            <span>Explore All Shrines</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vindhyachalData?.temples && vindhyachalData.temples.length > 0 ? (
            vindhyachalData.temples.slice(0, 3).map((temple) => (
              <div key={temple.id} className="card-3d">
                <TempleCard temple={temple} />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-slate-400 text-base">
              Loading verified temple records...
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          5. WHY VINDHYACHAL? INTERACTIVE CHRONICLES TIMELINE
         ======================================================== */}
      <TempleStoryTimeline />

      {/* ========================================================
          6. INTERACTIVE PILGRIM MAP & VERIFIED NEARBY SERVICES
         ======================================================== */}
      <div className="mt-8">
        <div className="text-center max-w-3xl mx-auto px-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-3">
            <MapPin className="w-4 h-4" />
            <span>Geographic Pilgrimage Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
            Vindhyachal Sanctuary Map
          </h2>
          <p className="text-slate-300 mt-3 text-base sm:text-lg leading-relaxed">
            Verified coordinates for temples, ropeway boarding, railway stations, Ganga ghats, pure vegetarian dharamshalas, and 24x7 medical clinics.
          </p>
        </div>
        <InteractivePilgrimageMap />
      </div>

      {/* ========================================================
          7. PLAN MY YATRA BANNER
         ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden glass-panel-gold p-8 sm:p-14 border border-amber-500/35 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-shakti-600/30 text-shakti-300 border border-shakti-500/40">
              AI & Accessibility Engine
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
              Craft Your Personalized Pilgrimage Itinerary
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Traveling with elderly parents? Have limited hours? Need wheelchair accessibility or pure Sattvik food arrangements?
              Generate a verified, step-by-step itinerary synchronized with temple aarti schedules.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/plan"
                className="px-7 py-4 rounded-2xl font-serif font-bold text-base text-white bg-gradient-to-r from-shakti-600 to-amber-600 hover:from-shakti-500 hover:to-amber-500 shadow-xl transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Launch Yatra Planner</span>
              </Link>
              <Link
                href="/emergency"
                className="px-7 py-4 rounded-2xl font-semibold text-sm text-rose-300 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 transition-all flex items-center gap-2"
              >
                <span>Emergency Helpdesk (112)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
