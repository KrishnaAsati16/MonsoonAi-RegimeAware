import React from 'react';
import { CloudLightning, ArrowRight } from 'lucide-react';
import { RAINFALL_ALERTS } from '../../data/mockData';
import { RainfallAlert } from '../../types';

interface RainfallAlertsCardProps {
  onSelectAlert?: (alert: RainfallAlert) => void;
  onViewAllAlerts?: () => void;
}

export const RainfallAlertsCard: React.FC<RainfallAlertsCardProps> = ({
  onSelectAlert,
  onViewAllAlerts
}) => {
  return (
    <div className="bg-[#18191B] border border-[#2A2B2E] rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex flex-col justify-between h-[270px] text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CloudLightning className="w-4 h-4 text-[#F4D35E]" />
          <h3 className="text-xs font-semibold text-neutral-200 tracking-wide">
            Rainfall Alerts
          </h3>
        </div>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E98276] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E98276]"></span>
        </span>
      </div>

      {/* Alert Rows */}
      <div className="space-y-2.5 my-auto">
        {RAINFALL_ALERTS.map((alert) => {
          const badgeColor = 
            alert.level === 'VERY HEAVY' ? 'text-[#FF8577] bg-[#3B1E1C]' :
            alert.level === 'HEAVY' ? 'text-[#F4B860] bg-[#382813]' :
            'text-[#F4D35E] bg-[#362F16]';

          return (
            <div 
              key={alert.id}
              onClick={() => onSelectAlert?.(alert)}
              className="p-2 rounded-xl bg-[#222326] border border-[#2E3035] hover:border-neutral-600 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider ${badgeColor}`}>
                    {alert.level}
                  </span>
                  <span className="text-xs font-semibold text-white group-hover:text-neutral-200 transition-colors">
                    {alert.district}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 pl-0.5">
                  {alert.rainfall} mm <span className="text-neutral-600">•</span> {alert.probability}%
                </div>
              </div>

              <div className="w-5 h-5 rounded-full bg-[#2A2B2E] flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer link */}
      <div className="pt-2 border-t border-[#2A2B2E] flex items-center justify-between">
        <button
          onClick={onViewAllAlerts}
          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium group"
        >
          <span>View all alerts</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
        <span className="text-[10px] text-neutral-500 font-mono">Updated 06:00 UTC</span>
      </div>
    </div>
  );
};
