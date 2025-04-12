
import { farmAreas, FarmArea, getAreaColor, GRID_SIZE, CELL_SIZE, temperatureSensors, TemperatureSensor } from "@/lib/farmData";
import { useState } from "react";
import { Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

interface FarmLayoutProps {
  onSelectArea: (area: FarmArea | null) => void;
}

const FarmLayout = ({ onSelectArea }: FarmLayoutProps) => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);
  
  const handleAreaClick = (area: FarmArea) => {
    onSelectArea(area);
  };
  
  const handleAreaHover = (areaId: string | null) => {
    setHoveredArea(areaId);
  };

  const handleSensorHover = (sensorId: string | null) => {
    setHoveredSensor(sensorId);
  };
  
  return (
    <div className="w-full overflow-auto p-4">
      <div 
        className="relative bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg"
        style={{
          width: GRID_SIZE * CELL_SIZE + 4, 
          height: GRID_SIZE * CELL_SIZE + 4, 
          minWidth: GRID_SIZE * CELL_SIZE + 4
        }}
      >
        {/* Grid lines for reference */}
        <div className="absolute inset-0 grid" style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
        }}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
            <div 
              key={index} 
              className="farm-grid-cell border border-gray-100 dark:border-gray-700"
            />
          ))}
        </div>
        
        {/* Farm areas */}
        {farmAreas.map((area) => (
          <div
            key={area.id}
            className={`farm-area absolute ${getAreaColor(area.type)} border border-gray-300 dark:border-gray-600 rounded ${hoveredArea === area.id ? 'ring-2 ring-farm-purple' : ''}`}
            style={{
              left: area.x * CELL_SIZE + 2,
              top: area.y * CELL_SIZE + 2,
              width: area.width * CELL_SIZE,
              height: area.height * CELL_SIZE,
              zIndex: area.type === 'empty' ? 0 : 10,
            }}
            onClick={() => handleAreaClick(area)}
            onMouseEnter={() => handleAreaHover(area.id)}
            onMouseLeave={() => handleAreaHover(null)}
          >
            {area.type !== 'empty' && area.type !== 'path' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl">{area.name}</div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Temperature sensors */}
        {temperatureSensors.map((sensor) => (
          <div
            key={sensor.id}
            className={cn(
              "absolute flex items-center justify-center z-20 cursor-pointer transition-all duration-200",
              hoveredSensor === sensor.id ? "scale-125" : ""
            )}
            style={{
              left: sensor.x * CELL_SIZE + 2,
              top: sensor.y * CELL_SIZE + 2,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
            title={sensor.name}
            onMouseEnter={() => handleSensorHover(sensor.id)}
            onMouseLeave={() => handleSensorHover(null)}
          >
            {/* Sensor indicator */}
            <div className="relative">
              <Thermometer 
                className="text-red-500 h-5 w-5 drop-shadow-md" 
                strokeWidth={2.5} 
              />

              {/* Coverage area indicator - only show when hovered */}
              {hoveredSensor === sensor.id && (
                <div 
                  className="absolute rounded-full bg-red-500/10 border border-red-500/30 -z-10"
                  style={{
                    width: sensor.coverage * 2 * CELL_SIZE,
                    height: sensor.coverage * 2 * CELL_SIZE,
                    left: -sensor.coverage * CELL_SIZE + CELL_SIZE/2,
                    top: -sensor.coverage * CELL_SIZE + CELL_SIZE/2,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend for temperature sensors */}
      <div className="mt-4 flex items-center justify-center">
        <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-300 dark:border-gray-700">
          <Thermometer className="text-red-500 h-4 w-4 mr-2" />
          <span className="text-sm">Temperature Sensors ({temperatureSensors.length})</span>
        </div>
      </div>
    </div>
  );
};

export default FarmLayout;
