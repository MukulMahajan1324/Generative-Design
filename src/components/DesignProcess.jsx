import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, Sparkles, Workflow } from 'lucide-react';
import { designProcessSteps } from '../data/portfolioData';
import { playClickSound } from '../utils/sound';

export default function DesignProcess() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = designProcessSteps[activeStepIndex];

  const handleStepClick = (index) => {
    playClickSound(650 + index * 50);
    setActiveStepIndex(index);
  };

  return (
    <section id="process" className="py-24 px-4 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400">
            <Workflow size={13} />
            <span>Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            From Whiteboard to <span className="shimmer-text">60 FPS Production</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A disciplined, iterative framework combining rigorous user research, systematic design tokens, and robust frontend engineering.
          </p>
        </div>

        {/* 4-Step Interactive Navigation Pipeline */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {designProcessSteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                onClick={() => handleStepClick(idx)}
                type="button"
                className={`p-5 rounded-3xl text-left transition-all duration-300 border flex flex-col justify-between space-y-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isActive
                    ? 'glass-panel border-cyan-500/50 shadow-xl shadow-cyan-950/40 scale-[1.02]'
                    : 'bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-2xl font-black font-mono ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {step.step}
                  </span>
                  {isActive && (
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </div>

                <div>
                  <h3 className={`text-sm sm:text-base font-bold font-heading ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded Active Step Detail Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>Phase {activeStep.step}</span>
                <span>•</span>
                <span>{activeStep.subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                {activeStep.title}
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 self-start md:self-auto">
              <Sparkles size={14} />
              <span>Tested & Validated Standard</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-bold">
                Philosophy & Execution
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Right Deliverables (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950/60 border border-white/5 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Key Artifacts & Deliverables
              </h4>
              <ul className="space-y-2.5">
                {activeStep.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
