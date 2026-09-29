import React from 'react';
import { Waves, CloudRain, Wind, Mountain, Sun, Zap, CheckCircle2 } from 'lucide-react';

export const WeatherRegimesView: React.FC = () => {
  const regimes = [
    {
      id: 'active',
      name: 'Active Monsoon',
      confidence: '87.4%',
      status: 'Current Active Regime',
      description: 'Monsoon trough south of its normal position with vigorous cross-equatorial southwesterly flow and active deep convection along central India.',
      features: ['Monsoon trough over Central India', 'Strong low-level jet (LLJ) > 35 knots', 'High precipitable water > 60 mm'],
      biasCorrectionBehavior: 'Amplifies convective peaks by +20% to +35% to correct NWP damping',
      color: 'border-l-4 border-l-[#B8D957]'
    },
    {
      id: 'break',
      name: 'Break Monsoon',
      confidence: '5.2%',
      status: 'Secondary Probability',
      description: 'Trough shifts north to the Himalayan foothills. Convection ceases over central India while foothills experience flash floods.',
      features: ['Trough located at foothills of Himalayas', 'Subdued rainfall over Central & Peninsular India', 'Enhanced rainfall over Assam & Bihar'],
      biasCorrectionBehavior: 'Dampens false-positive NWP convective storms over central plains',
      color: 'border-l-4 border-l-[#75B8F5]'
    },
    {
      id: 'depression',
      name: 'Monsoon Depression',
      confidence: '4.1%',
      status: 'Monitored',
      description: 'Low pressure systems originating over North Bay of Bengal moving west-northwestwards along the monsoon trough line.',
      features: ['Surface pressure anomaly < -4 hPa', 'Heavy rainfall in southwest sector', 'Intense vortex vorticity at 850 hPa'],
      biasCorrectionBehavior: 'Sharpens asymmetric precipitation gradients in southwest quadrant',
      color: 'border-l-4 border-l-[#F4D35E]'
    },
    {
      id: 'coastal',
      name: 'Coastal Monsoon',
      confidence: '2.1%',
      status: 'Active Locally',
      description: 'Offshore trough extending from south Gujarat to Kerala coast with persistent convergence and heavy coastal downpours.',
      features: ['Offshore vortex formation', 'Perpendicular wind impingement on coast', 'Severe diurnal offshore convection'],
      biasCorrectionBehavior: 'Corrects coastal rainband displacement errors by 25-50 km',
      color: 'border-l-4 border-l-[#70CBD5]'
    },
    {
      id: 'orographic',
      name: 'Orographic Heavy',
      confidence: '1.2%',
      status: 'Active in Western Ghats & Hills',
      description: 'Moisture-laden monsoon winds forced up steep mountain slopes (Western Ghats, Meghalaya hills, Himalayas).',
      features: ['Windward precipitation enhancement > 300%', 'Sharp rain shadow on leeward side', 'High elevation lapse rates'],
      biasCorrectionBehavior: 'Incorporates high-res digital elevation models to resolve localized crest rain',
      color: 'border-l-4 border-l-[#F4B860]'
    },
    {
      id: 'western_disturbance',
      name: 'Western Disturbance',
      confidence: '0.8%',
      status: 'Quiescent',
      description: 'Mid-latitude upper air westerly troughs that interact with the monsoon circulation over northwest India.',
      features: ['Westerly winds aloft at 200 hPa', 'Cold air advection in upper troposphere', 'Interaction with monsoon humidity'],
      biasCorrectionBehavior: 'Identifies unseasonable severe hail and squall risks',
      color: 'border-l-4 border-l-[#D4D4D0]'
    }
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl font-bold text-[#171717] tracking-tight flex items-center gap-2">
          <Waves className="w-5 h-5 text-[#2563EB]" />
          Synoptic Weather Regime Classification
        </h1>
        <p className="text-xs text-[#737373] mt-0.5">
          MoES-NCMRWF AI classifies prevailing atmospheric circulation into 6 distinct physical regimes to select optimal post-processing weights.
        </p>
      </div>

      {/* Regimes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regimes.map((regime) => (
          <div 
            key={regime.id}
            className={`bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between ${regime.color}`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E3] text-[#525252]">
                  {regime.confidence} Probability
                </span>
                {regime.id === 'active' && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" /> ACTIVE
                  </span>
                )}
              </div>

              <h2 className="text-base font-bold text-[#171717] mt-1">{regime.name}</h2>
              <p className="text-xs text-[#525252] mt-2 leading-relaxed">{regime.description}</p>

              <div className="mt-4 pt-3 border-t border-[#F0F0ED]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#737373] mb-1.5">
                  Key Synoptic Indicators
                </div>
                <ul className="space-y-1 text-xs text-[#525252]">
                  {regime.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0F0ED] bg-[#FAFAF8] -mx-5 -mb-5 p-3 rounded-b-2xl">
              <span className="text-[10px] uppercase font-bold text-[#737373] block">AI Action</span>
              <span className="text-xs text-[#171717] font-medium">{regime.biasCorrectionBehavior}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
