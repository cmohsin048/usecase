import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart = () => {
  // Chart data
  const data = {
    labels: [""],
    datasets: [
      {
        label: "Uncategorized",
        data: [76],
        backgroundColor: "#A55EEA",
        borderRadius: 5,
      },
      {
        label: "Rogue",
        data: [150],
        backgroundColor: "#B0EACD",
        borderRadius: 5,
      },
      {
        label: "Normal",
        data: [350],
        backgroundColor: "#7EC8E3",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#FFF",
          font: {
            size: 10,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        stacked: true,
        border: {
          display: false, // Completely remove x-axis border
        },
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        stacked: true,
        border: {
          display: false, // Completely remove y-axis border
        },
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md">
      <Bar data={data} options={options} height={80} />
    </div>
  );
};

export default StackedBarChart;
