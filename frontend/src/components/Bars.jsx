import React from 'react';

const Bars = ({ array, comparing, swapping, sorted, speed }) => {
  const maxVal = array.length > 0 ? Math.max(...array) : 1;

  const getBarColor = (index) => {
    if (sorted?.includes(index)) return 'bg-green-500';
    if (swapping?.includes(index)) return 'bg-red-500';
    if (comparing?.includes(index)) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const durationMs = speed ? Math.max(50, 800 - speed * 6) : 200;

  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <div className="flex justify-center items-end h-96 w-full bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`mx-px ${getBarColor(idx)} transition-all`}
            style={{
              width: `${100 / array.length}%`,
              height: `${(value / maxVal) * 100}%`,
              transitionDuration: `${durationMs}ms`,
            }}
          ></div>
        ))}
      </div>

      <div className="mt-2 w-full px-4">
        <div className="flex justify-around text-xs text-gray-700 dark:text-gray-300">
          {array.map((value, idx) => (
            <div key={idx} style={{ width: `${100 / array.length}%` }} className="text-center truncate px-0.5">
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bars;
