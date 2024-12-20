import React from 'react';

export const ExchangeListSkeleton: React.FC = () => {
    return (
        <div className="h-full">
            <div className="animate-pulse space-y-4 p-4">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                                <div className="flex items-center gap-4">
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