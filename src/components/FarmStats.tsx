
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { farmStats } from "@/lib/farmData";
import { 
  ChevronUp,
  ChevronDown, 
  Egg, 
  BadgePercent, 
  Wheat, 
  DollarSign
} from "lucide-react";

const FarmStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Chicken Count
          </CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <Egg className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{farmStats.chickens}</div>
          <p className="text-xs text-muted-foreground">
            In 3 coops
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Daily Egg Production
          </CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <Egg className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{farmStats.eggsPerDay}</div>
          <p className="text-xs text-muted-foreground">
            0.8 eggs per chicken
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Feed Consumption
          </CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <Wheat className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{farmStats.feedConsumption} kg</div>
          <p className="text-xs text-muted-foreground">
            200g per chicken per day
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Daily Revenue
          </CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${farmStats.revenue}</div>
          <div className="flex items-center">
            <ChevronUp className="mr-1 h-4 w-4 text-green-500" />
            <p className="text-xs text-green-500">+4% from last week</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Daily Expenses
          </CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${farmStats.expenses}</div>
          <div className="flex items-center">
            <ChevronUp className="mr-1 h-4 w-4 text-red-500" />
            <p className="text-xs text-red-500">+2% from last month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Daily Profit
          </CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <BadgePercent className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${farmStats.profit}</div>
          <div className="flex items-center">
            <ChevronDown className="mr-1 h-4 w-4 text-red-500" />
            <p className="text-xs text-red-500">-1% from last month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmStats;
