import React from 'react';
import { 
  TrendingUp, 
  Database, 
  Satellite, 
  Radio, 
  Mountain, 
  Activity, 
  CheckCircle2, 
  ChevronRight,
  Wifi
} from 'lucide-react';

interface BottomWidgetsProps {
  onSelectDataSourceTab?: () => void;
  onSelectModelPerformanceTab?: () => void;
}

export const BottomWidgets: React.FC<BottomWidgetsProps> = ({
  onSelectDataSourceTab,
  onSelectModelPerformanceTab
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-4">
      {/* Widget 1: Model Performance */}
      <div 
        onClick={onSelectModelPerformanceTab}
        className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-neutral-300 transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#EBF4FE] flex items-center justify-center text-[#2563EB]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#737373]">
              Model Performance
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-bold text-[#171717]">Active Monsoon</span>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                CSI 0.61
              </span>
            </div>
          </div>
        </div>

        <div className="w-6 h-6 rounded-full bg-[#F5F5F3] flex items-center justify-center text-[#737373] group-hover:bg-[#171717] group-hover:text-white transition-colors">
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Widget 2: Data Sources */}
      <div 
        onClick={onSelectDataSourceTab}
        className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-neutral-300 transition-all cursor-pointer group"
      >
        <div className="flex-1 pr-2">
          <div className="text-xs font-semibold text-[#737373] mb-2 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#737373]" />
            <span>Data Sources</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAFAF8] border border-[#E7E7E3] text-[#525252]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> NWP
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAFAF8] border border-[#E7E7E3] text-[#525252]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> IMD
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAFAF8] border border-[#E7E7E3] text-[#525252]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Satellite
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAFAF8] border border-[#E7E7E3] text-[#525252]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Radar
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAFAF8] border border-[#E7E7E3] text-[#525252]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Topo
            </span>
          </div>
        </div>

        <div className="w-6 h-6 rounded-full bg-[#F5F5F3] flex items-center justify-center text-[#737373] group-hover:bg-[#171717] group-hover:text-white transition-colors">
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Widget 3: System Status */}
      <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between">
        <div className="w-full">
          <div className="text-xs font-semibold text-[#737373] mb-2 flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>System Status</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-1 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3]/60">
              <div className="text-[10px] text-[#737373]">NWP Data</div>
              <div className="text-[11px] font-semibold text-emerald-600 flex items-center justify-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Connected
              </div>
            </div>

            <div className="p-1 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3]/60">
              <div className="text-[10px] text-[#737373]">Observation</div>
              <div className="text-[11px] font-semibold text-emerald-600 flex items-center justify-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Connected
              </div>
            </div>

            <div className="p-1 rounded-lg bg-[#FAFAF8] border border-[#E7E7E3]/60">
              <div className="text-[10px] text-[#737373]">AI Model</div>
              <div className="text-[11px] font-semibold text-[#2563EB] flex items-center justify-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-ping"></span>
                Running
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
