import React, { useState } from 'react';
import { Settings as SettingsIcon, Sliders, Bell, Shield, Save } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [cycle, setCycle] = useState('06:00 UTC');
  const [threshold, setThreshold] = useState('64.5');
  const [demoMode, setDemoMode] = useState(true);

  return (
    <div className="space-y-5 max-w-3xl animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl font-bold text-[#171717] tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-[#2563EB]" />
          Forecast Engine Configuration
        </h1>
        <p className="text-xs text-[#737373] mt-0.5">
          Operational runtime parameters for regime classification and disaster alert thresholds.
        </p>
      </div>

      <div className="bg-white border border-[#E7E7E3] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        {/* Forecast Cycle Selector */}
        <div>
          <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1">
            Active Forecast Ingestion Cycle
          </label>
          <p className="text-xs text-[#737373] mb-3">
            Select NWP cycle for real-time inference and bias post-processing.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['00:00 UTC', '06:00 UTC', '12:00 UTC', '18:00 UTC'].map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  cycle === c 
                    ? 'bg-[#171717] text-white border-[#171717]' 
                    : 'bg-[#FAFAF8] text-[#525252] border-[#E7E7E3] hover:border-neutral-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Heavy Rain Alert Threshold */}
        <div className="pt-4 border-t border-[#F0F0ED]">
          <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-1">
            Severe Precipitation Exceedance Threshold (mm / 24h)
          </label>
          <p className="text-xs text-[#737373] mb-3">
            Sets the probability threshold trigger for administrative district warnings.
          </p>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="30"
              max="150"
              step="5"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="flex-1 accent-[#171717]"
            />
            <span className="text-sm font-bold text-[#171717] bg-[#FAFAF8] px-3 py-1 rounded-xl border border-[#E7E7E3]">
              {threshold} mm
            </span>
          </div>
        </div>

        {/* Prototype Demo Mode Toggle */}
        <div className="pt-4 border-t border-[#F0F0ED] flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#171717]">Interactive Prototype Simulation Mode</div>
            <p className="text-xs text-[#737373] mt-0.5">
              Enables offline simulation datasets with pre-calculated post-processing runs.
            </p>
          </div>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              demoMode ? 'bg-[#171717]' : 'bg-[#E7E7E3]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                demoMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-[#F0F0ED] flex justify-end">
          <button
            onClick={() => alert('Operational settings saved successfully.')}
            className="px-4 py-2 bg-[#171717] text-white hover:bg-black rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
