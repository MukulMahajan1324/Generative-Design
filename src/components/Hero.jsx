import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Copy, Check, ExternalLink, Code2, Palette, Zap, Layers, Eye } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playClickSound, playPopSound } from '../utils/sound';
import CraftInteractiveBackground from './CraftInteractiveBackground';

export default function Hero({ onOpenResume, onOpenCraftReplica }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [bgMode, setBgMode] = useState('craft'); // 'craft' or 'ambient'

  // Rotating roles with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    playPopSound();
    navigator.clipboard.writeText(personalInfo.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden"
    >
      {/* Dynamic Background: Either itsCraft Interactive Botanical WebGL or Ambient Glow */}
      {bgMode === 'craft' ? (
        <div className="absolute inset-0 pointer-events-auto -z-20">
          <CraftInteractiveBackground />
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] pointer-events-none" />
        </div>
      ) : (
        <>
          {/* Ambient background light gradients */}
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/15 to-purple-600/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-ambient-glow"
          />
          <div 
            className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10"
          />
          <div 
            className="absolute top-20 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[110px] pointer-events-none -z-10"
          />
        </>
      )}

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10"
      />

      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-10 pointer-events-none">
        
        {/* Left Column: Headlines & Call to Action */}
        <div className="flex-1 text-center lg:text-left space-y-6 pointer-events-auto">
          
          {/* Top Status & itsCraft Replica Launcher Row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill border border-emerald-500/30 text-emerald-300 text-xs font-mono shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.status}</span>
            </div>

            {/* Background Style Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  playClickSound(750);
                  setBgMode('craft');
                }}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  bgMode === 'craft'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Exact itsCraft.com botanical background"
              >
                🌿 itsCraft BG
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound(650);
                  setBgMode('ambient');
                }}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  bgMode === 'ambient'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Ambient glassmorphism glow"
              >
                ✨ Ambient
              </button>
            </div>

            {/* 1:1 itsCraft Replica Fullscreen View Button */}
            <button
              onClick={() => {
                playClickSound(850);
                onOpenCraftReplica();
              }}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-mono transition-all shadow-sm"
              title="Open full-screen 1:1 replica of itscraft.com homepage"
            >
              <Eye size={13} />
              <span>Full 1:1 itsCraft Preview</span>
            </button>
          </div>

          {/* Main Title & Changing Role */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading leading-[1.08]">
              Hi, I'm <span className="shimmer-text">{personalInfo.name}</span>
            </h1>

            <div className="flex items-center justify-center lg:justify-start gap-3 h-12 sm:h-14">
              <span className="text-xl sm:text-3xl text-slate-400 font-light">
                Passionate
              </span>
              <span 
                key={roleIndex}
                className="text-xl sm:text-3xl font-bold font-heading shimmer-accent inline-block animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {personalInfo.roles[roleIndex]}
              </span>
            </div>
          </div>

          {/* Bio / Value Proposition */}
          <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-300 leading-relaxed">
            {personalInfo.bio}
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <a
              href="#projects"
              onClick={() => playClickSound(700)}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
            >
              <span>Explore Featured Work</span>
              <ArrowDown size={16} />
            </a>

            <a
              href="#playground"
              onClick={() => playClickSound(800)}
              className="px-5 py-3.5 rounded-xl font-medium text-sm text-slate-200 glass-card hover:border-cyan-500/40 hover:text-white flex items-center gap-2"
            >
              <Sparkles size={16} className="text-cyan-400" />
              <span>Interactive UI Lab</span>
            </a>

            <button
              onClick={handleCopyEmail}
              type="button"
              className="px-4 py-3.5 rounded-xl font-medium text-xs font-mono text-slate-300 glass-pill hover:bg-white/10 hover:text-cyan-300 transition-colors flex items-center gap-2"
              title="Click to copy email address"
            >
              {copiedEmail ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>{personalInfo.socials.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center">
                {personalInfo.yearsExperience}
                <span className="text-cyan-400 text-lg ml-0.5">+</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">Years Experience</div>
            </div>

            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center">
                {personalInfo.projectsCompleted}
                <span className="text-purple-400 text-lg ml-0.5">+</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">Shipped Projects</div>
            </div>

            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center">
                {personalInfo.lighthouseScore}
                <span className="text-emerald-400 text-lg ml-0.5">/100</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">Lighthouse Score</div>
            </div>

            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center">
                {personalInfo.satisfactionRate}
              </div>
              <div className="text-xs text-slate-400 font-mono">Client Delight</div>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Interactive Glassmorphism Bento Card */}
        <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center">
          <div 
            className="relative w-full max-w-md p-6 rounded-3xl glass-panel border border-white/15 shadow-2xl transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${-mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg)`,
            }}
          >
            {/* Top Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">designer_developer_spec.tsx</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                v4.0.0
              </span>
            </div>

            {/* Interactive Preview Body */}
            <div className="py-5 space-y-4">
              
              {/* Figma to Code Card */}
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Palette size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Figma Token Studio</div>
                    <div className="text-[11px] text-slate-400">Mathematical token hierarchy</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-medium">100% Synced</span>
              </div>

              {/* React 19 Engine Card */}
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">React 19 & Tailwind v4</div>
                    <div className="text-[11px] text-slate-400">Zero-runtime CSS & Strict TS</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 font-medium">60 FPS</span>
              </div>

              {/* Accessibility & Polish Card */}
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">WCAG AAA Compliance</div>
                    <div className="text-[11px] text-slate-400">Keyboard traps, screen-reader first</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-purple-400 font-medium">Audited</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Layers size={14} className="text-cyan-400" />
                <span>Modern Web Stack</span>
              </span>
              <span className="text-slate-500">San Francisco, CA</span>
            </div>

            {/* Glowing Accent Corner Indicator */}
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-purple-600/30 rounded-full blur-xl pointer-events-none -z-10" />
          </div>
        </div>

      </div>
    </section>
  );
}
