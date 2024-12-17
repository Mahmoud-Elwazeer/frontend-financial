import React from 'react';
import { Exchange } from '../../types/exchange';
import { ChartToggle } from './ChartToggle';
import { ChartContainer } from './ChartContainer';
import { Maximize2 } from 'lucide-react';
import { NoExchangeSelected } from '../exchanges/NoExchangeSelected';
import { LoadingSpinner } from '../loadingPage/LoadingSpinner';

interface ChartSectionProps {
    selectedExchange: Exchange | null;
    isLoading: boolean;
    chartType: 'candle' | 'area';
    onChartTypeChange: (type: 'candle' | 'area') => void;
    onOpenModal: () => void;
}

export const ChartSection: React.FC<ChartSectionProps> = ({
    selectedExchange,
    isLoading,
    chartType,
    onChartTypeChange,
    onOpenModal,
}) => {
    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <LoadingSpinner />
            </div>
        );
    }

    if (!selectedExchange) {
        return <NoExchangeSelected />;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedExchange.name} ({selectedExchange.symbol})
                </h2>
                <div className="flex items-center gap-2">
                    <ChartToggle chartType={chartType} onToggle={onChartTypeChange} />
                    <button
                        onClick={onOpenModal}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="View in popup"
                    >
                        <Maximize2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
            </div>
            <ChartContainer
                chartType={chartType}
                symbol={selectedExchange.symbol}
            />
        </div>
    );
};