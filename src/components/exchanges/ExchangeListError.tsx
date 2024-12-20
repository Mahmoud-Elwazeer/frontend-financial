import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ExchangeListErrorProps {
    message: string;
}

export const ExchangeListError: React.FC<ExchangeListErrorProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <div className="flex flex-col items-center max-w-sm">
                <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400 mb-4" />
                <p className="text-lg text-gray-900 dark:text-gray-100 font-medium mb-2">
                    No Exchanges Found
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                    {message}
                </p>
            </div>
        </div>
    );
};