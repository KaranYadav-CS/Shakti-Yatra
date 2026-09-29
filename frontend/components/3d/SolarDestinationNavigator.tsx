'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Sparkles, ArrowRight, Grid, Orbit, MapPin, Globe } from 'lucide-react';
import { Destination } from '@/lib/api';

interface SolarNavigatorProps {
  destinations: Destination[];
}

export const SolarDestinationNavigator: React.FC<SolarNavigatorProps> = ({ destinations }) => {
  const [viewMode, setViewMode] = useState<'orbit' | 'grid'>('orbit');
  const [selectedDest, setSelectedDest] = useState<Destination | null>(
    destinations.find(d => d.slug === 'vindhyachal') || destinations[0] || null
  );

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30 mb-3">
            <Orbit className="w-4 h-4 text-amber-400" />
            <span>3D Cosmic Destination Orbit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Sacred Shakti Peeth Constellation
          </h2>
          <p className="text-slate-300 mt-3 max-w-2xl text-base sm:text-lg leading-relaxed">
            Journey through India&apos;s holy Shakti shrines revolving around the divine source. Hover or click any celestial body for smooth 3D depth and verified details.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setViewMode('orbit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              viewMode === 'orbit'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Orbital View"
          >
            <Orbit className="w-4 h-4" />
            <span>Solar Orbit</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Accessible Grid View"
          >
            <Grid className="w-4 h-4" />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {viewMode === 'orbit' ? (
        /* ORBITAL SOLAR SYSTEM 3D VIEW */
        <div className="relative min-h-[580px] rounded-3xl glass-panel-gold p-6 sm:p-10 flex flex-col items-center justify-center overflow-hidden border-2 border-amber-500/40 shadow-2xl">
          {/* Animated Concentric Cosmic Orbit Tracks */}
          <div className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full border border-amber-500/20 pointer-events-none animate-spin-very-slow" />
          <div className="absolute w-[500px] h-[500px] sm:w-[680px] sm:h-[680px] rounded-full border border-shakti-500/15 pointer-events-none" />
          <div className="absolute w-[660px] h-[660px] sm:w-[880px] sm:h-[880px] rounded-full border border-amber-400/10 pointer-events-none" />

          {/* Central Sun / Sanctum Core: SHAKTI YATRA */}
          <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-full w-44 h-44 sm:w-56 sm:h-56 justify-center bg-gradient-to-tr from-amber-600 via-shakti-700 to-amber-400 border-2 border-amber-300 sacred-corner-glow shadow-2xl zoom-3d cursor-default">
            <div className="w-3 h-3 rounded-full bg-white animate-ping mb-2" />
            <span className="text-[11px] uppercase font-bold tracking-widest text-slate-950 font-serif bg-amber-200/90 px-2 py-0.5 rounded-full mb-1">
              Cosmic Source
            </span>
            <span className="text-lg sm:text-xl font-serif font-black text-white tracking-wider drop-shadow-md">
              SHAKTI DHAM
            </span>
            <span className="text-xs text-amber-100 font-medium mt-1">
              Discover • Plan • Experience
            </span>
          </div>

          {/* Orbiting Celestial Nodes (Planetary Bodies) */}
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 z-10">
            {destinations.map((dest) => {
              const isVindhyachal = dest.slug === 'vindhyachal';
              const isSelected = selectedDest?.slug === dest.slug;

              return (
                <div
                  key={dest.id}
                  onClick={() => setSelectedDest(dest)}
                  className={`card-3d cursor-pointer rounded-2xl p-5 transition-all duration-300 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/20 scale-104 ring-1 ring-amber-400/60'
                      : 'bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-300 hover:border-amber-500/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs text-amber-400 font-mono font-bold">
                        Orbit #{dest.orbit_order}
                      </span>
                      {isVindhyachal ? (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                          Active Sanctum
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          Constellation Node
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif font-bold text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors">
                      {dest.name}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{dest.district}, {dest.state}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                      {dest.short_description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm">
                    {isVindhyachal ? (
                      <Link
                        href={`/destinations/${dest.slug}`}
                        className="text-amber-400 font-bold hover:text-amber-300 flex items-center gap-1 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Enter Sanctum</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="text-slate-500 italic">Verification in queue</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Callout Panel for selected celestial node */}
          {selectedDest && (
            <div className="mt-8 w-full max-w-3xl bg-slate-950/90 rounded-2xl p-6 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-5 z-10 shadow-xl">
              <div>
                <div className="text-xs sm:text-sm text-amber-400 font-semibold font-serif">
                  {selectedDest.tagline}
                </div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                  {selectedDest.name}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 mt-1">
                  Ideal Season: {selectedDest.best_time_to_visit || 'October - March'} • Verified Official Records
                </div>
              </div>

              {selectedDest.slug === 'vindhyachal' ? (
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link
                    href="/destinations/vindhyachal"
                    className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Explore Full Guide</span>
                  </Link>
                  <Link
                    href="/history"
                    className="px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
                  >
                    <span>Read History</span>
                  </Link>
                </div>
              ) : (
                <div className="text-xs sm:text-sm text-amber-300/90 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  Expansion Dataset in Verification
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ACCESSIBLE STANDARD GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="card-3d rounded-2xl glass-panel p-6 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-400 font-bold">Node #{dest.orbit_order}</span>
                  {dest.slug === 'vindhyachal' ? (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Live Sanctum
                    </span>
                  ) : (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      Planned
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-1">{dest.name}</h3>
                <div className="text-xs sm:text-sm text-amber-400 mb-3">{dest.district}, {dest.state}</div>
                <p className="text-sm text-slate-300 line-clamp-3 mb-4 leading-relaxed">{dest.short_description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                {dest.slug === 'vindhyachal' ? (
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all"
                  >
                    <span>View Destination Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl text-xs font-medium text-slate-500 bg-slate-900 border border-slate-800 cursor-not-allowed text-center"
                  >
                    Records Being Verified
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
