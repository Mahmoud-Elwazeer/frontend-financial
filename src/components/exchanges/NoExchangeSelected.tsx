import React from 'react';
import { LineChart } from 'lucide-react';

interface NoExchangeSelectedProps {
    message: string;
}

export const NoExchangeSelected: React.FC<NoExchangeSelectedProps> = ({message}) => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <div className="flex flex-col items-center max-w-sm">
                <LineChart className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Exchange Selected
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    {message}
                </p>
            </div>
        </div>
    );
};