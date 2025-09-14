import React from 'react';

const Tiles = ({ array, comparing, swapping, sorted, speed }) => {
  const getTileColor = (index) => {
    if (sorted?.includes(index)) return 'bg-green-500 text-white';
    if (swapping?.includes(index)) return 'bg-red-500 text-white';
    if (comparing?.includes(index)) return 'bg-yellow-500 text-black';
    return 'bg-gray-300 dark:bg-gray-700';
  };

  const durationMs = speed ? Math.max(50, 800 - speed * 6) : 200;

  return (
    <div className="mt-8 w-full">
      <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 lg:grid-cols-20 gap-2">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-center h-16 w-full rounded-lg text-lg font-bold transition-all ${getTileColor(idx)}`}
            style={{ transitionDuration: `${durationMs}ms` }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiles;
