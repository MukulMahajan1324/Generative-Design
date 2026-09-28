import React, { useEffect } from 'react';
import { X, Download, Printer, Briefcase, GraduationCap, Award, ExternalLink, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playClickSound, playPopSound } from '../utils/sound';

export default function ResumeModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        playPopSound();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handlePrint = () => {
    playClickSound(800);
    window.print();
  };

  const experience = [
    {
      period: '2023 — Present',
      role: 'Staff Frontend Engineer & Design Architect',
      company: 'Lumina Cloud Technologies',
      location: 'San Francisco, CA',
      bullets: [
        'Architected Lumina Token Studio, standardizing design tokens across 12 product squads and slashing UI delivery times by 70%.',
        'Led frontend migration to React 19 and Tailwind CSS v4, achieving zero layout jank and steady 100/100 Lighthouse scores.',
        'Mentored 8 junior and mid-level developers in accessible component construction (WCAG 2.2 AAA).'
      ]
    },
    {
      period: '2021 — 2023',
      role: 'Senior Product Designer & Frontend Lead',
      company: 'SaaSify Cloud Systems',
      location: 'Remote',
      bullets: [
        'Redesigned the core telemetry analytics platform, resulting in a 32% increase in customer task completion rates.',
        'Authored and maintained high-performance data visualization canvas charts handling 100k+ data points at 60 FPS.',
        'Collaborated directly with VP of Product to align quarterly UX roadmap with business KPIs.'
      ]
    },
    {
      period: '2019 — 2021',
      role: 'UI/UX Developer',
      company: 'Apex Digital Creative',
      location: 'New York, NY',
      bullets: [
        'Built interactive WebGL and Three.js 3D marketing experiences nominated for Awwwards Site of the Day.',
        'Engineered responsive design systems and micro-interaction prototypes in Figma and React for Fortune 500 clients.'
      ]
    }
  ];

  const education = [
    {
      degree: 'B.S. in Computer Science & Human-Computer Interaction (HCI)',
      school: 'University of California, Berkeley',
      year: '2015 — 2019',
      notes: 'Dean\'s Honor List • President of Berkeley Creative Tech Guild'
    }
  ];

  const certifications = [
    'Nielsen Norman Group (NN/g) UX Master Certified',
    'WCAG 2.2 Accessibility Specialist Certification',
    'Meta Certified Senior Frontend Developer'
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playPopSound();
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-slate-900 border border-white/15 rounded-3xl shadow-2xl overflow-y-auto flex flex-col p-6 sm:p-10 space-y-8 animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-2">
              <Sparkles size={12} />
              <span>Curriculum Vitae</span>
            </div>
            <h2 id="resume-title" className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {personalInfo.name}
            </h2>
            <p className="text-sm text-slate-300">
              Staff Frontend Engineer & Lead UI/UX Systems Designer
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-white/10 flex items-center gap-1 text-xs font-semibold transition-colors"
              title="Print or Save as PDF"
            >
              <Printer size={15} />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={() => {
                playPopSound();
                onClose();
              }}
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 transition-colors"
              aria-label="Close resume modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Experience Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono uppercase tracking-wider font-bold">
            <Briefcase size={16} />
            <span>Professional Work Experience</span>
          </div>

          <div className="space-y-6">
            {experience.map((job, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">
                    {job.role}
                  </h4>
                  <span className="text-xs font-mono text-cyan-400 font-medium">
                    {job.period}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  {job.company} • {job.location}
                </div>
                <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                  {job.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-purple-400 text-sm font-mono uppercase tracking-wider font-bold">
              <GraduationCap size={16} />
              <span>Education</span>
            </div>
            {education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1 text-xs">
                <h5 className="font-bold text-white text-sm">{edu.degree}</h5>
                <div className="text-slate-400">{edu.school} ({edu.year})</div>
                <div className="text-cyan-400/90 font-mono text-[11px] pt-1">{edu.notes}</div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-mono uppercase tracking-wider font-bold">
              <Award size={16} />
              <span>Key Certifications</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2 text-xs">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-500 font-mono">
          <span>Alex Rivera Portfolio Spec</span>
          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
