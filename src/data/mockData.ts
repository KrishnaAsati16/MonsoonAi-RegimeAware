import { DistrictData, RainfallAlert, VerificationMetric, PipelineStep } from '../types';

export const DISTRICTS_DATA: DistrictData[] = [
  {
    id: 'bhopal',
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    coordinates: [23.2599, 77.4126],
    regime: 'Active Monsoon',
    rawNwp: 52,
    aiForecast: 71,
    difference: 19,
    heavyRainProbability: 78,
    confidence: 92,
    risk: 'Heavy',
    factors: {
      regime: 42,
      historicalBias: 28,
      moisture: 14,
      topography: 10,
      other: 6
    }
  },
  {
    id: 'indore',
    name: 'Indore',
    state: 'Madhya Pradesh',
    coordinates: [22.7196, 75.8577],
    regime: 'Active Monsoon',
    rawNwp: 41,
    aiForecast: 56,
    difference: 15,
    heavyRainProbability: 61,
    confidence: 88,
    risk: 'Moderate',
    factors: {
      regime: 38,
      historicalBias: 32,
      moisture: 16,
      topography: 8,
      other: 6
    }
  },
  {
    id: 'mumbai',
    name: 'Mumbai Suburban',
    state: 'Maharashtra',
    coordinates: [19.0760, 72.8777],
    regime: 'Coastal',
    rawNwp: 92,
    aiForecast: 118,
    difference: 26,
    heavyRainProbability: 91,
    confidence: 94,
    risk: 'Very Heavy',
    factors: {
      regime: 45,
      historicalBias: 25,
      moisture: 18,
      topography: 7,
      other: 5
    }
  },
  {
    id: 'dehradun',
    name: 'Dehradun',
    state: 'Uttarakhand',
    coordinates: [30.3165, 78.0322],
    regime: 'Orographic',
    rawNwp: 68,
    aiForecast: 89,
    difference: 21,
    heavyRainProbability: 84,
    confidence: 91,
    risk: 'Heavy',
    factors: {
      regime: 30,
      historicalBias: 22,
      moisture: 12,
      topography: 32,
      other: 4
    }
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    coordinates: [18.5204, 73.8567],
    regime: 'Orographic',
    rawNwp: 48,
    aiForecast: 65,
    difference: 17,
    heavyRainProbability: 72,
    confidence: 89,
    risk: 'Heavy',
    factors: {
      regime: 35,
      historicalBias: 26,
      moisture: 15,
      topography: 18,
      other: 6
    }
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    state: 'Maharashtra',
    coordinates: [21.1458, 79.0882],
    regime: 'Active Monsoon',
    rawNwp: 38,
    aiForecast: 52,
    difference: 14,
    heavyRainProbability: 58,
    confidence: 87,
    risk: 'Moderate',
    factors: {
      regime: 40,
      historicalBias: 30,
      moisture: 15,
      topography: 9,
      other: 6
    }
  },
  {
    id: 'bhubaneswar',
    name: 'Bhubaneswar',
    state: 'Odisha',
    coordinates: [20.2961, 85.8245],
    regime: 'Depression',
    rawNwp: 75,
    aiForecast: 104,
    difference: 29,
    heavyRainProbability: 86,
    confidence: 90,
    risk: 'Very Heavy',
    factors: {
      regime: 48,
      historicalBias: 24,
      moisture: 16,
      topography: 6,
      other: 6
    }
  },
  {
    id: 'guwahati',
    name: 'Guwahati',
    state: 'Assam',
    coordinates: [26.1445, 91.7362],
    regime: 'Orographic',
    rawNwp: 62,
    aiForecast: 84,
    difference: 22,
    heavyRainProbability: 81,
    confidence: 92,
    risk: 'Heavy',
    factors: {
      regime: 36,
      historicalBias: 24,
      moisture: 18,
      topography: 16,
      other: 6
    }
  },
  {
    id: 'shimla',
    name: 'Shimla',
    state: 'Himachal Pradesh',
    coordinates: [31.1048, 77.1734],
    regime: 'Orographic',
    rawNwp: 55,
    aiForecast: 72,
    difference: 17,
    heavyRainProbability: 74,
    confidence: 85,
    risk: 'Heavy',
    factors: {
      regime: 28,
      historicalBias: 24,
      moisture: 10,
      topography: 34,
      other: 4
    }
  },
  {
    id: 'patna',
    name: 'Patna',
    state: 'Bihar',
    coordinates: [25.5941, 85.1376],
    regime: 'Active Monsoon',
    rawNwp: 32,
    aiForecast: 44,
    difference: 12,
    heavyRainProbability: 48,
    confidence: 83,
    risk: 'Moderate',
    factors: {
      regime: 40,
      historicalBias: 29,
      moisture: 17,
      topography: 8,
      other: 6
    }
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    coordinates: [26.9124, 75.7873],
    regime: 'Break Monsoon',
    rawNwp: 14,
    aiForecast: 8,
    difference: -6,
    heavyRainProbability: 12,
    confidence: 89,
    risk: 'Low',
    factors: {
      regime: 52,
      historicalBias: 22,
      moisture: 14,
      topography: 6,
      other: 6
    }
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    coordinates: [12.9716, 77.5946],
    regime: 'Break Monsoon',
    rawNwp: 18,
    aiForecast: 21,
    difference: 3,
    heavyRainProbability: 24,
    confidence: 91,
    risk: 'Low',
    factors: {
      regime: 44,
      historicalBias: 26,
      moisture: 15,
      topography: 9,
      other: 6
    }
  }
];

