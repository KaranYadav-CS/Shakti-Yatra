'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Search,
  Navigation,
  ExternalLink,
  Hotel,
  Utensils,
  Train,
  Hospital,
  Compass,
  Star,
  Phone,
  ShieldCheck,
  Building,
  Sparkles
} from 'lucide-react';
import { fetchNearbyPlaces, PlaceItem, NeighboringTown } from '@/lib/api';

export const GooglePlacesExplorer: React.FC = () => {
  const [places, setPlaces] = useState<PlaceItem[]>([]);
  const [neighborTowns, setNeighborTowns] = useState<NeighboringTown[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      try {
        const data = await fetchNearbyPlaces(activeCategory, searchQuery);
        setPlaces(data.places || []);
        setNeighborTowns(data.neighboring_towns || []);
        if (data.places && data.places.length > 0 && !selectedPlace) {
          setSelectedPlace(data.places[0]);
        }
      } catch (err) {
        console.error("Failed to load nearby places", err);
      } finally {
        setLoading(false);
      }
    }
    loadPlaces();
  }, [activeCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Shrines & Places', icon: Compass },
    { id: 'Hotels', label: 'Hotels & Dharamshalas', icon: Hotel },
    { id: 'Sacred Sanctum', label: 'Sacred Temples & Kunds', icon: Sparkles },
    { id: 'Restaurants', label: 'Sattvik Food & Prasadam', icon: Utensils },
    { id: 'Railway', label: 'Stations & Transport', icon: Train },
    { id: 'Medical', label: 'Hospitals & CHC', icon: Hospital },
  ];

  return (
    <section id="places-explorer" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30 mb-3">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Google Maps & Location Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Vindhyachal Neighbor Locations & Hotels Finder
          </h2>
          <p className="text-slate-300 mt-3 max-w-2xl text-base sm:text-lg leading-relaxed">
            Real-time coordinates, live Google Maps turn-by-turn navigation, verified hotels, sacred ghats, and neighbor heritage towns around Maa Vindhyavasini Dham.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="w-full md:w-80">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search hotel, ghat, station..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25 scale-102'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN TWO-COLUMN EXPLORER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LIST OF PLACES (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-4 max-h-[680px] overflow-y-auto pr-2">
          {loading ? (
            <div className="p-12 text-center text-slate-400 font-serif">
              Connecting to Google Maps intelligence...
            </div>
          ) : places.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-serif">
              No matching locations found. Try adjusting your query or category.
            </div>
          ) : (
            places.map((place) => {
              const isSelected = selectedPlace?.id === place.id;
              return (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`card-3d cursor-pointer p-5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-amber-400/80 ring-1 ring-amber-400/40 shadow-xl'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {place.category}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-amber-400" />
                          {place.distance_from_temple}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                        {place.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                        {place.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{place.rating}</span>
                      </div>
                      {place.price_range && (
                        <span className="text-xs font-semibold text-emerald-400">
                          {place.price_range}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions & Live Links */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                    <div className="text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="line-clamp-1">{place.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={place.turn_by_turn_dir}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-shakti-600 hover:bg-shakti-500 text-white font-semibold transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Navigate</span>
                      </a>
                      <a
                        href={place.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* INTERACTIVE GOOGLE MAPS EMBED & PINPOINT VIEWER (Right 5 Cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="rounded-3xl glass-panel-gold border-2 border-amber-500/40 p-4 shadow-2xl overflow-hidden space-y-3">
            <div className="flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-sm">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Google Maps Live Pinpoint</span>
              </div>
              {selectedPlace && (
                <span className="text-xs text-slate-400 font-mono">
                  {selectedPlace.latitude.toFixed(4)}, {selectedPlace.longitude.toFixed(4)}
                </span>
              )}
            </div>

            {/* Embedded Live Map Frame */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              <iframe
                title={selectedPlace ? selectedPlace.name : "Google Maps Vindhyachal"}
                src={
                  selectedPlace
                    ? selectedPlace.google_embed_url
                    : "https://maps.google.com/maps?q=25.1614,82.5029&z=15&output=embed"
                }
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Selected Place Details Card */}
            {selectedPlace && (
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-white text-base">
                    {selectedPlace.name}
                  </h4>
                  <span className="text-xs text-amber-300 font-semibold">
                    {selectedPlace.distance_from_temple}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedPlace.description}
                </p>

                {selectedPlace.contact_phone && (
                  <div className="pt-1 flex items-center gap-2 text-xs text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Phone: {selectedPlace.contact_phone}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* NEIGHBORING HERITAGE TOWNS & CIRCUITS */}
          <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-3">
            <h4 className="font-serif font-bold text-base text-white flex items-center gap-2 text-amber-300">
              <Building className="w-4 h-4 text-amber-400" />
              <span>Neighboring Pilgrimage & Heritage Towns</span>
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              {neighborTowns.map((town) => (
                <div
                  key={town.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between gap-3 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span>{town.name}</span>
                      <span className="text-xs font-mono text-amber-400">
                        ({town.distance_km} km • {town.travel_time})
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {town.highlights}
                    </div>
                  </div>

                  <a
                    href={town.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0"
                    title="View Route on Google Maps"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
