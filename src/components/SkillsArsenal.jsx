import React, { useState } from 'react';
import { Code2, Palette, Wrench, CheckCircle, Sparkles, Terminal, Layers } from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { playClickSound } from '../utils/sound';

export default function SkillsArsenal() {
  const [activeTab, setActiveTab] = useState('frontend');

  const tabs = [
    { id: 'frontend', label: 'Frontend Engineering', icon: Code2, count: skillsData.frontend.length },
    { id: 'design', label: 'UI/UX & Design Systems', icon: Palette, count: skillsData.design.length },
    { id: 'tools', label: 'Tooling & Architecture', icon: Wrench, count: skillsData.tools.length },
  ];

  const currentSkills = skillsData[activeTab] || [];

  const handleTabChange = (tabId) => {
    playClickSound(700);
    setActiveTab(tabId);
  };

  return (
    <section id="skills" className="py-24 px-4 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400">
            <Sparkles size={13} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Design & Code <span className="shimmer-text">Arsenal</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A comprehensive toolbox refined over 5+ years of shipping enterprise web software, design tokens, and fluid creative experiences.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-white/10 gap-1.5 flex-wrap justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="glass-card p-6 rounded-3xl space-y-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">
                    {skill.exp}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-300 px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10">
                  {skill.level}%
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full bg-slate-900/80 rounded-full h-2 p-0.5 border border-white/5">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {/* Highlight Note */}
              <div className="pt-2 border-t border-white/5 text-xs text-slate-400 leading-relaxed flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{skill.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Design-to-Code Duality Interactive Visual */}
        <div className="mt-12 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">The Design-to-Code Synchrony</h3>
                <p className="text-xs text-slate-400">How I eliminate the handoff gap between Figma and production React</p>
              </div>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              Zero Design Debt
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Figma Design Tokens Spec */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-purple-400">
                <span className="font-semibold flex items-center gap-1.5">
                  <Palette size={14} />
                  Figma Variable Tokens
                </span>
                <span className="text-[10px] text-slate-500">tokens.json</span>
              </div>
              <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto">
{`{
  "color": {
    "primary": { "value": "#38bdf8" },
    "surface": { "value": "rgba(15,23,42,0.7)" }
  },
  "radius": { "card": "1.5rem" },
  "motion": { "spring": "cubic-bezier(0.16, 1, 0.3, 1)" }
}`}
              </pre>
            </div>

            {/* Right: React + Tailwind v4 Implementation */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-500/20 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-cyan-400">
                <span className="font-semibold flex items-center gap-1.5">
                  <Terminal size={14} />
                  Production Component
                </span>
                <span className="text-[10px] text-slate-500">Button.tsx</span>
              </div>
              <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto">
{`export function Button({ variant, children, ...props }) {
  return (
    <button 
      className="glass-card px-4 py-2 rounded-2xl font-sans 
                 transition-transform active:scale-95 text-white"
      {...props}
    >
      {children}
    </button>
  );
}`}
              </pre>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
