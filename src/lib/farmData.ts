// Farm Grid Dimensions
export const GRID_SIZE = 24;
export const CELL_SIZE = 20;

export type AreaType = 
  | 'coop' 
  | 'feed' 
  | 'processing' 
  | 'ventilation' 
  | 'storage'
  | 'entry'
  | 'path'
  | 'empty';

export interface FarmArea {
  id: string;
  name: string;
  type: AreaType;
  x: number;
  y: number;
  width: number;
  height: number;
  capacity?: number;
  efficiency?: number;
  description: string;
  recommendedTempRange?: {
    min: number;
    max: number;
  };
}

export interface FarmStats {
  chickens: number;
  eggsPerDay: number;
  feedConsumption: number;
  revenue: number;
  expenses: number;
  profit: number;
}

// Temperature sensor data
export interface TemperatureSensor {
  id: string;
  name: string;
  x: number;
  y: number;
  coverage: number; // Coverage radius in grid units
  description: string;
  relatedArea?: string; // ID of related area, if any
  sensorType: string;
  accuracy: string;
  dataInterval: string;
  alertThresholds?: {
    low: number;
    high: number;
  };
  isBackup?: boolean;
  rationale?: string;
}

// Farm areas data - defines the layout of the farm
export const farmAreas: FarmArea[] = [
  // Main building outline
  {
    id: 'main-building',
    name: 'Main Building',
    type: 'empty',
    x: 0,
    y: 0,
    width: GRID_SIZE,
    height: GRID_SIZE,
    description: 'The main egg farm facility'
  },
  
  // Chicken coops
  {
    id: 'coop-1',
    name: 'Coop A',
    type: 'coop',
    x: 1,
    y: 1,
    width: 6,
    height: 8,
    capacity: 500,
    efficiency: 0.92,
    description: 'Large chicken coop with automated feeding system',
    recommendedTempRange: {
      min: 21,
      max: 24
    }
  },
  {
    id: 'coop-2',
    name: 'Coop B',
    type: 'coop',
    x: 8,
    y: 1,
    width: 6,
    height: 8,
    capacity: 500,
    efficiency: 0.88,
    description: 'Large chicken coop with nesting boxes',
    recommendedTempRange: {
      min: 21,
      max: 24
    }
  },
  {
    id: 'coop-3',
    name: 'Coop C',
    type: 'coop',
    x: 15,
    y: 1,
    width: 8,
    height: 6,
    capacity: 400,
    efficiency: 0.95,
    description: 'Medium chicken coop with enhanced ventilation',
    recommendedTempRange: {
      min: 21,
      max: 24
    }
  },
  
  // Feed storage
  {
    id: 'feed-storage',
    name: 'Feed Storage',
    type: 'feed',
    x: 1,
    y: 15,
    width: 4,
    height: 6,
    description: 'Storage area for chicken feed and supplements'
  },
  
  // Egg processing
  {
    id: 'processing-1',
    name: 'Egg Washing',
    type: 'processing',
    x: 15,
    y: 12,
    width: 6,
    height: 4,
    description: 'Area for washing and sanitizing eggs',
    recommendedTempRange: {
      min: 18,
      max: 22
    }
  },
  {
    id: 'processing-2',
    name: 'Egg Sorting',
    type: 'processing',
    x: 15,
    y: 17,
    width: 6,
    height: 4,
    description: 'Automated system for sorting eggs by size',
    recommendedTempRange: {
      min: 16,
      max: 20
    }
  },
  
  // Ventilation systems
  {
    id: 'vent-1',
    name: 'Main Ventilation',
    type: 'ventilation',
    x: 1,
    y: 10,
    width: 2,
    height: 2,
    description: 'Primary ventilation system for Coop A'
  },
  {
    id: 'vent-2',
    name: 'Secondary Ventilation',
    type: 'ventilation',
    x: 10,
    y: 10,
    width: 2,
    height: 2,
    description: 'Secondary ventilation system for Coop B'
  },
  {
    id: 'vent-3',
    name: 'East Ventilation',
    type: 'ventilation',
    x: 18,
    y: 8,
    width: 2,
    height: 2,
    description: 'Ventilation system for Coop C and processing areas'
  },
  
  // Storage areas
  {
    id: 'storage-1',
    name: 'Egg Storage',
    type: 'storage',
    x: 8,
    y: 15,
    width: 5,
    height: 4,
    description: 'Climate-controlled storage for processed eggs',
    recommendedTempRange: {
      min: 10,
      max: 14
    }
  },
  {
    id: 'storage-2',
    name: 'Equipment Storage',
    type: 'storage',
    x: 8,
    y: 20,
    width: 5,
    height: 3,
    description: 'Storage area for farm equipment and supplies'
  },
  
  // Entries/exits
  {
    id: 'entry-main',
    name: 'Main Entrance',
    type: 'entry',
    x: 10,
    y: 23,
    width: 4,
    height: 1,
    description: 'Main entrance to the facility'
  },
  {
    id: 'entry-delivery',
    name: 'Delivery Entrance',
    type: 'entry',
    x: 0,
    y: 12,
    width: 1,
    height: 3,
    description: 'Side entrance for deliveries'
  },
  
  // Worker paths (representative selection - not all paths shown)
  {
    id: 'path-1',
    name: 'Main Corridor',
    type: 'path',
    x: 8,
    y: 10,
    width: 1,
    height: 14,
    description: 'Main north-south corridor'
  },
  {
    id: 'path-2',
    name: 'East-West Corridor',
    type: 'path',
    x: 9,
    y: 10,
    width: 6,
    height: 1,
    description: 'Corridor connecting coops to processing'
  },
  {
    id: 'path-3',
    name: 'Processing Access',
    type: 'path',
    x: 14,
    y: 15,
    width: 1,
    height: 6,
    description: 'Access path to egg processing areas'
  },
];

