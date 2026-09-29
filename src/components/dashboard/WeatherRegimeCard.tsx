import React from 'react';
import { CloudRain, Waves } from 'lucide-react';
import { REGIME_BREAKDOWN } from '../../data/mockData';

export const WeatherRegimeCard: React.FC = () => {
  return (
    <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[270px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-[#737373] uppercase tracking-wider">
          Current Weather Regime
        </h3>
        <Waves className="w-4 h-4 text-[#A3A3A3]" />
      </div>

      {/* Hero Regime Banner */}
      <div className="flex items-center gap-3.5 my-1">
        <div className="w-12 h-12 rounded-2xl bg-[#EBF4FE] flex items-center justify-center text-[#2563EB] shadow-sm flex-shrink-0">
          <CloudRain className="w-6 h-6" />
        </div>
        <div>
          <div className="text-lg sm:text-xl font-extrabold text-[#171717] tracking-tight leading-tight">
            ACTIVE MONSOON
          </div>
          <div className="text-xs text-[#737373] font-medium mt-0.5">
            87.4% Confidence
          </div>
        </div>
      </div>

      {/* Regime Breakdown Bars */}
      <div className="space-y-1.5 pt-1">
        {REGIME_BREAKDOWN.map((item) => {
          const isActive = item.name === 'Active Monsoon';
          return (
            <div key={item.name} className="flex items-center text-xs">
              <span className={`w-36 truncate ${isActive ? 'font-semibold text-[#171717]' : 'text-[#737373]'}`}>
                {item.name}
              </span>
              <div className="flex-1 mx-2.5 h-1.5 bg-[#F5F5F3] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isActive ? 'bg-[#B8D957]' : 'bg-[#D4D4D0]'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className={`w-8 text-right text-[11px] ${isActive ? 'font-bold text-[#171717]' : 'text-[#A3A3A3]'}`}>
                {item.percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
