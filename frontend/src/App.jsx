import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Controls from './components/Controls';
import Bars from './components/Bars';
import Tiles from './components/Tiles';
import InfoPanel from './components/InfoPanel';
import Footer from './components/Footer';
import { generateRandomArray } from './utils/generateArray';
import { sort } from './api/sortApi';

function App() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [size, setSize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [originalArray, setOriginalArray] = useState([]);
  const [visualizationType, setVisualizationType] = useState('bars');

  const resetArray = () => {
    const newArray = generateRandomArray(size);
    setArray(newArray);
    setOriginalArray([...newArray]);
    setSteps([]);
    setCurrentStep(0);
    setIsSorting(false);
    setIsPaused(false);
  };

  useEffect(() => {
    resetArray();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    const newArray = generateRandomArray(newSize);
    setArray(newArray);
    setOriginalArray([...newArray]);
    setSteps([]);
    setCurrentStep(0);
  };

  const handleCustomArraySubmit = (customArray) => {
    setArray(customArray);
    setOriginalArray([...customArray]);
    setSize(customArray.length);
    setSteps([]);
    setCurrentStep(0);
  };

  const visualizeSort = async () => {
    setIsSorting(true);
    setIsPaused(false);
    setCurrentStep(0);
    try {
      // If steps are already generated, don't re-fetch
      if (steps.length === 0) {
        const sortSteps = await sort(algorithm, array);
        setSteps(sortSteps);
      }
    } catch (error) {
      console.error("Sorting failed:", error);
      setIsSorting(false);
    }
  };

  const stopSort = () => {
    setIsSorting(false);
    setIsPaused(false);
    setCurrentStep(0);
    setArray([...originalArray]);
    setSteps([]);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (isSorting && !isPaused && currentStep < steps.length - 1) {
      const delayMs = Math.max(20, 800 - speed * 6);
      const timeoutId = setTimeout(() => {
        setCurrentStep((s) => s + 1);
      }, delayMs);
      return () => clearTimeout(timeoutId);
    } else if (isSorting && currentStep === steps.length - 1) {
      setIsSorting(false);
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
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <label htmlFor="algorithm-select" className="text-xl font-bold text-gray-800 dark:text-white mr-4">
            Choose an Algorithm:
          </label>
          <select
            id="algorithm-select"
            onChange={(e) => setAlgorithm(e.target.value)}
            value={algorithm}
            disabled={isSorting}
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
          size={size}
          speed={speed}
          visualizationType={visualizationType}
        />

        {visualizationType === 'bars' ? (
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
