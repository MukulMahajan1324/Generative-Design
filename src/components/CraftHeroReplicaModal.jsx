import React, { useEffect } from 'react';
import { X, ExternalLink, Sparkles, Maximize2 } from 'lucide-react';
import CraftInteractiveBackground from './CraftInteractiveBackground';
import { playPopSound } from '../utils/sound';

export default function CraftHeroReplicaModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        playPopSound();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Floating Controls */}
      <div className="absolute top-5 left-6 right-6 z-30 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/20 text-xs font-mono text-emerald-300 flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>itsCraft.com Exact 1:1 Background Replica</span>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-300">
            Move mouse to reveal velocity-reactive lime flora aperture
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://itscraft.com/"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white border border-white/20 flex items-center gap-1.5 backdrop-blur-md transition-colors"
          >
            <span>Original Site</span>
            <ExternalLink size={13} />
          </a>
          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            type="button"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/20 backdrop-blur-md transition-colors"
            aria-label="Close replica modal"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Full-Screen ItsCraft Hero Section */}
      <div className="relative w-full h-full overflow-hidden bg-[#19231f] select-none">
        {/* Interactive WebGL Flora Background */}
        <CraftInteractiveBackground />

        {/* Subtle Dark Vignette Tint */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* Authentic ItsCraft Editorial Typography Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-12 pointer-events-none">
          {/* Top subtle nav placeholder */}
          <div className="flex justify-between items-center text-xs font-mono tracking-widest text-[#f7f6f0]/80 uppercase pt-12 sm:pt-4">
            <div className="flex gap-6 font-bold tracking-wider">
              <span>Hire</span>
              <span>Move</span>
            </div>
            <div className="flex gap-6 hidden sm:flex">
              <span>Jobs</span>
              <span>Journal</span>
              <span>About</span>
              <span>Contact</span>
            </div>
          </div>

          {/* Center Huge Typography: "UNEARTHING WHAT'S NEXT" */}
          <div className="w-full my-auto text-[#f7f6f0] space-y-0">
            <div className="text-left font-heading font-light tracking-[-0.04em] uppercase leading-[0.82] text-[13vw] sm:text-[11vw] select-none">
              Unearthing
            </div>
            <div className="text-right font-heading font-light italic tracking-[-0.03em] uppercase leading-[0.82] text-[13vw] sm:text-[11vw] select-none pr-2">
              what's next
            </div>
          </div>

          {/* Bottom Subtitle */}
          <div className="max-w-md pb-4 text-[#f7f6f0]/90 text-sm sm:text-base font-light leading-snug">
            The global creative talent consultancy. When the right people meet the right conditions, growth is inevitable.
          </div>
        </div>

        {/* Interactive Hint Pill */}
        <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono text-emerald-300 backdrop-blur-md flex items-center gap-1.5">
            <Sparkles size={12} />
            <span>Move cursor to reveal contrasting floral layer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
