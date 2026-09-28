import React from 'react';
import { User, Heart, Zap, Sparkles, Shield, Compass, Coffee, MapPin, Clock } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function AboutSection() {
  const pillars = [
    {
      icon: Zap,
      title: "Sub-50ms Performance",
      desc: "Zero bloated runtimes. Virtualized lists, code-split bundles, and hardware-accelerated transforms.",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      icon: Shield,
      title: "Radical Accessibility",
      desc: "WCAG 2.2 AAA compliance is not an afterthought. Keyboard traps tested, ARIA live regions, and high contrast.",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      icon: Sparkles,
      title: "Design Token Purity",
      desc: "Direct synchronization between Figma Variables and CSS Custom Properties. One source of truth.",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      icon: Heart,
      title: "Micro-Joy & Polish",
      desc: "Tactile spring physics, subtle audio synthesis, and fluid cursor momentum that make software feel alive.",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
    }
  ];

  return (
    <section id="about" className="py-24 px-4 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400">
            <User size={13} />
            <span>Behind the Code</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Engineering with a <span className="shimmer-text">Designer's Soul</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            I don't just build components—I craft emotional connections between humans and digital software.
          </p>
        </div>

        {/* Narrative & Info Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Bio Narrative (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                My journey started in graphic design and typography before falling deeply in love with the immediate feedback loop of the browser. That dual heritage means I refuse to accept compromises: <strong className="text-white">a design should never be diluted during implementation</strong>, and <strong className="text-white">a codebase should never sacrifice performance for aesthetic flair</strong>.
              </p>
              <p>
                Over the past 5+ years, I've collaborated with fast-growing venture-backed startups and established tech enterprises to launch mission-critical dashboards, multi-brand design systems, and award-winning creative campaigns.
              </p>
              <p className="text-xs sm:text-sm text-slate-400">
                When I'm not inspecting DOM trees or refining Figma bezier curves, you'll find me exploring modular audio synthesizers, analog photography, and contributing to open-source UI libraries.
              </p>
            </div>

            {/* Quick Metadata Ribbons */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <MapPin size={16} className="text-cyan-400 shrink-0" />
                <span>San Francisco & Global</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Clock size={16} className="text-purple-400 shrink-0" />
                <span>PST / UTC-8 (Flexible)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Coffee size={16} className="text-amber-400 shrink-0" />
                <span>Fueled by Aeropress</span>
              </div>
            </div>
          </div>

          {/* Right: 4 Core Pillars Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="glass-card p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl border ${pillar.color}`}>
                      <Icon size={16} />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
