import React, { useState } from 'react';
import { Activity, Sparkles, Network, Heart, CheckCircle2, Sliders, Eye } from 'lucide-react';

interface VisualProps {
  type: 'neural' | 'calm' | 'roommate';
}

export const ProjectVisuals: React.FC<VisualProps> = ({ type }) => {
  const [activeToken, setActiveToken] = useState<number | null>(null);

  if (type === 'neural') {
    const tokens = ['[CLS]', 'image_patch_14', 'lat_dim_42', 'proj_head', 'sae_feat_09', 'text_token_3'];
    const weights = [0.94, 0.78, 0.91, 0.65, 0.88, 0.82];

    return (
      <div className="relative w-full h-52 bg-gradient-to-br from-[#060a1c] via-[#09112e] to-[#040614] rounded-2xl overflow-hidden border border-electric-blue/30 p-4 flex flex-col justify-between group">
        {/* Luminous atmospheric accents */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-electric-blue/20 rounded-full blur-3xl group-hover:bg-electric-blue/30 transition-all duration-700 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-electric-violet/20 rounded-full blur-3xl group-hover:bg-electric-violet/30 transition-all duration-700 pointer-events-none" />

        {/* Top Header Mockup */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue" />
            </span>
            <span className="text-[11px] font-mono text-electric-blue uppercase tracking-wider font-semibold">
              CLIP Latent Alignment
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-slate-300">
            Roadmap: VLM + SAE
          </span>
        </div>

        {/* Dynamic Attention Heatmap / Synaptic Matrix */}
        <div className="relative z-10 my-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-electric-blue" /> Attention Distribution
            </span>
            <span className="text-electric-blue font-bold">
              {activeToken !== null ? `${tokens[activeToken]}: ${weights[activeToken]}` : 'Hover Node for Weights'}
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {weights.map((val, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveToken(idx)}
                onMouseLeave={() => setActiveToken(null)}
                className={`h-9 rounded-lg flex flex-col items-center justify-center text-[9px] font-mono transition-all duration-200 cursor-pointer ${
                  activeToken === idx ? 'scale-110 shadow-glow-blue ring-1 ring-electric-blue' : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: val > 0.8 ? `rgba(0, 240, 255, ${val * 0.35})` : `rgba(139, 92, 246, ${val * 0.28})`,
                  border: `1px solid ${val > 0.85 ? 'rgba(0, 240, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: val > 0.8 ? '#00f0ff' : '#cbd5e1',
                }}
              >
                <span className="font-bold">{val.toFixed(2)}</span>
                <span className="text-[7.5px] opacity-75 truncate max-w-[42px]">{tokens[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Feature Readout with Telemetry */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] font-mono text-slate-300">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-electric-blue animate-pulse" />
            <span>Cosine Sim: 0.942</span>
          </div>
          <span className="text-electric-violet font-semibold">Token ⇄ Patch Saliency</span>
        </div>
      </div>
    );
  }

  if (type === 'calm') {
    return (
      <div className="relative w-full h-52 bg-gradient-to-br from-[#0e0c24] via-[#14123d] to-[#070617] rounded-2xl overflow-hidden border border-electric-violet/30 p-4 flex flex-col justify-between group">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-44 h-44 bg-electric-violet/25 rounded-full blur-3xl group-hover:bg-electric-violet/35 transition-all duration-700 pointer-events-none" />
        <div className="absolute -bottom-8 right-0 w-36 h-36 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span className="text-[11px] font-mono text-pink-300 uppercase tracking-wider font-semibold">
              Emotion NLP Classifier
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-slate-300">
            LLM Prompt Engine
          </span>
        </div>

        {/* Dynamic Sentiment Wave Visualization */}
        <div className="relative z-10 flex flex-col gap-2 my-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
            <span>Primary State</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Reflective / Grounded (88%)
            </span>
          </div>
          <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden flex border border-white/10 p-0.5">
            <div className="bg-emerald-400 h-full rounded-l-full w-[45%]" title="Grounded 45%" />
            <div className="bg-electric-violet h-full w-[35%]" title="Empathetic 35%" />
            <div className="bg-cyan-400 h-full rounded-r-full w-[20%]" title="Curious 20%" />
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-[10px] text-slate-200 font-mono leading-relaxed">
            <span className="text-electric-violet font-semibold mr-1.5">Contextual Advice:</span>
            "Recommended grounding exercise: 4-7-8 breathing &amp; contextual journaling prompt."
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-electric-violet" />
            <span className="text-slate-300">Adaptive Wellness</span>
          </div>
          <span className="text-emerald-400 font-semibold">Client-Encrypted</span>
        </div>
      </div>
    );
  }

  // Roommate Finder Visual
  return (
    <div className="relative w-full h-52 bg-gradient-to-br from-[#061324] via-[#0a1e38] to-[#040d18] rounded-2xl overflow-hidden border border-electric-sky/30 p-4 flex flex-col justify-between group">
      {/* Glow */}
      <div className="absolute -top-10 -left-10 w-44 h-44 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all duration-700 pointer-events-none" />
      <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider font-semibold">
            Compatibility Matcher
          </span>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-bold">
          Score: 94% Match
        </span>
      </div>

      {/* Matching Attributes Radar / Bar Preview */}
      <div className="relative z-10 grid grid-cols-3 gap-2 my-1">
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex flex-col text-center hover:border-cyan-400/40 transition-colors">
          <span className="text-[10px] font-mono text-slate-400">Sleep Schedule</span>
          <span className="text-xs font-bold text-cyan-400 mt-1">98% Fit</span>
          <div className="w-full bg-white/5 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-cyan-400 h-full w-[98%]" />
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex flex-col text-center hover:border-electric-blue/40 transition-colors">
          <span className="text-[10px] font-mono text-slate-400">Cleanliness</span>
          <span className="text-xs font-bold text-electric-blue mt-1">92% Fit</span>
          <div className="w-full bg-white/5 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-electric-blue h-full w-[92%]" />
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex flex-col text-center hover:border-indigo-400/40 transition-colors">
          <span className="text-[10px] font-mono text-slate-400">Budget Range</span>
          <span className="text-xs font-bold text-indigo-400 mt-1">95% Fit</span>
          <div className="w-full bg-white/5 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-indigo-400 h-full w-[95%]" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300">Verified Profiles</span>
        </div>
        <span className="text-cyan-400 font-semibold flex items-center gap-1">
          <Sliders className="w-3 h-3 text-cyan-400" /> Multi-Factor Engine
        </span>
      </div>
    </div>
  );
};
