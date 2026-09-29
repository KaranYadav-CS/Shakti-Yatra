'use client';

import React from 'react';
import { Languages, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const LanguageSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (compact) {
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/30 text-xs font-semibold text-amber-300 hover:bg-slate-800 transition-colors shadow-sm"
        title={language === 'en' ? "Switch to Hindi (हिन्दी)" : "Switch to English"}
        aria-label="Switch Language"
      >
        <Languages className="w-3.5 h-3.5 text-amber-400" />
        <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
      </button>
    );
  }

  return (
    <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-inner">
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
          language === 'en'
            ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
            : 'text-slate-300 hover:text-white'
        }`}
        aria-label="Select English"
      >
        <span>English</span>
        {language === 'en' && <Check className="w-3.5 h-3.5" />}
      </button>

      <button
        onClick={() => setLanguage('hi')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
          language === 'hi'
            ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
            : 'text-slate-300 hover:text-white'
        }`}
        aria-label="Select Hindi (हिन्दी)"
      >
        <span>हिन्दी</span>
        {language === 'hi' && <Check className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
