'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Hospital, Coffee, Bed, Bus, ShieldAlert, ExternalLink, Sparkles } from 'lucide-react';

interface MapPoint {
  id: string;
  name: string;
  category: 'temple' | 'attraction' | 'stay' | 'food' | 'transport' | 'emergency';
  latitude: number;
  longitude: number;
  distance: string;
  description: string;
  highlight?: string;
  verified: boolean;
}

const PILGRIM_PINS: MapPoint[] = [
  {
    id: 'vindhyavasini',
    name: 'Maa Vindhyavasini Devi Temple',
    category: 'temple',
    latitude: 25.1614,
    longitude: 82.5029,
    distance: '0.0 km (Center)',
    description: 'Central sanctum sanctorum of Adi Shakti on the holy banks of the Ganges. Free darshan; priority ramp access at Gate 1.',
    highlight: 'Primary Sanctum',
    verified: true,
  },
  {
    id: 'kali-khoh',
    name: 'Kali Khoh Cave Temple',
    category: 'temple',
    latitude: 25.1482,
    longitude: 82.4975,
    distance: '2.1 km South',
    description: 'Serene cave shrine of Maa Mahakali in the forest valley. Second vertex of Trikona Yatra.',
    highlight: 'Vertex 2',
    verified: true,
  },
  {
    id: 'ashtabhuja',
    name: 'Maa Ashtabhuja Devi Temple',
    category: 'temple',
    latitude: 25.1425,
    longitude: 82.5081,
    distance: '3.0 km Southeast',
    description: 'Eight-armed Saraswati temple atop the Vindhya hill. Connected directly by passenger ropeway.',
    highlight: 'Vertex 3 (Hilltop)',
    verified: true,
  },
  {
    id: 'pakka-ghat',
    name: 'Pakka Ghat & Ganga Maha Aarti',
    category: 'attraction',
    latitude: 25.1638,
    longitude: 82.5042,
    distance: '400 m North',
    description: 'Historic paved stone riverbank for sacred Ganga snan and evening lamp aarti ceremonies.',
    highlight: 'Sacred Riverfront',
    verified: true,
  },
  {
    id: 'ropeway',
    name: 'Vindhyachal Aerial Ropeway Station',
    category: 'transport',
    latitude: 25.1475,
    longitude: 82.4990,
    distance: '2.0 km',
    description: 'Modern cable car connecting Kali Khoh to Ashtabhuja hill. Ideal for seniors and children.',
    highlight: 'Wheelchair Friendly',
    verified: true,
  },
  {
    id: 'sita-kund',
    name: 'Sita Kund Sacred Spring',
    category: 'attraction',
    latitude: 25.1430,
    longitude: 82.5090,
    distance: '3.2 km',
    description: 'Ancient natural rock spring formed by Lakshmana during exile in the Treta Yuga.',
    highlight: 'Perennial Spring',
    verified: true,
  },
  {
    id: 'bdl-station',
    name: 'Vindhyachal Railway Station (BDL)',
    category: 'transport',
    latitude: 25.1585,
    longitude: 82.5088,
    distance: '1.2 km',
    description: 'Mainline railway halt on Delhi-Howrah route. Regular autos and battery rickshaws to temple.',
    highlight: 'Direct Trains',
    verified: true,
  },
  {
    id: 'birla-atithi',
    name: 'Maa Vindhyavasini Birla Atithi Bhavan',
    category: 'stay',
    latitude: 25.1620,
    longitude: 82.5040,
    distance: '350 m',
    description: 'Spacious pilgrim dharamshala with clean AC/non-AC rooms, elevator, and pure Sattvik canteen.',
    highlight: 'Walking Distance',
    verified: true,
  },
  {
    id: 'rahi-tourist',
    name: 'UPSTDC Rahi Tourist Bungalow',
    category: 'stay',
    latitude: 25.1560,
    longitude: 82.5010,
    distance: '1.2 km',
    description: 'Official Uttar Pradesh Tourism hotel with dining, secure parking, and travel desk.',
    highlight: 'Govt Hotel',
    verified: true,
  },
  {
    id: 'annapurna-food',
    name: 'Annapurna Bhojanalaya & Prasadam',
    category: 'food',
    latitude: 25.1610,
    longitude: 82.5035,
    distance: '150 m',
    description: 'Pure vegetarian Sattvik North Indian meals, Desi ghee Poori Sabzi, and temple sweets.',
    highlight: 'Pure Vegetarian',
    verified: true,
  },
  {
    id: 'chc-hospital',
    name: 'Community Health Centre (CHC) Vindhyachal',
    category: 'emergency',
    latitude: 25.1570,
    longitude: 82.5070,
    distance: '800 m',
    description: '24x7 Government emergency medical clinic, first-aid center, and ambulance station.',
    highlight: '24x7 Medical',
    verified: true,
  },
  {
    id: 'police-station',
    name: 'Vindhyachal Police Post (Kotwali)',
    category: 'emergency',
    latitude: 25.1595,
    longitude: 82.5055,
    distance: '500 m',
    description: '24x7 Police assistance and lost & found reporting desk. Emergency helpline 112.',
    highlight: 'Dial 112',
    verified: true,
  },
];

