import React from 'react';
import Link from 'next/link';
import { Temple } from '@/lib/api';
import { VerificationBadge } from '../common/VerificationBadge';
import { Clock, Accessibility, ArrowRight } from 'lucide-react';

interface TempleCardProps {
  temple: Temple;
}

export const TempleCard: React.FC<TempleCardProps> = ({ temple }) => {
  const displayImage = temple.image_url || '/images/vindhyavasini/maa_corner.jpeg';

  return (
    <div className="card-3d group relative rounded-3xl overflow-hidden glass-panel border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl">
      {/* Image Banner */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
        <img
          src={displayImage}
          alt={temple.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-950/85 backdrop-blur-md text-amber-300 border border-amber-500/40">
            {temple.deity}
          </span>
          <VerificationBadge
            sourceName={temple.source_name || "Vindhya Shrine Board"}
            verified={temple.verified}
            compact
          />
        </div>

        {/* Bottom image overlay tag */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs sm:text-sm text-slate-200">
          <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
            <Accessibility className={`w-4 h-4 ${temple.wheelchair_accessible ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="font-medium">{temple.wheelchair_accessible ? 'Wheelchair Accessible' : 'Stairs Access'}</span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-amber-200 font-semibold bg-slate-950/80 px-2.5 py-1 rounded-lg">
            {temple.entry_fee || 'Free Darshan'}
          </span>
        </div>
      </div>

      {/* Card Content with larger medium typography */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors">
            {temple.name}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
            {temple.description}
          </p>

          {/* Aarti Timings preview with larger font */}
          {temple.timings && temple.timings.length > 0 && (
            <div className="mt-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Verified Aarti Timings</span>
              </div>
              <div className="flex items-center justify-between text-slate-200 pt-1 font-medium">
                <span>{temple.timings[0]?.session_name}:</span>
                <span className="font-mono text-amber-300 font-bold">
                  {temple.timings[0]?.opening_time} - {temple.timings[0]?.closing_time}
                </span>
              </div>
              {temple.timings[1] && (
                <div className="flex items-center justify-between text-slate-300 text-xs sm:text-sm">
                  <span>{temple.timings[1]?.session_name}:</span>
                  <span className="font-mono text-slate-200">
                    {temple.timings[1]?.opening_time} - {temple.timings[1]?.closing_time}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs sm:text-sm text-slate-400 font-medium">
            {temple.dress_code || 'Traditional Attire'}
          </span>
          <Link
            href={`/destinations/vindhyachal#temple-${temple.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-shakti-400 hover:text-amber-300 transition-colors"
          >
            <span>Full Darshan Info</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
