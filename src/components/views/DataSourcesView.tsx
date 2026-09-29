import React from 'react';
import { Database, CheckCircle2, RefreshCw, Radio, Satellite, Mountain } from 'lucide-react';
import { DATA_SOURCES } from '../../data/mockData';

export const DataSourcesView: React.FC = () => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#171717] tracking-tight flex items-center gap-2">
            <Database className="w-5 h-5 text-[#2563EB]" />
            Observational & Model Ingestion Pipeline
          </h1>
          <p className="text-xs text-[#737373] mt-0.5">
            Real-time multi-source data integration feeding the regime detection and post-processing pipeline.
          </p>
        </div>

        <button className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white border border-[#E7E7E3] text-[#171717] hover:bg-neutral-50 flex items-center gap-1.5 shadow-sm">
          <RefreshCw className="w-3.5 h-3.5" />
          Poll Feeds
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DATA_SOURCES.map((source, index) => (
          <div key={index} className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E3] text-[#737373]">
                  {source.type}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {source.status}
                </span>
              </div>

              <h2 className="text-base font-bold text-[#171717] mt-1">{source.name}</h2>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#F0F0ED] text-xs">
                <div>
                  <span className="text-[10px] text-[#737373] uppercase block">Cadence</span>
                  <span className="font-semibold text-[#171717]">{source.updateFrequency}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] uppercase block">Ingest Latency</span>
                  <span className="font-semibold text-[#171717]">{source.latency}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
