import { useQuery } from '@tanstack/react-query';
import { getCandles } from '../services/api/candles';
import { useState } from 'react';

interface DateRange {
    from?: Date;
    to?: Date;
}

export const useCandles = (symbol: string | undefined) => {
    const [dateRange, setDateRange] = useState<DateRange>({});

    const {
        data: candles = [],
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['candles', symbol, dateRange],
        queryFn: () => symbol ? getCandles(symbol, dateRange) : Promise.resolve([]),
        enabled: !!symbol,
        retry: false,
    });

    const resetDateRange = () => {
        setDateRange({});
        refetch();
    };

    return {
        candles,
        isLoading,
        isError,
        error,
        dateRange,
        setDateRange,
        resetDateRange,
    };
};