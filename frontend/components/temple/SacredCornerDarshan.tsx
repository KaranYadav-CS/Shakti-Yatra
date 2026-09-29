'use client';

import React, { useState } from 'react';
import { Sparkles, X, Eye, Maximize2 } from 'lucide-react';

export const SacredCornerDarshan: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* FLOATING CORNER DARSHAN BADGE */}
      <aside
        aria-label="Maa Vindhyavasini Darshan"
        className="fixed top-20 right-4 z-30 group cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-amber-500 via-shakti-500 to-amber-300 sacred-corner-glow shadow-2xl transition-all duration-400 group-hover:scale-108 group-hover:-translate-y-1">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-950 border border-amber-300/60">
            <img
              src="/images/vindhyavasini/maa_corner.jpeg"
              alt="Maa Vindhyavasini Devi Holy Sanctum"
              className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 py-0.5 text-center bg-amber-950/90 text-[8px] sm:text-[9px] font-bold text-amber-200 tracking-tighter uppercase font-serif">
              Maa Darshan
            </div>
          </div>

          {/* Glowing Divine Particle Indicator */}
          <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-slate-900"></span>
          </span>

          {/* Hover Tooltip */}
          <div className="absolute top-1/2 -left-48 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/95 border border-amber-500/50 text-amber-200 text-xs font-serif shadow-2xl whitespace-nowrap">
              ✦ Maa Vindhyavasini Pavitra Darshan
            </div>
          </div>
        </div>
      </aside>

      {/* FULL RESOLUTION DIVINE DARSHAN MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full rounded-3xl glass-panel-gold p-6 border-2 border-amber-400/50 shadow-2xl space-y-4">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              aria-label="Close Darshan View"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-500/20 border border-amber-500/40 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Pavitra Sanctum Darshan</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-white">
                Maa Vindhyavasini Devi
              </h3>
              <p className="text-xs text-amber-200/80 font-serif italic">
                &ldquo;सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥&rdquo;
              </p>
            </div>

            {/* Photo Container */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-amber-500/30 max-h-[60vh] flex items-center justify-center">
              <img
                src="/images/vindhyavasini/maa_corner.jpeg"
                alt="Maa Vindhyavasini Devi Darshan"
                className="w-full h-auto max-h-[58vh] object-contain"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-amber-500/20 text-center space-y-1">
              <div className="text-sm font-serif font-semibold text-amber-300">
                Blessed Sanctum • Vindhyachal Dham, Mirzapur
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The self-manifested Mahalakshmi swaroop of Goddess Durga on the sacred banks of the Ganges.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
