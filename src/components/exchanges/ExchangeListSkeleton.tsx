import React from 'react';

export const ExchangeListSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="p-4 border-b border-gray-200 dark:border-gray-700 animate-pulse"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                                <div className="mt-2 flex items-center gap-4">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="flex items-center gap-1">
                                            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};