// Farm statistics
export const farmStats: FarmStats = {
  chickens: 1400,
  eggsPerDay: 1120,
  feedConsumption: 280, // kg per day
  revenue: 1680, // $ per day
  expenses: 840, // $ per day
  profit: 840, // $ per day
};

// Temperature sensors - optimal positions for monitoring
export const temperatureSensors: TemperatureSensor[] = [
  // Coop A sensors
  {
    id: "sensor-coop-a-1",
    name: "Coop A Center",
    x: 4,
    y: 5,
    coverage: 3,
    description: "Primary sensor for Coop A, monitors central temperature",
    relatedArea: "coop-1",
    sensorType: "Digital RTD PT100",
    accuracy: "±0.2°C",
    dataInterval: "5 minutes",
    alertThresholds: {
      low: 19,
      high: 26
    },
    rationale: "Positioned at center to provide core temperature reading for the largest coop"
  },
  {
    id: "sensor-coop-a-2",
    name: "Coop A Corner",
    x: 1,
    y: 1,
    coverage: 2,
    description: "Secondary sensor for Coop A, monitors corner temperature variations",
    relatedArea: "coop-1",
    sensorType: "Thermistor",
    accuracy: "±0.5°C",
    dataInterval: "10 minutes",
    alertThresholds: {
      low: 19,
      high: 26
    },
    isBackup: true,
    rationale: "Corner placement detects cold spots and provides backup for primary sensor"
  },
  
  // Coop B sensors
  {
    id: "sensor-coop-b-1",
    name: "Coop B Center",
    x: 11,
    y: 5,
    coverage: 3,
    description: "Primary sensor for Coop B, monitors central temperature",
    relatedArea: "coop-2",
    sensorType: "Digital RTD PT100",
    accuracy: "±0.2°C",
    dataInterval: "5 minutes",
    alertThresholds: {
      low: 19,
      high: 26
    },
    rationale: "Central position maximizes coverage area in standard-sized coop"
  },
  {
    id: "sensor-coop-b-2",
    name: "Coop B Corner",
    x: 13,
    y: 1,
    coverage: 2,
    description: "Secondary sensor for Coop B, monitors corner temperature variations",
    relatedArea: "coop-2",
    sensorType: "Thermistor",
    accuracy: "±0.5°C",
    dataInterval: "10 minutes",
    alertThresholds: {
      low: 19,
      high: 26
    },
    isBackup: true,
    rationale: "Positioned to detect temperature variations near ventilation access points"
  },
  
  // Coop C sensors
  {
    id: "sensor-coop-c-1",
    name: "Coop C Center",
    x: 19,
    y: 4,
    coverage: 3,
    description: "Primary sensor for Coop C, monitors central temperature",
    relatedArea: "coop-3",
    sensorType: "Digital RTD PT100",
    accuracy: "±0.2°C",
    dataInterval: "5 minutes",
    alertThresholds: {
      low: 19,
      high: 26
    },
    rationale: "Positioned at center of coop with enhanced ventilation to monitor airflow effectiveness"
  },
  
  // Ventilation system sensors
  {
    id: "sensor-vent-1",
    name: "Main Ventilation Intake",
    x: 1,
    y: 10,
    coverage: 2,
    description: "Monitors temperature at main ventilation intake",
    relatedArea: "vent-1",
    sensorType: "Thermocouple",
    accuracy: "±0.3°C",
    dataInterval: "2 minutes",
    alertThresholds: {
      low: 18,
      high: 28
    },
    rationale: "Critical monitoring point for incoming air, affects temperature regulation for Coop A"
  },
  {
    id: "sensor-vent-2",
    name: "Secondary Ventilation Intake",
    x: 10,
    y: 11,
    coverage: 2,
    description: "Monitors temperature at secondary ventilation intake",
    relatedArea: "vent-2",
    sensorType: "Thermocouple",
    accuracy: "±0.3°C",
    dataInterval: "2 minutes",
    alertThresholds: {
      low: 18,
      high: 28
    },
    rationale: "Monitors temperature at key ventilation junction serving multiple coops"
  },
  {
    id: "sensor-vent-3",
    name: "East Ventilation Output",
    x: 19,
    y: 8,
    coverage: 2,
    description: "Monitors temperature at east ventilation output",
    relatedArea: "vent-3",
    sensorType: "Thermocouple",
    accuracy: "±0.3°C",
    dataInterval: "2 minutes",
    alertThresholds: {
      low: 18,
      high: 28
    },
    rationale: "Positioned at output to verify proper exhaust temperature and system efficiency"
  },
  
  // Processing area sensors
  {
    id: "sensor-proc-1",
    name: "Egg Washing Temperature",
    x: 18,
    y: 14,
    coverage: 2,
    description: "Monitors temperature in egg washing area",
    relatedArea: "processing-1",
    sensorType: "Waterproof Digital",
    accuracy: "±0.1°C",
    dataInterval: "1 minute",
    alertThresholds: {
      low: 17,
      high: 23
    },
    rationale: "Precise monitoring required for egg sanitization process to maintain food safety standards"
  },
  
  // Storage area sensor
  {
    id: "sensor-storage",
    name: "Egg Storage Temperature",
    x: 10,
    y: 17,
    coverage: 2,
    description: "Monitors temperature in climate-controlled egg storage",
    relatedArea: "storage-1",
    sensorType: "Digital RTD PT100",
    accuracy: "±0.2°C",
    dataInterval: "15 minutes",
    alertThresholds: {
      low: 8,
      high: 15
    },
    rationale: "Critical monitoring point for egg preservation, positioned centrally in refrigerated storage"
  }
];

// Helper functions
export const getAreaColor = (type: AreaType): string => {
  switch (type) {
    case 'coop':
      return 'bg-farm-yellow';
    case 'feed':
      return 'bg-amber-100';
    case 'processing':
      return 'bg-farm-blue';
    case 'ventilation':
      return 'bg-blue-100';
    case 'storage':
      return 'bg-farm-gray';
    case 'entry':
      return 'bg-gray-300';
    case 'path':
      return 'bg-gray-200';
    case 'empty':
    default:
      return 'bg-white';
  }
};

export const getAreaIcon = (type: AreaType): string => {
  switch (type) {
    case 'coop':
      return '🐔';
    case 'feed':
      return '🌾';
    case 'processing':
      return '🥚';
    case 'ventilation':
      return '💨';
    case 'storage':
      return '📦';
    case 'entry':
      return '🚪';
    case 'path':
      return '🚶';
    case 'empty':
    default:
      return '';
  }
};
