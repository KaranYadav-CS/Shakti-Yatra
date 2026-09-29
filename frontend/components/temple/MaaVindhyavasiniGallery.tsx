'use client';

import React, { useState } from 'react';
import { Sparkles, Maximize2, X, Eye, Heart, Camera } from 'lucide-react';

interface PhotoItem {
  id: number;
  src: string;
  title: string;
  caption: string;
  badge: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: 1,
    src: '/images/vindhyavasini/maa_corner.jpeg',
    title: 'Maa Vindhyavasini Mahalakshmi Swaroop',
    caption: 'The sanctified black stone deity adorned in sacred gold and crimson robes.',
    badge: 'Sanctum Sanctorum',
  },
  {
    id: 2,
    src: '/images/vindhyavasini/darshan_1.jpeg',
    title: 'Divine Morning Shringar & Flowers',
    caption: 'Holy floral adornments and chunari offerings by shrine priests during early darshan.',
    badge: 'Morning Darshan',
  },
  {
    id: 3,
    src: '/images/vindhyavasini/darshan_2.jpeg',
    title: 'Vindhya Dham Sacred Parikrama',
    caption: 'Devotees circumambulating the inner sanctum offering prayers and coconuts.',
    badge: 'Parikrama Marg',
  },
  {
    id: 4,
    src: '/images/vindhyavasini/darshan_3.jpeg',
    title: 'Ganga Snan Ghats & Holy Corridor',
    caption: 'The path connecting holy Ganga riverfront with the grand Vindhya Corridor concourse.',
    badge: 'Corridor Concourse',
  },
  {
    id: 5,
    src: '/images/vindhyavasini/darshan_4.jpeg',
    title: 'Aarti & Deepam Illumination',
    caption: 'Sacred oil lamps illuminated for Sandhya Aarti casting golden radiance.',
    badge: 'Sandhya Aarti',
  },
  {
    id: 6,
    src: '/images/vindhyavasini/darshan_5.jpeg',
    title: 'Devotee Congregation & Trikona Path',
    caption: 'Pilgrims undertaking the auspicious triangle yatra towards Kali Khoh and Ashtabhuja.',
    badge: 'Trikona Yatra',
  },
  {
    id: 7,
    src: '/images/vindhyavasini/darshan_6.jpeg',
    title: 'Holy Temple Spires & Chunar Sandstone',
    caption: 'The ornate temple architecture carved from historic pink Chunar sandstone.',
    badge: 'Sacred Architecture',
  },
];

export const MaaVindhyavasiniGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  return (
    <section id="maa-vindhyavasini-photos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30 mb-3">
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Dedicated Photo Module</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Maa Vindhyavasini Pavitra Darshan Gallery
          </h2>
          <p className="text-slate-300 mt-3 max-w-2xl text-base sm:text-lg leading-relaxed">
            Authentic, blessed glimpses of Maa Vindhyavasini Devi, sacred morning shringar, and the grand holy Dham. Hover over any photo to experience 3D depth and zoom.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono text-amber-300">
            {GALLERY_PHOTOS.length} Authentic Photographs
          </span>
        </div>
      </div>

      {/* 3D Zoom Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {GALLERY_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="card-3d group cursor-pointer rounded-3xl overflow-hidden glass-panel border border-slate-800 hover:border-amber-500/60 shadow-xl flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

              {/* Floating Tag */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/85 backdrop-blur-md text-amber-300 border border-amber-500/40">
                  {photo.badge}
                </span>
              </div>

              {/* Fullscreen icon indicator */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-xl bg-slate-950/85 text-amber-300 border border-amber-500/40">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            {/* Photo Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
              <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                {photo.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                {photo.caption}
              </p>
              <div className="pt-2 text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>Click for full view</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl glass-panel-gold p-6 border-2 border-amber-400/50 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2.5 rounded-2xl bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700 z-10 transition-colors"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 max-h-[70vh] flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[68vh] object-contain rounded-xl"
              />
            </div>

            <div className="space-y-1 text-center sm:text-left pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 border border-amber-500/40">
                {selectedPhoto.badge}
              </span>
              <h3 className="font-serif font-bold text-2xl text-white mt-1">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
