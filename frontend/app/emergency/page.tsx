'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  PhoneCall,
  ShieldAlert,
  Share2,
  ShieldCheck,
  AlertTriangle,
  Search,
  MapPin,
  Copy,
  Check,
  Navigation,
  HeartPulse,
  Shield,
  Ambulance,
  Sparkles,
  ExternalLink,
  Compass
} from 'lucide-react';
import { fetchEmergencyContacts, EmergencyContact, FALLBACK_EMERGENCY_CONTACTS } from '@/lib/api';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { useLanguage } from '@/context/LanguageContext';

export default function EmergencyPage() {
  const { language, t } = useLanguage();
  const [contacts, setContacts] = useState<EmergencyContact[]>(FALLBACK_EMERGENCY_CONTACTS);
  const [loading, setLoading] = useState(true);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const list = await fetchEmergencyContacts('vindhyachal');
        if (list && list.length > 0) {
          setContacts(list);
        }
      } catch (e) {
        console.error("Error loading emergency contacts", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus(
        language === 'hi'
          ? "आपके ब्राउज़र में जियोलोकेशन समर्थित नहीं है।"
          : "Geolocation is not supported by your browser."
      );
      return;
    }
    setLocationStatus(
      language === 'hi' ? "आपके निर्देशांक खोजे जा रहे हैं..." : "Locating your GPS coordinates..."
    );
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
        if (navigator.share) {
          navigator.share({
            title: language === 'hi' ? "आपातकालीन: विंध्याचल में श्रद्धालु की लाइव लोकेशन" : "Emergency: Pilgrim Location in Vindhyachal",
            text: language === 'hi'
              ? `मुझे विंध्याचल धाम के निकट सहायता की आवश्यकता है। वर्तमान GPS निर्देशांक: ${lat}, ${lng}`
              : `I am requesting assistance near Vindhyachal. Current coordinates: ${lat}, ${lng}`,
            url: mapUrl,
          }).catch(() => {});
        }
        setLocationStatus(
          language === 'hi'
            ? `वर्तमान GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}`
            : `Current GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}`
        );
      },
      () => {
        setLocationStatus(
          language === 'hi'
            ? "लोकेशन की अनुमति नहीं मिली। कृपया सीधे 112 पर कॉल करें।"
            : "Location permission denied. Please dial 112 directly."
        );
      }
    );
  };

  const copyToClipboard = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => {
      setCopiedNumber(null);
    }, 2000);
  };

  const categories = useMemo(() => [
    { id: 'all', label: t('emergency_filter_all') },
    { id: 'police', label: t('emergency_filter_police') },
    { id: 'hospital', label: t('emergency_filter_hospital') },
    { id: 'ambulance', label: t('emergency_filter_ambulance') },
    { id: 'women', label: t('emergency_filter_women') },
    { id: 'temple', label: t('emergency_filter_temple') },
    { id: 'tourism', label: t('emergency_filter_tourism') },
    { id: 'disaster', label: t('emergency_filter_disaster') },
  ], [t]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      // Category match
      let matchCategory = true;
      if (activeCategory === 'police') {
        matchCategory = c.category.toLowerCase().includes('police');
      } else if (activeCategory === 'hospital') {
        matchCategory = c.category.toLowerCase().includes('hospital');
      } else if (activeCategory === 'ambulance') {
        matchCategory = c.category.toLowerCase().includes('ambulance');
      } else if (activeCategory === 'women') {
        matchCategory = c.category.toLowerCase().includes('women');
      } else if (activeCategory === 'temple') {
        matchCategory = c.category.toLowerCase().includes('temple');
      } else if (activeCategory === 'tourism') {
        matchCategory = c.category.toLowerCase().includes('tourism');
      } else if (activeCategory === 'disaster') {
        matchCategory = c.category.toLowerCase().includes('disaster') || c.category.toLowerCase().includes('fire');
      }

      // Search match
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        c.service_name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.phone_number.toLowerCase().includes(q) ||
        (c.alternate_phone && c.alternate_phone.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [contacts, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/25 shadow-sm">
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span>{t('emergency_badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          {t('emergency_title')}
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          {t('emergency_desc')}
        </p>
      </div>

      {/* Instant SOS Speed Dialers Bar */}
      <div className="card-3d rounded-3xl glass-panel-gold p-6 sm:p-8 border border-rose-500/35 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-rose-400 font-bold text-base sm:text-lg">
              <AlertTriangle className="w-5 h-5 text-rose-400 animate-bounce" />
              <span>{t('emergency_immediate_help')}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
              {t('emergency_immediate_sub')}
            </p>
            {locationStatus && (
              <p className="text-xs sm:text-sm font-mono text-emerald-300 bg-slate-900/90 px-3.5 py-1.5 rounded-xl inline-block border border-emerald-500/30 mt-2">
                {locationStatus}
              </p>
            )}
          </div>

          <button
            onClick={handleShareLocation}
            className="px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 shadow-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>{t('emergency_share_btn')}</span>
          </button>
        </div>

        {/* 1-Tap Speed Dial Action Buttons */}
        <div className="border-t border-rose-500/20 pt-5">
          <p className="text-xs uppercase font-mono tracking-widest text-amber-300/80 mb-3 font-semibold">
            {t('emergency_speed_dial_title')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <a
              href="tel:112"
              className="p-3.5 rounded-2xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-center flex flex-col items-center justify-center gap-1.5 transition-all shadow-md group hover:border-rose-400"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-300 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 text-rose-400" />
              </div>
              <span className="font-bold text-white text-sm">UP Police</span>
              <span className="font-mono text-rose-300 text-xs font-bold bg-rose-500/20 px-2 py-0.5 rounded-full">112</span>
            </a>

            <a
              href="tel:108"
              className="p-3.5 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-center flex flex-col items-center justify-center gap-1.5 transition-all shadow-md group hover:border-emerald-400"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                <Ambulance className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-bold text-white text-sm">{language === 'hi' ? 'एम्बुलेंस' : 'Ambulance'}</span>
              <span className="font-mono text-emerald-300 text-xs font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full">108</span>
            </a>

            <a
              href="tel:1090"
              className="p-3.5 rounded-2xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-center flex flex-col items-center justify-center gap-1.5 transition-all shadow-md group hover:border-purple-400"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-5 h-5 text-purple-400" />
              </div>
              <span className="font-bold text-white text-sm">{language === 'hi' ? 'महिला शक्ति' : 'Women Line'}</span>
              <span className="font-mono text-purple-300 text-xs font-bold bg-purple-500/20 px-2 py-0.5 rounded-full">1090</span>
            </a>

            <a
              href="tel:18001805145"
              className="p-3.5 rounded-2xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 text-center flex flex-col items-center justify-center gap-1.5 transition-all shadow-md group hover:border-amber-400"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-bold text-white text-sm">UP Tourism</span>
              <span className="font-mono text-amber-300 text-xs font-bold bg-amber-500/20 px-2 py-0.5 rounded-full">1800-180-5145</span>
            </a>

            <a
              href="tel:05442232222"
              className="p-3.5 rounded-2xl bg-sky-950/60 hover:bg-sky-900/80 border border-sky-500/40 text-center flex flex-col items-center justify-center gap-1.5 transition-all shadow-md group hover:border-sky-400 col-span-2 sm:col-span-1"
            >
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-300 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-sky-400" />
              </div>
              <span className="font-bold text-white text-sm">{language === 'hi' ? 'मंदिर कंट्रोल' : 'Temple Desk'}</span>
              <span className="font-mono text-sky-300 text-xs font-bold bg-sky-500/20 px-2 py-0.5 rounded-full">05442-232222</span>
            </a>
          </div>
        </div>
      </div>

      {/* FEATURED: Nearest Police Station & Nearest Hospital Spotlight */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-white">
            {t('emergency_featured_nearest')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NEAREST POLICE STATION */}
          <div className="card-3d p-6 sm:p-7 rounded-3xl glass-panel-gold border border-rose-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {t('nearest_police_badge')}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t('emergency_open_24x7')}
                </span>
              </div>

              <h3 className="font-serif font-bold text-2xl text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-rose-400 shrink-0" />
                <span>{language === 'hi' ? 'कोतवाली विंध्याचल (थाना)' : 'Vindhyachal Police Station (Kotwali)'}</span>
              </h3>

              <p className="text-sm text-slate-200 leading-relaxed">
                {language === 'hi'
                  ? 'स्टेशन रोड, बीडीएल रेलवे हाल्ट के पास, विंध्याचल। माँ विंध्यवासिनी मंदिर से मात्र 800 मीटर की दूरी पर स्थित। 24x7 पीआरवी गश्ती व सहायता।'
                  : 'Station Road, Near BDL Railway Halt, Vindhyachal. Situated just 800 meters from Maa Vindhyavasini Mandir. 24x7 PRV patrolling and pilgrim security.'}
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-amber-300 bg-slate-900/60 p-2.5 rounded-xl border border-amber-500/20">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span><strong>{t('emergency_dist_label')}</strong> 800m • ~3 min drive / 8 min walk</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="tel:05442232225"
                  className="py-3 px-4 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-500 flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t('emergency_call_now')} 05442-232225</span>
                </a>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Vindhyachal+Police+Station+Mirzapur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>{t('emergency_get_directions')}</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1 px-1">
                <span>{t('emergency_alt')} <a href="tel:+919454403849" className="text-amber-300 font-mono font-bold hover:underline">+91-9454403849</a></span>
                <button
                  onClick={() => copyToClipboard('05442-232225')}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedNumber === '05442-232225' ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> {t('emergency_copied')}
                    </span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('emergency_copy_num')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* NEAREST HOSPITAL */}
          <div className="card-3d p-6 sm:p-7 rounded-3xl glass-panel-gold border border-emerald-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {t('nearest_hospital_badge')}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t('emergency_open_24x7')}
                </span>
              </div>

              <h3 className="font-serif font-bold text-2xl text-white flex items-center gap-2">
                <HeartPulse className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>{language === 'hi' ? 'सामुदायिक स्वास्थ्य केंद्र (CHC) विंध्याचल' : 'Community Health Centre (CHC) Vindhyachal'}</span>
              </h3>

              <p className="text-sm text-slate-200 leading-relaxed">
                {language === 'hi'
                  ? 'मुख्य स्टेशन रोड, विंध्याचल। मंदिर से मात्र 900 मीटर। 24x7 आपातकालीन ट्रॉमा यूनिट, ड्यूटी पर तैनात चिकित्सक, प्राथमिक उपचार एवं निशुल्क जीवनरक्षक औषधियां।'
                  : 'Main Station Road, Vindhyachal. 900m from temple. 24x7 Emergency trauma unit, medical officer on duty, dressing, oxygen and emergency pharmacy.'}
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-slate-900/60 p-2.5 rounded-xl border border-emerald-500/20">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>{t('emergency_dist_label')}</strong> 900m • ~4 min drive / 10 min walk</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="tel:05442252345"
                  className="py-3 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t('emergency_call_now')} 05442-252345</span>
                </a>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=CHC+Vindhyachal+Hospital+Mirzapur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-400 flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>{t('emergency_get_directions')}</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1 px-1">
                <span>{t('emergency_alt')} <a href="tel:+919415201234" className="text-emerald-300 font-mono font-bold hover:underline">+91-9415201234</a></span>
                <button
                  onClick={() => copyToClipboard('05442-252345')}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedNumber === '05442-252345' ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> {t('emergency_copied')}
                    </span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('emergency_copy_num')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH BAR */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('emergency_search_placeholder')}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 text-sm shadow-inner transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs sm:text-sm font-mono text-slate-400 text-right self-end md:self-center">
            {filteredContacts.length} {language === 'hi' ? 'सत्यापित संपर्क उपलब्ध' : 'verified contacts available'}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-lg border border-rose-400'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Emergency Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-16 text-base text-slate-400">
            Loading verified emergency registry...
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="col-span-full text-center py-16 p-8 rounded-3xl glass-panel border border-slate-800 text-slate-300 space-y-2">
            <p className="font-semibold text-lg">{t('emergency_no_records')}</p>
            <p className="text-sm text-slate-400">
              {language === 'hi' ? 'कृपया अन्य श्रेणी चुनें या खोज शब्द बदलें।' : 'Please try another filter category or clear search text.'}
            </p>
          </div>
        ) : (
          filteredContacts.map((c) => {
            const isCopied = copiedNumber === c.phone_number;
            const isHospital = c.category.toLowerCase().includes('hospital');
            const isPolice = c.category.toLowerCase().includes('police');
            const isWomen = c.category.toLowerCase().includes('women');
            const isTourism = c.category.toLowerCase().includes('tourism');
            const isTemple = c.category.toLowerCase().includes('temple');

            const borderColor = isHospital
              ? 'hover:border-emerald-500/50'
              : isPolice
              ? 'hover:border-rose-500/50'
              : isWomen
              ? 'hover:border-purple-500/50'
              : isTourism
              ? 'hover:border-amber-500/50'
              : 'hover:border-sky-500/50';

            const badgeBg = isHospital
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : isPolice
              ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
              : isWomen
              ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
              : isTourism
              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
              : 'bg-sky-500/15 text-sky-300 border-sky-500/30';

            return (
              <div
                key={c.id}
                className={`card-3d p-6 rounded-3xl glass-panel border border-slate-800 ${borderColor} transition-all flex flex-col justify-between space-y-4 shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className={`px-2.5 py-1 rounded-full font-mono text-xs font-bold border ${badgeBg} uppercase`}>
                      {c.category}
                    </span>
                    <VerificationBadge
                      sourceName={c.source_name || "UP Police"}
                      verified={c.verified}
                      date={c.last_verified_at}
                      compact
                    />
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white leading-snug">
                    {c.service_name}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {c.address}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${c.phone_number}`}
                      className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-rose-500 flex items-center justify-center gap-2 transition-all shadow-md group"
                    >
                      <PhoneCall className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                      <span>{t('emergency_call_now')} {c.phone_number}</span>
                    </a>

                    <button
                      onClick={() => copyToClipboard(c.phone_number)}
                      title={t('emergency_copy_num')}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white transition-all cursor-pointer"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {c.alternate_phone && (
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span>{t('emergency_alt')} <a href={`tel:${c.alternate_phone}`} className="text-slate-200 font-semibold hover:underline">{c.alternate_phone}</a></span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.service_name + ' ' + c.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-300 hover:underline"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>Map</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Safety Guidelines */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 space-y-3.5 text-sm sm:text-base text-slate-300 leading-relaxed card-3d">
        <h4 className="font-serif font-bold text-lg sm:text-xl text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>{t('emergency_safety_title')}</span>
        </h4>
        <p>
          {t('emergency_safety_text')}
        </p>
      </div>
    </div>
  );
}
