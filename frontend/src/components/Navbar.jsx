import React from 'react';
import useDarkMode from '../hooks/useDarkMode';

const Navbar = () => {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sorting Visualizer</h1>
        <button onClick={() => setTheme(colorTheme)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          {colorTheme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
