
import { farmAreas, FarmArea, getAreaColor, GRID_SIZE, CELL_SIZE } from "@/lib/farmData";
import { useState } from "react";

interface FarmLayoutProps {
  onSelectArea: (area: FarmArea | null) => void;
}

const FarmLayout = ({ onSelectArea }: FarmLayoutProps) => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  
  const handleAreaClick = (area: FarmArea) => {
    onSelectArea(area);
  };
  
  const handleAreaHover = (areaId: string | null) => {
    setHoveredArea(areaId);
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
      </div>
    </div>
  );
};

export default FarmLayout;
