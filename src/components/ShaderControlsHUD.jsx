import React, { useState, useEffect } from 'react';
import { Sliders, X, RefreshCw, Copy, Check, Sparkles, ChevronDown, ChevronUp, Zap, Eye, EyeOff } from 'lucide-react';
import { DEFAULT_SHADER_CONFIG } from './CraftInteractiveBackground';
import { playClickSound, playPopSound } from '../utils/sound';

export default function ShaderControlsHUD({ config, onChangeConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('aperture'); // 'aperture', 'motion', 'visual'

  // Press 'H' to toggle HUD visibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'h' || e.key === 'H') {
        playPopSound();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const update = (key, value) => {
    onChangeConfig({
      ...config,
      [key]: value,
    });
  };

  const handleReset = () => {
    playClickSound(500);
    onChangeConfig({ ...DEFAULT_SHADER_CONFIG });
  };

  const handleCopyJSON = () => {
    playPopSound();
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    {
      name: '🌿 itsCraft Classic',
      desc: 'Authentic timing & soft velocity reveal',
      values: { ...DEFAULT_SHADER_CONFIG },
    },
    {
      name: '⚡ Hyper Speed',
      desc: 'Rapid 1.5s blooms & 4x velocity sensitivity',
      values: {
        ...DEFAULT_SHADER_CONFIG,
        revealDuration: 1.8,
        fadeDuration: 2.2,
        spawnInterval: 0.8,
        velocitySensitivity: 4.2,
        apertureRadius: 0.14,
        rotationSpeed: 0.22,
        lerpSpeed: 8.0,
      },
    },
    {
      name: '🌌 Dreamy Ethereal',
      desc: 'Slow 8s unfolding & maximum feathered blur',
      values: {
        ...DEFAULT_SHADER_CONFIG,
        revealDuration: 7.5,
        fadeDuration: 6.0,
        spawnInterval: 3.2,
        apertureRadius: 0.08,
        apertureSoftness: 0.48,
        velocitySensitivity: 1.2,
        rotationSpeed: 0.03,
        lerpSpeed: 3.0,
      },
    },
    {
      name: '🔍 Macro Giant',
      desc: 'Magnified blooms filling 2.0x of the viewport',
      values: {
        ...DEFAULT_SHADER_CONFIG,
        bloomScale: 2.1,
        apertureRadius: 0.16,
        apertureSoftness: 0.32,
        contrast: 1.25,
      },
    },
    {
      name: '🌑 Obsidian Pitch',
      desc: 'Pitch-black backdrop with neon high-contrast flora',
      values: {
        ...DEFAULT_SHADER_CONFIG,
        bgColor: '#050706',
        contrast: 1.35,
        apertureSoftness: 0.35,
      },
    },
  ];

  const applyPreset = (presetValues) => {
    playClickSound(800);
    onChangeConfig(presetValues);
  };

  const colorSwatches = [
    { label: 'Moss', hex: '#19231f' },
    { label: 'Obsidian', hex: '#050706' },
    { label: 'Forest', hex: '#112217' },
    { label: 'Midnight', hex: '#0a1214' },
    { label: 'Plum Dark', hex: '#180e1a' },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none font-sans">
      {/* Minimized Floating Button */}
      {!isOpen && (
        <button
          onClick={() => {
            playPopSound();
            setIsOpen(true);
          }}
          type="button"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-xl shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Open Shader Controls (Shortcut: Press H)"
        >
          <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:rotate-45 transition-transform duration-300">
            <Sliders size={16} />
          </div>
          <span className="text-xs font-semibold tracking-wide">Customize Shader</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-400">H</span>
        </button>
      )}

      {/* Expanded Control Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] max-h-[85vh] flex flex-col rounded-3xl bg-slate-950/85 border border-white/15 backdrop-blur-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Sliders size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Shader Customizer</h3>
                <p className="text-[11px] font-mono text-slate-400">Live 60fps real-time parameter tuning</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleReset}
                type="button"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset to default settings"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => {
                  playPopSound();
                  setIsOpen(false);
                }}
                type="button"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Hide Controls (H)"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Presets Carousel Bar */}
          <div className="px-5 py-3 border-b border-white/10 bg-black/30 overflow-x-auto flex gap-2 no-scrollbar">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.values)}
                type="button"
                className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-all hover:border-emerald-500/40 active:scale-95"
                title={preset.desc}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 text-xs font-mono text-center">
            <button
              onClick={() => { playClickSound(650); setActiveTab('aperture'); }}
              className={`flex-1 py-2.5 transition-colors ${activeTab === 'aperture' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-white/5 font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Lens & Blur
            </button>
            <button
              onClick={() => { playClickSound(650); setActiveTab('motion'); }}
              className={`flex-1 py-2.5 transition-colors ${activeTab === 'motion' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-white/5 font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Motion & Speed
            </button>
            <button
              onClick={() => { playClickSound(650); setActiveTab('visual'); }}
              className={`flex-1 py-2.5 transition-colors ${activeTab === 'visual' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-white/5 font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Scale & Light
            </button>
          </div>

          {/* Scrollable Sliders Body */}
          <div className="p-5 space-y-5 overflow-y-auto flex-1 text-xs">
            
            {/* TAB 1: Lens & Blur */}
            {activeTab === 'aperture' && (
              <div className="space-y-4">
                {/* Aperture Softness / Blur */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Aperture Edge Blur / Softness</span>
                    <span className="text-emerald-400 font-bold">{config.apertureSoftness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.60"
                    step="0.01"
                    value={config.apertureSoftness}
                    onChange={(e) => update('apertureSoftness', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <p className="text-[10px] text-slate-500">Controls the feathering of the mouse reveal aperture.</p>
                </div>

                {/* Aperture Base Radius */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Aperture Base Size</span>
                    <span className="text-emerald-400 font-bold">{config.apertureRadius.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.02"
                    max="0.35"
                    step="0.01"
                    value={config.apertureRadius}
                    onChange={(e) => update('apertureRadius', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <p className="text-[10px] text-slate-500">Radius of the stationary cursor reveal aperture.</p>
                </div>

                {/* Velocity Light / Speed Scaling */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Velocity Light / Speed Expansion</span>
                    <span className="text-emerald-400 font-bold">{config.velocitySensitivity.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="5.0"
                    step="0.1"
                    value={config.velocitySensitivity}
                    onChange={(e) => update('velocitySensitivity', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <p className="text-[10px] text-slate-500">How dramatically the reveal aperture expands when you move fast.</p>
                </div>

                {/* Mouse Inertia / Lerp Speed */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Mouse Tracking Inertia (Lerp)</span>
                    <span className="text-emerald-400 font-bold">{config.lerpSpeed.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="15.0"
                    step="0.5"
                    value={config.lerpSpeed}
                    onChange={(e) => update('lerpSpeed', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <p className="text-[10px] text-slate-500">Lower = heavier fluid inertia; Higher = instantaneous snap.</p>
                </div>
              </div>
            )}

            {/* TAB 2: Motion & Speed */}
            {activeTab === 'motion' && (
              <div className="space-y-4">
                {/* Bloom Reveal Duration */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Bloom Opening Duration</span>
                    <span className="text-emerald-400 font-bold">{config.revealDuration.toFixed(1)}s</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.2"
                    value={config.revealDuration}
                    onChange={(e) => update('revealDuration', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <p className="text-[10px] text-slate-500">Time taken for each circular botanical bloom to unfold.</p>
                </div>

                {/* Fade Out Duration */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Fade Out Duration</span>
                    <span className="text-emerald-400 font-bold">{config.fadeDuration.toFixed(1)}s</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="8.0"
                    step="0.2"
                    value={config.fadeDuration}
                    onChange={(e) => update('fadeDuration', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <p className="text-[10px] text-slate-500">Time taken for completed blooms to dissolve into the background.</p>
                </div>

                {/* Sprout Interval */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Sprouting Frequency</span>
                    <span className="text-emerald-400 font-bold">Every {config.spawnInterval.toFixed(1)}s</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={config.spawnInterval}
                    onChange={(e) => update('spawnInterval', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <p className="text-[10px] text-slate-500">How frequently new flower blooms emerge across the screen.</p>
                </div>

                {/* Continuous Ambient Rotation */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Ambient Flower Spin</span>
                    <span className="text-emerald-400 font-bold">{config.rotationSpeed.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.00"
                    max="0.40"
                    step="0.01"
                    value={config.rotationSpeed}
                    onChange={(e) => update('rotationSpeed', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <p className="text-[10px] text-slate-500">Continuous gentle axial rotation speed while blooming.</p>
                </div>
              </div>
            )}

            {/* TAB 3: Scale & Visual Light */}
            {activeTab === 'visual' && (
              <div className="space-y-4">
                {/* Bloom Viewport Scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Bloom Viewport Scale</span>
                    <span className="text-emerald-400 font-bold">{config.bloomScale.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.60"
                    max="2.50"
                    step="0.05"
                    value={config.bloomScale}
                    onChange={(e) => update('bloomScale', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                  />
                  <p className="text-[10px] text-slate-500">Size of blooms relative to viewport width/height diagonal.</p>
                </div>

                {/* Contrast / Vibrancy */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Color Contrast / Gamma</span>
                    <span className="text-emerald-400 font-bold">{config.contrast.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.70"
                    max="1.50"
                    step="0.05"
                    value={config.contrast}
                    onChange={(e) => update('contrast', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                  />
                  <p className="text-[10px] text-slate-500">Boosts the vividness of the lime and deep emerald layers.</p>
                </div>

                {/* Background Tone Selector */}
                <div className="space-y-2">
                  <label className="text-slate-300 font-mono">Background Canvas Tone</label>
                  <div className="flex flex-wrap gap-2">
                    {colorSwatches.map((swatch) => (
                      <button
                        key={swatch.hex}
                        type="button"
                        onClick={() => update('bgColor', swatch.hex)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-mono transition-all ${
                          config.bgColor.toLowerCase() === swatch.hex.toLowerCase()
                            ? 'border-emerald-400 bg-white/10 text-white font-bold'
                            : 'border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span>{swatch.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Actions Bar */}
          <div className="px-5 py-3 border-t border-white/10 bg-white/5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400">
              Press <kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-300">H</kbd> to hide
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyJSON}
                type="button"
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Config</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  playPopSound();
                  setIsOpen(false);
                }}
                type="button"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-emerald-500/20"
              >
                Done
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