export const REGIME_BREAKDOWN = [
  { name: 'Active Monsoon', percentage: 87, color: '#B8D957' },
  { name: 'Break Monsoon', percentage: 5, color: '#9CA3AF' },
  { name: 'Depression', percentage: 4, color: '#9CA3AF' },
  { name: 'Coastal', percentage: 2, color: '#9CA3AF' },
  { name: 'Orographic', percentage: 1, color: '#9CA3AF' },
  { name: 'Western Disturbance', percentage: 1, color: '#9CA3AF' },
];

export const FORECAST_ACCURACY_DATA = [
  { leadTime: '6h', rmse: 42.1, isHighlighted: false },
  { leadTime: '12h', rmse: 36.7, isHighlighted: false },
  { leadTime: '24h', rmse: 29.7, isHighlighted: true },
  { leadTime: '36h', rmse: 32.5, isHighlighted: false },
  { leadTime: '48h', rmse: 38.2, isHighlighted: false },
  { leadTime: '72h', rmse: 44.6, isHighlighted: false },
];

export const RAINFALL_ALERTS: RainfallAlert[] = [
  {
    id: 'alert-1',
    district: 'Mumbai Suburban',
    state: 'Maharashtra',
    level: 'VERY HEAVY',
    rainfall: 128,
    probability: 89,
    leadTime: '12-24h',
    time: 'Valid till 06:00 UTC tomorrow'
  },
  {
    id: 'alert-2',
    district: 'Bhopal',
    state: 'Madhya Pradesh',
    level: 'HEAVY',
    rainfall: 79,
    probability: 81,
    leadTime: '24h',
    time: 'Valid till 06:00 UTC tomorrow'
  },
  {
    id: 'alert-3',
    district: 'Indore',
    state: 'Madhya Pradesh',
    level: 'MODERATE',
    rainfall: 42,
    probability: 54,
    leadTime: '24-36h',
    time: 'Valid till 18:00 UTC tomorrow'
  }
];

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    step: '01',
    title: 'RAW NWP',
    description: 'Numerical Weather Prediction forecast',
    icon: 'Cloud',
    status: 'completed',
    details: 'Global & regional NWP ensemble precipitation outputs (NCUM, IMD-GFS).'
  },
  {
    step: '02',
    title: 'REGIME DETECTION',
    description: 'Identify prevailing weather pattern',
    icon: 'Wind',
    status: 'completed',
    details: 'Synoptic pattern clustering via self-organizing feature maps & geopotential wind fields.'
  },
  {
    step: '03',
    title: 'REGIME CLASSIFICATION',
    description: 'Active / Break / Depression / Coastal / Orographic',
    icon: 'Brain',
    status: 'completed',
    details: 'Ensemble classifier identifies Active Monsoon regime with 87.4% confidence.'
  },
  {
    step: '04',
    title: 'REGIME-SPECIFIC MODEL',
    description: 'Apply suitable AI model',
    icon: 'Layers',
    status: 'completed',
    details: 'Weights tuned specifically for Active Monsoon trough dynamics and convective bands.'
  },
  {
    step: '05',
    title: 'BIAS CORRECTION',
    description: 'Correct rainfall bias',
    icon: 'Sliders',
    status: 'active',
    details: 'Non-linear spatial bias correction reducing systematic under-forecasting in heavy rain.'
  },
  {
    step: '06',
    title: 'HEAVY RAIN PROBABILITY',
    description: 'Estimate exceedance probability',
    icon: 'Droplets',
    status: 'active',
    details: 'Calibrated probabilistic thresholds for ≥64.5 mm (Heavy) and ≥115.6 mm (Very Heavy).'
  },
  {
    step: '07',
    title: 'DISTRICT FORECAST',
    description: 'District / Grid level rainfall forecast',
    icon: 'MapPin',
    status: 'active',
    details: 'Post-processed gridded output mapped to all 700+ administrative districts.'
  }
];

