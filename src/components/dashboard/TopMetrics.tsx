import React from 'react';
import { 
  CloudRain, 
  TrendingUp, 
  Droplets, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowRight
} from 'lucide-react';

interface TopMetricsProps {
  onSelectMetric?: (metricKey: string) => void;
}

export const TopMetrics: React.FC<TopMetricsProps> = ({ onSelectMetric }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-5">
      {/* Metric 1: Current Regime */}
      <div 
        onClick={() => onSelectMetric?.('regime')}
        className="bg-white border border-[#E7E7E3] rounded-2xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F0F8DC] flex items-center justify-center text-[#55780D]">
              <CloudRain className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-[#737373]">Current Regime</span>
          </div>
        </div>

        <div>
          <div className="text-lg sm:text-xl font-bold text-[#171717] tracking-tight">
            Active Monsoon
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0F8DC] text-[#55780D] border border-[#DEEBAB]">
              87.4% Confidence
            </span>
            <div className="w-5 h-5 rounded-full bg-[#F5F5F3] flex items-center justify-center text-[#737373] group-hover:bg-[#171717] group-hover:text-white transition-colors">
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Metric 2: AI Forecast Improvement */}
      <div 
        onClick={() => onSelectMetric?.('improvement')}
        className="bg-white border border-[#E7E7E3] rounded-2xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF4FE] flex items-center justify-center text-[#2563EB]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-[#737373]">AI Forecast Improvement</span>
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-[26px] font-bold text-[#171717] tracking-tight leading-none">
            32.8%
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-[#737373] font-medium">
              vs Raw NWP
            </span>
            <div className="w-5 h-5 rounded-full bg-[#EDF8E5] flex items-center justify-center text-[#3E7B27]">
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Metric 3: Heavy Rainfall Risk */}
      <div 
        onClick={() => onSelectMetric?.('risk')}
        className="bg-white border border-[#E7E7E3] rounded-2xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FDECE9] flex items-center justify-center text-[#E98276]">
              <Droplets className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-[#737373]">Heavy Rainfall Risk</span>
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-[26px] font-bold text-[#171717] tracking-tight leading-none">
            68%
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-[#737373] font-medium">
              Probability <span className="text-[#171717]">≥ 64.5 mm / 24h</span>
            </span>
            <div className="w-5 h-5 rounded-full bg-[#FEF4E8] flex items-center justify-center text-[#F4B860]">
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Metric 4: Districts at Risk */}
      <div 
        onClick={() => onSelectMetric?.('districts')}
        className="bg-white border border-[#E7E7E3] rounded-2xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FDECE9] flex items-center justify-center text-[#E98276]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-[#737373]">Districts at Risk</span>
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-[26px] font-bold text-[#171717] tracking-tight leading-none">
            47
          </div>
          <div className="mt-2 flex items-center justify-between text-xs font-medium text-[#737373]">
            <span className="text-xs text-[#737373]">Districts</span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E98276]"></span>
                <span className="text-[#171717] font-semibold">12</span> Severe
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4B860]"></span>
                <span className="text-[#171717] font-semibold">35</span> Heavy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric 5: Model Confidence */}
      <div 
        onClick={() => onSelectMetric?.('confidence')}
        className="bg-white border border-[#E7E7E3] rounded-2xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EDF8E5] flex items-center justify-center text-[#3E7B27]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-[#737373]">Model Confidence</span>
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-[26px] font-bold text-[#171717] tracking-tight leading-none">
            91.6%
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-[#737373] font-medium">Overall confidence</span>
            <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EDF8E5] text-[#3E7B27]">
              Stable
            </span>
            <div className="w-5 h-5 rounded-full bg-[#EDF8E5] flex items-center justify-center text-[#3E7B27]">
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
