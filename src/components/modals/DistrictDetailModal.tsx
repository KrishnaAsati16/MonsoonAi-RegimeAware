import React from 'react';
import { X, MapPin, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import { DistrictData } from '../../types';

interface DistrictDetailModalProps {
  district: DistrictData | null;
  onClose: () => void;
}

export const DistrictDetailModal: React.FC<DistrictDetailModalProps> = ({
  district,
  onClose
}) => {
  if (!district) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white border border-[#E7E7E3] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#E7E7E3] flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF4FE] flex items-center justify-center text-[#2563EB]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#171717]">{district.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EBF4FE] text-[#2563EB] font-semibold">
                  {district.state}
                </span>
              </div>
              <p className="text-xs text-[#737373]">
                Synoptic Regime: <span className="font-semibold text-[#171717]">{district.regime}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#737373] hover:text-[#171717] hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#F5F5F3] border border-[#E7E7E3]">
              <div className="text-[11px] text-[#737373] uppercase font-semibold">Raw NWP</div>
              <div className="text-xl font-bold text-[#171717] mt-0.5">{district.rawNwp} mm</div>
              <div className="text-[10px] text-[#737373] mt-1">NCUM Ensemble mean</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F0F8DC] border border-[#DEEBAB]">
              <div className="text-[11px] text-[#55780D] uppercase font-semibold">AI Corrected</div>
              <div className="text-xl font-bold text-[#171717] mt-0.5">{district.aiForecast} mm</div>
              <div className="text-[10px] text-[#55780D] font-semibold mt-1">
                {district.difference > 0 ? `+${district.difference}` : district.difference} mm adjustment
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FEF4E8] border border-[#FCE6CF]">
              <div className="text-[11px] text-[#F4B860] uppercase font-semibold">Heavy Rain Prob.</div>
              <div className="text-xl font-bold text-[#171717] mt-0.5">{district.heavyRainProbability}%</div>
              <div className="text-[10px] text-[#737373] mt-1">≥ 64.5 mm / 24h</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#EDF8E5] border border-[#D5ECC8]">
              <div className="text-[11px] text-[#3E7B27] uppercase font-semibold">Model Confidence</div>
              <div className="text-xl font-bold text-[#3E7B27] mt-0.5">{district.confidence}%</div>
              <div className="text-[10px] text-[#3E7B27] mt-1">High fidelity</div>
            </div>
          </div>

          {/* AI Attribution Factors */}
          <div className="p-4 rounded-2xl border border-[#E7E7E3] bg-[#FAFAF8]">
            <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              Regime-Aware Factor Weights for {district.name}
            </h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#525252]">Active Monsoon Trough Convection</span>
                  <span className="font-semibold text-[#171717]">{district.factors.regime}%</span>
                </div>
                <div className="h-2 w-full bg-[#E7E7E3] rounded-full overflow-hidden">
                  <div className="h-full bg-[#70CBD5] rounded-full" style={{ width: `${district.factors.regime}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#525252]">Historical Systematic NWP Dry Bias</span>
                  <span className="font-semibold text-[#171717]">{district.factors.historicalBias}%</span>
                </div>
                <div className="h-2 w-full bg-[#E7E7E3] rounded-full overflow-hidden">
                  <div className="h-full bg-[#B8D957] rounded-full" style={{ width: `${district.factors.historicalBias}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#525252]">Precipitable Water & Moisture Flux Convergence</span>
                  <span className="font-semibold text-[#171717]">{district.factors.moisture}%</span>
                </div>
                <div className="h-2 w-full bg-[#E7E7E3] rounded-full overflow-hidden">
                  <div className="h-full bg-[#75B8F5] rounded-full" style={{ width: `${district.factors.moisture}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#525252]">Topographic Uplift & Elevation Gradient</span>
                  <span className="font-semibold text-[#171717]">{district.factors.topography}%</span>
                </div>
                <div className="h-2 w-full bg-[#E7E7E3] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F4D35E] rounded-full" style={{ width: `${district.factors.topography}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Advisory Notes */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Automated Advisory Recommendation</div>
              <p className="mt-0.5 text-amber-800 leading-relaxed">
                Raw NWP underestimates precipitation by {district.difference} mm due to convective parameterization damping. The AI post-processor upgrades warning status to <strong className="uppercase">{district.risk} RAINFALL</strong>. Disaster management authorities are advised to monitor low-lying inundation.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#FAFAF8] border-t border-[#E7E7E3] flex items-center justify-between">
          <span className="text-xs text-[#737373]">
            NCMRWF Unified Model • 06:00 UTC Run
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Official District Bulletin generated for ${district.name}.`)}
              className="px-3 py-2 bg-white border border-[#E7E7E3] text-[#171717] hover:bg-neutral-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download Advisory
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#171717] text-white hover:bg-black rounded-xl text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
