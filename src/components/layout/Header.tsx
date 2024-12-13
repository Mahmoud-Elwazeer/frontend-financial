import React from 'react';
import { ThemeToggle } from '../theme/ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Financial Exchanges
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
};