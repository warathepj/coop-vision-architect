import { farmAreas, temperatureSensors, farmStats } from "@/lib/farmData";
import { useState, useCallback } from "react";
import FarmLayout from "@/components/FarmLayout";

const Data = () => {
  const [temperatures, setTemperatures] = useState({
    coopA: {
      corner: 24,
      center: 24
    },
    coopB: {
      corner: 24,
      center: 24
    },
    coopC: {
      center: 24
    },
    ventilation: {
      main: 23,
      secondary: 23,
      east: 23
    },
    processing: {
      eggWashing: 20,
      eggStorage: 12
    }
  });

  const handleTemperatureUpdate = useCallback((temps: any) => {
    setTemperatures({
      coopA: {
        corner: temps.cornerTemp,
        center: temps.centerTemp
      },
      coopB: {
        corner: temps.coopBCornerTemp,
        center: temps.coopBCenterTemp
      },
      coopC: {
        center: temps.coopCTemp
      },
      ventilation: {
        main: temps.mainVentTemp,
        secondary: temps.secondaryVentTemp,
        east: temps.eastVentTemp
      },
      processing: {
        eggWashing: temps.eggWashingTemp,
        eggStorage: temps.eggStorageTemp
      }
    });
  }, []); // Empty dependency array since this function doesn't depend on any props or state

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Farm Data Overview</h1>
      
      {/* Hidden FarmLayout to get temperature updates */}
      <div className="hidden">
        <FarmLayout 
          onSelectArea={() => {}} 
          onTemperatureUpdate={handleTemperatureUpdate}
        />
      </div>

      {/* Farm Statistics Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Farm Statistics</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Chickens</dt>
              <dd className="mt-1 text-3xl font-semibold">{farmStats.chickens}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Daily Eggs</dt>
              <dd className="mt-1 text-3xl font-semibold">{farmStats.eggsPerDay}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Daily Profit</dt>
              <dd className="mt-1 text-3xl font-semibold">${farmStats.profit}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Temperature Sensors Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Temperature Sensors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {temperatureSensors.map((sensor) => (
            <div key={sensor.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="font-semibold mb-2">{sensor.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{sensor.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Type:</span> {sensor.sensorType}
                </div>
                <div>
                  <span className="font-medium">Accuracy:</span> {sensor.accuracy}
                </div>
                <div>
                  <span className="font-medium">Interval:</span> {sensor.dataInterval}
                </div>
                <div>
                  <span className="font-medium">Coverage:</span> {sensor.coverage} units
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Farm Areas Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Farm Areas</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4">Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Size</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Description</th>
              </tr>
            </thead>
            <tbody>
              {farmAreas.map((area) => (
                <tr key={area.id} className="border-b">
                  <td className="p-4">{area.name}</td>
                  <td className="p-4 capitalize">{area.type}</td>
                  <td className="p-4">{area.width}x{area.height}</td>
                  <td className="p-4">{area.capacity || '-'}</td>
                  <td className="p-4">{area.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mt-8 overflow-auto">
        {JSON.stringify(temperatures, null, 2)}
      </pre>
    </div>
  );
};

export default Data;


