export type WeatherRegime = 
  | 'Active Monsoon'
  | 'Break Monsoon'
  | 'Depression'
  | 'Coastal'
  | 'Orographic'
  | 'Western Disturbance';

export type RiskLevel = 'Low' | 'Moderate' | 'Heavy' | 'Very Heavy' | 'Extremely Heavy';

export type MapLayer = 'Raw NWP' | 'AI Corrected' | 'Difference' | 'Probability' | 'Regime';

export interface DistrictData {
  id: string;
  name: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
  regime: WeatherRegime;
  rawNwp: number; // in mm
  aiForecast: number; // in mm
  difference: number; // in mm
  heavyRainProbability: number; // percentage
  confidence: number; // percentage
  risk: RiskLevel;
  factors: {
    regime: number;
    historicalBias: number;
    moisture: number;
    topography: number;
    other: number;
  };
}

export interface RainfallAlert {
  id: string;
  district: string;
  state: string;
  level: 'VERY HEAVY' | 'HEAVY' | 'MODERATE';
  rainfall: number;
  probability: number;
  leadTime: string;
  time: string;
}

export interface VerificationMetric {
  metric: string;
  fullName: string;
  rawNwp: number;
  ai: number;
  unit?: string;
  improvement: string;
}

export interface PipelineStep {
  step: string;
  title: string;
  description: string;
  icon: string;
  status: 'active' | 'completed' | 'queued';
  details: string;
}
