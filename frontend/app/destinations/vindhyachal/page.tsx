'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Navigation,
  Compass,
  Bed,
  Coffee,
  HeartHandshake,
  Train,
  Plane,
  Bus,
  ExternalLink,
  Info,
  ArrowRight,
  Camera
} from 'lucide-react';
import { fetchDestinationDetail, Destination } from '@/lib/api';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { TempleCard } from '@/components/temple/TempleCard';
import { MaaVindhyavasiniGallery } from '@/components/temple/MaaVindhyavasiniGallery';
import { VindhyachalHistoryModule } from '@/components/history/VindhyachalHistoryModule';
import { GooglePlacesExplorer } from '@/components/places/GooglePlacesExplorer';

export default function VindhyachalDetailPage() {
  const [data, setData] = useState<Destination | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const dest = await fetchDestinationDetail('vindhyachal');
        setData(dest);
      } catch (e) {
        console.error("Error loading Vindhyachal details", e);
      }
    }
    load();
  }, []);

  const quickNavItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'photos', label: 'Maa Photos' },
    { id: 'history', label: 'History & Utpatti' },
    { id: 'places-explorer', label: 'Google Maps & Hotels' },
    { id: 'temples', label: 'Trikona Shrines' },
    { id: 'timings', label: 'Darshan & Aartis' },
    { id: 'how-to-reach', label: 'How to Reach' },
    { id: 'attractions', label: 'Nearby Attractions' },
    { id: 'stay', label: 'Stay & Hotels' },
    { id: 'food', label: 'Sattvik Food' },
    { id: 'facilities', label: 'Facilities & Access' },
    { id: 'sources', label: 'Verified Sources' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[68vh] flex items-end pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/vindhyavasini/darshan_6.jpeg"
            alt="Vindhyachal Temple Sanctuary"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-shakti-600/35 text-shakti-200 border border-shakti-500/50">
              Primary Sanctum Sanctorum
            </span>
            <VerificationBadge
              sourceName="UP Tourism & District Administration Mirzapur"
              sourceUrl="https://uptourism.gov.in"
              verified={true}
              date="2026-09-01"
            />
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight">
            Vindhyachal Dham
          </h1>

          <p className="text-lg sm:text-2xl text-amber-200 font-serif italic max-w-3xl leading-relaxed">
            &ldquo;The Eternal Sanctum of Adi Shakti Mahalakshmi & The Sacred Trikona Yatra&rdquo;
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-sm sm:text-base text-slate-200 font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-shakti-400" />
              <span>Mirzapur District, Uttar Pradesh, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>Best Season: October to March (Navratri Mahotsav)</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/plan"
              className="px-7 py-3.5 rounded-2xl font-serif font-bold text-sm sm:text-base text-white bg-gradient-to-r from-shakti-600 to-amber-600 hover:from-shakti-500 hover:to-amber-500 shadow-xl transition-all"
            >
              Plan Vindhyachal Yatra
            </Link>
            <a
              href="#photos"
              className="px-6 py-3.5 rounded-2xl font-semibold text-sm sm:text-base text-amber-200 bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/40 transition-all flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>View Maa Photos</span>
            </a>
            <a
              href="#timings"
              className="px-6 py-3.5 rounded-2xl font-semibold text-sm sm:text-base text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition-all"
            >
              View Darshan Timings
            </a>
          </div>
        </div>
      </section>

      {/* QUICK SECTION STICKY JUMP BAR */}
      <div className="sticky top-20 z-30 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 overflow-x-auto no-scrollbar py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2.5">
          {quickNavItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-900 whitespace-nowrap transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* 2. OVERVIEW & SIGNIFICANCE */}
        <section id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20">
              <Sparkles className="w-4 h-4" />
              <span>Cosmic Importance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Why Vindhyachal Holds Supreme Spiritual Eminence
            </h2>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Vindhyachal is unique among Indian pilgrimage centers. While traditional Shakti Peethas mark the geographical locations where the sacred relics of Sati descended, Vindhyachal is a self-manifested <strong>Siddhpeeth</strong>. Here, Goddess Durga permanently chose her seat upon vanquishing the demon brothers Shumbha and Nishumbha, as narrated in the Markandeya Purana and Durga Saptashati.
            </p>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Devotees complete the revered <strong>Trikona Yatra</strong> (Triangle Circumambulation), an unbroken spiritual path uniting three forms of divinity:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="card-3d p-5 rounded-2xl glass-panel border border-slate-800">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">Vertex I</span>
                <h4 className="font-serif font-bold text-lg text-white mt-1">Maa Vindhyavasini</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">Mahalakshmi Swaroop • Wealth & Protection</p>
              </div>
              <div className="card-3d p-5 rounded-2xl glass-panel border border-slate-800">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">Vertex II</span>
                <h4 className="font-serif font-bold text-lg text-white mt-1">Kali Khoh</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">Mahakali Swaroop • Vanquisher of Evil</p>
              </div>
              <div className="card-3d p-5 rounded-2xl glass-panel border border-slate-800">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">Vertex III</span>
                <h4 className="font-serif font-bold text-lg text-white mt-1">Maa Ashtabhuja</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">Mahasaraswati Swaroop • Divine Wisdom</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl glass-panel-gold p-6 sm:p-8 border border-amber-500/35 space-y-4 shadow-xl">
            <h3 className="font-serif font-bold text-2xl text-white">Vindhyachal Quick Facts</h3>
            <ul className="space-y-3.5 text-sm sm:text-base">
              <li className="flex justify-between pb-2.5 border-b border-slate-800">
                <span className="text-slate-400">Presiding Deity:</span>
                <span className="text-white font-semibold">Adi Shakti Maa Vindhyavasini</span>
              </li>
              <li className="flex justify-between pb-2.5 border-b border-slate-800">
                <span className="text-slate-400">Sacred River:</span>
                <span className="text-white font-semibold">Holy Ganges (Uttar Vahini)</span>
              </li>
              <li className="flex justify-between pb-2.5 border-b border-slate-800">
                <span className="text-slate-400">Major Shrines:</span>
                <span className="text-white font-semibold">3 Trikona Temples + Rameshwar</span>
              </li>
              <li className="flex justify-between pb-2.5 border-b border-slate-800">
                <span className="text-slate-400">Ropeway Status:</span>
                <span className="text-emerald-400 font-bold">Active & Operational</span>
              </li>
              <li className="flex justify-between pb-2.5 border-b border-slate-800">
                <span className="text-slate-400">Nearest Station:</span>
                <span className="text-white font-semibold">Vindhyachal (1.2 km) / Mirzapur (8 km)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Nearest Airport:</span>
                <span className="text-white font-semibold">Varanasi (VNS, 72 km)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. DEDICATED PHOTO GALLERY MODULE */}
        <div id="photos">
          <MaaVindhyavasiniGallery />
        </div>

        {/* 4. DEDICATED HISTORY OF VINDHYACHAL & MAA UTPATTI MODULE */}
        <div id="history">
          <VindhyachalHistoryModule />
        </div>

        {/* 5. GOOGLE MAPS EXPLORER & NEIGHBORS / HOTELS */}
        <div id="places-explorer">
          <GooglePlacesExplorer />
        </div>

        {/* 4. TRIKONA SHRINES */}
        <section id="temples" className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-shakti-400 bg-shakti-500/10 border border-shakti-500/20 mb-2">
              <Compass className="w-4 h-4" />
              <span>Sacred Sanctuaries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
              The Holy Trikona Temples
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mt-2 leading-relaxed">
              Explore the four principal shrines of Vindhyachal Dham with verified dress codes and entry information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.temples && data.temples.length > 0 ? (
              data.temples.map((temple) => (
                <div key={temple.id} id={`temple-${temple.id}`} className="card-3d">
                  <TempleCard temple={temple} />
                </div>
              ))
            ) : (
              <p className="text-base text-slate-400">Loading temple records...</p>
            )}
          </div>
        </section>

        {/* 5. VERIFIED DARSHAN & AARTI TIMINGS */}
        <section id="timings" className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 space-y-7 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-2">
                <Clock className="w-4 h-4" />
                <span>Officially Verified Schedule</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Maa Vindhyavasini Daily Aarti & Darshan Schedule
              </h2>
            </div>
            <VerificationBadge
              sourceName="Vindhya Shrine Board Notice"
              verified={true}
              date="2026-09-01"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Mangala Aarti', time: '04:00 AM – 05:00 AM', desc: 'First early dawn aarti with conch blowing & purification' },
              { name: 'Morning Darshan', time: '05:00 AM – 12:00 PM', desc: 'Continuous darshan, offerings of coconut & red chunari' },
              { name: 'Rajbhog Aarti', time: '12:00 PM – 01:30 PM', desc: 'Sacred mid-day food offering; doors rest briefly' },
              { name: 'Afternoon Darshan', time: '02:00 PM – 07:15 PM', desc: 'Temple doors open for afternoon prayers & parikrama' },
              { name: 'Sandhya Aarti', time: '07:15 PM – 08:30 PM', desc: 'Grand illumination of brass lamps & evening chanting' },
              { name: 'Shayan Aarti', time: '09:00 PM – 11:30 PM', desc: 'Night ritual before inner sanctum rests for dawn' },
            ].map((slot, i) => (
              <div key={i} className="card-3d p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-xs sm:text-sm font-mono text-amber-400 font-bold uppercase">{slot.name}</span>
                <div className="text-lg sm:text-xl font-bold text-white font-mono">{slot.time}</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{slot.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-sm sm:text-base text-amber-100 leading-relaxed">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Note on Festivals:</strong> During Chaitra and Sharad Navratri, the temple remains open continuously 24 hours daily with minor procedural pauses during Aarti. Always maintain queue discipline.
            </span>
          </div>
        </section>

        {/* 6. HOW TO REACH */}
        <section id="how-to-reach" className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-shakti-400 bg-shakti-500/10 border border-shakti-500/20 mb-1">
            <Navigation className="w-4 h-4" />
            <span>Transit Hubs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">How to Reach Vindhyachal</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-3d p-6 rounded-3xl glass-panel border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400">
                <Train className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">By Railway</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong>Vindhyachal (BDL):</strong> 1.2 km away. Direct express train halt. E-rickshaws available for ₹20-30.<br />
                <strong>Mirzapur Junction (MZP):</strong> 8.5 km away. Connected to Rajdhani, Superfast trains from Delhi, Prayagraj, and Patna. Auto fare ~₹150-200.
              </p>
            </div>

            <div className="card-3d p-6 rounded-3xl glass-panel border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-sky-400">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">By Air</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong>Lal Bahadur Shastri Airport, Varanasi (VNS):</strong> Situated approximately 72 km away. Pre-paid airport taxis take 1.5 to 2 hours via National Highway 19 and Mirzapur Road.
              </p>
            </div>

            <div className="card-3d p-6 rounded-3xl glass-panel border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400">
                <Bus className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">By Road & Bus</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Frequent UPSRTC government buses operate every 20 minutes from Varanasi Cantt Bus Station and Prayagraj Civil Lines to Vindhyachal. Multilevel tourist parking is available 600m from the temple.
              </p>
            </div>
          </div>
        </section>

        {/* 7. NEARBY ATTRACTIONS */}
        <section id="attractions" className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-1">
            <Compass className="w-4 h-4" />
            <span>Sacred Springs & Excursions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Nearby Attractions & Riverfronts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.attractions && data.attractions.length > 0 ? (
              data.attractions.map((att) => (
                <div key={att.id} className="card-3d rounded-3xl glass-panel overflow-hidden border border-slate-800 flex flex-col justify-between">
                  <div className="h-48 w-full relative bg-slate-900">
                    <img src={att.image_url || '/images/vindhyavasini/darshan_3.jpeg'} alt={att.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/85 backdrop-blur-md text-amber-300">
                      {att.category}
                    </span>
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-mono text-slate-200 bg-black/70 backdrop-blur-md">
                      {att.distance_km} km
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-xl text-white">{att.name}</h4>
                      <p className="text-sm text-slate-300 mt-2 line-clamp-3 leading-relaxed">{att.why_visit}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-sm text-slate-400">
                      <span>Est. time: {att.estimated_time_minutes} min</span>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${att.latitude},${att.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-200 flex items-center gap-1 font-semibold"
                      >
                        Directions <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </section>

        {/* 8. STAY & HOTELS */}
        <section id="stay" className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-shakti-400 bg-shakti-500/10 border border-shakti-500/20 mb-1">
            <Bed className="w-4 h-4" />
            <span>Where to Stay</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Verified Hotels & Dharamshalas</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.hotels && data.hotels.map((hotel) => (
              <div key={hotel.id} className="card-3d p-6 rounded-3xl glass-panel border border-slate-800 space-y-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-amber-400 font-bold">{hotel.hotel_type}</span>
                    <span className="font-mono text-slate-300 font-semibold">{hotel.price_range}</span>
                  </div>
                  <h4 className="font-serif font-bold text-xl text-white">{hotel.name}</h4>
                  <p className="text-sm text-slate-300 mt-1">{hotel.address}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {hotel.amenities.map((am, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-sm">
                  <span className="text-slate-400">{hotel.distance_from_temple}</span>
                  {hotel.contact_phone && (
                    <a href={`tel:${hotel.contact_phone}`} className="text-shakti-400 font-bold hover:underline">
                      {hotel.contact_phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. RESTAURANTS & SATTVIK FOOD */}
        <section id="food" className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-1">
            <Coffee className="w-4 h-4" />
            <span>Sattvik Cuisine & Sweets</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Pure Vegetarian Dining & Mirzapuri Sweets</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.restaurants && data.restaurants.map((rest) => (
              <div key={rest.id} className="card-3d p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col sm:flex-row gap-5 items-center">
                <div className="w-full sm:w-40 h-32 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                  <img src={rest.image_url || '/images/vindhyavasini/darshan_4.jpeg'} alt={rest.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-400 font-bold">100% Pure Veg</span>
                    <span className="font-mono text-slate-300 font-semibold">{rest.price_for_two}</span>
                  </div>
                  <h4 className="font-serif font-bold text-xl text-white">{rest.name}</h4>
                  <p className="text-sm text-amber-200 font-medium">Specialty: {rest.specialty_dish}</p>
                  <p className="text-xs sm:text-sm text-slate-300">{rest.address} • {rest.distance_from_temple}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. FACILITIES & ACCESSIBILITY */}
        <section id="facilities" className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-2">
                <HeartHandshake className="w-4 h-4" />
                <span>Dignified & Accessible Pilgrimage</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Pilgrim Amenities & Accessibility Services
              </h2>
            </div>
            <Link
              href="/emergency"
              className="text-sm font-bold text-rose-300 hover:text-rose-200 flex items-center gap-1.5"
            >
              Emergency Center & Hospital Helplines <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {data?.facilities && data.facilities.map((fac) => (
              <div key={fac.id} className="card-3d p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-xs sm:text-sm font-bold text-amber-400">{fac.category}</span>
                <h5 className="font-bold text-base text-white">{fac.name}</h5>
                <p className="text-xs sm:text-sm text-slate-300">{fac.location_details}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>{fac.opening_hours}</span>
                  <span className="text-emerald-400 font-semibold">{fac.is_free ? 'Free Facility' : 'Nominal Fee'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. VERIFIED SOURCES AUDIT */}
        <section id="sources" className="p-7 rounded-3xl bg-slate-900/70 border border-slate-800 text-sm text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-white font-bold text-base flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Official Verification Sources</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Information on timings, ropeway guidelines, and emergency responders is verified in collaboration with Uttar Pradesh Tourism, Vindhya Shrine Board, and Mirzapur District Administration.
            </p>
          </div>
          <a
            href="https://uptourism.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white flex items-center gap-2 shrink-0 font-medium"
          >
            <span>Visit UP Tourism Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>
      </div>
    </div>
  );
}
