import React, { useState } from 'react';
import { FORECAST_ACCURACY_DATA } from '../../data/mockData';

export const ForecastAccuracyCard: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<string>('24h');

  // Max RMSE is ~50 for scaling the bar height
  const maxRmse = 50;

  return (
    <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[270px]">
      {/* Header with Title and Pills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-[#737373] uppercase tracking-wider">
            Forecast Accuracy
          </h3>
          <span className="text-[11px] text-[#A3A3A3] font-medium">Lead Time</span>
        </div>

        {/* Lead Time Selector Pills */}
        <div className="flex items-center justify-between bg-[#FAFAF8] p-1 rounded-xl border border-[#E7E7E3]">
          {FORECAST_ACCURACY_DATA.map((item) => {
            const isSelected = selectedLead === item.leadTime;
            return (
              <button
                key={item.leadTime}
                onClick={() => setSelectedLead(item.leadTime)}
                className={`
                  px-2 py-0.5 text-[11px] font-semibold rounded-lg transition-all
                  ${isSelected 
                    ? 'bg-[#B8D957] text-[#344E04] shadow-sm' 
                    : 'text-[#737373] hover:text-[#171717]'
                  }
                `}
              >
                {item.leadTime}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vertical Bar Chart */}
      <div className="pt-2 flex items-end justify-between h-32 px-1">
        {FORECAST_ACCURACY_DATA.map((item) => {
          const isHighlighted = item.leadTime === '24h';
          const isSelected = selectedLead === item.leadTime;
          const barHeightPercent = (item.rmse / maxRmse) * 100;

          return (
            <div key={item.leadTime} className="flex flex-col items-center gap-1.5 flex-1 group cursor-pointer" onClick={() => setSelectedLead(item.leadTime)}>
              {/* Value Tooltip / Label */}
              <span className={`text-[10px] font-semibold transition-colors ${
                isSelected || isHighlighted ? 'text-[#171717]' : 'text-[#A3A3A3] group-hover:text-[#525252]'
              }`}>
                {item.rmse}
              </span>

              {/* Bar Container */}
              <div className="w-4 sm:w-5 bg-[#F5F5F3] rounded-lg h-24 flex items-end p-0.5">
                <div
                  className={`w-full rounded-md transition-all duration-300 ${
                    isSelected || isHighlighted 
                      ? 'bg-[#B8D957]' 
                      : 'bg-[#E5E7EB] group-hover:bg-[#D1D5DB]'
                  }`}
                  style={{ height: `${barHeightPercent}%` }}
                />
              </div>

              {/* Lead time label */}
              <span className={`text-[10px] font-medium ${
                isSelected || isHighlighted ? 'font-bold text-[#171717]' : 'text-[#737373]'
              }`}>
                {item.leadTime}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Axis Label */}
      <div className="text-center pt-1 border-t border-[#F5F5F3]">
        <span className="text-[10px] font-semibold text-[#737373] uppercase tracking-wider">
          RMSE (mm)
        </span>
      </div>
    </div>
  );
};
