import React from 'react';
import { ArrowUp, Sparkles, Heart, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { playClickSound, playPopSound } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    playClickSound(850);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfetti = () => {
    playPopSound();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#818cf8', '#c084fc', '#f59e0b']
    });
  };

  return (
    <footer className="py-12 px-4 border-t border-white/5 relative bg-slate-950/80">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
        
        {/* Left: Branding & Stack */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-bold text-slate-200">
            © {new Date().getFullYear()} {personalInfo.name}
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-slate-400">
            Crafted with React 19 & Tailwind CSS v4
          </span>
        </div>

        {/* Center: Easter Egg Confetti Button */}
        <button
          onClick={handleConfetti}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-cyan-400 hover:text-cyan-300 transition-all active:scale-95 cursor-pointer shadow-sm"
          title="Click for a burst of confetti"
        >
          <Sparkles size={13} />
          <span>Launch Joy</span>
        </button>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl glass-card hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all duration-200 active:scale-95"
          aria-label="Scroll back to top of page"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} className="text-cyan-400" />
        </button>

      </div>
    </footer>
  );
}
