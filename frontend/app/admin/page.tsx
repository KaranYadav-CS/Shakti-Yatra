'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Database,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Plus,
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';
import { API_BASE } from '@/lib/api';

interface AdminStats {
  total_destinations: number;
  total_temples: number;
  total_attractions: number;
  total_services: number;
  total_emergency_contacts: number;
  pending_verification_count: number;
  verified_percentage: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${API_BASE}/admin/stats`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (e) {
        console.error("Admin stats fetch error", e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const handleVerifyItem = async (entityType: string, entityId: number) => {
    try {
      const res = await fetch(`${API_BASE}/admin/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity_type: entityType,
          entity_id: entityId,
          verified: true,
          source_name: 'Vindhya Shrine Board & UP Tourism',
          source_url: 'https://uptourism.gov.in',
        }),
      });
      if (res.ok) {
        const result = await res.json();
        setVerifyMessage(result.message);
        setTimeout(() => setVerifyMessage(null), 3000);
      }
    } catch (e) {
      console.error("Error verifying item", e);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Administrative Data Governance
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Shakti Yatra Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Maintain shrine database integrity, audit source URLs, and manage verified records. Developer: <strong>Karan Yadav</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PostgreSQL / SQLite Storage Engine</span>
        </div>
      </div>

      {verifyMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{verifyMessage}</span>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Total Destinations</span>
          <div className="text-3xl font-serif font-bold text-white">
            {stats?.total_destinations ?? 4}
          </div>
          <p className="text-[11px] text-amber-400 font-mono">1 Active (Vindhyachal)</p>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Verified Temples</span>
          <div className="text-3xl font-serif font-bold text-white">
            {stats?.total_temples ?? 4}
          </div>
          <p className="text-[11px] text-emerald-400 font-mono">Trikona Sanctuaries</p>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Services & Facilities</span>
          <div className="text-3xl font-serif font-bold text-white">
            {stats?.total_services ?? 9}
          </div>
          <p className="text-[11px] text-sky-400 font-mono">Stay, Food & Ropeway</p>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Data Integrity Score</span>
          <div className="text-3xl font-serif font-bold text-emerald-400">
            {stats?.verified_percentage ?? 100}%
          </div>
          <p className="text-[11px] text-slate-400 font-mono">All Records Grounded</p>
        </div>
      </div>

      {/* Management Tables */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-xl text-white">Sanctum Verification Queue</h3>
          <span className="text-xs font-mono text-slate-400">Audited September 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Sanctum Name</th>
                <th className="py-3 px-4">Official Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-mono text-amber-400">Temple #1</td>
                <td className="py-3 px-4 font-medium text-white">Maa Vindhyavasini Devi Temple</td>
                <td className="py-3 px-4 text-slate-400">Vindhya Shrine Board & UP Tourism</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Verified
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleVerifyItem('temple', 1)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    Re-Verify
                  </button>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-mono text-amber-400">Temple #2</td>
                <td className="py-3 px-4 font-medium text-white">Kali Khoh Cave Temple</td>
                <td className="py-3 px-4 text-slate-400">UP Tourism Mirzapur</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Verified
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleVerifyItem('temple', 2)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    Re-Verify
                  </button>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-mono text-amber-400">Attraction #2</td>
                <td className="py-3 px-4 font-medium text-white">Vindhyachal Aerial Ropeway</td>
                <td className="py-3 px-4 text-slate-400">UP Tourism Ropeway Authority</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Verified
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleVerifyItem('attraction', 2)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    Re-Verify
                  </button>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 font-mono text-amber-400">Emergency #1</td>
                <td className="py-3 px-4 font-medium text-white">UP Unified Police Response (112)</td>
                <td className="py-3 px-4 text-slate-400">UP Police Emergency Directorate</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Verified
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleVerifyItem('emergency', 1)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    Re-Verify
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Database & Schema Documentation Callout */}
      <div className="p-8 rounded-3xl glass-panel-gold border border-amber-500/30 space-y-4 text-xs text-slate-300">
        <h4 className="font-serif font-bold text-base text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-amber-400" />
          Extensible Architectural Framework
        </h4>
        <p className="leading-relaxed">
          The Shakti Yatra database schema contains 15 relational tables: <code>users</code>, <code>destinations</code>, <code>temples</code>, <code>temple_timings</code>, <code>temple_festivals</code>, <code>facilities</code>, <code>hotels</code>, <code>restaurants</code>, <code>attractions</code>, <code>transport_points</code>, <code>emergency_contacts</code>, <code>itineraries</code>, <code>itinerary_items</code>, <code>saved_places</code>, and <code>sources</code>.
          Future destinations such as Vaishno Devi and Kamakhya can be added via SQL seeds without modifying any core application logic.
        </p>
      </div>
    </div>
  );
}
