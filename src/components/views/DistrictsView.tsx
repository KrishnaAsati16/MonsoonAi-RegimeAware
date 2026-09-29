import React, { useState } from 'react';
import { MapPin, Search, Filter, Download, ArrowRight } from 'lucide-react';
import { DISTRICTS_DATA } from '../../data/mockData';
import { DistrictData } from '../../types';

interface DistrictsViewProps {
  onSelectDistrict: (district: DistrictData) => void;
}

export const DistrictsView: React.FC<DistrictsViewProps> = ({ onSelectDistrict }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');

  const states = ['All', ...new Set(DISTRICTS_DATA.map(d => d.state))];

  const filtered = DISTRICTS_DATA.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'All' || d.state === selectedState;
    const matchesRisk = selectedRisk === 'All' || d.risk === selectedRisk;
    return matchesSearch && matchesState && matchesRisk;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#171717] tracking-tight flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#2563EB]" />
            District-Level Forecast Explorer
          </h1>
          <p className="text-xs text-[#737373] mt-0.5">
            Operational post-processed rainfall guidance for all 700+ administrative districts of India.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
            <input
              type="text"
              placeholder="Search district or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E7E7E3] rounded-xl shadow-sm focus:outline-none focus:border-neutral-400 w-48 text-[#171717]"
            />
          </div>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs bg-white border border-[#E7E7E3] rounded-xl px-3 py-1.5 shadow-sm text-[#525252] focus:outline-none"
          >
            {states.map(s => <option key={s} value={s}>State: {s}</option>)}
          </select>

          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="text-xs bg-white border border-[#E7E7E3] rounded-xl px-3 py-1.5 shadow-sm text-[#525252] focus:outline-none"
          >
            <option value="All">All Risks</option>
            <option value="Very Heavy">Very Heavy</option>
            <option value="Heavy">Heavy</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* District Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((d) => (
          <div
            key={d.id}
            onClick={() => onSelectDistrict(d)}
            className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E3] text-[#737373]">
                  {d.state}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  d.risk === 'Very Heavy' ? 'bg-[#FDECE9] text-[#E98276]' :
                  d.risk === 'Heavy' ? 'bg-[#FEF4E8] text-[#F4B860]' :
                  'bg-[#F0F8DC] text-[#55780D]'
                }`}>
                  {d.risk}
                </span>
              </div>

              <h2 className="text-base font-bold text-[#171717]">{d.name}</h2>
              <div className="text-xs text-[#737373] mt-0.5">Regime: {d.regime}</div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#F0F0ED] text-center">
                <div className="bg-[#FAFAF8] p-2 rounded-xl">
                  <div className="text-[10px] text-[#737373] uppercase">Raw NWP</div>
                  <div className="text-xs font-bold text-[#171717] mt-0.5">{d.rawNwp} mm</div>
                </div>

                <div className="bg-[#F0F8DC] p-2 rounded-xl">
                  <div className="text-[10px] text-[#55780D] uppercase font-semibold">AI Corrected</div>
                  <div className="text-xs font-bold text-[#171717] mt-0.5">{d.aiForecast} mm</div>
                </div>

                <div className="bg-[#FAFAF8] p-2 rounded-xl">
                  <div className="text-[10px] text-[#737373] uppercase">Correction</div>
                  <div className="text-xs font-bold text-emerald-600 mt-0.5">
                    {d.difference > 0 ? `+${d.difference}` : d.difference} mm
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0F0ED] flex items-center justify-between text-xs text-[#737373]">
              <span>Confidence: <strong className="text-[#171717]">{d.confidence}%</strong></span>
              <span className="flex items-center gap-1 font-semibold text-[#171717] group-hover:translate-x-0.5 transition-transform">
                Inspect Factors <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
