import React from 'react';
import { X } from 'lucide-react';
import { ChartToggle } from './ChartToggle';

interface ChartHeaderProps {
    title: string;
    chartType: 'candle' | 'area';
    onChartTypeChange: (type: 'candle' | 'area') => void;
    onClose: () => void;
}

export const ChartHeader: React.FC<ChartHeaderProps> = ({
    title,
    chartType,
    onChartTypeChange,
    onClose,
}) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                {title}
            </h2>
            <div className="flex items-center gap-4">
                <ChartToggle chartType={chartType} onToggle={onChartTypeChange} />
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close chart"
                >
                    <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
            </div>
        </div>
    );
};