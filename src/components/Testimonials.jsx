import React from 'react';
import { Quote, MessageSquare, Star } from 'lucide-react';
import { testimonialsData } from '../data/portfolioData';

export default function Testimonials() {
  return (
    <section className="py-24 px-4 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-purple-400">
            <MessageSquare size={13} />
            <span>Social Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            What Leaders Say About <span className="shimmer-text">Collaborating</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Real feedback from engineering directors, design leads, and product founders.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/30 to-purple-600/40 border border-white/15 flex items-center justify-center font-heading font-bold text-xs text-white">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {item.role} • <span className="text-cyan-400">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
