import React from 'react';

const algoDetails = {
  bubble: {
    name: 'Bubble Sort',
    complexity: 'O(n²)',
    space: 'O(1)',
    description: 'Bubble Sort is a straightforward algorithm that works by repeatedly stepping through the list, comparing each pair of adjacent items, and swapping them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. While simple to understand, it is inefficient for large lists and is not suitable for practical use.'
  },
  insertion: {
    name: 'Insertion Sort',
    complexity: 'O(n²)',
    space: 'O(1)',
    description: 'Insertion Sort builds the final sorted array one item at a time. It iterates through an input array and, for each element, it finds the correct position in the already-sorted part of the array and inserts it there. It is efficient for small data sets or for lists that are already substantially sorted.'
  },
  merge: {
    name: 'Merge Sort',
    complexity: 'O(n log n)',
    space: 'O(n)',
    description: 'Merge Sort is a highly efficient, stable, comparison-based sorting algorithm. It follows the divide-and-conquer paradigm: the array is recursively divided into two halves until each sub-array contains a single element. Then, these sub-arrays are repeatedly merged to produce new sorted sub-arrays until there is only one sorted array remaining.'
  },
  quick: {
    name: 'Quick Sort',
    complexity: 'O(n log n) avg',
    space: 'O(log n)',
    description: 'Quick Sort is an efficient, in-place sorting algorithm that also uses a divide-and-conquer strategy. It works by selecting a \'pivot\' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. Its performance is excellent on average but can degrade to O(n²) in the worst case.'
  },
  heap: {
    name: 'Heap Sort',
    complexity: 'O(n log n)',
    space: 'O(1)',
    description: 'Heap Sort is a comparison-based sorting technique that uses a binary heap data structure. It first transforms the list into a max heap (a binary tree where the parent node is always greater than its children). It then repeatedly swaps the root (the maximum element) with the last element of the heap, reduces the heap size by one, and heapifies the root to maintain the heap property.'
  },
};

const InfoPanel = ({ algorithm }) => {
  const details = algoDetails[algorithm];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">{details.name}</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {details.description}
      </p>
      <div className="flex flex-wrap gap-x-8 gap-y-2 text-lg border-t border-gray-200 dark:border-gray-700 pt-4">
        <p><strong>Time Complexity:</strong> <span className="font-mono p-1 bg-gray-200 dark:bg-gray-700 rounded-md">{details.complexity}</span></p>
        <p><strong>Space Complexity:</strong> <span className="font-mono p-1 bg-gray-200 dark:bg-gray-700 rounded-md">{details.space}</span></p>
      </div>
    </div>
  );
};

export default InfoPanel;
