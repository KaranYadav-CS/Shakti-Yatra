'use client';

import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  ShieldAlert,
  Share2,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { fetchEmergencyContacts, EmergencyContact } from '@/lib/api';
import { VerificationBadge } from '@/components/common/VerificationBadge';

export default function EmergencyPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const list = await fetchEmergencyContacts('vindhyachal');
        setContacts(list);
      } catch (e) {
        console.error("Error loading emergency contacts", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser.");
      return;
    }
    setLocationStatus("Locating your coordinates...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
        if (navigator.share) {
          navigator.share({
            title: "Emergency: Pilgrim Location in Vindhyachal",
            text: `I am requesting assistance near Vindhyachal. Current coordinates: ${lat}, ${lng}`,
            url: mapUrl,
          }).catch(() => {});
        }
        setLocationStatus(`Current Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      },
      () => {
        setLocationStatus("Location permission was denied. Please dial 112 directly.");
      }
    );
  };

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/25">
          <ShieldAlert className="w-4 h-4" />
          <span>24x7 Verified Pilgrimage Helplines</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Emergency Assistance Center
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Direct, tap-to-call verified contacts for police responders, medical trauma centers, temple pilgrim control, and women safety in Vindhyachal.
        </p>
      </div>

      {/* Share Location & Rapid Action Banner */}
      <div className="card-3d rounded-3xl glass-panel-gold p-7 sm:p-9 border border-rose-500/35 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-rose-400 font-bold text-base sm:text-lg">
            <AlertTriangle className="w-5 h-5" />
            <span>Need Immediate On-Ground Assistance?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
            Share your live GPS coordinates with emergency responders, family, or the local shrine control room.
          </p>
          {locationStatus && (
            <p className="text-xs sm:text-sm font-mono text-emerald-300 bg-slate-900/90 px-3.5 py-1.5 rounded-xl inline-block border border-emerald-500/30">
              {locationStatus}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
          <button
            onClick={handleShareLocation}
            className="px-7 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 shadow-xl transition-all flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share My Location</span>
          </button>
          <a
            href="tel:112"
            className="px-7 py-4 rounded-2xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-500 shadow-xl transition-all flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Dial Police (112)</span>
          </a>
        </div>
      </div>

      {/* Verified Emergency Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {loading ? (
          <div className="col-span-3 text-center py-12 text-base text-slate-400">
            Loading verified emergency registry...
          </div>
        ) : (
          contacts.map((c) => (
            <div
              key={c.id}
              className="card-3d p-6 sm:p-7 rounded-3xl glass-panel border border-slate-800 hover:border-rose-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm mb-3">
                  <span className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 uppercase">
                    {c.category}
                  </span>
                  <VerificationBadge
                    sourceName={c.source_name || "UP Police"}
                    verified={c.verified}
                    date={c.last_verified_at}
                    compact
                  />
                </div>

                <h3 className="font-serif font-bold text-xl text-white">
                  {c.service_name}
                </h3>
                <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                  {c.address}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <a
                  href={`tel:${c.phone_number}`}
                  className="w-full py-3.5 rounded-2xl font-bold text-base text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-rose-500 flex items-center justify-center gap-2.5 transition-all shadow-md"
                >
                  <PhoneCall className="w-5 h-5 text-rose-400" />
                  <span>Call {c.phone_number}</span>
                </a>

                {c.alternate_phone && (
                  <p className="text-xs text-center text-slate-400 pt-1">
                    Alt Line: <a href={`tel:${c.alternate_phone}`} className="text-slate-200 font-semibold hover:underline">{c.alternate_phone}</a>
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Safety Guidelines */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-3.5 text-sm sm:text-base text-slate-300 leading-relaxed card-3d">
        <h4 className="font-serif font-bold text-lg sm:text-xl text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Pilgrim Safety & Verification Assurance</span>
        </h4>
        <p>
          All telephone helplines published here are officially cross-checked with the Mirzapur District Administration and National Health Mission UP. No unverified third-party numbers are hosted on this platform. In the event of an urgent emergency at the riverfront or corridor, alert any stationed UP Police officer or visit the Shrine Board Control Room at Corridor Gate 1.
        </p>
      </div>
    </div>
  );
}
