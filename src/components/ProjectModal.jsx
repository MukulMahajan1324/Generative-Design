import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, TrendingUp, Sparkles, FileText } from 'lucide-react';
import { GithubIcon } from './Icons';
import { playClickSound, playPopSound } from '../utils/sound';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        playPopSound();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playPopSound();
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-white/15 rounded-3xl shadow-2xl overflow-y-auto flex flex-col p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200"
      >
        {/* Top Header & Close Button */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Case Study Spec
              </span>
            </div>
            <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {project.title}
            </h3>
            <p className="text-sm text-slate-300">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Close case study modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tech Tags and Links Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 bg-white/5 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => playClickSound(700)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-white/10 flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon size={14} />
              <span>Source</span>
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => playClickSound(800)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-[1.02] flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Live Demo</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Case Study Deep Dive Content */}
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          
          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <span>The Challenge</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {project.caseStudy.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>The Solution</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>

          {/* UX & Design Process */}
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Layers size={14} />
              <span>UX Research & Design Architecture</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {project.caseStudy.designProcess.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Architecture Highlights */}
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Cpu size={14} />
              <span>Technical & Performance Engineering</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {project.caseStudy.techHighlights.map((tech, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Sparkles size={16} className="text-purple-400 shrink-0 mt-0.5" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Measurable Results */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-500/20 space-y-2">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <TrendingUp size={14} />
              <span>Business Impact & Results</span>
            </h4>
            <p className="text-sm font-medium text-white">
              {project.caseStudy.results}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            type="button"
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
}
