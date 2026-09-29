import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { DistrictData } from '../../types';

interface DistrictForecastTableProps {
  districts: DistrictData[];
  selectedDistrict: DistrictData;
  onSelectDistrict: (district: DistrictData) => void;
}

export const DistrictForecastTable: React.FC<DistrictForecastTableProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict
}) => {
  const [query, setQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('All');
  const [selectedRegimeFilter, setSelectedRegimeFilter] = useState<string>('All');

  const filteredDistricts = districts.filter(d => {
    const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase()) || 
                         d.state.toLowerCase().includes(query.toLowerCase());
    const matchesRisk = selectedRiskFilter === 'All' || d.risk === selectedRiskFilter;
    const matchesRegime = selectedRegimeFilter === 'All' || d.regime === selectedRegimeFilter;
    return matchesQuery && matchesRisk && matchesRegime;
  });

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Very Heavy':
      case 'Extremely Heavy':
        return 'bg-[#FDECE9] text-[#E98276] border border-[#FADAD5]';
      case 'Heavy':
        return 'bg-[#FEF4E8] text-[#F4B860] border border-[#FCE6CF]';
      case 'Moderate':
        return 'bg-[#FEF9E6] text-[#D89F00] border border-[#FBEEC0]';
      default:
        return 'bg-[#F0F8DC] text-[#55780D] border border-[#DEEBAB]';
    }
  };

  return (
    <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[360px]">
      {/* Table Header and Search / Filters */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
          <h3 className="text-sm font-bold text-[#171717] tracking-tight">
            District Forecast
          </h3>

          {/* Quick Filter Selectors */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search district..."
                className="pl-7 pr-2.5 py-1 text-xs bg-[#FAFAF8] border border-[#E7E7E3] rounded-lg focus:outline-none focus:border-neutral-400 w-32 sm:w-36 text-[#171717]"
              />
            </div>

            {/* Risk filter selector */}
            <div className="relative inline-block">
              <select
                value={selectedRiskFilter}
                onChange={(e) => setSelectedRiskFilter(e.target.value)}
                className="text-xs bg-[#FAFAF8] border border-[#E7E7E3] text-[#525252] rounded-lg px-2 py-1 pr-5 appearance-none focus:outline-none cursor-pointer"
              >
                <option value="All">Risk: All</option>
                <option value="Very Heavy">Very Heavy</option>
                <option value="Heavy">Heavy</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#737373]" />
            </div>

            {/* Regime filter */}
            <div className="relative inline-block">
              <select
                value={selectedRegimeFilter}
                onChange={(e) => setSelectedRegimeFilter(e.target.value)}
                className="text-xs bg-[#FAFAF8] border border-[#E7E7E3] text-[#525252] rounded-lg px-2 py-1 pr-5 appearance-none focus:outline-none cursor-pointer"
              >
                <option value="All">Regime: All</option>
                <option value="Active Monsoon">Active</option>
                <option value="Coastal">Coastal</option>
                <option value="Orographic">Orographic</option>
                <option value="Depression">Depression</option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#737373]" />
            </div>
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto overflow-y-auto max-h-[220px]">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] uppercase tracking-wider text-[#737373] bg-[#FAFAF8] sticky top-0 border-b border-[#E7E7E3]">
              <tr>
                <th className="py-1.5 px-2 font-semibold">District</th>
                <th className="py-1.5 px-2 font-semibold">State</th>
                <th className="py-1.5 px-2 font-semibold">Regime</th>
                <th className="py-1.5 px-2 font-semibold text-right">Raw NWP</th>
                <th className="py-1.5 px-2 font-semibold text-right">AI Forecast</th>
                <th className="py-1.5 px-2 font-semibold text-right">Prob.</th>
                <th className="py-1.5 px-2 font-semibold text-center">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0ED]">
              {filteredDistricts.slice(0, 6).map((district) => {
                const isSelected = selectedDistrict.id === district.id;

                return (
                  <tr
                    key={district.id}
                    onClick={() => onSelectDistrict(district)}
                    className={`
                      cursor-pointer transition-colors
                      ${isSelected ? 'bg-[#FAFAF8] font-semibold' : 'hover:bg-[#FDFDFD]'}
                    `}
                  >
                    <td className="py-2 px-2 text-[#171717] font-medium flex items-center gap-1.5">
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                      {district.name}
                    </td>
                    <td className="py-2 px-2 text-[#737373] text-[11px]">
                      {district.state === 'Madhya Pradesh' ? 'MP' :
                       district.state === 'Maharashtra' ? 'MH' :
                       district.state === 'Uttarakhand' ? 'UK' :
                       district.state === 'Odisha' ? 'OD' :
                       district.state === 'Assam' ? 'AS' :
                       district.state === 'Himachal Pradesh' ? 'HP' : district.state}
                    </td>
                    <td className="py-2 px-2 text-[#737373] text-[11px]">
                      {district.regime}
                    </td>
                    <td className="py-2 px-2 text-right text-[#525252]">
                      {district.rawNwp} mm
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-[#171717]">
                      {district.aiForecast} mm
                    </td>
                    <td className="py-2 px-2 text-right text-[#525252]">
                      {district.heavyRainProbability}%
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${getRiskBadge(district.risk)}`}>
                        {district.risk}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer count */}
      <div className="pt-2 border-t border-[#F0F0ED] flex items-center justify-between text-[11px] text-[#737373]">
        <span>Showing {Math.min(filteredDistricts.length, 6)} of {districts.length} active districts</span>
        <span className="text-[10px] font-mono text-[#A3A3A3]">Click row to inspect on map</span>
      </div>
    </div>
  );
};
