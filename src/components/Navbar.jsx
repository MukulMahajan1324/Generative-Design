import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, FileText, Send, ArrowUpRight } from 'lucide-react';
import { playClickSound, toggleSound, isSoundEnabled } from '../utils/sound';

export default function Navbar({ onOpenResume, onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
    if (nextState) {
      playClickSound(800);
    }
  };

  const navItems = [
    { label: 'Work', href: '#projects' },
    { label: 'UI/UX Lab', href: '#playground' },
    { label: 'Skills', href: '#skills' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
  ];

  const handleNavClick = (e, href) => {
    playClickSound(650);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'glass-panel shadow-2xl shadow-cyan-950/20 border-white/10'
            : 'bg-slate-900/40 backdrop-blur-md border border-white/5'
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={() => playClickSound(700)}
          className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <span className="font-heading font-extrabold text-base bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                AR
              </span>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Alex Rivera
            </span>
            <span className="text-[11px] text-slate-400 font-mono tracking-wider">
              Frontend & UI/UX
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1 rounded-xl border border-white/5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            type="button"
            title={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
            className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/5 border border-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={soundOn ? 'Mute micro-interaction audio' : 'Enable micro-interaction audio'}
          >
            {soundOn ? <Volume2 size={16} className="text-cyan-400" /> : <VolumeX size={16} />}
          </button>

          {/* Quick Resume Button */}
          <button
            onClick={() => {
              playClickSound(750);
              onOpenResume();
            }}
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-xl transition-all duration-200 hover:border-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <FileText size={14} className="text-cyan-400" />
            <span>Resume</span>
          </button>

          {/* Contact / Hire CTA */}
          <button
            onClick={() => {
              playClickSound(850);
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            type="button"
            className="relative inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Let's Talk</span>
            <Send size={12} className="opacity-90" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => {
              playClickSound(600);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            type="button"
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 p-4 rounded-2xl glass-panel border border-white/10 shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 py-2 px-3 text-xs font-medium text-center rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center gap-1.5"
            >
              <FileText size={14} className="text-cyan-400" />
              <span>Resume</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 px-3 text-xs font-semibold text-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center justify-center gap-1.5"
            >
              <span>Contact</span>
              <Send size={12} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
