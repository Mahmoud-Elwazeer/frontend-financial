import React from 'react';
import { BarChart2, LineChart } from 'lucide-react';

interface ChartToggleProps {
  chartType: 'candle' | 'area';
  onToggle: (type: 'candle' | 'area') => void;
}

export const ChartToggle: React.FC<ChartToggleProps> = ({ chartType, onToggle }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={() => onToggle('candle')}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          chartType === 'candle'
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <BarChart2 className="h-4 w-4" />
        Candle
      </button>
      <button
        onClick={() => onToggle('area')}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          chartType === 'area'
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <LineChart className="h-4 w-4" />
        Area
      </button>
    </div>
  );
};