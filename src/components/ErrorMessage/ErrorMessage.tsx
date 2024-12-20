import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return (
    <div className={`flex items-center justify-center h-[400px] bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}>
      <div className="flex flex-col items-center gap-2 text-red-500 dark:text-red-400 p-4">
        <AlertCircle className="h-8 w-8" />
        <p className="text-lg text-center max-w-md">{message}</p>
      </div>
    </div>
  );
};