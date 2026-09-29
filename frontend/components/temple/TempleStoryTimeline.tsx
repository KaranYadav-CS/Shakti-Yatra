'use client';

import React, { useState } from 'react';
import { Sparkles, BookOpen, Clock, HeartHandshake, Mountain, Landmark } from 'lucide-react';

interface StoryStep {
  id: string;
  stage: string;
  title: string;
  period: string;
  description: string;
  theologicalContext: string;
  image: string;
  icon: React.ReactNode;
}

const STORY_STEPS: StoryStep[] = [
  {
    id: 'origin',
    stage: 'Phase I',
    title: 'Cosmic Descent & The Eternal Promise',
    period: 'Satyayuga / Markandeya Purana',
    description:
      'According to the Durga Saptashati, when demonic forces threatened cosmic balance, Adi Shakti promised the Devas that she would permanently reside in the majestic Vindhya mountains to bestow unending protection and liberation upon humanity.',
    theologicalContext:
      'Unlike other Shakti Peethas where severed limbs of Goddess Sati descended, Vindhyachal is a self-manifested Siddhpeeth where the Supreme Goddess chose her voluntary eternal abode.',
    image: 'https://images.unsplash.com/photo-1626014303757-65644775be62?auto=format&fit=crop&w=1200&q=80',
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
  },
  {
    id: 'history',
    stage: 'Phase II',
    title: 'The Prophecy of Gokul & Kansa',
    period: 'Dvapara Yuga',
    description:
      'When Lord Krishna manifested in the prison of Mathura, the divine Yogamaya was born to Yashoda in Gokul. When tyrant Kansa attempted to harm the newborn, she slipped through his hands into the celestial skies, warning him that his slayer flourished elsewhere, before making her sanctuary in Vindhyachal.',
    theologicalContext:
      'Devotees recognize Maa Vindhyavasini as this divine infant incarnation who illuminates the world and crushes evil intent.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    icon: <BookOpen className="w-5 h-5 text-shakti-400" />,
  },
  {
    id: 'significance',
    stage: 'Phase III',
    title: 'The Sacred Trikona Yatra Geometry',
    period: 'Ancient Traditions',
    description:
      'Pilgrims walk the sanctified holy triangle spanning 3 distinct sanctums: Maa Vindhyavasini (Mahalakshmi), Kali Khoh (Mahakali cave), and Maa Ashtabhuja (Mahasaraswati on the hill). Completing all three vertices harmonizes material well-being, spiritual fortitude, and divine wisdom.',
    theologicalContext:
      'Walking or circumambulating this 3-point geometry is celebrated as fulfilling every righteous worldly and spiritual aspiration.',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    icon: <Mountain className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 'festivals',
    stage: 'Phase IV',
    title: 'Centuries of Navratri & Kajali Mahotsav',
    period: 'Living Living Heritage',
    description:
      'During Chaitra and Sharad Navratri, millions of devotees converge on the Ganga ghats for holy snan. The air resonates with conch horns, evening bells, and the timeless folk melodies of Mirzapuri Kajali celebrating Maa Vindhyavasini.',
    theologicalContext:
      'The sacred night vigil (Jagran) and Aarti offerings are unbroken devotional traditions celebrated for over a millennium.',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    icon: <Clock className="w-5 h-5 text-rose-400" />,
  },
  {
    id: 'modern',
    stage: 'Phase V',
    title: 'Vindhya Dham Corridor & Modern Pilgrimage',
    period: '2024 - 2026 (Present Day)',
    description:
      'The transformation of Vindhyachal into a world-class spiritual pilgrimage corridor: 50-feet wide sandstone parikrama avenues, aerial passenger ropeways, dedicated ramps for elderly and wheelchair pilgrims, and digital verified assistance.',
    theologicalContext:
      'Preserving ancient sanctity while ensuring dignified, comfortable access for every senior citizen, child, and devotee.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    icon: <Landmark className="w-5 h-5 text-sky-400" />,
  },
];

export const TempleStoryTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          The Chronicles of Divine Sanctum
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Why Vindhyachal? The Sacred Odyssey
        </h2>
        <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
          Traverse through cosmic origin, puranic narratives, the sacred geometry of the Trikona Yatra, and today&apos;s grand Vindhya Corridor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline Navigation Column */}
        <div className="lg:col-span-5 space-y-4">
          {STORY_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex items-start gap-4 ${
                  isActive
                    ? 'bg-gradient-to-r from-shakti-950/80 to-slate-900 border-shakti-500/60 shadow-xl shadow-shakti-950/40 translate-x-2'
                    : 'bg-slate-900/40 hover:bg-slate-900/80 border-slate-800/80 text-slate-400'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                    isActive
                      ? 'bg-shakti-600/30 border-shakti-500 text-amber-300 shadow-md'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-shakti-400">{step.stage}</span>
                    <span className="font-mono text-slate-500">{step.period}</span>
                  </div>
                  <h4 className={`font-serif font-bold text-base ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cinematic Step Showcase Column */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl glass-panel-gold p-6 sm:p-8 border border-amber-500/30 shadow-2xl overflow-hidden relative">
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 bg-slate-900">
              <img
                src={STORY_STEPS[activeStep].image}
                alt={STORY_STEPS[activeStep].title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/40">
                  {STORY_STEPS[activeStep].period}
                </span>
                <span className="text-xs text-slate-300 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                  Step {activeStep + 1} of {STORY_STEPS.length}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-shakti-400">
                {STORY_STEPS[activeStep].stage}
              </span>
              <h3 className="font-serif font-bold text-2xl text-white">
                {STORY_STEPS[activeStep].title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {STORY_STEPS[activeStep].description}
              </p>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25">
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Scriptural & Spiritual Insight
                </h5>
                <p className="text-xs text-amber-100/90 leading-relaxed italic">
                  &ldquo;{STORY_STEPS[activeStep].theologicalContext}&rdquo;
                </p>
              </div>
            </div>

            {/* Quick Next/Prev controls */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Previous Chapter
              </button>
              <button
                disabled={activeStep === STORY_STEPS.length - 1}
                onClick={() => setActiveStep(prev => prev + 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-shakti-600 hover:bg-shakti-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
              >
                Next Chapter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
