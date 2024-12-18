import React, { useRef, useEffect, useState } from "react";
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

const AccurateVsInaccurateChart = ({ lineWidth = 3 }) => {
  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: "100%",
    height: "100%",
  });

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
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        max: 200,
        grid: {
          color: "#fff",
        },
        ticks: {
          stepSize: 50,
          callback: (value) => value,
          color: "#ffffff",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Accurate vs Inaccurate Predictions",
        color: "#ffffff",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      legend: {
        position: "right",
        labels: {
          color: "#ffffff",
          font: {
            size: 10,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  // Update chart dimensions based on parent container
  useEffect(() => {
    const updateChartSize = () => {
      if (chartContainerRef.current) {
        const { width, height } =
          chartContainerRef.current.getBoundingClientRect();
        setChartDimensions({
          width: width || "100%",
          height: height || "100%",
        });
      }
    };

    // Initial size update
    updateChartSize();

    // Add resize listener
    window.addEventListener("resize", updateChartSize);

    // Cleanup listener
    return () => window.removeEventListener("resize", updateChartSize);
  }, []);

  return (
    <div ref={chartContainerRef} className="w-full h-full">
      <Line
        data={data}
        options={options}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: chartDimensions.width,
          height: chartDimensions.height,
        }}
      />
    </div>
  );
};

export default AccurateVsInaccurateChart;
