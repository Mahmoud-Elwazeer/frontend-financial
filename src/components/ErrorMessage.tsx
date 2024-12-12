import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 text-red-500">
        <AlertCircle className="h-5 w-5" />
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};