import React from 'react';
import { CandleChart } from '../candles/CandleChart';
import { AreaChart } from './AreaChart';
import { DateRangeSelector } from '../dateRange/DateRangeSelector';
import { useCandles } from '../../hooks/useCandles';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

interface ChartContainerProps {
    chartType: 'candle' | 'area';
    symbol: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
    chartType,
    symbol,
}) => {
    const {
        candles,
        isLoading,
        isError,
        error,
        dateRange,
        setDateRange,
        resetDateRange,
    } = useCandles(symbol);

    const handleFromDateChange = (date: Date | undefined) => {
        setDateRange(prev => ({ ...prev, from: date }));
    };

    const handleToDateChange = (date: Date | undefined) => {
        setDateRange(prev => ({ ...prev, to: date }));
    };

    const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching data';

    return (
        <div className="flex flex-col h-full">
            <DateRangeSelector
                fromDate={dateRange.from}
                toDate={dateRange.to}
                onFromChange={handleFromDateChange}
                onToChange={handleToDateChange}
                onReset={resetDateRange}
            />

            <div className="flex-1 min-h-0">
                {isError ? (
                    <ErrorMessage
                        message={errorMessage}
                        className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    />
                ) : chartType === 'candle' ? (
                    <CandleChart
                        data={candles}
                        isLoading={isLoading}
                        isError={isError}
                    />
                ) : (
                    <AreaChart
                        data={candles}
                        isLoading={isLoading}
                        isError={isError}
                    />
                )}
            </div>
        </div>
    );
};