export const TIME_SERIES_COMPARISON = [
  { leadTime: '6h', rawNwp: 30, aiCorrected: 42, observed: 40 },
  { leadTime: '12h', rawNwp: 45, aiCorrected: 60, observed: 58 },
  { leadTime: '24h', rawNwp: 52, aiCorrected: 71, observed: 69 },
  { leadTime: '36h', rawNwp: 68, aiCorrected: 88, observed: 85 },
  { leadTime: '48h', rawNwp: 55, aiCorrected: 74, observed: 72 },
  { leadTime: '72h', rawNwp: 40, aiCorrected: 58, observed: 55 },
];

export const VERIFICATION_DATA: VerificationMetric[] = [
  { metric: 'RMSE', fullName: 'Root Mean Squared Error', rawNwp: 42.8, ai: 29.7, unit: 'mm', improvement: '-30.6%' },
  { metric: 'CSI', fullName: 'Critical Success Index', rawNwp: 0.42, ai: 0.61, improvement: '+45.2%' },
  { metric: 'ETS', fullName: 'Equitable Threat Score', rawNwp: 0.31, ai: 0.48, improvement: '+54.8%' },
  { metric: 'POD', fullName: 'Probability of Detection', rawNwp: 0.63, ai: 0.78, improvement: '+23.8%' },
  { metric: 'FAR', fullName: 'False Alarm Ratio', rawNwp: 0.29, ai: 0.18, improvement: '-37.9%' },
  { metric: 'FSS', fullName: 'Fractions Skill Score', rawNwp: 0.44, ai: 0.67, improvement: '+52.3%' },
];

export const DATA_SOURCES = [
  { name: 'NWP Data (NCMRWF NCUM)', type: 'Numerical Weather Prediction', status: 'Connected', updateFrequency: '6-hourly', latency: '45 mins' },
  { name: 'IMD GFS / WRF', type: 'Synoptic Models', status: 'Connected', updateFrequency: '6-hourly', latency: '50 mins' },
  { name: 'INSAT-3D/3DR Satellite', type: 'Infrared & Water Vapor', status: 'Connected', updateFrequency: '15-min scan', latency: '12 mins' },
  { name: 'DWR Doppler Radar Network', type: 'Reflectivity & Radial Velocity', status: 'Connected', updateFrequency: '10-min scan', latency: '5 mins' },
  { name: 'High-Resolution Topography (SRTM)', type: 'Digital Elevation Model', status: 'Connected', updateFrequency: 'Static (30m)', latency: '0 mins' },
];
