"use client";

import React from "react";
import StatisticsPanel from "../components/dashboard/StatisticPanel";

import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black h-[100vh] w-full text-white flex">
      {/* Left Section */}
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div>
            <h1 className="geologica-bold mb-4">SAMPLE DATA</h1>
            <SampleDataTable />
          </div>
          <div>
            <h1 className="geologica-bold mt-8 mb-4">CLASSIFICATIONS</h1>
            <Classifications />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="geologica-bold">ANOMALY FEEDBACK</h1>
          <div className="flex gap-[1px] mt-4">
            <button className="px-6 py-4 bg-[#ffffff] text-[#090909] rounded-sm">
              Yes
            </button>
            <button className="px-6 py-4 bg-[#ffffff] text-[#090909] rounded-sm">
              No
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/3 bg-gray-800 p-6">
        <StatisticsPanel />
      </div>
    </div>
  );
}

// SampleDataTable Component
function SampleDataTable() {
  const data = [
    {
      Age: 50,
      Sex: 0,
      CP: 4,
      Trestbps: 300,
      Chol: 700,
      FBS: 1,
      Restecg: 2,
      Thalach: 90,
    },
  ];

  return (
    <table className="table-auto w-full text-center border border-gray-600">
      <thead>
        <tr className="bg-[#71C4ED]">
          <th className="border border-gray-600 p-2">Age</th>
          <th className="border border-gray-600 p-2">Sex</th>
          <th className="border border-gray-600 p-2">CP</th>
          <th className="border border-gray-600 p-2">Trestbps</th>
          <th className="border border-gray-600 p-2">Chol</th>
          <th className="border border-gray-600 p-2">FBS</th>
          <th className="border border-gray-600 p-2">Restecg</th>
          <th className="border border-gray-600 p-2">Thalach</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.entries(row).map(([key, value], i) => (
              <td
                key={i}
                className={`border border-gray-600 p-2 ${
                  (key === "CP" && value > 3) ||
                  (key === "Trestbps" && value > 200) ||
                  (key === "Chol" && value > 300)
                    ? "text-red-500"
                    : "text-white"
                }`}
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}




function Classifications() {
  const classifications = [
    {
      type: "Rogue anomaly detected",
      message: [
        {
          label: "cp",
          description:
            "The value `4` is invalid for the `cp` (chest pain type) attribute, which should be in the range `0-3`.",
        },
        {
          label: "trestbps",
          description:
            "A resting blood pressure of `300` mm Hg is highly abnormal and unrealistic.",
        },
        {
          label: "chol",
          description:
            "A cholesterol level of `700` mg/dl is extremely high and unlikely.",
        },
      ],
    },
  ];

  return (
    <div className="text-sm">
      {classifications.map((item, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center gap-2 bg-[#3b2323] text-[#f28c82] py-2 px-4 rounded-full w-fit shadow-lg">
            {/* Warning Icon */}
            <div className="w-7 h-7 flex items-center justify-center">
              <Image
                src="/warning.svg"
                alt="warning"
                width={20}
                height={20}
              />
            </div>
            <p className="font-bold">{item.type}</p>
          </div>
          <div className="mt-4 text-gray-300 space-y-3">
            {item.message.map((field, idx) => (
              <p key={idx}>
                <span className="geologica-medium text-white">{field.label}:</span>
                <span className="geologica-thin text-white">{field.description}</span>
                
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}




