import React from 'react';
import { AlertCircle } from 'lucide-react';

export const HeavyRainfallRiskCard: React.FC = () => {
  const percentage = 68;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[270px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-[#737373] uppercase tracking-wider flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-[#E98276]" />
          Heavy Rainfall Risk
        </h3>
        <span className="text-[10px] text-[#A3A3A3] font-medium">24h Horizon</span>
      </div>

      {/* Main Circular Ring and Stats */}
      <div className="flex items-center justify-around my-auto">
        {/* Circular Donut Ring */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              className="text-[#F5F5F3]"
              strokeWidth="9"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Foreground progress ring */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              className="text-[#B8D957]"
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>

          {/* Center value */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-[#171717] tracking-tight">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Breakdown Indicators on Right */}
        <div className="flex flex-col gap-2.5">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#737373]">
              <span className="w-2 h-2 rounded-full bg-[#F4B860]"></span>
              <span>Very Heavy</span>
            </div>
            <div className="text-sm font-bold text-[#171717] pl-3.5">
              31%
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#737373]">
              <span className="w-2 h-2 rounded-full bg-[#E98276]"></span>
              <span>Extreme</span>
            </div>
            <div className="text-sm font-bold text-[#171717] pl-3.5">
              12%
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtitle */}
      <div className="text-center pt-2 border-t border-[#F5F5F3]">
        <p className="text-[11px] font-medium text-[#737373]">
          Probability of <span className="font-semibold text-[#171717]">≥ 64.5 mm</span>
        </p>
      </div>
    </div>
  );
};
