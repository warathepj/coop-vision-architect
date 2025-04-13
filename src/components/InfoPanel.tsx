
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmArea, getAreaIcon, temperatureSensors } from "@/lib/farmData";
import { Badge } from "@/components/ui/badge";
import { X, Thermometer, AlertCircle, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfoPanelProps {
  selectedArea: FarmArea | null;
  onClose: () => void;
}

const InfoPanel = ({ selectedArea, onClose }: InfoPanelProps) => {
  if (!selectedArea) return null;
  
  // Find any temperature sensors associated with this area
  const areaSensors = temperatureSensors.filter(
    sensor => sensor.relatedArea === selectedArea.id
  );
  
  const getTypeLabel = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="text-2xl">
            {getAreaIcon(selectedArea.type)}
          </div>
          <div>
            <CardTitle>{selectedArea.name}</CardTitle>
            <CardDescription>
              <Badge variant="outline" className="mt-1">
                {getTypeLabel(selectedArea.type)}
              </Badge>
            </CardDescription>
          </div>
        </div>
        <Button
          variant="ghost" 
          size="icon" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {selectedArea.description}
        </p>
        
        {selectedArea.capacity && (
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Capacity:</div>
            <div className="text-sm">{selectedArea.capacity} chickens</div>
          </div>
        )}
        
        {selectedArea.efficiency && (
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="text-sm font-medium">Efficiency:</div>
            <div className="text-sm">{(selectedArea.efficiency * 100).toFixed(0)}%</div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="text-sm font-medium">Dimensions:</div>
          <div className="text-sm">{selectedArea.width}m × {selectedArea.height}m</div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="text-sm font-medium">Location:</div>
          <div className="text-sm">({selectedArea.x}, {selectedArea.y})</div>
        </div>
        
        {selectedArea.recommendedTempRange && (
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="text-sm font-medium">Recommended Temp:</div>
            <div className="text-sm">{selectedArea.recommendedTempRange.min}°C - {selectedArea.recommendedTempRange.max}°C</div>
          </div>
        )}
        
        {areaSensors.length > 0 && (
          <>
            <div className="mt-4 mb-2">
              <h3 className="text-sm font-medium flex items-center">
                <Thermometer className="h-4 w-4 mr-1 text-red-500" />
                Temperature Sensors ({areaSensors.length})
              </h3>
            </div>
            {areaSensors.map((sensor) => (
              <div key={sensor.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md mt-3 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{sensor.name}</div>
                  {sensor.isBackup && (
                    <Badge variant="outline" className="text-xs bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                      Backup
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{sensor.description}</div>
                
                <div className="mt-3 grid grid-cols-2 gap-y-1 gap-x-2 text-xs">
                  <div className="font-medium flex items-center">
                    <BarChart3 className="h-3 w-3 mr-1" /> 
                    Sensor Type:
                  </div>
                  <div>{sensor.sensorType}</div>
                  
                  <div className="font-medium">Accuracy:</div>
                  <div>{sensor.accuracy}</div>
                  
                  <div className="font-medium flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Data Interval:
                  </div>
                  <div>{sensor.dataInterval}</div>
                  
                  <div className="font-medium flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1 text-amber-500" />
                    Alert Thresholds:
                  </div>
                  {sensor.alertThresholds ? (
                    <div>{sensor.alertThresholds.low}°C - {sensor.alertThresholds.high}°C</div>
                  ) : (
                    <div>None set</div>
                  )}
                </div>
                
                {sensor.rationale && (
                  <div className="mt-2 text-xs bg-blue-50 dark:bg-blue-950 p-2 rounded border border-blue-100 dark:border-blue-900 text-blue-800 dark:text-blue-300">
                    <span className="font-medium">Placement rationale:</span> {sensor.rationale}
                  </div>
                )}
                
                <div className="text-xs mt-2 flex items-center text-gray-500">
                  <div className="h-2 w-2 bg-red-500 rounded-full mr-1"></div>
                  Coverage radius: {sensor.coverage}m
                </div>
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoPanel;

