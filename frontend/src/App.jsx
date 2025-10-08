import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Controls from "./components/Controls";
import Bars from "./components/Bars";
import Tiles from "./components/Tiles";
import InfoPanel from "./components/InfoPanel";
import Footer from "./components/Footer";
import { generateRandomArray } from "./utils/generateArray";
import { sort, checkHealth } from "./api/sortApi";

function App() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [size, setSize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [originalArray, setOriginalArray] = useState([]);
  const [visualizationType, setVisualizationType] = useState("bars");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({
    type: "loading",
    message: "Checking backend connectivity…",
  });

  const statusStyles = {
    loading:
      "bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800",
    success:
      "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/40 dark:text-green-200 dark:border-green-800",
    error:
      "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/40 dark:text-red-200 dark:border-red-800",
    info: "bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800/60 dark:text-gray-200 dark:border-gray-700",
  };

  const resetArray = () => {
    const newArray = generateRandomArray(size);
    setArray(newArray);
    setOriginalArray([...newArray]);
    setSteps([]);
    setCurrentStep(0);
    setIsSorting(false);
    setIsPaused(false);
    setStatus(null);
  };

  useEffect(() => {
    resetArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;

    const verifyConnection = async () => {
      try {
        await checkHealth();
        if (isMounted) {
          setConnectionStatus({
            type: "success",
            message: "Backend connected and ready.",
          });
        }
      } catch (error) {
        console.error("Health check failed:", error);
        if (isMounted) {
          setConnectionStatus({
            type: "error",
            message:
              "Backend unreachable. Start the Flask server on port 5000.",
          });
        }
      }
    };

    verifyConnection();
    const intervalId = setInterval(verifyConnection, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const handleAlgorithmChange = (value) => {
    setAlgorithm(value);
    setSteps([]);
    setCurrentStep(0);
    setStatus(null);
  };

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    const newArray = generateRandomArray(newSize);
    setArray(newArray);
    setOriginalArray([...newArray]);
    setSteps([]);
    setCurrentStep(0);
    setStatus(null);
  };

  const handleCustomArraySubmit = (customArray) => {
    setArray(customArray);
    setOriginalArray([...customArray]);
    setSize(customArray.length);
    setSteps([]);
    setCurrentStep(0);
    setStatus(null);
  };

  const visualizeSort = async () => {
    if (isSorting || isLoading) {
      return;
    }

    setIsPaused(false);
    setCurrentStep(0);
    setSteps([]);
    setStatus({
      type: "loading",
      message: "Fetching sort steps from the backend…",
    });
    setIsLoading(true);

    try {
      const sortSteps = await sort(algorithm, array);

      if (!Array.isArray(sortSteps) || sortSteps.length === 0) {
        throw new Error("No steps returned from backend");
      }

      setSteps(sortSteps);
      setIsSorting(true);
      setStatus({
        type: "success",
        message: `Received ${sortSteps.length} steps for ${algorithm} sort.`,
      });
      setConnectionStatus({
        type: "success",
        message: "Backend connected and ready.",
      });
    } catch (error) {
      console.error("Sorting failed:", error);
      setStatus({
        type: "error",
        message:
          "Unable to fetch sort steps. Ensure the backend server is running.",
      });
      setIsSorting(false);
      setConnectionStatus({
        type: "error",
        message: "Backend unreachable. Start the Flask server on port 5000.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopSort = () => {
    setIsSorting(false);
    setIsPaused(false);
    setCurrentStep(0);
    setArray([...originalArray]);
    setSteps([]);
    setStatus({ type: "info", message: "Sort stopped." });
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (
      isSorting &&
      !isPaused &&
      steps.length > 0 &&
      currentStep < steps.length - 1
    ) {
      const delayMs = Math.max(20, 800 - speed * 6);
      const timeoutId = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, delayMs);

      return () => clearTimeout(timeoutId);
    }

    if (isSorting && steps.length > 0 && currentStep === steps.length - 1) {
      setIsSorting(false);
      setStatus({ type: "success", message: "Sorting complete!" });
    }
  }, [currentStep, steps, isSorting, isPaused, speed]);

  const currentArrayState = steps[currentStep] ? steps[currentStep][0] : array;
  const comparingIndices = steps[currentStep] ? steps[currentStep][1] : [];
  const swappingIndices = steps[currentStep] ? steps[currentStep][2] : [];
  const sortedIndices = steps[currentStep] ? steps[currentStep][3] : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          {connectionStatus && (
            <div
              className={`p-3 rounded-lg text-sm sm:text-base ${
                statusStyles[connectionStatus.type]
              }`}
            >
              {connectionStatus.message}
            </div>
          )}
          {status && (
            <div
              className={`p-3 rounded-lg text-sm sm:text-base ${
                statusStyles[status.type]
              }`}
            >
              {status.message}
            </div>
          )}
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <label
            htmlFor="algorithm-select"
            className="text-xl font-bold text-gray-800 dark:text-white mr-4"
          >
            Choose an Algorithm:
          </label>
          <select
            id="algorithm-select"
            onChange={(e) => handleAlgorithmChange(e.target.value)}
            value={algorithm}
            disabled={isSorting || isLoading}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="heap">Heap Sort</option>
          </select>
        </div>

        <InfoPanel algorithm={algorithm} />

        <Controls
          onGenerate={resetArray}
          onSort={visualizeSort}
          onStop={stopSort}
          onTogglePause={togglePause}
          onSizeChange={handleSizeChange}
          onSpeedChange={setSpeed}
          onCustomArraySubmit={handleCustomArraySubmit}
          onVisualizationChange={setVisualizationType}
          isSorting={isSorting}
          isPaused={isPaused}
          isLoading={isLoading}
          size={size}
          speed={speed}
          visualizationType={visualizationType}
        />

        {visualizationType === "bars" ? (
          <Bars
            array={currentArrayState}
            comparing={comparingIndices}
            swapping={swappingIndices}
            sorted={sortedIndices}
            speed={speed}
          />
        ) : (
          <Tiles
            array={currentArrayState}
            comparing={comparingIndices}
            swapping={swappingIndices}
            sorted={sortedIndices}
            speed={speed}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
