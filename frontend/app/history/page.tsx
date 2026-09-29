import React from 'react';
import { Metadata } from 'next';
import { VindhyachalHistoryModule } from '@/components/history/VindhyachalHistoryModule';
import { MaaVindhyavasiniGallery } from '@/components/temple/MaaVindhyavasiniGallery';
import { BookOpen, Sparkles, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'History of Vindhyachal & Divinity of Maa Vindhyavasini | Shakti Yatra',
  description:
    'Complete scriptural history of Maa Vindhyavasini Utpatti, Vindhya Parvat, Ramayana belongings, Shri Krishna & Bhagavad Gita connections, and Dharmic Shraddha.',
};

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-medium text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* DEDICATED HISTORY MODULE */}
      <VindhyachalHistoryModule />

      {/* MAA VINDHYAVASINI SACRED DARSHAN GALLERY */}
      <div className="border-t border-slate-900 mt-16 pt-8">
        <MaaVindhyavasiniGallery />
      </div>
    </main>
  );
}
