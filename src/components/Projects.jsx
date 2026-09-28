import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Sparkles, Filter, Layers, Code2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';
import { playClickSound, playPopSound } from '../utils/sound';

export default function Projects({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Web Applications', 'Design Systems', 'Creative & 3D', 'Mobile UI'];

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  const handleFilterClick = (cat) => {
    playClickSound(650);
    setActiveCategory(cat);
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400">
              <Layers size={13} />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
              Crafted with <span className="shimmer-text">Precision</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Each project represents a deliberate intersection of human-centered UI/UX design, accessible components, and production-grade frontend architecture.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 font-semibold scale-105'
                    : 'glass-pill text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isWide = project.featured && index === 0;

            return (
              <div
                key={project.id}
                className={`group relative rounded-3xl glass-card p-6 flex flex-col justify-between overflow-hidden border border-white/10 transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-950/40 ${
                  isWide ? 'md:col-span-2' : ''
                }`}
              >
                {/* Subtle Card Ambient Glow */}
                <div 
                  className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${project.thumbnailGradient} rounded-full blur-3xl opacity-40 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none -z-10`}
                />

                <div className="space-y-4">
                  {/* Category Pill & Metrics */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-500/30">
                        <Sparkles size={11} />
                        Featured Flagship
                      </span>
                    )}
                  </div>

                  {/* Project Titles */}
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Overview Text */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {project.overview}
                  </p>

                  {/* Impact Metric Pill */}
                  <div className="p-3 rounded-2xl bg-slate-950/50 border border-white/5 text-xs font-mono text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="truncate">{project.metrics}</span>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-lg text-[11px] font-mono text-slate-300 bg-white/5 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      playClickSound(800);
                      onSelectProject(project);
                    }}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight size={14} />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playClickSound(650)}
                      className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 transition-colors"
                      title="View GitHub Repository"
                      aria-label={`View ${project.title} source code`}
                    >
                      <GithubIcon size={16} />
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playClickSound(750)}
                      className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/10 border border-white/5 transition-colors"
                      title="Live Interactive Demo"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
