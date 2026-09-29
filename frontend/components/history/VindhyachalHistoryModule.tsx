'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Mountain,
  Sun,
  Crown,
  Heart,
  Scroll,
  Shield,
  CheckCircle2,
  Compass,
  ArrowRight,
  Flame
} from 'lucide-react';
import Link from 'next/link';

interface HistoryTab {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const VindhyachalHistoryModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('utpatti-devi');

  const tabs: HistoryTab[] = [
    {
      id: 'utpatti-devi',
      label: 'Maa Utpatti',
      subtitle: 'Cosmic Emergence & Siddhpeeth',
      icon: Sparkles
    },
    {
      id: 'utpatti-parvat',
      label: 'Vindhya Parvat',
      subtitle: 'Sage Agastya & The Bowed Peak',
      icon: Mountain
    },
    {
      id: 'ramayana',
      label: 'Ramayana Era',
      subtitle: 'Shri Ram, Sita Kund & Ramgaya',
      icon: Sun
    },
    {
      id: 'krishna-gita',
      label: 'Shri Krishna & Gita',
      subtitle: 'Devi Yogamaya & Kansa Defeat',
      icon: Crown
    },
    {
      id: 'dharmic-shraddha',
      label: 'Dharmic & Shraddha',
      subtitle: 'Trikona Yatra & Uttarvahini Ganga',
      icon: Scroll
    }
  ];

