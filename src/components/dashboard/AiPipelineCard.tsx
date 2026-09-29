import React, { useState } from 'react';
import { 
  Cloud, 
  Wind, 
  Brain, 
  Layers, 
  Sliders, 
  Droplets, 
  MapPin, 
  ChevronRight,
  Info
} from 'lucide-react';
import { PIPELINE_STEPS } from '../../data/mockData';
import { PipelineStep } from '../../types';

export const AiPipelineCard: React.FC = () => {
  const [activeStep, setActiveStep] = useState<PipelineStep>(PIPELINE_STEPS[4]); // Step 5 Bias Correction default active

  const renderIcon = (iconName: string) => {
    const props = { className: "w-4 h-4" };
    switch (iconName) {
      case 'Cloud': return <Cloud {...props} className="w-4 h-4 text-[#75B8F5]" />;
      case 'Wind': return <Wind {...props} className="w-4 h-4 text-[#70CBD5]" />;
      case 'Brain': return <Brain {...props} className="w-4 h-4 text-[#B8D957]" />;
      case 'Layers': return <Layers {...props} className="w-4 h-4 text-[#2563EB]" />;
      case 'Sliders': return <Sliders {...props} className="w-4 h-4 text-[#F4B860]" />;
      case 'Droplets': return <Droplets {...props} className="w-4 h-4 text-[#E98276]" />;
      case 'MapPin': return <MapPin {...props} className="w-4 h-4 text-[#171717]" />;
      default: return <Cloud {...props} />;
    }
  };

  return (
    <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] mb-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-[#171717] tracking-tight flex items-center gap-2">
            AI Post-Processing Pipeline
          </h2>
          <p className="text-xs text-[#737373] font-medium">
            Multi-stage synoptic regime classification & deep bias correction architecture
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#737373] bg-[#FAFAF8] px-2.5 py-1 rounded-lg border border-[#E7E7E3]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Continuous Inference Active</span>
        </div>
      </div>

      {/* 7 Horizontal Connected Pipeline Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-1.5 relative">
        {PIPELINE_STEPS.map((step, idx) => {
          const isSelected = activeStep.step === step.step;

          return (
            <div key={step.step} className="relative flex flex-col items-center">
              {/* Card button for step */}
              <button
                onClick={() => setActiveStep(step)}
                className={`
                  w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between h-full min-h-[105px]
                  ${isSelected 
                    ? 'bg-[#FAFAF8] border-[#171717] shadow-sm ring-1 ring-[#171717]/10' 
                    : 'bg-white border-[#E7E7E3] hover:border-neutral-300 hover:bg-[#FBFBFA]'
                  }
                `}
              >
                {/* Step number and icon */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-[#737373]">
                    {step.step}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-[#F5F5F3] flex items-center justify-center">
                    {renderIcon(step.icon)}
                  </div>
                </div>

                {/* Title and Short Description */}
                <div>
                  <div className="text-[11px] font-bold text-[#171717] leading-tight">
                    {step.title}
                  </div>
                  <div className="text-[10px] text-[#737373] mt-0.5 leading-snug line-clamp-2">
                    {step.description}
                  </div>
                </div>
              </button>

              {/* Connecting arrow for larger screens */}
              {idx < PIPELINE_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#A3A3A3] pointer-events-none">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active step details drawer */}
      <div className="mt-3 p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E3] flex items-start gap-2.5 text-xs text-[#525252]">
        <Info className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-semibold text-[#171717] mr-2">
            Step {activeStep.step} — {activeStep.title}:
          </span>
          <span className="text-[#525252]">{activeStep.details}</span>
        </div>
      </div>
    </div>
  );
};
