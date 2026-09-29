'use client';

import React, { useState, useEffect } from 'react';
import { Accessibility, User, Users, HeartHandshake, Baby, Footprints, ChevronDown } from 'lucide-react';

export type AccessibilityMode = 'Normal' | 'Senior' | 'Wheelchair' | 'Family' | 'Solo';

interface ModeOption {
  id: AccessibilityMode;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

const MODES: ModeOption[] = [
  { id: 'Normal', label: 'Standard Pilgrim', desc: 'Standard walking & itineraries', icon: <User className="w-4 h-4 text-slate-300" /> },
  { id: 'Senior', label: 'Senior Citizen', desc: 'Minimal walking, ropeways, rest points', icon: <Footprints className="w-4 h-4 text-amber-400" /> },
  { id: 'Wheelchair', label: 'Wheelchair / Special Need', desc: 'Ramps, elevators, ground access', icon: <HeartHandshake className="w-4 h-4 text-emerald-400" /> },
  { id: 'Family', label: 'Family with Children', desc: 'Kid-friendly, food breaks, safety', icon: <Baby className="w-4 h-4 text-sky-400" /> },
  { id: 'Solo', label: 'Solo Seeker', desc: 'Meditation, early aartis, quiet ghats', icon: <Accessibility className="w-4 h-4 text-purple-400" /> },
];

export const AccessibilityToggle: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AccessibilityMode>('Normal');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('shakti_accessibility_mode') as AccessibilityMode;
    if (saved && MODES.some(m => m.id === saved)) {
      setCurrentMode(saved);
    }
  }, []);

  const handleSelect = (mode: AccessibilityMode) => {
    setCurrentMode(mode);
    localStorage.setItem('shakti_accessibility_mode', mode);
    window.dispatchEvent(new CustomEvent('accessibilityModeChanged', { detail: mode }));
    setIsOpen(false);
  };

  const activeOption = MODES.find(m => m.id === currentMode) || MODES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 transition-all shadow-sm"
        aria-label="Toggle Accessibility Mode"
      >
        <span className="flex items-center gap-1.5">
          {activeOption.icon}
          <span className="hidden sm:inline font-medium">{activeOption.label}</span>
        </span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 p-2 rounded-2xl glass-panel shadow-2xl border border-slate-700 z-50 animate-in fade-in zoom-in-95">
            <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800/80 mb-1">
              Accessibility Mode
            </div>
            <div className="space-y-1">
              {MODES.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full flex items-start gap-3 p-2 rounded-xl text-left transition-all ${
                    currentMode === option.id
                      ? 'bg-shakti-600/20 border border-shakti-500/40 text-shakti-300'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5">{option.icon}</div>
                  <div>
                    <div className="text-xs font-semibold">{option.label}</div>
                    <div className="text-[10px] text-slate-400">{option.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
