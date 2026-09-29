'use client';

import React from 'react';
import { InteractivePilgrimageMap } from '@/components/map/InteractivePilgrimageMap';
import { Compass, ShieldCheck, MapPin } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20">
          <MapPin className="w-3.5 h-3.5" />
          Interactive Pilgrim Geospatial Guide
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          Vindhyachal Sanctuary Map
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Explore all verified landmarks across temples, Ganga ghats, passenger ropeways, parking plazas, and 24x7 emergency centers with exact coordinates.
        </p>
      </div>

      <InteractivePilgrimageMap />
    </div>
  );
}
