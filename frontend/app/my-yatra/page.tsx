'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  Plus,
  StickyNote,
  Compass,
  ArrowRight,
  ShieldCheck,
  Printer
} from 'lucide-react';
import { Itinerary } from '@/lib/api';

export default function MyYatraPage() {
  const [savedItineraries, setSavedItineraries] = useState<any[]>([]);
  const [personalNotes, setPersonalNotes] = useState<string>('');
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    // Load saved itineraries
    const existing = JSON.parse(localStorage.getItem('shakti_saved_itineraries') || '[]');
    setSavedItineraries(existing);

    // Load saved notes
    const note = localStorage.getItem('shakti_personal_notes') || '';
    setPersonalNotes(note);
  }, []);

  const handleSaveNotes = () => {
    localStorage.setItem('shakti_personal_notes', personalNotes);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  const handleDeleteItinerary = (id: number) => {
    const updated = savedItineraries.filter((i) => i.id !== id);
    setSavedItineraries(updated);
    localStorage.setItem('shakti_saved_itineraries', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20">
          <Bookmark className="w-3.5 h-3.5" />
          Devotee Personal Dashboard
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          My Sacred Yatra
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Access your saved pilgrimage itineraries, customized day-by-day schedules, spiritual reflections, and trip bookmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Saved Itineraries Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-2xl text-white">Saved Pilgrimage Plans</h3>
            <Link
              href="/plan"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-shakti-600 hover:bg-shakti-500 text-white flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Plan</span>
            </Link>
          </div>

          {savedItineraries.length > 0 ? (
            <div className="space-y-6">
              {savedItineraries.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-amber-400 font-mono">
                        {plan.destination_name} • {plan.duration_days} Day(s) • {plan.travellers_count} Pilgrim(s)
                      </span>
                      <h4 className="font-serif font-bold text-xl text-white mt-1">
                        {plan.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                        title="Print"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItinerary(plan.id)}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:text-rose-300"
                        title="Delete from My Yatra"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Summary of items */}
                  <div className="space-y-2 text-xs">
                    {plan.items?.slice(0, 4).map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60">
                        <span className="text-slate-300 font-medium">Day {item.day_number}: {item.title}</span>
                        <span className="text-slate-400 font-mono">{item.time_slot}</span>
                      </div>
                    ))}
                    {plan.items?.length > 4 && (
                      <p className="text-[11px] text-slate-500 pt-1">+ {plan.items.length - 4} more activities</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl glass-panel border border-slate-800 text-center space-y-4">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-white">No Saved Plans Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You haven&apos;t saved any pilgrimage itineraries yet. Launch the Yatra Planner to generate a custom itinerary.
              </p>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-shakti-600 hover:bg-shakti-500 shadow-md transition-all"
              >
                <span>Launch Yatra Planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Spiritual Reflections & Notes Column */}
        <div className="lg:col-span-4 rounded-3xl glass-panel-gold p-6 sm:p-8 border border-amber-500/30 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
            <StickyNote className="w-5 h-5 text-amber-400" />
            <span>Yatra Sankalpa & Notes</span>
          </div>
          <p className="text-xs text-slate-300">
            Write down your sacred intentions (Sankalpa), family prayers, packing reminders, or spiritual reflections for your visit to Vindhyachal.
          </p>

          <textarea
            rows={8}
            value={personalNotes}
            onChange={(e) => setPersonalNotes(e.target.value)}
            placeholder="e.g. Sankalpa for family peace, coconut and red chunari offerings at Maa Vindhyavasini, book morning ropeway tickets for parents..."
            className="w-full bg-slate-900/90 text-white placeholder-slate-500 p-4 rounded-2xl text-xs border border-slate-700 focus:outline-hidden focus:border-amber-500 transition-all leading-relaxed"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-emerald-400">
              {noteSaved ? '✓ Notes Saved Locally' : ''}
            </span>
            <button
              onClick={handleSaveNotes}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 transition-all shadow-md"
            >
              Save Reflections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
