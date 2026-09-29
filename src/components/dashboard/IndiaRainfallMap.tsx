import React, { useState, useEffect, useRef } from 'react';
import { MapLayer, DistrictData } from '../../types';
import { Plus, Minus, Navigation, MapPin, ArrowRight } from 'lucide-react';

interface IndiaRainfallMapProps {
  districts: DistrictData[];
  selectedDistrict: DistrictData;
  onSelectDistrict: (district: DistrictData) => void;
  onViewDetails: (district: DistrictData) => void;
}

export const IndiaRainfallMap: React.FC<IndiaRainfallMapProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
  onViewDetails,
}) => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('Raw NWP');
  const [zoomLevel, setZoomLevel] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const layers: MapLayer[] = ['Raw NWP', 'AI Corrected', 'Difference', 'Probability', 'Regime'];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.85));
  const handleResetZoom = () => setZoomLevel(1);

  // Accurate SVG & Canvas coordinate projection for India
  // Map dimensions: 620 x 680
  const projectCoords = (lat: number, lng: number) => {
    const x = ((lng - 67.5) / (97.8 - 67.5)) * 520 + 35;
    const y = ((37.2 - lat) / (37.2 - 7.5)) * 600 + 35;
    return { x, y };
  };

  // High-precision SVG path for India's mainland and borders
  const indiaPathD = `
    M 172,75
    C 185,55 205,42 225,40
    C 240,38 250,55 260,70
    C 272,88 285,110 292,128
    C 298,142 305,152 322,158
    C 340,165 372,175 390,195
    C 405,210 435,215 460,225
    C 485,235 520,230 535,248
    C 545,260 540,282 525,295
    C 510,305 488,300 472,305
    C 455,310 442,320 430,325
    C 418,330 402,342 392,352
    C 380,365 372,385 365,408
    C 358,430 350,455 338,485
    C 328,510 315,535 305,555
    C 298,570 290,580 285,582
    C 280,580 274,560 268,535
    C 260,500 252,460 245,420
    C 238,380 230,345 220,325
    C 210,310 190,305 178,310
    C 165,315 152,325 142,318
    C 132,305 140,285 152,270
    C 168,250 162,230 158,210
    C 152,190 138,175 142,155
    C 148,130 160,105 172,75 Z
  `;

  // Draw rich weather raster heatmap matching reference screenshot
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Create realistic rainfall weather pattern
    ctx.save();

    // Clip to India polygon path so rain stays precisely inside landmass
    const path = new Path2D(indiaPathD);
    ctx.clip(path);

    // 1. Base ambient rainfall tone across India (light pale blue / cyan)
    ctx.fillStyle = activeLayer === 'Raw NWP' ? '#CDE5FD' : '#BEE0FC';
    ctx.fillRect(0, 0, width, height);

    // Helper to draw smooth radial convective precipitation blobs
    const drawCell = (
      cx: number,
      cy: number,
      radius: number,
      stops: { offset: number; color: string }[]
    ) => {
      const grad = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius);
      stops.forEach((s) => grad.addColorStop(s.offset, s.color));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // 2. Northern region (J&K / Himachal / Punjab) - Soft cyan & light blue
    drawCell(235, 110, 85, [
      { offset: 0, color: 'rgba(56, 189, 248, 0.7)' },
      { offset: 0.6, color: 'rgba(125, 211, 252, 0.4)' },
      { offset: 1, color: 'rgba(203, 233, 254, 0)' },
    ]);

    // 3. Central India Monsoon Trough (MP, Vidarbha, Chhattisgarh)
    // Large warm yellow-orange convective zone
    drawCell(265, 280, 110, [
      { offset: 0, color: 'rgba(245, 158, 11, 0.85)' }, // warm orange
      { offset: 0.4, color: 'rgba(250, 204, 21, 0.75)' }, // yellow
      { offset: 0.7, color: 'rgba(163, 230, 53, 0.65)' }, // lime green
      { offset: 0.9, color: 'rgba(56, 189, 248, 0.4)' },
      { offset: 1, color: 'rgba(56, 189, 248, 0)' },
    ]);

    // Bhopal Convective Hotspot (Active Monsoon center in MP)
    drawCell(255, 275, 55, [
      { offset: 0, color: 'rgba(239, 68, 68, 0.8)' }, // red core
      { offset: 0.4, color: 'rgba(249, 115, 22, 0.85)' }, // orange
      { offset: 0.75, color: 'rgba(250, 204, 21, 0.7)' }, // yellow
      { offset: 1, color: 'rgba(250, 204, 21, 0)' },
    ]);

    // 4. THE CRUCIAL RED/CRIMSON COASTAL HOTSPOT (Andhra / South Odisha Coast)
    // Exactly as seen in the reference screenshot!
    const isAi = activeLayer === 'AI Corrected';
    drawCell(335, 435, isAi ? 65 : 50, [
      { offset: 0, color: 'rgba(220, 38, 38, 0.95)' }, // intense red
      { offset: 0.35, color: 'rgba(239, 68, 68, 0.9)' }, // bright red
      { offset: 0.6, color: 'rgba(249, 115, 22, 0.85)' }, // vivid orange
      { offset: 0.85, color: 'rgba(250, 204, 21, 0.6)' }, // yellow
      { offset: 1, color: 'rgba(56, 189, 248, 0)' },
    ]);

    drawCell(348, 415, 45, [
      { offset: 0, color: 'rgba(220, 38, 38, 0.9)' },
      { offset: 0.4, color: 'rgba(249, 115, 22, 0.8)' },
      { offset: 0.8, color: 'rgba(250, 204, 21, 0.5)' },
      { offset: 1, color: 'rgba(56, 189, 248, 0)' },
    ]);

    // 5. Western Ghats / Konkan & Mumbai Heavy Rain Band
    drawCell(210, 350, 48, [
      { offset: 0, color: 'rgba(249, 115, 22, 0.85)' },
      { offset: 0.5, color: 'rgba(250, 204, 21, 0.75)' },
      { offset: 0.8, color: 'rgba(56, 189, 248, 0.5)' },
      { offset: 1, color: 'rgba(56, 189, 248, 0)' },
    ]);
    drawCell(230, 440, 52, [
      { offset: 0, color: 'rgba(249, 115, 22, 0.8)' },
      { offset: 0.5, color: 'rgba(250, 204, 21, 0.7)' },
      { offset: 0.85, color: 'rgba(56, 189, 248, 0.4)' },
      { offset: 1, color: 'rgba(56, 189, 248, 0)' },
    ]);

    // 6. Northeast India (Assam / Meghalaya / Arunachal)
    drawCell(470, 245, 60, [
      { offset: 0, color: 'rgba(245, 158, 11, 0.85)' },
      { offset: 0.45, color: 'rgba(250, 204, 21, 0.7)' },
      { offset: 0.75, color: 'rgba(56, 189, 248, 0.5)' },
      { offset: 1, color: 'rgba(56, 189, 248, 0)' },
    ]);

    // 7. Southern peninsular interior rainshadow (Karnataka/Tamil Nadu) - cooler blue
    drawCell(275, 480, 55, [
      { offset: 0, color: 'rgba(37, 99, 235, 0.65)' },
      { offset: 0.6, color: 'rgba(96, 165, 250, 0.5)' },
      { offset: 1, color: 'rgba(203, 233, 254, 0)' },
    ]);

    // 8. Western Rajasthan dry zone (subdued rain)
    drawCell(175, 215, 60, [
      { offset: 0, color: 'rgba(243, 244, 246, 0.9)' },
      { offset: 0.7, color: 'rgba(224, 231, 255, 0.5)' },
      { offset: 1, color: 'rgba(203, 233, 254, 0)' },
    ]);

    // Add fine-grained gridded cellular noise to mimic real NWP grid resolution
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) {
        // Pixel is inside the clipped landmass
        const noise = (Math.random() - 0.5) * 8;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
    }
    ctx.putImageData(imgData, 0, 0);

    ctx.restore();
  }, [activeLayer]);

  const selectedPos = projectCoords(
    selectedDistrict.coordinates[0],
    selectedDistrict.coordinates[1]
  );

  return (
    <div className="bg-white border border-[#E7E7E3] rounded-3xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden h-[540px] lg:h-[570px]">
      {/* Top Header of Map Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#171717] tracking-tight">
            India Rainfall Intelligence
          </h2>
          <p className="text-xs text-[#737373] font-medium">
            AI Post-Processed Forecast
          </p>
        </div>

        {/* Layer Controls Switcher (matching exact reference styling) */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto max-w-full">
          {layers.map((layer) => {
            const isActive = activeLayer === layer;
            return (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`
                  px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap
                  ${
                    isActive
                      ? 'bg-[#1E293B] text-white shadow-sm ring-1 ring-[#1E293B]'
                      : 'bg-transparent text-[#64748B] hover:text-[#171717] hover:bg-neutral-100/70 border border-[#E2E8F0]'
                  }
                `}
              >
                {layer}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map Canvas and SVG Overlay Container */}
      <div className="relative flex-1 w-full h-full my-1 overflow-hidden select-none flex items-center justify-center">
        {/* Ocean & Neighbor Labels */}
        <div className="absolute left-8 bottom-28 text-xs font-semibold tracking-wider text-[#60A5FA]/80 pointer-events-none">
          Arabian Sea
        </div>
        <div className="absolute right-32 bottom-36 text-xs font-semibold tracking-wider text-[#60A5FA]/80 pointer-events-none">
          Bay of Bengal
        </div>
        <div className="absolute right-48 bottom-6 text-[11px] font-medium text-[#94A3B8] pointer-events-none">
          Sri Lanka
        </div>
        <div className="absolute left-14 top-20 text-[11px] font-medium text-[#94A3B8] pointer-events-none">
          Pakistan
        </div>
        <div className="absolute right-44 top-14 text-[11px] font-medium text-[#94A3B8] pointer-events-none">
          China
        </div>

        {/* Zoom Controls (matching reference top-left position) */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#475569] hover:text-[#0F172A] hover:bg-neutral-50 transition-colors"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#475569] hover:text-[#0F172A] hover:bg-neutral-50 transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Scalable Container for Map Graphics */}
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <div className="relative w-[560px] h-[590px] max-w-full max-h-full">
            {/* Canvas Raster Layer */}
            <canvas
              ref={canvasRef}
              width={560}
              height={590}
              className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            />

            {/* SVG Vector Layer for Boundaries, Contours, and Hotspots */}
            <svg
              viewBox="0 0 560 590"
              className="absolute inset-0 w-full h-full pointer-events-auto"
            >
              {/* Outer boundary stroke */}
              <path
                d={indiaPathD}
                fill="none"
                stroke="#60A5FA"
                strokeWidth="1.2"
                strokeOpacity="0.8"
              />

              {/* State and Division Contour Lines (Cyan/Blue boundaries matching reference image) */}
              <g stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.65" fill="none">
                {/* J&K / Ladakh / Himachal */}
                <path d="M 185,115 Q 230,135 280,140" />
                <path d="M 220,135 Q 240,170 270,185" />
                {/* Rajasthan & Gujarat */}
                <path d="M 165,190 Q 210,195 240,230" />
                <path d="M 150,265 Q 185,260 215,280" />
                <path d="M 155,305 Q 195,310 230,320" />
                {/* Madhya Pradesh / Maharashtra / Central Trough */}
                <path d="M 215,280 Q 285,270 365,285" />
                <path d="M 225,335 Q 295,330 365,340" />
                <path d="M 245,395 Q 310,385 360,405" />
                {/* Andhra Pradesh / Telangana / Odisha */}
                <path d="M 285,340 Q 330,370 345,430" />
                <path d="M 335,435 Q 310,470 315,520" />
                {/* Karnataka / Tamil Nadu / Kerala */}
                <path d="M 245,420 Q 280,450 300,530" />
                <path d="M 268,525 Q 285,550 288,575" />
                {/* Eastern corridor to Northeast */}
                <path d="M 365,285 Q 410,295 440,320" />
                <path d="M 430,225 Q 455,270 480,285" />
                <path d="M 480,250 Q 515,260 535,270" />
              </g>

              {/* Sri Lanka Outline */}
              <path
                d="M 305,535 C 315,545 320,560 316,572 C 310,578 302,572 298,560 C 295,548 300,538 305,535 Z"
                fill="#E2E8F0"
                stroke="#CBD5E1"
                strokeWidth="1"
              />

              {/* Interactive District Markers */}
              {districts.map((d) => {
                const { x, y } = projectCoords(d.coordinates[0], d.coordinates[1]);
                const isSelected = selectedDistrict.id === d.id;

                return (
                  <g
                    key={d.id}
                    onClick={() => onSelectDistrict(d)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for selected district */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r="14"
                        fill="#0F172A"
                        fillOpacity="0.15"
                        className="animate-ping"
                      />
                    )}

                    {/* Marker circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 6 : 4}
                      fill={
                        isSelected
                          ? '#0F172A'
                          : d.risk === 'Very Heavy' || d.risk === 'Extremely Heavy'
                          ? '#EF4444'
                          : d.risk === 'Heavy'
                          ? '#F97316'
                          : '#3B82F6'
                      }
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="transition-transform group-hover:scale-125"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Floating White District Information Card (Exactly matching Bhopal card from reference) */}
        <div
          className="absolute z-30 bg-white border border-[#E2E8F0] rounded-3xl p-5 shadow-[0_12px_36px_rgba(0,0,0,0.08)] w-64 sm:w-72 transition-all duration-300"
          style={{
            top: '22%',
            right: '4%',
          }}
        >
          {/* Card Header: Location & Regime */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0F172A] fill-[#0F172A]" />
              <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
                {selectedDistrict.name}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 pl-0.5">
              <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
              <span className="text-xs font-medium text-[#64748B]">
                {selectedDistrict.regime}
              </span>
            </div>
          </div>

          {/* Key-Value Metrics */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-[#64748B] font-medium">Raw NWP</span>
              <span className="font-bold text-[#0F172A] text-sm">
                {selectedDistrict.rawNwp} mm
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#64748B] font-medium">AI Corrected</span>
              <span className="font-bold text-[#0F172A] text-sm">
                {selectedDistrict.aiForecast} mm
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#64748B] font-medium">Correction</span>
              <span className="font-bold text-[#16A34A] text-sm">
                {selectedDistrict.difference > 0
                  ? `+${selectedDistrict.difference}`
                  : selectedDistrict.difference}{' '}
                mm
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#64748B] font-medium">Heavy Rain Probability</span>
              <span className="font-bold text-[#0F172A] text-sm">
                {selectedDistrict.heavyRainProbability}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#64748B] font-medium">Confidence</span>
              <span className="font-bold text-[#0F172A] text-sm">
                {selectedDistrict.confidence}%
              </span>
            </div>
          </div>

          {/* Action Button: View Details → */}
          <button
            onClick={() => onViewDetails(selectedDistrict)}
            className="w-full mt-4 py-2.5 px-4 bg-[#1E293B] hover:bg-[#0F172A] text-white text-xs font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm group"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Floating Legend Pill (Matching exact bottom-left legend in reference) */}
        <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm border border-[#E2E8F0] rounded-2xl px-4 py-2.5 shadow-sm flex flex-col gap-1.5 w-60">
          {/* Continuous gradient bar */}
          <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#38BDF8] via-[#FACC15] via-[#FB923C] to-[#DC2626]" />
          {/* Ticks matching reference image: 0, 10, 25, 50, 100, 200+ mm */}
          <div className="flex justify-between text-[10px] text-[#64748B] font-medium px-0.5">
            <span>0</span>
            <span>10</span>
            <span>25</span>
            <span>50</span>
            <span>100</span>
            <span>200+ mm</span>
          </div>
        </div>

        {/* Floating Compass Button (Matching exact bottom-right compass needle in reference) */}
        <div className="absolute bottom-4 right-4 z-20">
          <button
            onClick={handleResetZoom}
            className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#1E293B] hover:bg-neutral-50 transition-colors"
            title="Reset Map Orientation"
          >
            <Navigation className="w-4 h-4 fill-[#1E293B] transform -rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
};
