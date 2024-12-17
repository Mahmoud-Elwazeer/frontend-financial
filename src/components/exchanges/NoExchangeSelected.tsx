import React from 'react';
import { LineChart } from 'lucide-react';

export const NoExchangeSelected: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <LineChart className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Exchange Selected
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Select an exchange from the list to view its charts and detailed information.
            </p>
        </div>
    );
};