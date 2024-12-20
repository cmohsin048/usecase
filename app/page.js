"use client";

import React from "react";
import StatisticsPanel from "../components/dashboard/StatisticPanel";
import SampleData from "../components/SampleData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-black h-[100vh] w-full text-white flex overflow-auto">
      <ToastContainer theme="dark" />

      {/* Left Section */}
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <SampleData />
          <div>
            <h1 className="geologica-bold mt-8 mb-4">CLASSIFICATIONS</h1>
            <Classifications />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="geologica-bold">ANOMALY FEEDBACK</h1>
          <div className="flex gap-[1px] mt-4">
            <button className="px-6 py-4 bg-[#ffffff] text-[#090909] hover:bg-[#9EECD2] rounded-sm">
              Yes
            </button>
            <button className="px-6 py-4 bg-[#ffffff] text-[#090909] hover:bg-[#9EECD2] rounded-sm">
              No
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/3 bg-[#333333] px-6 pt-6 h-full">
        <StatisticsPanel />
      </div>
    </div>
  );
}

// Classifications Component (unchanged)
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
                width={0}
                height={0}
                className="w-5 h-5" // This sets both width and height using Tailwind
                style={{ width: "20px", height: "20px" }} // Or use specific dimensions
              />
            </div>
            <p className="font-bold">{item.type}</p>
          </div>
          <div className="mt-4 text-gray-300 space-y-3">
            {item.message.map((field, idx) => (
              <p key={idx}>
                <span className="geologica-medium text-white">
                  {field.label}:
                </span>
                <span className="geologica-thin text-white">
                  {field.description}
                </span>
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
