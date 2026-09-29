'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Sparkles,
  Footprints,
  Baby,
  Clock,
  CheckCircle2,
  Bookmark,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { generateItinerary, Itinerary } from '@/lib/api';

export default function PlanYatraPage() {
  const [destination, setDestination] = useState('Vindhyachal');
  const [durationDays, setDurationDays] = useState(2);
  const [travellersCount, setTravellersCount] = useState(4);
  const [hasElderly, setHasElderly] = useState(true);
  const [hasChildren, setHasChildren] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState('Senior');
  const [budgetLevel, setBudgetLevel] = useState('Standard');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSavedSuccess(false);

    try {
      const result = await generateItinerary({
        destination,
        duration_days: durationDays,
        travellers_count: travellersCount,
        has_elderly: hasElderly,
        has_children: hasChildren,
        accessibility_mode: accessibilityMode,
        budget_level: budgetLevel,
      });
      setItinerary(result);
    } catch (err) {
      console.error("Failed to generate itinerary", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToMyYatra = () => {
    if (!itinerary) return;
    const existing = JSON.parse(localStorage.getItem('shakti_saved_itineraries') || '[]');
    existing.unshift({
      ...itinerary,
      id: Date.now(),
      saved_at: new Date().toISOString()
    });
    localStorage.setItem('shakti_saved_itineraries', JSON.stringify(existing));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Title with larger readable typography */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30">
          <Calendar className="w-4 h-4" />
          <span>Smart Pilgrimage Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Plan My Sacred Yatra
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Create an optimized, accessibility-adapted day-by-day pilgrimage itinerary synchronized with official Aarti and ropeway hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-7 sm:p-9 border border-slate-800 shadow-2xl card-3d">
          <form onSubmit={handleGenerate} className="space-y-6">
            <h3 className="font-serif font-bold text-2xl text-white flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-shakti-400" />
              <span>Yatra Configuration</span>
            </h3>

            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200">Pilgrimage Destination</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-900 text-white text-base px-4 py-3.5 rounded-2xl border border-slate-700 focus:outline-hidden focus:border-amber-500"
              >
                <option value="Vindhyachal">Vindhyachal Dham (Active Siddhpeeth)</option>
                <option value="Vaishno Devi" disabled>Vaishno Devi (Upcoming Orbit)</option>
                <option value="Kamakhya" disabled>Maa Kamakhya (Upcoming Orbit)</option>
              </select>
            </div>

            {/* Duration & Travellers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-200">Duration (Days)</label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full bg-slate-900 text-white text-base px-4 py-3.5 rounded-2xl border border-slate-700 focus:outline-hidden focus:border-amber-500"
                >
                  <option value={1}>1 Day (Express Yatra)</option>
                  <option value={2}>2 Days (Full Trikona)</option>
                  <option value={3}>3 Days (Sanctum + Nature)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-200">Pilgrim Count</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={travellersCount}
                  onChange={(e) => setTravellersCount(Number(e.target.value))}
                  className="w-full bg-slate-900 text-white text-base px-4 py-3.5 rounded-2xl border border-slate-700 focus:outline-hidden focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            {/* Accessibility & Group Profiles */}
            <div className="space-y-4 pt-3 border-t border-slate-800">
              <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider">
                Group Composition & Accessibility
              </span>

              <div className="grid grid-cols-2 gap-3.5">
                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={hasElderly}
                    onChange={(e) => setHasElderly(e.target.checked)}
                    className="w-4 h-4 rounded text-shakti-600 focus:ring-0"
                  />
                  <span className="text-sm text-slate-200 font-medium flex items-center gap-1.5">
                    <Footprints className="w-4 h-4 text-amber-400" />
                    Elderly Parents
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={hasChildren}
                    onChange={(e) => setHasChildren(e.target.checked)}
                    className="w-4 h-4 rounded text-shakti-600 focus:ring-0"
                  />
                  <span className="text-sm text-slate-200 font-medium flex items-center gap-1.5">
                    <Baby className="w-4 h-4 text-sky-400" />
                    Children
                  </span>
                </label>
              </div>

              {/* Mode Select */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-200">Pacing Profile</label>
                <select
                  value={accessibilityMode}
                  onChange={(e) => setAccessibilityMode(e.target.value)}
                  className="w-full bg-slate-900 text-white text-base px-4 py-3.5 rounded-2xl border border-slate-700 focus:outline-hidden focus:border-amber-500"
                >
                  <option value="Senior">Senior / Low Walking (Ropeway & Ramps)</option>
                  <option value="Wheelchair">Wheelchair Priority (Ground level & Elevators)</option>
                  <option value="Family">Family Friendly (Balanced rest & meals)</option>
                  <option value="Normal">Standard Pilgrimage Walking</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-200">Budget Tier</label>
                <select
                  value={budgetLevel}
                  onChange={(e) => setBudgetLevel(e.target.value)}
                  className="w-full bg-slate-900 text-white text-base px-4 py-3.5 rounded-2xl border border-slate-700 focus:outline-hidden focus:border-amber-500"
                >
                  <option value="Budget">Budget (Dharamshalas & Sattvik Bhojanalayas)</option>
                  <option value="Standard">Standard (UPSTDC Hotels & AC Transport)</option>
                  <option value="Premium">Premium (3-star City Stay & Private Taxis)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-serif font-bold text-base text-white bg-gradient-to-r from-shakti-600 to-amber-600 hover:from-shakti-500 hover:to-amber-500 disabled:opacity-50 transition-all shadow-xl"
            >
              {loading ? "Generating Smart Itinerary..." : "Generate Structured Itinerary"}
            </button>
          </form>
        </div>

        {/* Itinerary Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {itinerary ? (
            <div className="rounded-3xl glass-panel-gold p-7 sm:p-9 border border-amber-500/35 shadow-2xl space-y-7 card-3d">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      AI Generated & Verified
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-slate-300 font-semibold">
                      {itinerary.duration_days} Day(s) • {itinerary.travellers_count} Pilgrim(s)
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-2">
                    {itinerary.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">{itinerary.notes}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleSaveToMyYatra}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold bg-shakti-600 hover:bg-shakti-500 text-white flex items-center gap-2 transition-all shadow-md"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Save to My Yatra</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
                    title="Print Itinerary"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {savedSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Itinerary saved to your &ldquo;My Yatra&rdquo; dashboard successfully!</span>
                </div>
              )}

              {/* Day-by-Day Timeline with readable medium font */}
              <div className="space-y-8">
                {Array.from({ length: itinerary.duration_days }).map((_, dayIdx) => {
                  const dayNumber = dayIdx + 1;
                  const dayItems = itinerary.items.filter((i) => i.day_number === dayNumber);

                  return (
                    <div key={dayNumber} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 rounded-xl font-serif font-bold text-sm bg-gradient-to-r from-shakti-700 to-amber-600 text-white">
                          DAY {dayNumber}
                        </span>
                        <div className="h-px flex-1 bg-slate-800" />
                      </div>

                      <div className="space-y-4 pl-3 sm:pl-5 border-l-2 border-slate-800">
                        {dayItems.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="card-3d p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 relative"
                          >
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                              <span className="font-mono text-amber-300 font-bold flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {item.time_slot}
                              </span>
                              <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                                {item.activity_type}
                              </span>
                            </div>

                            <h4 className="font-serif font-bold text-lg text-white">
                              {item.title}
                            </h4>

                            <p className="text-sm text-slate-300 leading-relaxed font-normal">
                              {item.description}
                            </p>

                            {item.accessibility_tip && (
                              <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-xs sm:text-sm text-emerald-300 flex items-center gap-2">
                                <Footprints className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>{item.accessibility_tip}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Verified Attribution Note */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Synchronized with official Vindhyachal Temple darshan hours
                </span>
                <span className="font-semibold text-white">
                  Estimated Budget: ₹{itinerary.budget?.toLocaleString() || '6,000'}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl glass-panel p-14 border border-slate-800 text-center space-y-4 card-3d">
              <div className="w-16 h-16 rounded-2xl bg-shakti-950/80 border border-shakti-500/30 flex items-center justify-center mx-auto text-amber-400">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-white">Ready to Plan Your Journey</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Configure your party size, duration, and accessibility needs on the left and click <strong>Generate Structured Itinerary</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
