import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AccurateVsInaccurateChart = ({
  lineWidth = 3,
}) => {
  // Sample data
  const accurateData = [10, 20, 30, 40, 100, 60, 70, 150, 200];
  const inaccurateData = [0, 20, 0, 0, 0, 0, 10, 20, 50];

  const data = {
    labels: ["", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Accurate",
        data: accurateData,
        borderColor: "#00BFFF",
        backgroundColor: "#00BFFF",
        fill: false,
        borderWidth: lineWidth,
        pointRadius: 0,
      },
      {
        label: "Inaccurate",
        data: inaccurateData,
        borderColor: "#00CED1",
        backgroundColor: "#00CED1",
        fill: false,
        borderWidth: lineWidth,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        max: 200,
        grid: {
          color: "#fff", // Lighter grid lines
        },
        ticks: {
          stepSize: 50,
          callback: (value) => value,
          color: '#ffffff', // Set y-axis text color to white
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Accurate vs Inaccurate Predictions",
        color: '#ffffff', // Optional: also set title color to white if desired
        font: {
          size: 18,
          weight: "bold",
        },
      },
      legend: {
        position: "bottom",
        labels: {
          color: '#ffffff', // Optional: set legend text to white
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="w-[500px]">
      <Line data={data} options={options} width={'500px'} height={'200px'} />
    </div>
  );
};

export default AccurateVsInaccurateChart;