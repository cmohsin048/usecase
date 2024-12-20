"use client";

import { useState } from "react";
import { Info } from "lucide-react";

export default function SystemSettings() {
  const [isAutomated, setIsAutomated] = useState(true);
  const [classificationRate, setClassificationRate] = useState("every-second");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-12">SYSTEM SETTINGS</h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Classification Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-white">
                Classification of uploaded data
              </span>
              <Info className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center">
              <div
                className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${
                  isAutomated ? "bg-[#71C4ED]" : "bg-gray-700"
                }`}
                onClick={() => setIsAutomated(!isAutomated)}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                    isAutomated ? "translate-x-7" : ""
                  }`}
                />
              </div>
              <span className="ml-3 text-white">Automated</span>
            </div>

            {/* Classification Rate */}
            <div className="mt-8">
              <div className="flex gap-3">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white text-base">
                    Classification rate
                  </span>
                  <Info className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[#71C4ED] bg-opacity-20 rounded-[20rem] px-4 py-2 text-sm text-[#71C4ED] mb-6 inline-block">
                  How often the system will automatically review sample data in
                  the background
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { id: "every-second", label: "Every second" },
                  { id: "every-5-seconds", label: "Every 5 seconds" },
                  { id: "every-minute", label: "Every minute" },
                  { id: "every-5-minutes", label: "Every 5 minutes" },
                  { id: "every-hour", label: "Every hour" },
                ].map((rate) => (
                  <label
                    key={rate.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="classification-rate"
                        value={rate.id}
                        checked={classificationRate === rate.id}
                        onChange={(e) => setClassificationRate(e.target.value)}
                        className="appearance-none w-5 h-5 rounded-full border-2 border-white checked:border-[#71C4ED] checked:bg-black"
                      />
                      {classificationRate === rate.id && (
                        <div className="absolute w-2.5 h-2.5 bg-[#71C4ED] rounded-full"></div>
                      )}
                    </div>
                    <span className="text-white">{rate.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-12 px-6 py-3 bg-[#71C4ED] text-white font-semibold rounded hover:bg-[#5DB1DA] transition-colors"
          >
            SAVE CHANGES
          </button>
        </form>
      </div>
    </div>
  );
}
