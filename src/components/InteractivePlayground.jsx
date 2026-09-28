import React, { useState, useRef } from 'react';
import { Sliders, Sparkles, Copy, Check, MousePointer, Bell, Volume2, ShieldCheck, RefreshCw } from 'lucide-react';
import { playClickSound, playPopSound, playSuccessSound } from '../utils/sound';

export default function InteractivePlayground() {
  // Glassmorphism state
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(65);
  const [borderAlpha, setBorderAlpha] = useState(15);
  const [tintHue, setTintHue] = useState(215); // blue-ish
  const [copiedCSS, setCopiedCSS] = useState(false);

  // Micro-interaction states
  const [toggleActive, setToggleActive] = useState(false);
  const [sliderVal, setSliderVal] = useState(72);
  const [ripples, setRipples] = useState([]);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const magneticRef = useRef(null);

  // Palette theme state
  const [activeTheme, setActiveTheme] = useState('cyan');

  const themes = [
    { id: 'cyan', name: 'Cyber Cyan', primary: '#38bdf8', secondary: '#818cf8', glow: 'rgba(56, 189, 248, 0.4)' },
    { id: 'violet', name: 'Royal Violet', primary: '#a855f7', secondary: '#ec4899', glow: 'rgba(168, 85, 247, 0.4)' },
    { id: 'emerald', name: 'Matrix Emerald', primary: '#10b981', secondary: '#06b6d4', glow: 'rgba(16, 185, 129, 0.4)' },
    { id: 'amber', name: 'Solar Amber', primary: '#f59e0b', secondary: '#ef4444', glow: 'rgba(245, 158, 11, 0.4)' },
  ];

  const currentThemeObj = themes.find((t) => t.id === activeTheme) || themes[0];

  // Copy CSS snippet
  const generatedCSS = `.glass-custom {
  background: hsla(${tintHue}, 50%, 15%, ${opacity / 100});
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border: 1px solid hsla(${tintHue}, 80%, 80%, ${borderAlpha / 100});
  border-radius: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
}`;

  const handleCopyCSS = () => {
    playPopSound();
    navigator.clipboard.writeText(generatedCSS);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  // Magnetic Button Logic
  const handleMagneticMove = (e) => {
    if (!magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;
    setMagneticOffset({ x: deltaX, y: deltaY });
  };

  const handleMagneticLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  // Ripple Button Logic
  const handleRippleClick = (e) => {
    playClickSound(700);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handleToggle = () => {
    playClickSound(toggleActive ? 450 : 850);
    setToggleActive(!toggleActive);
  };

  const handleResetGlass = () => {
    playClickSound(600);
    setBlur(16);
    setOpacity(65);
    setBorderAlpha(15);
    setTintHue(215);
  };

  return (
    <section id="playground" className="py-24 px-4 relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10 transition-colors duration-700"
        style={{ backgroundColor: currentThemeObj.glow }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400">
            <Sliders size={13} />
            <span>Interactive UI/UX Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Design Engineering <span className="shimmer-text">Playground</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Don't just take my word for it. Test real-time visual styling, micro-interaction physics, and design token dynamics right here.
          </p>
        </div>

        {/* Theme Palette Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1.5">
            <Sparkles size={14} className="text-cyan-400" />
            Global Palette:
          </span>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                playClickSound(750);
                setActiveTheme(theme.id);
              }}
              type="button"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 border ${
                activeTheme === theme.id
                  ? 'bg-slate-800 text-white border-white/30 shadow-lg scale-105'
                  : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: theme.primary }}
              />
              <span>{theme.name}</span>
            </button>
          ))}
        </div>

        {/* Two-Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Glassmorphism Tuner (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Sliders size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Glassmorphism Physics Engine</h3>
                  <p className="text-xs text-slate-400">Backdrop filter & sub-pixel opacity calculator</p>
                </div>
              </div>
              <button
                onClick={handleResetGlass}
                type="button"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center gap-1"
                title="Reset to defaults"
              >
                <RefreshCw size={13} />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* Sliders Control Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Blur Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Backdrop Blur</span>
                  <span className="text-cyan-400">{blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={blur}
                  onChange={(e) => {
                    setBlur(Number(e.target.value));
                    playClickSound(400 + Number(e.target.value) * 10);
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Opacity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Surface Opacity</span>
                  <span className="text-cyan-400">{opacity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={opacity}
                  onChange={(e) => {
                    setOpacity(Number(e.target.value));
                    playClickSound(300 + Number(e.target.value) * 4);
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Border Lightness Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Border Highlight</span>
                  <span className="text-cyan-400">{borderAlpha}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={borderAlpha}
                  onChange={(e) => {
                    setBorderAlpha(Number(e.target.value));
                    playClickSound(450 + Number(e.target.value) * 5);
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Hue Tint Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Color Spectrum Hue</span>
                  <span className="text-cyan-400">{tintHue}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={tintHue}
                  onChange={(e) => {
                    setTintHue(Number(e.target.value));
                    playClickSound(200 + Number(e.target.value));
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
              </div>
            </div>

            {/* Live Interactive Specimen Card */}
            <div className="relative p-6 sm:p-8 rounded-3xl overflow-hidden border transition-all duration-150"
              style={{
                backgroundColor: `hsla(${tintHue}, 50%, 15%, ${opacity / 100})`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                borderColor: `hsla(${tintHue}, 80%, 80%, ${borderAlpha / 100})`,
                boxShadow: `0 20px 45px -10px hsla(${tintHue}, 70%, 10%, 0.6), inset 0 1px 0 hsla(${tintHue}, 100%, 90%, ${borderAlpha * 1.5 / 100})`
              }}
            >
              {/* Background accent floating behind card to prove blur */}
              <div 
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none -z-10"
                style={{ backgroundColor: currentThemeObj.primary, opacity: 0.5 }}
              />
              <div 
                className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-2xl pointer-events-none -z-10"
                style={{ backgroundColor: currentThemeObj.secondary, opacity: 0.4 }}
              />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium text-white/90 bg-white/10 border border-white/20">
                    Live Component Specimen
                  </span>
                  <span className="text-xs font-mono text-white/70">
                    blur({blur}px)
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    Dynamic Optical Refraction
                  </h4>
                  <p className="text-xs text-slate-200/80 leading-relaxed">
                    Notice how text remains crisply legible while background ambient light scatters smoothly through the frosted surface.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <span className="inline-block w-7 h-7 rounded-full ring-2 ring-slate-900 bg-cyan-500/80 flex items-center justify-center text-[10px] font-bold text-white">AR</span>
                    <span className="inline-block w-7 h-7 rounded-full ring-2 ring-slate-900 bg-purple-500/80 flex items-center justify-center text-[10px] font-bold text-white">UI</span>
                    <span className="inline-block w-7 h-7 rounded-full ring-2 ring-slate-900 bg-emerald-500/80 flex items-center justify-center text-[10px] font-bold text-white">UX</span>
                  </div>
                  <button
                    onClick={handleCopyCSS}
                    type="button"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/20 flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    {copiedCSS ? (
                      <>
                        <Check size={13} className="text-emerald-300" />
                        <span>CSS Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy CSS Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Generated CSS Snippet Box */}
            <div className="relative p-4 rounded-2xl bg-slate-950/80 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre className="text-slate-300 leading-relaxed">{generatedCSS}</pre>
            </div>
          </div>

          {/* Right Column: Micro-Interactions Sandbox (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Magnetic Button Card */}
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                <MousePointer size={16} className="text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Magnetic Cursor Attraction</h3>
              </div>
              <p className="text-xs text-slate-400">
                Smooth spring inertia pulls the button toward your cursor on hover.
              </p>

              <div 
                className="h-28 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-center relative overflow-hidden"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                <button
                  ref={magneticRef}
                  onClick={() => playSuccessSound()}
                  type="button"
                  style={{
                    transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
                    transition: magneticOffset.x === 0 ? 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
                  }}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
                  style={{
                    backgroundColor: currentThemeObj.primary,
                    boxShadow: `0 10px 25px -5px ${currentThemeObj.glow}`,
                    transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
                  }}
                >
                  <Sparkles size={14} />
                  <span>Magnetic Target</span>
                </button>
              </div>
            </div>

            {/* Spring Switch & Fluid Ripple Card */}
            <div className="glass-panel p-6 rounded-3xl space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Tactile Spring Switch</h3>
                  <p className="text-xs text-slate-400">Accessible micro-audio & state change</p>
                </div>
                <button
                  onClick={handleToggle}
                  type="button"
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    toggleActive ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                  aria-pressed={toggleActive}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                      toggleActive ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Ripple Effect Button */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">Sub-pixel Water Ripple</span>
                  <span className="text-slate-400 font-mono">Click to test</span>
                </div>
                <button
                  onClick={handleRippleClick}
                  type="button"
                  className="relative w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 font-semibold text-xs overflow-hidden flex items-center justify-center gap-2 active:scale-[0.99] transition-transform"
                >
                  <Bell size={14} className="text-purple-400" />
                  <span>Interactive Ripple Trigger</span>

                  {ripples.map((r) => (
                    <span
                      key={r.id}
                      className="absolute rounded-full bg-cyan-400/30 animate-ping pointer-events-none"
                      style={{
                        top: r.y - 20,
                        left: r.x - 20,
                        width: 40,
                        height: 40,
                      }}
                    />
                  ))}
                </button>
              </div>

              {/* Elastic Value Slider */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Fluid Volume Metric</span>
                  <span className="text-cyan-400 font-bold">{sliderVal}%</span>
                </div>
                <div className="relative w-full">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={(e) => {
                      setSliderVal(Number(e.target.value));
                      playClickSound(300 + Number(e.target.value) * 5);
                    }}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
