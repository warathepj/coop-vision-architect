
import { useState } from "react";
import Header from "@/components/Header";
import FarmLayout from "@/components/FarmLayout";
import InfoPanel from "@/components/InfoPanel";
import Dashboard from "@/components/Dashboard";
import { FarmArea } from "@/lib/farmData";
import { cn } from "@/lib/utils";

const Index = () => {
  const [selectedArea, setSelectedArea] = useState<FarmArea | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(false);

  const handleSelectArea = (area: FarmArea | null) => {
    setSelectedArea(area);
    setShowInfoPanel(!!area);
  };

  const handleToggleInfo = () => {
    setShowInfoPanel(!showInfoPanel);
    if (!showInfoPanel && !selectedArea) {
      // If opening info panel but no area selected, select the main building
      const mainBuilding = 'main-building';
      setSelectedArea(
        mainBuilding ? 
          { 
            id: mainBuilding,
            name: 'Main Building',
            type: 'empty',
            x: 0,
            y: 0,
            width: 24,
            height: 24,
            description: 'The main egg farm facility'
          } : null
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onToggleInfo={handleToggleInfo} />
      
      <main className="flex-grow container mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left column: Farm visualization */}
          <div className={cn(
            "lg:col-span-2", 
            showInfoPanel ? "lg:col-span-2" : "lg:col-span-3"
          )}>
            <h2 className="text-2xl font-semibold mb-4">Farm Layout</h2>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
              <FarmLayout onSelectArea={handleSelectArea} />
            </div>
          </div>
          
          {/* Right column: Info panel (conditionally shown) */}
          {showInfoPanel && (
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-semibold mb-4">Area Details</h2>
              <InfoPanel 
                selectedArea={selectedArea} 
                onClose={() => setShowInfoPanel(false)} 
              />
            </div>
          )}
          
          {/* Bottom area: Farm statistics dashboard */}
          <div className="lg:col-span-3 mt-6">
            <h2 className="text-2xl font-semibold mb-4">Farm Performance</h2>
            <Dashboard />
          </div>
          
        </div>
      </main>
      
      <footer className="mt-8 py-6 border-t bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Egg Farm Simulator &copy; {new Date().getFullYear()}</p>
          <p className="mt-1">Click on farm areas to view details</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
