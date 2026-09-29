import React from 'react';
import Link from 'next/link';
import { Flame, ShieldCheck, Heart, MapPin, PhoneCall, ExternalLink, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-300 text-sm sm:text-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-shakti-700 to-amber-500 flex items-center justify-center text-white shadow-lg">
                <Flame className="w-6 h-6" />
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-wider">
                SHAKTI YATRA
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              An intelligent, accessible pilgrimage assistance platform connecting devotees with authentic temple heritage, verified services, and smart travel itineraries.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Grounded & Verified Data</span>
            </div>
          </div>

          {/* Pilgrimage Links */}
          <div>
            <h4 className="font-serif font-bold text-white text-base uppercase tracking-wider mb-4 text-amber-300">
              Pilgrimage Hub
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/destinations/vindhyachal" className="hover:text-shakti-400 transition-colors">
                  Vindhyachal Sanctum (Active)
                </Link>
              </li>
              <li>
                <a href="/#maa-vindhyavasini-photos" className="hover:text-shakti-400 transition-colors">
                  Maa Vindhyavasini Photo Gallery
                </a>
              </li>
              <li>
                <Link href="/explore" className="hover:text-shakti-400 transition-colors">
                  Temple & Shrine Explorer
                </Link>
              </li>
              <li>
                <Link href="/plan" className="hover:text-shakti-400 transition-colors">
                  Plan My Yatra (Custom Itineraries)
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-shakti-400 transition-colors">
                  Interactive Pilgrim Map
                </Link>
              </li>
              <li>
                <Link href="/my-yatra" className="hover:text-shakti-400 transition-colors">
                  My Yatra Saved Trips
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Verification Sources */}
          <div>
            <h4 className="font-serif font-bold text-white text-base uppercase tracking-wider mb-4 text-amber-300">
              Verified Portals
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://uptourism.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-shakti-400 flex items-center gap-1.5 transition-colors"
                >
                  UP Tourism Official <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://mirzapur.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-shakti-400 flex items-center gap-1.5 transition-colors"
                >
                  District Administration Mirzapur <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://upstdc.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-shakti-400 flex items-center gap-1.5 transition-colors"
                >
                  UPSTDC Tourist Bungalow <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <Link href="/emergency" className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" />
                  Emergency Helpdesk (112 / 108)
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Accreditation */}
          <div>
            <h4 className="font-serif font-bold text-white text-base uppercase tracking-wider mb-4 text-amber-300">
              Developer & Platform
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Designed and built as a smart full-stack pilgrimage assistance system combining 3D WebGL, verified shrine facts, and AI guidance.
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-amber-950/60 border border-amber-500/40 text-sm space-y-1.5 shadow-lg">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-base font-serif">
                <Code className="w-4 h-4 text-amber-400" />
                <span>Developed by Karan Yadav</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-300">
                Full-Stack AI Pilgrimage Platform
              </div>
              <div className="text-xs text-slate-400">
                First Destination: Vindhyachal, UP
              </div>
            </div>

            <div className="mt-3">
              <Link href="/admin" className="text-xs text-slate-400 hover:text-slate-200 underline">
                Administrative Verification Console
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Shakti Yatra. All verified sacred information attributed to respective shrine authorities.
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300 font-medium">
              Developed by Karan Yadav
            </span>
            <span>•</span>
            <span className="font-serif italic text-slate-300">Discover. Plan. Experience.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
