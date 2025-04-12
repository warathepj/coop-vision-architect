
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FarmStats from "./FarmStats";
import { AreaType, farmAreas } from "@/lib/farmData";
import { 
  BarChart3, 
  Users, 
  Home, 
  FlaskConical,
  Fan,
  Package,
  Wheat
} from "lucide-react";

const Dashboard = () => {
  // Count areas by type
  const countAreasByType = (type: AreaType) => {
    return farmAreas.filter(area => area.type === type).length;
  };
  
  // Calculate total capacity
  const totalCapacity = farmAreas
    .filter(area => area.type === 'coop' && area.capacity)
    .reduce((sum, area) => sum + (area.capacity || 0), 0);
  
  return (
    <Tabs defaultValue="stats" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="stats">
          <BarChart3 className="h-4 w-4 mr-2" />
          Farm Performance
        </TabsTrigger>
        <TabsTrigger value="facilities">
          <Home className="h-4 w-4 mr-2" />
          Facilities
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="stats" className="space-y-4">
        <Card className="bg-farm-purple bg-opacity-10">
          <CardHeader>
            <CardTitle className="text-farm-purple-dark">
              Farm Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FarmStats />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="facilities" className="space-y-4">
        <Card className="bg-farm-purple bg-opacity-10">
          <CardHeader>
            <CardTitle className="text-farm-purple-dark">
              Facilities Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Coops</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{countAreasByType('coop')}</div>
                  <p className="text-xs text-muted-foreground">
                    Total capacity: {totalCapacity} chickens
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Processing</CardTitle>
                  <FlaskConical className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{countAreasByType('processing')}</div>
                  <p className="text-xs text-muted-foreground">Egg washing & sorting</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Ventilation</CardTitle>
                  <Fan className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{countAreasByType('ventilation')}</div>
                  <p className="text-xs text-muted-foreground">Climate control systems</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Storage</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{countAreasByType('storage')}</div>
                  <p className="text-xs text-muted-foreground">Product & equipment</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Feed Areas</CardTitle>
                  <Wheat className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{countAreasByType('feed')}</div>
                  <p className="text-xs text-muted-foreground">Feed storage & distribution</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Entries/Exits</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{countAreasByType('entry')}</div>
                  <p className="text-xs text-muted-foreground">Access points</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;
