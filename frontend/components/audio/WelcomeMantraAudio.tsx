'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles, Play, Pause } from 'lucide-react';

export const WelcomeMantraAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Check if audio has already played in this session
    const alreadyPlayed = sessionStorage.getItem('shakti_welcome_audio_played');
    if (alreadyPlayed === 'true') {
      setHasPlayedOnce(true);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6; // pleasant, gentle volume

    const playOnce = async () => {
      if (sessionStorage.getItem('shakti_welcome_audio_played') === 'true') return;
      try {
        await audio.play();
        setIsPlaying(true);
        sessionStorage.setItem('shakti_welcome_audio_played', 'true');
        setHasPlayedOnce(true);
      } catch (err) {
        // Browser autoplay blocked until user interaction
        const handleFirstInteraction = async () => {
          if (sessionStorage.getItem('shakti_welcome_audio_played') === 'true') return;
          try {
            await audio.play();
            setIsPlaying(true);
            sessionStorage.setItem('shakti_welcome_audio_played', 'true');
            setHasPlayedOnce(true);
          } catch (e) {
            // ignore
          } finally {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('scroll', handleFirstInteraction);
          }
        };

        window.addEventListener('click', handleFirstInteraction, { once: true });
        window.addEventListener('keydown', handleFirstInteraction, { once: true });
        window.addEventListener('scroll', handleFirstInteraction, { once: true });
      }
    };

    playOnce();

    // Auto stop when ended
    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/welcome_chant.mpeg"
        preload="auto"
      />

      {/* Subtle Floating Spiritual Audio Indicator */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full text-xs font-medium backdrop-blur-xl border transition-all duration-300 shadow-xl ${
            isPlaying
              ? 'bg-amber-950/85 text-amber-200 border-amber-400/60 shadow-amber-500/20'
              : 'bg-slate-900/80 text-slate-400 border-slate-700/60 hover:text-slate-200'
          }`}
          title={isPlaying ? "Pause Sacred Chant" : "Play Sacred Welcome Chant"}
          aria-label="Toggle Spiritual Welcome Audio"
        >
          {isPlaying ? (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="font-serif text-[13px] text-amber-100 hidden sm:inline">
                Sacred Chant Playing
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span className="font-serif text-[13px] hidden sm:inline">
                Divine Welcome Audio
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
};
