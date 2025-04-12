
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmArea, getAreaIcon } from "@/lib/farmData";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfoPanelProps {
  selectedArea: FarmArea | null;
  onClose: () => void;
}

const InfoPanel = ({ selectedArea, onClose }: InfoPanelProps) => {
  if (!selectedArea) return null;
  
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
      </CardContent>
    </Card>
  );
};

export default InfoPanel;
