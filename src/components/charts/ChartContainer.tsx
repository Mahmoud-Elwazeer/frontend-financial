import React from 'react';
import { CandleChart } from '../candles/CandleChart';
import { AreaChart } from './AreaChart';
import { Candle } from '../../types/candle';

interface ChartContainerProps {
    chartType: 'candle' | 'area';
    data: Candle[];
    isLoading: boolean;
    isError: boolean;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
    chartType,
    data,
    isLoading,
    isError,
}) => {
    return chartType === 'candle' ? (
        <CandleChart
            data={data}
            isLoading={isLoading}
            isError={isError}
        />
    ) : (
        <AreaChart
            data={data}
            isLoading={isLoading}
            isError={isError}
        />
    );
};