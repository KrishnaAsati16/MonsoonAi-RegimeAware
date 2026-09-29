import React, { useState } from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { VERIFICATION_DATA } from '../../data/mockData';

export const VerificationCard: React.FC<{ onViewDetails?: () => void }> = ({ onViewDetails }) => {
  const [activeWindow, setActiveWindow] = useState<'24h' | '7d' | '30d' | 'Monsoon'>('24h');

  const windows = ['24h', '7d', '30d', 'Monsoon'] as const;

  return (
    <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[360px]">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Forecast Verification
          </h3>
          <button
            onClick={onViewDetails}
            className="text-[#A3A3A3] hover:text-[#171717] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Verification Period Tabs */}
        <div className="flex items-center justify-between bg-[#FAFAF8] p-1 rounded-xl border border-[#E7E7E3] mb-3">
          {windows.map((w) => {
            const isActive = activeWindow === w;
            return (
              <button
                key={w}
                onClick={() => setActiveWindow(w)}
                className={`
                  flex-1 py-0.5 text-[11px] font-semibold rounded-lg transition-all text-center
                  ${isActive 
                    ? 'bg-[#171717] text-white shadow-sm' 
                    : 'text-[#737373] hover:text-[#171717]'
                  }
                `}
              >
                {w}
              </button>
            );
          })}
        </div>

        {/* Verification Metrics Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-[#737373] border-b border-[#F0F0ED]">
                <th className="pb-1.5 font-semibold text-left">Metric</th>
                <th className="pb-1.5 font-semibold text-right">Raw NWP</th>
                <th className="pb-1.5 font-semibold text-right text-emerald-600">AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F3]">
              {VERIFICATION_DATA.map((item) => (
                <tr key={item.metric} className="group hover:bg-[#FAFAF8]">
                  <td className="py-1.5 text-[#171717] font-semibold flex items-center gap-1">
                    <span>{item.metric}</span>
                    <span className="text-[10px] text-[#A3A3A3] font-normal hidden sm:inline">
                      {item.unit ? `(${item.unit})` : ''}
                    </span>
                  </td>
                  <td className="py-1.5 text-right text-[#737373] font-mono">
                    {item.rawNwp}
                  </td>
                  <td className="py-1.5 text-right font-bold font-mono text-emerald-600 flex items-center justify-end gap-1">
                    <span>{item.ai}</span>
                    <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded font-sans">
                      {item.improvement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="pt-2 border-t border-[#F0F0ED] flex items-center justify-between text-[10px] text-[#A3A3A3]">
        <span>Prototype / Simulated Data</span>
        <span className="text-emerald-700 font-semibold font-sans">AI Outperforms NWP</span>
      </div>
    </div>
  );
};
