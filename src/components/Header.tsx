
import { Button } from "@/components/ui/button";
import { Sun, Moon, Info } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onToggleInfo: () => void;
}

const Header = ({ onToggleInfo }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-farm-purple flex items-center justify-center text-white">
            🥚
          </div>
          <h1 className="text-xl font-bold">Egg Farm Simulator</h1>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={onToggleInfo}
            title="Show Information"
          >
            <Info className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
