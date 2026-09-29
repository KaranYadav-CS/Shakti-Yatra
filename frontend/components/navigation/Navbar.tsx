'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Search,
  Menu,
  X,
  Flame,
  ArrowRight,
  Camera,
  Code
} from 'lucide-react';
import { AccessibilityToggle } from '../common/AccessibilityToggle';
import { searchPilgrimage, SearchResult } from '@/lib/api';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchPilgrimage(searchQuery);
        setSearchResults(results);
      } catch (e) {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/destinations/vindhyachal', label: 'Vindhyachal Dham' },
    { href: '/#maa-vindhyavasini-photos', label: 'Maa Photos', icon: true },
    { href: '/explore', label: 'Explore Shrines' },
    { href: '/plan', label: 'Plan Yatra' },
    { href: '/map', label: 'Pilgrim Map' },
    { href: '/emergency', label: 'Emergency', badge: '112/108' },
    { href: '/my-yatra', label: 'My Yatra' },
  ];

  return (
    <>
      {/* TOP DEVELOPER ACCREDITATION BAR */}
      <div className="w-full bg-gradient-to-r from-slate-950 via-shakti-950/80 to-slate-950 border-b border-amber-500/25 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2 text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-serif">Shakti Yatra • Smart Pilgrimage Assistance Platform</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-400/40">
              Developed by Karan Yadav
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-2xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-shakti-700 via-shakti-600 to-amber-500 flex items-center justify-center shadow-lg shadow-shakti-950/60 border border-amber-400/40 group-hover:scale-108 transition-all">
              <Flame className="w-6 h-6 text-amber-100 group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-xl sm:text-2xl text-white tracking-wider">
                  SHAKTI YATRA
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <p className="text-xs text-amber-200/80 uppercase tracking-widest font-semibold">
                Discover • Plan • Experience
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS - LARGER READABLE TYPOGRAPHY */}
          <nav className="hidden xl:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-shakti-600/30 text-shakti-300 border border-shakti-500/40 shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  {link.icon && <Camera className="w-4 h-4 text-amber-400" />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/25 text-rose-300 border border-rose-500/40">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Working Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-2xl text-sm bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-all shadow-md"
              aria-label="Search Temples and Facilities"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="hidden lg:inline text-slate-300 text-sm">Search temples, stay...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-xs bg-slate-800 text-slate-400 rounded-md border border-slate-700">
                /
              </kbd>
            </button>

            {/* Accessibility Selector */}
            <AccessibilityToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-800/80 bg-slate-950/98 backdrop-blur-2xl px-5 py-6 space-y-3 animate-in slide-in-from-top-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-serif font-bold text-center">
              Developed by Karan Yadav
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-2xl text-base font-semibold ${
                  pathname === link.href
                    ? 'bg-shakti-600/30 text-shakti-300 border border-shakti-500/40'
                    : 'text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.icon && <Camera className="w-4 h-4 text-amber-400" />}
                  {link.label}
                </span>
                {link.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/25 text-rose-300 border border-rose-500/40">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-2xl rounded-3xl glass-panel shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col max-h-[75vh]">
            <div className="p-5 border-b border-slate-800 flex items-center gap-3 bg-slate-900/80">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Vindhyachal, temples, Ganga ghats, hotels, medical..."
                className="flex-1 bg-transparent text-white placeholder-slate-400 text-base focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-md bg-slate-800"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {isSearching ? (
                <div className="py-10 text-center text-sm text-slate-400">
                  Searching verified pilgrimage records...
                </div>
              ) : searchQuery && searchResults.length === 0 ? (
                <div className="py-12 text-center space-y-1">
                  <p className="text-base font-semibold text-slate-200">No verified places found matching &ldquo;{searchQuery}&rdquo;</p>
                  <p className="text-sm text-slate-400">Try &ldquo;Vindhyachal&rdquo;, &ldquo;Kali Khoh&rdquo;, &ldquo;Ghat&rdquo;, &ldquo;Ropeway&rdquo;, or &ldquo;Hospital&rdquo;</p>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={item.url}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-shakti-950/80 border border-shakti-500/30 flex items-center justify-center shrink-0">
                        <Compass className="w-5 h-5 text-shakti-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {item.category || item.type}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400">{item.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))
              ) : (
                <div className="py-6 px-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Popular Pilgrimage Searches
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {['Vindhyachal', 'Maa Vindhyavasini', 'Kali Khoh', 'Vindhyachal Ropeway', 'Pakka Ghat', 'Annapurna Bhojanalaya', 'Emergency Police 112'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