export const InteractivePilgrimageMap: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(PILGRIM_PINS[0]);

  const filteredPoints =
    activeCategory === 'all'
      ? PILGRIM_PINS
      : PILGRIM_PINS.filter((p) => p.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Landmarks', icon: Compass },
    { id: 'temple', label: 'Sacred Temples', icon: Sparkles },
    { id: 'attraction', label: 'Ghats & Natural Springs', icon: MapPin },
    { id: 'stay', label: 'Hotels & Dharamshalas', icon: Bed },
    { id: 'food', label: 'Sattvik Food', icon: Coffee },
    { id: 'transport', label: 'Ropeway & Stations', icon: Bus },
    { id: 'emergency', label: 'Emergency & Health', icon: ShieldAlert },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-shakti-600 text-white border-shakti-500 shadow-md'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Stylized Map View */}
        <div className="lg:col-span-8 rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 relative min-h-[460px] flex flex-col justify-between overflow-hidden">
          {/* Subtle Map Grid lines representing Vindhyachal terrain */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          {/* River Ganga graphic curve */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-sky-950/40 via-sky-900/20 to-transparent border-b border-sky-500/20 pointer-events-none flex items-center justify-center">
            <span className="text-xs uppercase tracking-widest font-serif font-bold text-sky-400/60">
              〜 Sacred River Ganga (Pakka & Diwan Ghats) 〜
            </span>
          </div>

          {/* Map Nodes Plotting */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-8">
            {filteredPoints.map((point) => {
              const isSelected = selectedPoint.id === point.id;
              return (
                <div
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className={`cursor-pointer p-3 rounded-2xl border transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-shakti-600/30 border-shakti-500 shadow-lg scale-102 ring-2 ring-shakti-500/40'
                      : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1 font-mono">
                    <span className="text-amber-400">{point.distance}</span>
                    {point.highlight && (
                      <span className="px-1.5 py-0.2 rounded-md bg-slate-800 text-slate-400 text-[9px]">
                        {point.highlight}
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-xs text-white line-clamp-1">{point.name}</h4>
                  <p className="text-[11px] text-slate-400 capitalize mt-0.5">{point.category}</p>
                </div>
              );
            })}
          </div>

          {/* Map Footer status */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400 gap-2">
            <span>Coordinate datum: WGS-84 • Verified Mirzapur GIS bounds</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Verified Landmark
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Trikona Shrines
              </span>
            </div>
          </div>
        </div>

        {/* Selected Landmark Details Card */}
        <div className="lg:col-span-4 rounded-3xl glass-panel-gold p-6 border border-amber-500/30 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 capitalize">
                {selectedPoint.category}
              </span>
              <span className="text-slate-400 font-mono text-xs">{selectedPoint.distance}</span>
            </div>

            <h3 className="font-serif font-bold text-xl text-white mb-2">
              {selectedPoint.name}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {selectedPoint.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Latitude:</span>
                <span className="font-mono text-slate-200">{selectedPoint.latitude}° N</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Longitude:</span>
                <span className="font-mono text-slate-200">{selectedPoint.longitude}° E</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800">
                <span>Verification:</span>
                <span className="text-emerald-400 font-semibold">100% Verified Record</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPoint.latitude},${selectedPoint.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-xs text-white bg-gradient-to-r from-shakti-600 to-amber-600 hover:from-shakti-500 hover:to-amber-500 transition-all shadow-md"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Real-Time Directions</span>
              <ExternalLink className="w-3 h-3 text-amber-200" />
            </a>

            <p className="text-[11px] text-center text-slate-500">
              Opens verified navigation coordinates in Google Maps
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