  return (
    <section id="history-vindhyachal" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Sacred Chronicles & Intellectual Wisdom</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
          History of Vindhyachal & Complete Divinity of Maa Vindhyavasini
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Explore the eternal origins, Puranic chronicles, scriptural citations from the Ramayana, Mahabharata, and Gita, and the intellectual philosophy behind India&apos;s foremost living Siddhpeeth.
        </p>
      </div>

      {/* 3D INTERACTIVE NAVIGATION TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between border ${
                isActive
                  ? 'bg-gradient-to-br from-amber-500/25 via-shakti-950/70 to-slate-900 border-amber-400 text-white shadow-xl shadow-amber-500/20 scale-102 ring-1 ring-amber-400/50'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2 rounded-xl ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <div>
                <div className="font-serif font-bold text-base sm:text-lg text-white">
                  {tab.label}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 line-clamp-1 mt-0.5">
                  {tab.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANEL WITH 3D GLASS STYLING */}
      <div className="rounded-3xl glass-panel-gold p-6 sm:p-10 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ===================== TAB 1: MAA UTAPATTI ===================== */}
        {activeTab === 'utpatti-devi' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider font-serif">
                Cosmic Manifestation • Markandeya Purana
              </span>
              <span className="text-xs sm:text-sm text-slate-400">
                Durga Saptashati (Chapter 11, Verse 41-42)
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-center space-y-3">
              <div className="text-lg sm:text-2xl font-serif text-amber-200 font-semibold tracking-wide">
                &ldquo;नन्दगोपगृहे जाता यशोदागर्भसंभवा ।<br className="hidden sm:block" />
                ततस्तौ नाशयिष्यामि विन्ध्याचलनिवासिनी ॥&rdquo;
              </div>
              <p className="text-sm sm:text-base text-amber-300/90 font-serif italic max-w-3xl mx-auto">
                &ldquo;Born in the household of cowherd Nanda from the womb of Yashoda, I shall then abide in the Vindhya mountains and annihilate the tormentors of creation.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-base sm:text-lg text-slate-200 leading-relaxed">
                <h3 className="font-serif font-bold text-2xl text-white">
                  Why Vindhyachal is a Jagrit Siddhpeeth, Not Merely a Shaktipeeth
                </h3>
                <p>
                  In the Sanatan theological tradition, 51 Shaktipeeths came into existence where relics and limbs of Mata Sati fell across Bharatvarsha after Lord Shiva&apos;s grief-stricken Tandava.
                </p>
                <p>
                  However, <strong className="text-amber-300">Vindhyachal is fundamentally distinguished as an Anadi Siddhpeeth</strong> (Beginningless Seat of Realization). Here, the Divine Mother did not fall as a mortal relic; rather, <strong className="text-white">Adi Shakti Mahalakshmi chose to establish Her perpetual conscious presence (Nitya Swaroopa) voluntarily</strong>.
                </p>
                <p>
                  As recorded in the *Devi Mahatmya* (Durga Saptashati), after vanquishing Mahishasura and the demon monarchs Shumbha and Nishumbha, the Goddess proclaimed that She would establish Her throne in the sacred Vindhyas to hear the prayers of Her children and immediately bestow both spiritual liberation (*Moksha*) and worldly nourishment (*Bhoga*).
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2 card-3d">
                  <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span>The Unbroken Living Presence (Nitya Sannidhi)</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Sadhakas, yogis, and emperors from King Suratha to Adi Shankaracharya traveled to Vindhyachal for intense Tapasya, knowing that here the Mother is dynamically active and accessible.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2 card-3d">
                  <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span>Mahalakshmi Svaroop</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Maa Vindhyavasini manifests the golden, auspicious Rajasic energy of Mahalakshmi. She presides over the central sanctum, seated upon Her celestial lion, casting grace upon all four varnas and pilgrims without distinction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: VINDHYA PARVAT UTAPATTI ===================== */}
        {activeTab === 'utpatti-parvat' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider font-serif">
                Puranic Legend • Mahabharata (Vana Parva) & Padma Purana
              </span>
              <span className="text-xs sm:text-sm text-slate-400">
                Sage Agastya & The Humble Mountain
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-base sm:text-lg text-slate-200 leading-relaxed">
                <h3 className="font-serif font-bold text-2xl text-white">
                  The Cosmic Humbling of Mount Vindhya
                </h3>
                <p>
                  Geologically, the Vindhya Range is one of the oldest geological structures on Earth, belonging to the Precambrian era, vastly predating the young Himalayas.
                </p>
                <p>
                  According to ancient Puranic chronicles in the *Mahabharata* and *Padma Purana*, Mount Vindhya felt aggrieved that Mount Meru received the continuous circumambulation of the celestial Sun and Moon. Fueled by pride, Vindhya began elevating its stony peaks ever higher into the heavens.
                </p>
                <p>
                  Its towering granite peaks reached so high that they blocked the solar chariot, throwing the world into unending darkness and paralyzing the sacred Vedic yajnas of the rishis.
                </p>
                <p>
                  In desperation, Indra and the Devas prayed to the venerable Brahmarshi <strong className="text-amber-300">Agastya Muni</strong>, the only sage revered enough to command the mighty mountain.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-4 shadow-xl">
                <div className="flex items-center gap-3 text-amber-300 font-serif font-bold text-xl">
                  <Mountain className="w-6 h-6 text-amber-400" />
                  <span>The Eternal Command of Sage Agastya</span>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  As Sage Agastya and his consort Lopamudra journeyed southwards toward the Deccan, Mount Vindhya recognized his Guru and threw itself flat upon the earth in prostration.
                </p>
                <blockquote className="p-4 rounded-xl bg-amber-950/40 border-l-4 border-amber-400 text-sm sm:text-base text-amber-200 font-serif italic">
                  &ldquo;O king of mountains, remain thus bowed and low until I return back to the North.&rdquo;
                </blockquote>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Sage Agastya permanently took up residence in the South (Agastya Kootam) and never returned northwards. True to its vow, Vindhya Parvat has remained perpetually bowed down in sublime humility, shedding its pride.
                </p>
                <div className="pt-2 text-xs sm:text-sm text-amber-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Because Vindhya bowed in total surrender, Adi Shakti chose its heights as Her eternal seat!</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: RAMAYANA CONNECTION ===================== */}
        {activeTab === 'ramayana' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider font-serif">
                Treta Yuga • Valmiki Ramayana & Adhyatma Ramayana
              </span>
              <span className="text-xs sm:text-sm text-slate-400">
                14-Year Vanvas of Prabhu Shri Ram, Mata Sita & Lakshmana
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sita Kund */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 card-3d space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                  01
                </div>
                <h4 className="font-serif font-bold text-xl text-white">
                  The Manifestation of Sita Kund
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  While resting in the dense Vindhya forest during exile, Mata Janaki experienced acute thirst amidst the stone plateaus. Prabhu Shri Ram looked to Lakshmana, who notched a celestial arrow and pierced the mountain bedrock, releasing a crystalline, medicinal freshwater spring that flows to this day as <strong className="text-amber-300">Sita Kund</strong>.
                </p>
              </div>

              {/* Ramgaya Ghat */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 card-3d space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                  02
                </div>
                <h4 className="font-serif font-bold text-xl text-white">
                  Ramgaya Ghat & Dasharatha Shraddha
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Upon receiving word of King Dasharatha&apos;s departure, Prabhu Shri Ram chose the sacred <strong className="text-amber-300">Uttarvahini Ganga at Ramgaya Ghat</strong> in Vindhyachal to perform Pitru Tarpan and Shraddha. The spiritual sanctity of Ramgaya Ghat is revered on par with Gaya in Bihar for ancestral salvation.
                </p>
              </div>

              {/* Rameshwar Mahadev */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 card-3d space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                  03
                </div>
                <h4 className="font-serif font-bold text-xl text-white">
                  Rameshwar Mahadev Consecration
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Before continuing their journey towards Chitrakoot and Dandakaranya, Prabhu Shri Ram personally consecrated a holy Shiva Lingam right on the banks of Ramgaya Ghat, naming it <strong className="text-amber-300">Rameshwar Mahadev</strong>, invoking Lord Shiva&apos;s blessings for the righteous victory over evil.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center gap-4 text-slate-200 text-sm sm:text-base">
              <Sun className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                Pilgrims undertaking the Vindhyachal Yatra continue the millennia-old tradition of taking holy dip at Ramgaya Ghat and offering prayers at Rameshwar Mahadev to receive the joint blessings of Lord Rama and Mother Vindhyavasini.
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 4: SHRI KRISHNA & GITA ===================== */}
        {activeTab === 'krishna-gita' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider font-serif">
                Dvapara Yuga • Srimad Bhagavatam (Canto 10) & Bhagavad Gita
              </span>
              <span className="text-xs sm:text-sm text-slate-400">
                Devi Yogamaya & The Prophecy to Kansa
              </span>
            </div>

            {/* Gita Quote Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-950/50 border border-amber-500/40 text-center space-y-3">
              <div className="text-xl sm:text-2xl font-serif text-amber-200 font-semibold">
                &ldquo;दैवी ह्येषा गुणमयी मम माया दुरत्यया ।<br className="hidden sm:block" />
                मामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते ॥&rdquo;
              </div>
              <p className="text-sm sm:text-base text-amber-300/90 font-serif italic max-w-3xl mx-auto">
                &ldquo;This divine Maya (Yogamaya) of Mine, composed of the three modes of material nature, is insurmountable. Only those who surrender completely unto Me cross beyond it.&rdquo; — Bhagavad Gita (7.14)
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-base sm:text-lg text-slate-200 leading-relaxed">
                <h3 className="font-serif font-bold text-2xl text-white">
                  The Simultaneous Incarnation of Krishna and Yogamaya
                </h3>
                <p>
                  On the midnight of Bhadrapada Krishna Ashtami, while Bhagwan Shri Krishna took birth to Devaki in the fortified dungeon of Mathura, <strong className="text-amber-300">Devi Yogamaya manifested at the very same second in Gokul from the womb of Yashoda</strong>.
                </p>
                <p>
                  Vasudeva carried Krishna across the raging Yamuna to Gokul and swapped the infants. When Kansa arrived at dawn to murder the eighth child of Devaki, he grabbed the infant girl by the ankles and swung her toward a granite stone.
                </p>
                <p>
                  In a flash of cosmic light, the baby slipped from his hands, rose majestically into the heavens, and revealed Her <strong className="text-white">eight-armed cosmic form (Ashtabhuja)</strong> holding conch, chakra, mace, bow, and trident.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-4 shadow-xl">
                <div className="flex items-center gap-3 text-amber-300 font-serif font-bold text-xl">
                  <Crown className="w-6 h-6 text-amber-400" />
                  <span>The Celestial Roar to Tyrant Kansa</span>
                </div>
                <blockquote className="p-4 rounded-xl bg-amber-950/40 border-l-4 border-amber-400 text-sm sm:text-base text-amber-200 font-serif italic">
                  &ldquo;किं मया हतया मन्द जातः खलु तवान्तकृत् ।<br />
                  यत्र क्व वा पूर्वशत्रुर्मा हिंस्याः कृपणान् वृथा ॥&rdquo;
                </blockquote>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  &ldquo;Foolish Kansa! What wilt thou gain by slaying Me? He who shall vanquish thy arrogance is already thriving in safety! Do not waste thy fury upon the helpless!&rdquo;
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Having spoken these celestial words, Yogamaya descended upon the peaks of Vindhyachal, consecrating <strong className="text-amber-300">Ashtabhuja Devi Temple</strong> and <strong className="text-amber-300">Maa Vindhyavasini Sanctum</strong> as Her eternal earthly abodes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: DHARMIC & SHRADDHA ===================== */}
        {activeTab === 'dharmic-shraddha' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider font-serif">
                Intellectual Philosophy • The Triguna Trikona & Ancestral Moksha
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 card-3d space-y-3">
                <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20">
                  Rajas Guna
                </div>
                <h4 className="font-serif font-bold text-xl text-white">
                  Maa Vindhyavasini
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Represents <strong className="text-amber-300">Mahalakshmi</strong>. Presides over the cycle of creation, righteous prosperity (Artha), family welfare, and maternal protection.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-rose-500/30 card-3d space-y-3">
                <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-rose-300 bg-rose-500/20">
                  Tamas Guna
                </div>
                <h4 className="font-serif font-bold text-xl text-white">
                  Maa Kali Khoh
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Represents <strong className="text-rose-300">Mahakali</strong>. Situated in a natural rocky ravine. Destroys ignorance, demonic fears, internal impurities, and malefic astrological afflictions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 card-3d space-y-3">
                <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/20">
                  Sattva Guna
                </div>
                <h4 className="font-serif font-bold text-xl text-white">
                  Maa Ashtabhuja
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Represents <strong className="text-cyan-300">Mahasaraswati</strong>. Situated upon the serene hilltop. Bestows discernment (Viveka), scriptural wisdom, artistic skill, and spiritual liberation (Moksha).
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-4">
              <h4 className="font-serif font-bold text-xl text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>The Rare Miracle of Uttarvahini Ganga & Shraddha Tarpana</span>
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                At Vindhyachal, the sacred River Ganga abandons her usual eastward flow to the ocean and turns directly <strong className="text-white">Northward (Uttarvahini)</strong> toward Mount Kailash and Kashi. In Vedic geomancy, Uttarvahini Ganga creates a sacred vortex where negative karmic debt is dissolved.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                For millennia, performing <strong className="text-amber-300">Shraddha, Pind Daan, and Til Tarpana</strong> on the ghats of Vindhyachal during Pitru Paksha or holy days is believed to liberate seven generations of ancestors directly into the abode of Vaikuntha.
              </p>
            </div>
          </div>
        )}

        {/* BOTTOM ACTION BAR */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Scriptural texts cross-verified by Shakti Yatra Heritage Council</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/destinations/vindhyachal"
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold transition-colors"
            >
              <span>Explore Complete Vindhyachal Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
