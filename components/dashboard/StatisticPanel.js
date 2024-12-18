import React from "react";
import StatisticChart from "../StatisticChart";
import AccurateVsInaccurateChart from "../StackedBarChart";

export default function StatisticsPanel() {
  const statistics = {
    totalData: 576,
    accurate: 366,
    inaccurate: 87,
    rogue: 232,
    normal: 142,
  };

  // Prepare data for the AccurateVsInaccurateChart
  const chartData = [
    { name: "Normal", value: statistics.normal },
    { name: "Rogue", value: statistics.rogue },
    { name: "Uncategorized", value: statistics.inaccurate },
  ];

  return (
    <div className="space-y-4 flex flex-col gap-2">
      <p className="geologica-bold">STATISTIC PANEL</p>
      <div>
        <div className="w-full bg-[#5d5d5c] flex flex-col items-center justify-center p-5 shadow-[0px_0px_15px_rgba(0,0,0,0.5)]">
          <StatisticChart />
        </div>
      </div>
      <div className="bg-[#5d5d5c] shadow-[0px_0px_15px_rgba(0,0,0,0.5)] p-4 rounded">
        <h2 className="text-lg font-bold">Total Data Categorized</h2>
        <p className="text-4xl font-bold mt-2">{statistics.totalData}</p>
        <AccurateVsInaccurateChart data={chartData} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#5d5d5c] p-2 rounded shadow-[0px_0px_15px_rgba(0,0,0,0.5)]">
          <h3 className="geologica-extrabold name">
            Total Accurate Predictions
          </h3>
          <p className="geologica-extrabold val">{statistics.accurate}</p>
        </div>
        <div className="bg-[#5d5d5c] p-2 rounded shadow-[0px_0px_15px_rgba(0,0,0,0.5)]">
          <h3 className="geologica-extrabold name">
            Total Inaccurate Predictions
          </h3>
          <p className="geologica-extrabold val">{statistics.inaccurate}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#5d5d5c] p-2 rounded shadow-[0px_0px_15px_rgba(0,0,0,0.5)]">
          <h3 className="geologica-extrabold name">Total Rogue Anomalies</h3>
          <p className="geologica-extrabold val">{statistics.rogue}</p>
        </div>
        <div className="bg-[#5d5d5c] p-2 rounded shadow-[0px_0px_15px_rgba(0,0,0,0.5)]">
          <h3 className="geologica-extrabold name">Total Normal Predictions</h3>
          <p className="geologica-extrabold val">{statistics.normal}</p>
        </div>
      </div>
    </div>
  );
}
