import React from 'react';
import { BarChart3, Cpu, Zap, Activity, GitBranch, Layers } from 'lucide-react';

export const ModelPerformanceView: React.FC = () => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl font-bold text-[#171717] tracking-tight flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#2563EB]" />
          Regime-Aware AI Model Architecture & Telemetry
        </h1>
        <p className="text-xs text-[#737373] mt-0.5">
          Spatiotemporal ConvLSTM with Self-Attention conditioned on synoptic weather regime embeddings.
        </p>
      </div>

      {/* Architecture Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] uppercase font-bold text-[#737373]">Inference Latency</div>
          <div className="text-2xl font-black text-[#171717] mt-1">4.2 sec</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Full India 0.25° Grid</div>
        </div>

        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] uppercase font-bold text-[#737373]">Model Parameters</div>
          <div className="text-2xl font-black text-[#171717] mt-1">48.6 M</div>
          <div className="text-xs text-[#737373] font-medium mt-1">PyTorch / TensorRT FP16</div>
        </div>

        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] uppercase font-bold text-[#737373]">Training Dataset</div>
          <div className="text-2xl font-black text-[#171717] mt-1">2000–2024</div>
          <div className="text-xs text-[#737373] font-medium mt-1">24 Monsoon Seasons</div>
        </div>

        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] uppercase font-bold text-[#737373]">Mean Bias Reduction</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">74.6%</div>
          <div className="text-xs text-[#737373] font-medium mt-1">Across all 6 Regimes</div>
        </div>
      </div>

      {/* Model Comparison Table */}
      <div className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h3 className="text-sm font-bold text-[#171717] mb-3">Model Benchmark Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAFAF8] text-[#737373] uppercase text-[10px] tracking-wider border-b border-[#E7E7E3]">
              <tr>
                <th className="py-2 px-3 font-semibold">Model Pipeline</th>
                <th className="py-2 px-3 font-semibold">Regime-Aware</th>
                <th className="py-2 px-3 font-semibold text-right">RMSE (mm)</th>
                <th className="py-2 px-3 font-semibold text-right">CSI Score</th>
                <th className="py-2 px-3 font-semibold text-right">Heavy Rain POD</th>
                <th className="py-2 px-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0ED]">
              <tr className="hover:bg-[#FAFAF8]">
                <td className="py-2.5 px-3 font-medium text-[#171717]">Baseline Raw NWP (NCUM)</td>
                <td className="py-2.5 px-3 text-[#737373]">No</td>
                <td className="py-2.5 px-3 text-right font-mono">42.8</td>
                <td className="py-2.5 px-3 text-right font-mono">0.42</td>
                <td className="py-2.5 px-3 text-right font-mono">0.63</td>
                <td className="py-2.5 px-3 text-center"><span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">Standard</span></td>
              </tr>
              <tr className="hover:bg-[#FAFAF8]">
                <td className="py-2.5 px-3 font-medium text-[#171717]">Standard Quantile Mapping</td>
                <td className="py-2.5 px-3 text-[#737373]">No</td>
                <td className="py-2.5 px-3 text-right font-mono">36.4</td>
                <td className="py-2.5 px-3 text-right font-mono">0.49</td>
                <td className="py-2.5 px-3 text-right font-mono">0.69</td>
                <td className="py-2.5 px-3 text-center"><span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">Legacy</span></td>
              </tr>
              <tr className="hover:bg-[#FAFAF8]">
                <td className="py-2.5 px-3 font-medium text-[#171717]">Generic Deep CNN (Unconditioned)</td>
                <td className="py-2.5 px-3 text-[#737373]">No</td>
                <td className="py-2.5 px-3 text-right font-mono">33.1</td>
                <td className="py-2.5 px-3 text-right font-mono">0.53</td>
                <td className="py-2.5 px-3 text-right font-mono">0.72</td>
                <td className="py-2.5 px-3 text-center"><span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">Benchmark</span></td>
              </tr>
              <tr className="bg-[#F0F8DC]/30 font-semibold">
                <td className="py-2.5 px-3 text-[#171717] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3E7B27]"></span>
                  Monsoon AI (Regime-Conditioned Attention)
                </td>
                <td className="py-2.5 px-3 text-emerald-700">Yes (6 Regimes)</td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-bold">29.7</td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-bold">0.61</td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-bold">0.78</td>
                <td className="py-2.5 px-3 text-center">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B8D957] text-[#344E04] font-bold">
                    Operational (Active)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
