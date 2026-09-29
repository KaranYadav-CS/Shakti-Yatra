'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  Accessibility,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { fetchDestinationDetail, Temple } from '@/lib/api';
import { TempleCard } from '@/components/temple/TempleCard';

export default function ExplorePage() {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeity, setSelectedDeity] = useState('all');
  const [onlyWheelchair, setOnlyWheelchair] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchDestinationDetail('vindhyachal');
        if (data?.temples) {
          setTemples(data.temples);
        }
      } catch (err) {
        console.error("Error loading temples", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredTemples = temples.filter((t) => {
    const matchesSearch =
      !searchTerm ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.deity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDeity =
      selectedDeity === 'all' ||
      (selectedDeity === 'devi' && (t.deity.includes('Maa') || t.deity.includes('Devi') || t.deity.includes('Kali') || t.deity.includes('Lakshmi'))) ||
      (selectedDeity === 'shiva' && t.deity.toLowerCase().includes('shiva'));

    const matchesAccessibility = !onlyWheelchair || t.wheelchair_accessible;

    return matchesSearch && matchesDeity && matchesAccessibility;
  });

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-shakti-300 bg-shakti-500/15 border border-shakti-500/30">
          <Compass className="w-4 h-4 text-shakti-400" />
          <span>Pilgrimage Explorer</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Explore Temples & Sacred Shrines
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Filter through sanctums, darshan timings, verified accessibility features, and holy geometry.
        </p>
      </div>

      {/* Real Search & Filter Control Bar */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-slate-800 space-y-5 shadow-2xl card-3d">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Working Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search temples, deities, aartis (e.g. Vindhyavasini, Kali, Shiva)..."
              className="w-full bg-slate-900 text-white placeholder-slate-400 pl-12 pr-4 py-3.5 rounded-2xl text-base border border-slate-700 focus:outline-hidden focus:border-amber-500 transition-all font-medium"
            />
          </div>

          {/* Deity Filter */}
          <div className="flex items-center gap-3">
            <select
              value={selectedDeity}
              onChange={(e) => setSelectedDeity(e.target.value)}
              className="bg-slate-900 text-slate-200 text-sm sm:text-base px-4 py-3.5 rounded-2xl border border-slate-700 focus:outline-hidden focus:border-amber-500 cursor-pointer font-medium"
            >
              <option value="all">All Deities & Swaroops</option>
              <option value="devi">Devi / Shakti Shrines</option>
              <option value="shiva">Lord Shiva Shrines</option>
            </select>

            {/* Wheelchair accessible toggle */}
            <button
              onClick={() => setOnlyWheelchair(!onlyWheelchair)}
              className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl text-sm sm:text-base font-semibold border transition-all ${
                onlyWheelchair
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Accessibility className="w-5 h-5" />
              <span>Ramps / Wheelchair</span>
            </button>

            {/* Reset button */}
            {(searchTerm || selectedDeity !== 'all' || onlyWheelchair) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDeity('all');
                  setOnlyWheelchair(false);
                }}
                className="p-3.5 rounded-2xl bg-slate-800 text-slate-300 hover:text-white transition-all"
                title="Reset filters"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Status Count */}
        <div className="flex items-center justify-between text-sm text-slate-300 pt-3 border-t border-slate-800">
          <span>
            Showing <strong className="text-white">{filteredTemples.length}</strong> sanctum(s) in Vindhyachal, Uttar Pradesh
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            100% Grounded in Shrine Board Data
          </span>
        </div>
      </div>

      {/* Grid of Results */}
      {loading ? (
        <div className="py-16 text-center text-base text-slate-400">
          Loading verified shrines...
        </div>
      ) : filteredTemples.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemples.map((temple) => (
            <div key={temple.id} className="card-3d">
              <TempleCard temple={temple} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-3xl glass-panel border border-slate-800 p-8 space-y-3">
          <p className="text-xl font-serif font-bold text-white">No temples match your criteria</p>
          <p className="text-sm text-slate-400">Try loosening your search term or disabling the wheelchair filter.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDeity('all');
              setOnlyWheelchair(false);
            }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-shakti-600 text-white hover:bg-shakti-500 transition-all shadow-md"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
