"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { ArrowRight, ArrowLeft } from "lucide-react";

const API_BASE_URL = "http://135.181.9.183:8008";

export default function SampleData() {
  const [selectedDataset, setSelectedDataset] = useState("heart");
  const [sampleData, setSampleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initializeDataset = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/initialize/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataset_name: selectedDataset }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      sessionStorage.setItem("session_token", data.session_token);
      toast.success(data.message);

      await getCurrentSample();
    } catch (error) {
      toast.error(`Failed to initialize dataset: ${error.message}`);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentSample = async () => {
    try {
      const sessionToken = sessionStorage.getItem("session_token");
      if (!sessionToken) {
        throw new Error("No session token found");
      }

      const response = await fetch(`${API_BASE_URL}/api/get_current_sample/`, {
        headers: {
          Authorization: `Token ${sessionToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSampleData(data);
      console.log(data);
      toast.success("Sample data retrieved successfully");
    } catch (error) {
      toast.error(`Failed to get sample data: ${error.message}`);
      console.error("Error:", error);
    }
  };

  const handleIncrement = async () => {
    try {
      const sessionToken = sessionStorage.getItem("session_token");
      if (!sessionToken) {
        throw new Error("No session token found");
      }

      const response = await fetch(`${API_BASE_URL}/api/increment_index/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${sessionToken}`,
        },
      });

      if (response.status === 401) {
        toast.error(
          "Session expired. Please click 'Get Data' to continue browsing samples."
        );
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      // After successful increment, get the updated sample
      await getCurrentSample();
    } catch (error) {
      if (!(error instanceof Response && error.status === 401)) {
        toast.error(`Failed to increment index: ${error.message}`);
      }
      console.error("Error:", error);
    }
  };

  const handleDecrement = async () => {
    try {
      const sessionToken = sessionStorage.getItem("session_token");
      if (!sessionToken) {
        throw new Error("No session token found");
      }

      const response = await fetch(`${API_BASE_URL}/api/decrement_index/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${sessionToken}`,
        },
      });

      if (response.status === 401) {
        toast.error(
          "Session expired. Please click 'Get Data' to continue browsing samples."
        );
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      // After successful decrement, get the updated sample
      await getCurrentSample();
    } catch (error) {
      if (!(error instanceof Response && error.status === 401)) {
        toast.error(`Failed to decrement index: ${error.message}`);
      }
      console.error("Error:", error);
    }
  };

  const getFeatureLabel = (index) => {
    const labels = {
      0: "Type",
      1: "Age",
      2: "Sex",
      3: "CP",
      4: "TRestBPS",
      5: "Chol",
      6: "FBS",
      7: "RestECG",
      8: "Thalach",
      9: "Exang",
      10: "Oldpeak",
      11: "Slope",
      12: "CA",
      13: "Thal",
      14: "Prediction",
    };
    return labels[index] || `Feature ${index}`;
  };

  const formatValue = (value) => {
    if (value === undefined || value === null) return "N/A";
    return typeof value === "number" ? value.toFixed(2) : value.toString();
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h1 className="geologica-bold text-xl">SAMPLE DATA</h1>
        <div className="flex items-center gap-4">
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded"
            disabled={isLoading}
          >
            <option value="heart">Heart</option>
            <option value="diabetes">Diabetes</option>
          </select>
          <button
            onClick={initializeDataset}
            className="px-4 py-2 bg-[#71C4ED] text-black rounded disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Get Data"}
          </button>
        </div>
      </div>

      {sampleData?.rogue_prediction && (
        <div className="mb-4 p-4 bg-gray-800 rounded">
          <div className="flex items-center justify-between">
            <button
              onClick={handleDecrement}
              className="p-2 bg-[#71C4ED] text-black rounded hover:bg-[#5BA8D1] disabled:opacity-50"
              disabled={isLoading}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <p className="text-gray-300">
                Current Sample Index: {sampleData.rogue_prediction.sample_index}
              </p>
              <p className="text-gray-300">
                Rogue Severity:{" "}
                {formatValue(sampleData.rogue_prediction.rogue_severity)}
              </p>
            </div>
            <button
              onClick={handleIncrement}
              className="p-2 bg-[#71C4ED] text-black rounded hover:bg-[#5BA8D1] disabled:opacity-50"
              disabled={isLoading}
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border border-gray-600">
          <thead>
            <tr className="bg-[#71C4ED]">
              {Array.from({ length: 15 }).map((_, index) => (
                <th key={index} className="border border-gray-600 p-2">
                  {getFeatureLabel(index)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleData?.rogue_prediction ? (
              <>
                <tr>
                  <td className="border border-gray-600 p-2 text-white">
                    Original
                  </td>
                  {[
                    ...sampleData.rogue_prediction.original_features.slice(
                      0,
                      13
                    ),
                    sampleData.rogue_prediction.predictor_output,
                  ].map((value, index) => (
                    <td
                      key={index}
                      className={`border border-gray-600 p-2 ${
                        (index === 2 && value > 3) ||
                        (index === 3 && value > 200) ||
                        (index === 4 && value > 300)
                          ? "text-red-500"
                          : "text-white"
                      }`}
                    >
                      {formatValue(value)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-600 p-2 text-white">
                    Reconstructed
                  </td>
                  {[
                    ...sampleData.rogue_prediction.reconstructed_features.slice(
                      0,
                      13
                    ),
                    sampleData.rogue_prediction.reconstructed_prediction,
                  ].map((value, index) => (
                    <td
                      key={index}
                      className={`border border-gray-600 p-2 ${
                        (index === 2 && value > 3) ||
                        (index === 3 && value > 200) ||
                        (index === 4 && value > 300)
                          ? "text-red-500"
                          : "text-white"
                      }`}
                    >
                      {formatValue(value)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-600 p-2 text-white">
                    Error
                  </td>
                  {[
                    ...sampleData.rogue_prediction.per_feature_error.slice(
                      0,
                      13
                    ),
                    sampleData.rogue_prediction.rogue_prediction,
                  ].map((value, index) => (
                    <td
                      key={index}
                      className="border border-gray-600 p-2 text-white"
                    >
                      {formatValue(value)}
                    </td>
                  ))}
                </tr>
              </>
            ) : (
              <tr>
                <td
                  colSpan="15"
                  className="border border-gray-600 p-4 text-white"
                >
                  {isLoading
                    ? "Loading..."
                    : "No data available. Please select the dataset and click Get Data to fetch sample data."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
