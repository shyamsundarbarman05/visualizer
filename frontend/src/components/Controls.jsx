import React, { useState } from "react";

const Controls = ({
  onGenerate,
  onSort,
  onStop,
  onTogglePause,
  onSizeChange,
  onSpeedChange,
  onCustomArraySubmit,
  onVisualizationChange,
  isSorting,
  isPaused,
  isLoading,
  size,
  speed,
  visualizationType,
}) => {
  const [customArrayInput, setCustomArrayInput] = useState("");

  const handleCustomSubmit = () => {
    const parsedArray = customArrayInput
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((num) => !isNaN(num));

    if (parsedArray.length > 0) {
      onCustomArraySubmit(parsedArray);
    } else {
      alert("Please enter a valid comma-separated list of numbers.");
    }
  };

  const setDummyArray = () => {
    const dummy = [8, 4, 23, 42, 16, 15];
    setCustomArrayInput(dummy.join(", "));
    onCustomArraySubmit(dummy);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl space-y-6">
      {/* Top Row: Main Controls & Visualization Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onGenerate}
            disabled={isSorting || isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-500 transition-all transform hover:scale-105"
          >
            <span role="img" aria-label="refresh">
              🔄
            </span>
            New Array
          </button>
        </div>

        <div className="flex items-center p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
          <button
            onClick={() => onVisualizationChange("bars")}
            disabled={isSorting || isLoading}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              visualizationType === "bars"
                ? "bg-white dark:bg-gray-900 shadow"
                : ""
            } ${isSorting || isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            Bars
          </button>
          <button
            onClick={() => onVisualizationChange("tiles")}
            disabled={isSorting || isLoading}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              visualizationType === "tiles"
                ? "bg-white dark:bg-gray-900 shadow"
                : ""
            } ${isSorting || isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            Tiles
          </button>
        </div>
      </div>

      {/* Middle Row: Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        {!isSorting ? (
          <button
            onClick={onSort}
            disabled={isLoading}
            className="flex items-center gap-2 w-32 justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <span role="img" aria-label="play">
              ▶️
            </span>
            {isLoading ? "Loading…" : "Sort"}
          </button>
        ) : (
          <>
            <button
              onClick={onTogglePause}
              className="flex items-center gap-2 w-32 justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all transform hover:scale-105"
            >
              {isPaused ? (
                <span role="img" aria-label="play">
                  ▶️
                </span>
              ) : (
                <span role="img" aria-label="pause">
                  ⏸️
                </span>
              )}
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={onStop}
              className="flex items-center gap-2 w-32 justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all transform hover:scale-105"
            >
              <span role="img" aria-label="stop">
                ⏹️
              </span>
              Stop
            </button>
          </>
        )}
      </div>

      {/* Bottom Row: Sliders and Custom Input */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-3">
          <label htmlFor="size" className="font-medium text-lg">
            Size
          </label>
          <input
            type="range"
            id="size"
            min="10"
            max="100"
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            disabled={isSorting || isLoading}
            className="w-40"
          />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="speed" className="font-medium text-lg">
            Speed
          </label>
          <input
            type="range"
            id="speed"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-40"
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder="Or enter a custom array: 5, 3, 8, 1"
          value={customArrayInput}
          onChange={(e) => setCustomArrayInput(e.target.value)}
          disabled={isSorting || isLoading}
          className="w-full max-w-md px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          onClick={handleCustomSubmit}
          disabled={isSorting || isLoading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-500 transition-colors"
        >
          Set
        </button>
        <button
          onClick={setDummyArray}
          disabled={isSorting || isLoading}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-500 transition-colors"
        >
          Dummy
        </button>
      </div>
    </div>
  );
};

export default Controls;
