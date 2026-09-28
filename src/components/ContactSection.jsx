import React, { useState } from 'react';
import { Send, Mail, Copy, Check, Sparkles, MessageSquare, ArrowUpRight, Clock, ShieldCheck, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FigmaIcon, DribbbleIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { playClickSound, playPopSound, playSuccessSound } from '../utils/sound';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Web Application',
    budget: '$5k - $15k',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [sending, setSending] = useState(false);

  const projectTypes = [
    'Web Application',
    'Design System',
    'UI/UX Redesign',
    'Creative & 3D',
    'Full-Time Role'
  ];

  const budgetRanges = [
    '<$5k',
    '$5k - $15k',
    '$15k - $30k',
    '$30k+',
    'Full-Time Salary'
  ];

  const handleCopyEmail = () => {
    playPopSound();
    navigator.clipboard.writeText(personalInfo.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      playClickSound(300);
      return;
    }

    setSending(true);
    playClickSound(750);

    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      playSuccessSound();

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#c084fc', '#34d399']
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 relative border-t border-white/5">
      {/* Ambient background lighting */}
      <div 
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-purple-600/15 to-pink-600/10 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400">
            <Send size={13} />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
            Let's Build Something <span className="shimmer-text">Remarkable</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Have an ambitious project, a design system in need of revival, or a full-time senior engineering role? I'd love to hear from you.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Quick Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Direct Inbox</h3>
                    <p className="text-xs text-slate-400">Typical response under 24 hrs</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 flex items-center gap-1.5 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 font-mono text-xs sm:text-sm text-cyan-300 select-all">
                {personalInfo.socials.email}
              </div>
            </div>

            {/* Availability & Commitment Card */}
            <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Working Principles</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Clear communication & weekly async video demos</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>Strict NDA and IP ownership compliance</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Comprehensive documentation & Storybook handoff</span>
                </li>
              </ul>
            </div>

            {/* Social Links Ribbon */}
            <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/10">
              <h3 className="text-sm font-bold text-white">Find Me Across the Web</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound(650)}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon size={14} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span>GitHub</span>
                  </span>
                  <ArrowUpRight size={13} className="text-slate-500" />
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound(650)}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon size={14} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span>LinkedIn</span>
                  </span>
                  <ArrowUpRight size={13} className="text-slate-500" />
                </a>
                <a
                  href={personalInfo.socials.figma}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound(650)}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <FigmaIcon size={14} className="text-slate-400 group-hover:text-purple-400 transition-colors" />
                    <span>Figma</span>
                  </span>
                  <ArrowUpRight size={13} className="text-slate-500" />
                </a>
                <a
                  href={personalInfo.socials.dribbble}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound(650)}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <DribbbleIcon size={14} className="text-slate-400 group-hover:text-pink-400 transition-colors" />
                    <span>Dribbble</span>
                  </span>
                  <ArrowUpRight size={13} className="text-slate-500" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong className="text-cyan-400">{formState.name}</strong>. Your inquiry has been safely received. I will review your project details and get back to you within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      playClickSound(650);
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        projectType: 'Web Application',
                        budget: '$5k - $15k',
                        message: ''
                      });
                    }}
                    type="button"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-heading text-white">
                    Send a Message
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fill out the brief below and I'll get back to you with timelines and availability.
                  </p>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {/* Project Category Pills */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">What are you building?</label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          playClickSound(700);
                          setFormState({ ...formState, projectType: type });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          formState.projectType === type
                            ? 'bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-500/30'
                            : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">Estimated Budget Range</label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          playClickSound(700);
                          setFormState({ ...formState, budget: b });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          formState.budget === b
                            ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                            : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Project Details & Goals *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your product, timelines, and where you'd like my help..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:shadow-xl hover:shadow-cyan-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {sending ? (
                    <span>Encrypting & Sending...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
