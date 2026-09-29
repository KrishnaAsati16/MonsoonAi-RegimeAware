import React, { useState } from 'react';
import { CloudRain, Calendar, Clock, Download, Filter, MapPin } from 'lucide-react';
import { DISTRICTS_DATA } from '../../data/mockData';

export const ForecastView: React.FC = () => {
  const [selectedHorizon, setSelectedHorizon] = useState('24h');
  const [selectedRegion, setSelectedRegion] = useState('Central India');

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#171717] tracking-tight">
            Multi-Lead Quantitative Precipitation Forecast
          </h1>
          <p className="text-xs text-[#737373] mt-0.5">
            Post-processed spatial grid runs at 6h, 12h, 24h, 48h, and 72h horizons
          </p>
        </div>

        {/* Lead time selectors */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white p-1 rounded-xl border border-[#E7E7E3] shadow-sm">
            {['6h', '12h', '24h', '36h', '48h', '72h'].map((h) => (
              <button
                key={h}
                onClick={() => setSelectedHorizon(h)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  selectedHorizon === h ? 'bg-[#171717] text-white' : 'text-[#737373] hover:text-[#171717]'
                }`}
              >
                {h}
              </button>
            ))}
          </div>

          <button className="px-3 py-2 bg-white border border-[#E7E7E3] text-[#171717] hover:bg-[#FAFAF8] rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <Download className="w-3.5 h-3.5" />
            Export NetCDF
          </button>
        </div>
      </div>

      {/* Regional Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Central India */}
        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#171717] uppercase tracking-wider">Central India</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FEF4E8] text-[#F4B860]">
              Active Trough
            </span>
          </div>
          <div className="text-2xl font-bold text-[#171717] mb-1">68.4 mm avg</div>
          <div className="text-xs text-[#737373] mb-4">AI Bias Correction: <span className="font-semibold text-emerald-600">+18.2 mm</span></div>
          <div className="h-1.5 w-full bg-[#F5F5F3] rounded-full overflow-hidden">
            <div className="h-full bg-[#B8D957] rounded-full" style={{ width: '84%' }}></div>
          </div>
          <div className="mt-3 text-[11px] text-[#737373] flex justify-between">
            <span>Severe risk districts: 14</span>
            <span>Confidence: 93%</span>
          </div>
        </div>

        {/* Western Coast & Ghats */}
        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#171717] uppercase tracking-wider">West Coast & Ghats</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FDECE9] text-[#E98276]">
              Offshore Trough
            </span>
          </div>
          <div className="text-2xl font-bold text-[#171717] mb-1">112.6 mm avg</div>
          <div className="text-xs text-[#737373] mb-4">AI Bias Correction: <span className="font-semibold text-emerald-600">+29.5 mm</span></div>
          <div className="h-1.5 w-full bg-[#F5F5F3] rounded-full overflow-hidden">
            <div className="h-full bg-[#E98276] rounded-full" style={{ width: '92%' }}></div>
          </div>
          <div className="mt-3 text-[11px] text-[#737373] flex justify-between">
            <span>Severe risk districts: 21</span>
            <span>Confidence: 95%</span>
          </div>
        </div>

        {/* Northeast India */}
        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#171717] uppercase tracking-wider">Northeast Hills</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F0F8DC] text-[#55780D]">
              Orographic Lift
            </span>
          </div>
          <div className="text-2xl font-bold text-[#171717] mb-1">79.1 mm avg</div>
          <div className="text-xs text-[#737373] mb-4">AI Bias Correction: <span className="font-semibold text-emerald-600">+19.8 mm</span></div>
          <div className="h-1.5 w-full bg-[#F5F5F3] rounded-full overflow-hidden">
            <div className="h-full bg-[#70CBD5] rounded-full" style={{ width: '76%' }}></div>
          </div>
          <div className="mt-3 text-[11px] text-[#737373] flex justify-between">
            <span>Severe risk districts: 8</span>
            <span>Confidence: 91%</span>
          </div>
        </div>
      </div>

      {/* Detailed Forecast Grid Table */}
      <div className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h3 className="text-sm font-bold text-[#171717] mb-3">District Lead Time Forecast Progression (mm)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAFAF8] text-[#737373] uppercase text-[10px] tracking-wider border-b border-[#E7E7E3]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">District</th>
                <th className="py-2.5 px-3 font-semibold">State</th>
                <th className="py-2.5 px-3 font-semibold text-right">+6h</th>
                <th className="py-2.5 px-3 font-semibold text-right">+12h</th>
                <th className="py-2.5 px-3 font-semibold text-right font-bold text-[#171717] bg-[#F5F5F3]">+24h</th>
                <th className="py-2.5 px-3 font-semibold text-right">+36h</th>
                <th className="py-2.5 px-3 font-semibold text-right">+48h</th>
                <th className="py-2.5 px-3 font-semibold text-right">+72h</th>
                <th className="py-2.5 px-3 font-semibold text-center">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0ED]">
              {DISTRICTS_DATA.map((d) => (
                <tr key={d.id} className="hover:bg-[#FAFAF8]">
                  <td className="py-2.5 px-3 font-semibold text-[#171717]">{d.name}</td>
                  <td className="py-2.5 px-3 text-[#737373]">{d.state}</td>
                  <td className="py-2.5 px-3 text-right text-[#525252]">{Math.round(d.aiForecast * 0.25)} mm</td>
                  <td className="py-2.5 px-3 text-right text-[#525252]">{Math.round(d.aiForecast * 0.55)} mm</td>
                  <td className="py-2.5 px-3 text-right font-bold text-[#171717] bg-[#F9FAF7]">{d.aiForecast} mm</td>
                  <td className="py-2.5 px-3 text-right text-[#525252]">{Math.round(d.aiForecast * 1.2)} mm</td>
                  <td className="py-2.5 px-3 text-right text-[#525252]">{Math.round(d.aiForecast * 1.45)} mm</td>
                  <td className="py-2.5 px-3 text-right text-[#525252]">{Math.round(d.aiForecast * 1.7)} mm</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E3] text-[#171717]">
                      {d.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
