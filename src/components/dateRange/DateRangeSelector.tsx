import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangeSelectorProps {
    fromDate: Date | undefined;
    toDate: Date | undefined;
    onFromChange: (date: Date | undefined) => void;
    onToChange: (date: Date | undefined) => void;
    onReset: () => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
    fromDate,
    toDate,
    onFromChange,
    onToChange,
    onReset,
}) => {
    return (
        <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <input
                    type="date"
                    value={fromDate ? fromDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => onFromChange(e.target.value ? new Date(e.target.value) : undefined)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <span className="text-gray-500">to</span>
                <input
                    type="date"
                    value={toDate ? toDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => onToChange(e.target.value ? new Date(e.target.value) : undefined)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    min={fromDate ? fromDate.toISOString().split('T')[0] : undefined}
                />
            </div>
            <button
                onClick={onReset}
                className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
                Reset
            </button>
        </div>
    );
};