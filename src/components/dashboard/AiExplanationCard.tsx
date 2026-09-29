import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { DistrictData } from '../../types';

interface AiExplanationCardProps {
  district: DistrictData;
  onViewFactorsModal?: () => void;
}

export const AiExplanationCard: React.FC<AiExplanationCardProps> = ({ 
  district,
  onViewFactorsModal 
}) => {
  const factors = [
    { label: 'Weather Regime', value: district.factors.regime, color: 'bg-[#70CBD5]' },
    { label: 'Historical Bias', value: district.factors.historicalBias, color: 'bg-[#B8D957]' },
    { label: 'Moisture Conditions', value: district.factors.moisture, color: 'bg-[#75B8F5]' },
    { label: 'Topography', value: district.factors.topography, color: 'bg-[#F4D35E]' },
    { label: 'Other', value: district.factors.other, color: 'bg-[#D4D4D0]' },
  ];

  return (
    <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[360px]">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-bold text-[#171717] tracking-tight flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            Why did AI change the forecast?
          </h3>
          <button 
            onClick={onViewFactorsModal}
            className="text-[#A3A3A3] hover:text-[#171717] transition-colors"
            title="Inspect factor SHAP values"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Selected District Subtitle */}
        <div className="text-xs font-semibold text-[#525252] mb-3">
          {district.name} ({district.state})
        </div>

        {/* Comparison mini summary */}
        <div className="grid grid-cols-3 gap-1 bg-[#FAFAF8] p-2 rounded-xl border border-[#E7E7E3] text-center mb-3">
          <div>
            <div className="text-[10px] text-[#737373] uppercase font-medium">Raw NWP</div>
            <div className="text-xs font-bold text-[#171717]">{district.rawNwp} mm</div>
          </div>
          <div>
            <div className="text-[10px] text-[#737373] uppercase font-medium">AI Forecast</div>
            <div className="text-xs font-bold text-[#171717]">{district.aiForecast} mm</div>
          </div>
          <div>
            <div className="text-[10px] text-[#737373] uppercase font-medium">Correction</div>
            <div className="text-xs font-bold text-emerald-600">
              {district.difference > 0 ? `+${district.difference}` : district.difference} mm
            </div>
          </div>
        </div>

        {/* Contributing Factors Heading */}
        <div className="text-[10px] font-semibold text-[#737373] uppercase tracking-wider mb-2">
          Contributing Factors
        </div>

        {/* Horizontal Factor Bars */}
        <div className="space-y-2">
          {factors.map((factor) => (
            <div key={factor.label} className="text-xs">
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-[#525252] font-medium">{factor.label}</span>
                <span className="text-[#171717] font-semibold">{factor.value}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#F5F5F3] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${factor.color}`}
                  style={{ width: `${factor.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer disclaimer badge */}
      <div className="pt-2 border-t border-[#F0F0ED] flex items-center justify-between">
        <span className="text-[10px] text-[#A3A3A3] font-medium">
          Illustrative AI Explanation
        </span>
        <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
          High Attribution
        </span>
      </div>
    </div>
  );
};
