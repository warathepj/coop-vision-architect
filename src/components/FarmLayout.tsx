
import { farmAreas, FarmArea, getAreaColor, GRID_SIZE, CELL_SIZE, temperatureSensors, TemperatureSensor } from "@/lib/farmData";
import { useState, useEffect } from "react";
import { Thermometer, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FarmLayoutProps {
  onSelectArea: (area: FarmArea | null) => void;
}

const FarmLayout = ({ onSelectArea }: FarmLayoutProps) => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);
  const [cornerTemp, setCornerTemp] = useState<number>(24);
  const [centerTemp, setCenterTemp] = useState<number>(24);
  const [coopBCornerTemp, setCoopBCornerTemp] = useState<number>(24);
  const [coopBCenterTemp, setCoopBCenterTemp] = useState<number>(24);
  const [coopCTemp, setCoopCTemp] = useState<number>(24);
  const [mainVentTemp, setMainVentTemp] = useState<number>(23);

  useEffect(() => {
    // Update temperatures every 5 seconds
    const interval = setInterval(() => {
      // Generate random temperature between 17 and 30 for corner
      const newCornerTemp = Math.floor(Math.random() * (30 - 17 + 1)) + 17;
      setCornerTemp(newCornerTemp);
      
      // Generate center temperature within ±1 degree of corner
      const minCenterTemp = Math.max(17, newCornerTemp - 1);
      const maxCenterTemp = Math.min(30, newCornerTemp + 1);
      const newCenterTemp = minCenterTemp + Math.random() * (maxCenterTemp - minCenterTemp);
      setCenterTemp(Math.round(newCenterTemp * 10) / 10);

      // Coop B temperatures
      const newCoopBCornerTemp = Math.floor(Math.random() * (30 - 17 + 1)) + 17;
      setCoopBCornerTemp(newCoopBCornerTemp);
      
      const minCoopBCenterTemp = Math.max(17, newCoopBCornerTemp - 1);
      const maxCoopBCenterTemp = Math.min(30, newCoopBCornerTemp + 1);
      const newCoopBCenterTemp = minCoopBCenterTemp + Math.random() * (maxCoopBCenterTemp - minCoopBCenterTemp);
      setCoopBCenterTemp(Math.round(newCoopBCenterTemp * 10) / 10);

      // Coop C temperature (18-27 range)
      const newCoopCTemp = Math.floor(Math.random() * (27 - 18 + 1)) + 18;
      setCoopCTemp(newCoopCTemp);

      // Main ventilation temperature (17-29 range)
      const newMainVentTemp = Math.floor(Math.random() * (29 - 17 + 1)) + 17;
      setMainVentTemp(newMainVentTemp);
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

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
                className={cn(
                  "h-5 w-5 drop-shadow-md",
                  sensor.isBackup ? "text-amber-500" : "text-red-500"
                )}
                strokeWidth={2.5} 
              />
              {sensor.isBackup && (
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-amber-400 rounded-full border border-white dark:border-gray-800"></div>
              )}

              {/* Show temperature for both Coop A sensors */}
              {(sensor.id === "sensor-coop-a-2" || sensor.id === "sensor-coop-a-1") && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium bg-amber-100 dark:bg-amber-900 px-1 rounded">
                  {sensor.id === "sensor-coop-a-2" ? cornerTemp : centerTemp}°C
                </div>
              )}

              {/* Show temperature for both Coop B sensors */}
              {(sensor.id === "sensor-coop-b-2" || sensor.id === "sensor-coop-b-1") && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium bg-amber-100 dark:bg-amber-900 px-1 rounded">
                  {sensor.id === "sensor-coop-b-2" ? coopBCornerTemp : coopBCenterTemp}°C
                </div>
              )}

              {/* Show temperature for Coop C sensor */}
              {sensor.id === "sensor-coop-c-1" && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium bg-amber-100 dark:bg-amber-900 px-1 rounded">
                  {coopCTemp}°C
                </div>
              )}

              {/* Show temperature for main ventilation sensor */}
              {sensor.id === "sensor-vent-1" && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium bg-amber-100 dark:bg-amber-900 px-1 rounded">
                  {mainVentTemp}°C
                </div>
              )}

              {/* Coverage area indicator - only show when hovered */}
              {hoveredSensor === sensor.id && (
                <>
                  <div 
                    className="absolute rounded-full bg-red-500/10 border border-red-500/30 -z-10"
                    style={{
                      width: sensor.coverage * 2 * CELL_SIZE,
                      height: sensor.coverage * 2 * CELL_SIZE,
                      left: -sensor.coverage * CELL_SIZE + CELL_SIZE/2,
                      top: -sensor.coverage * CELL_SIZE + CELL_SIZE/2,
                    }}
                  />
                  <div className="absolute left-6 top-0 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg border border-gray-200 dark:border-gray-700 w-48 text-xs">
                    <div className="font-medium">{sensor.name}</div>
                    <div className="text-xs text-muted-foreground">{sensor.sensorType}</div>
                    {(sensor.id === "sensor-coop-a-2" || sensor.id === "sensor-coop-a-1") && (
                      <div className="text-xs mt-1">Current: {sensor.id === "sensor-coop-a-2" ? cornerTemp : centerTemp}°C</div>
                    )}
                    {sensor.alertThresholds && (
                      <div className="flex items-center mt-1 text-amber-600 dark:text-amber-400">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {sensor.alertThresholds.low}°C - {sensor.alertThresholds.high}°C
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend for temperature sensors */}
      <div className="mt-4 flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700 w-full max-w-md">
          <h4 className="text-sm font-medium mb-2">Temperature Monitoring System</h4>
          <div className="flex items-center mb-2">
            <Thermometer className="text-red-500 h-4 w-4 mr-2" />
            <span className="text-sm">Primary Sensors ({temperatureSensors.filter(s => !s.isBackup).length})</span>
            <span className="text-xs text-gray-500 ml-2">Standard monitoring points</span>
          </div>
          <div className="flex items-center mb-2">
            <Thermometer className="text-amber-500 h-4 w-4 mr-2" />
            <span className="text-sm">Backup Sensors ({temperatureSensors.filter(s => s.isBackup).length})</span>
            <span className="text-xs text-gray-500 ml-2">Redundancy coverage</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div>
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 w-full justify-center">
                Coops: 21-24°C
              </Badge>
            </div>
            <div>
              <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 w-full justify-center">
                Processing: 16-22°C
              </Badge>
            </div>
            <div>
              <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-300 w-full justify-center">
                Storage: 10-14°C
              </Badge>
            </div>
            <div>
              <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-300 w-full justify-center">
                Ventilation: 18-28°C
              </Badge>
            </div>
          </div>
          <div className="text-xs mt-3 text-gray-500">Hover over sensors for details and coverage area</div>
        </div>
      </div>
    </div>
  );
};

export default FarmLayout;
