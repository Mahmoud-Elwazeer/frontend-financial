import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MetadataErrorProps {
    message: string;
}

export const MetadataError: React.FC<MetadataErrorProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400 mb-4" />
            <p className="text-lg text-gray-900 dark:text-gray-100 font-medium mb-2">
                Metadata Not Available
            </p>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
                {message}
            </p>
        </div>
    );
};