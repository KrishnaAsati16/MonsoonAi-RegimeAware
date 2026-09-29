import React from 'react';
import { ShieldCheck, TrendingUp, BarChart2, CheckCircle, Info } from 'lucide-react';
import { VERIFICATION_DATA } from '../../data/mockData';

export const VerificationView: React.FC = () => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl font-bold text-[#171717] tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Statistical Verification & Skill Scores
        </h1>
        <p className="text-xs text-[#737373] mt-0.5">
          Objective evaluation against IMD high-resolution gridded observations (0.25° x 0.25°) and AWS rain-gauge network.
        </p>
      </div>

      {/* Primary Verification Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {VERIFICATION_DATA.map((v) => (
          <div key={v.metric} className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-[#171717]">{v.metric}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {v.improvement} Skill
              </span>
            </div>
            <div className="text-xs text-[#737373]">{v.fullName}</div>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#F0F0ED]">
              <div className="bg-[#FAFAF8] p-2.5 rounded-xl text-center">
                <div className="text-[10px] uppercase text-[#737373]">Raw NWP</div>
                <div className="text-base font-bold text-[#171717] mt-0.5 font-mono">{v.rawNwp} {v.unit || ''}</div>
              </div>
              <div className="bg-[#F0F8DC] p-2.5 rounded-xl text-center border border-[#DEEBAB]">
                <div className="text-[10px] uppercase text-[#55780D] font-semibold">AI Corrected</div>
                <div className="text-base font-bold text-[#171717] mt-0.5 font-mono">{v.ai} {v.unit || ''}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2x2 Contingency Matrix Explanation */}
      <div className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h3 className="text-sm font-bold text-[#171717] mb-2">Categorical Contingency Matrix (≥64.5 mm / 24h)</h3>
        <p className="text-xs text-[#737373] mb-4">
          Evaluating hit rate, false alarm ratio, and missed events across the Indian monsoon domain.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
            <div className="text-xs font-bold text-emerald-800">Hits (Correct Forecasts)</div>
            <div className="text-2xl font-black text-emerald-700 mt-1">1,482</div>
            <div className="text-xs text-emerald-900 mt-1">AI detected 238 heavy rain events missed by raw NWP.</div>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
            <div className="text-xs font-bold text-rose-800">False Alarms (Spurious Warnings)</div>
            <div className="text-2xl font-black text-rose-700 mt-1">214</div>
            <div className="text-xs text-rose-900 mt-1">Reduced by 37.9% compared to raw NWP over-convection.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
