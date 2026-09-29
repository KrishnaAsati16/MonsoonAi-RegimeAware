import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { TIME_SERIES_COMPARISON } from '../../data/mockData';

export const NwpVsAiChartCard: React.FC = () => {
  const [activeHorizon, setActiveHorizon] = useState<'24h' | '48h' | '72h'>('24h');

  // Custom clean tooltip matching dashboard aesthetic
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[#E7E7E3] p-2.5 rounded-xl shadow-lg text-xs space-y-1">
          <div className="font-bold text-[#171717] pb-1 border-b border-[#F0F0ED]">
            Lead Time: {label}
          </div>
          {payload.map((item: any) => (
            <div key={item.name} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-[#737373]">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}:
              </span>
              <span className="font-semibold text-[#171717]">
                {item.value} mm
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[360px]">
      {/* Header with Title and Horizon Pills */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div>
            <h3 className="text-sm font-bold text-[#171717] tracking-tight">
              Raw NWP vs AI Corrected
            </h3>
            <p className="text-xs text-[#737373]">
              Rainfall forecast comparison
            </p>
          </div>

          {/* Lead time pills */}
          <div className="flex items-center bg-[#FAFAF8] p-1 rounded-xl border border-[#E7E7E3]">
            {(['24h', '48h', '72h'] as const).map((horizon) => (
              <button
                key={horizon}
                onClick={() => setActiveHorizon(horizon)}
                className={`
                  px-2 py-0.5 text-[11px] font-semibold rounded-lg transition-all
                  ${activeHorizon === horizon 
                    ? 'bg-[#171717] text-white shadow-sm' 
                    : 'text-[#737373] hover:text-[#171717]'
                  }
                `}
              >
                {horizon}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] font-medium text-[#737373] mt-2 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#75B8F5]" />
            <span>Raw NWP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8D957]" />
            <span>AI Corrected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-dashed border-[#A3A3A3] bg-transparent" />
            <span>Observed</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-44 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={TIME_SERIES_COMPARISON} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0ED" />
            <XAxis 
              dataKey="leadTime" 
              stroke="#A3A3A3" 
              fontSize={10} 
              tickLine={false} 
              axisLine={{ stroke: '#E7E7E3' }}
            />
            <YAxis 
              stroke="#A3A3A3" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              domain={[0, 100]}
              ticks={[0, 50, 100, 150, 200]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="rawNwp" 
              name="Raw NWP" 
              stroke="#75B8F5" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#75B8F5' }} 
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="aiCorrected" 
              name="AI Corrected" 
              stroke="#B8D957" 
              strokeWidth={2.5} 
              dot={{ r: 3.5, fill: '#B8D957' }} 
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="observed" 
              name="Observed" 
              stroke="#A3A3A3" 
              strokeWidth={1.5} 
              strokeDasharray="4 4" 
              dot={{ r: 2.5, fill: '#A3A3A3' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats footer row matching reference */}
      <div className="pt-3 border-t border-[#F0F0ED] flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] text-[#737373] uppercase block font-medium">NWP Bias</span>
          <div className="flex items-center gap-0.5 text-rose-500 font-bold text-xs">
            <span>+28.4 mm</span>
            <ArrowUp className="w-3 h-3" />
          </div>
        </div>

        <div>
          <span className="text-[10px] text-[#737373] uppercase block font-medium">AI Bias</span>
          <div className="flex items-center gap-0.5 text-emerald-600 font-bold text-xs">
            <span>+7.2 mm</span>
            <ArrowDown className="w-3 h-3" />
          </div>
        </div>

        <div>
          <span className="text-[10px] text-[#737373] uppercase block font-medium">Bias Reduction</span>
          <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#F0F8DC] text-[#4A7207]">
            74.6%
          </span>
        </div>

        <div className="text-[10px] text-[#A3A3A3] font-medium hidden sm:block">
          Prototype Data
        </div>
      </div>
    </div>
  );
};
