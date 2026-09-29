import React from 'react';
import { CloudLightning, AlertTriangle, ShieldAlert, CheckCircle, Bell, ArrowRight } from 'lucide-react';
import { RAINFALL_ALERTS } from '../../data/mockData';

export const HeavyRainfallView: React.FC = () => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl font-bold text-[#171717] tracking-tight flex items-center gap-2">
          <CloudLightning className="w-5 h-5 text-[#E98276]" />
          Heavy Rainfall Early Warning System
        </h1>
        <p className="text-xs text-[#737373] mt-0.5">
          Calibrated probabilistic exceedance guidance for IMD standard rainfall classification categories.
        </p>
      </div>

      {/* Threshold Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">Moderate Rain</div>
          <div className="text-lg font-bold text-[#171717] mt-1">15.6 – 64.4 mm</div>
          <div className="text-xs text-[#737373] mt-1">142 Districts in Band</div>
          <div className="mt-3 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
            Green (No Advisory)
          </div>
        </div>

        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">Heavy Rain</div>
          <div className="text-lg font-bold text-[#171717] mt-1">64.5 – 115.5 mm</div>
          <div className="text-xs text-[#737373] mt-1">35 Districts at Risk</div>
          <div className="mt-3 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
            Yellow (Be Updated)
          </div>
        </div>

        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">Very Heavy Rain</div>
          <div className="text-lg font-bold text-[#171717] mt-1">115.6 – 204.4 mm</div>
          <div className="text-xs text-[#737373] mt-1">12 Districts at Risk</div>
          <div className="mt-3 text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full inline-block">
            Orange (Be Prepared)
          </div>
        </div>

        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">Extremely Heavy</div>
          <div className="text-lg font-bold text-[#171717] mt-1">≥ 204.5 mm</div>
          <div className="text-xs text-[#737373] mt-1">3 Coastal Districts</div>
          <div className="mt-3 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full inline-block">
            Red Alert (Take Action)
          </div>
        </div>
      </div>

      {/* Active Bulletins & Incident Dispatch */}
      <div className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h3 className="text-sm font-bold text-[#171717] mb-3">Live Exceedance Advisory Feed</h3>
        <div className="space-y-3">
          {RAINFALL_ALERTS.map((alert) => (
            <div key={alert.id} className="p-4 rounded-xl border border-[#E7E7E3] bg-[#FAFAF8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl ${
                  alert.level === 'VERY HEAVY' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-700'
                }`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#171717]">{alert.district}, {alert.state}</h4>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white border border-[#E7E7E3] text-[#171717]">
                      {alert.level}
                    </span>
                  </div>
                  <p className="text-xs text-[#525252] mt-1">
                    AI Predicted Accumulation: <strong>{alert.rainfall} mm</strong> • Probability: <strong>{alert.probability}%</strong> • Horizon: {alert.leadTime}
                  </p>
                  <p className="text-[11px] text-[#737373] mt-0.5">{alert.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white border border-[#E7E7E3] text-[#171717] hover:bg-neutral-50 shadow-sm">
                  Dispatch NDMA Alert
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
