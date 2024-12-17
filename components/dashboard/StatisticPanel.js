// StatisticsPanel Component (Separate File)
import React from "react";
import AccurateVsInaccurateChart from '../StatisticChart'
export default function StatisticsPanel() {
  const statistics = {
    totalData: 576,
    accurate: 366,
    inaccurate: 87,
    rogue: 232,
    normal: 142,
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">
          Accurate vs Inaccurate Predictions
        </h2>
        <div className="w-full h-70 bg-gray-700 flex items-center justify-center p-5">
          {/* Replace with chart logic */}
          {/* <StatisticChart/> */}
          <AccurateVsInaccurateChart />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold">Total Data Categorized</h2>
        <p className="text-4xl font-bold mt-2">{statistics.totalData}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded">
          <h3 className="text-sm">Total Accurate Predictions</h3>
          <p className="text-2xl font-bold">{statistics.accurate}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h3 className="text-sm">Total Inaccurate Predictions</h3>
          <p className="text-2xl font-bold">{statistics.inaccurate}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded">
          <h3 className="text-sm">Total Rogue Anomalies</h3>
          <p className="text-2xl font-bold">{statistics.rogue}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h3 className="text-sm">Total Normal Predictions</h3>
          <p className="text-2xl font-bold">{statistics.normal}</p>
        </div>
      </div>
    </div>
  );
}
