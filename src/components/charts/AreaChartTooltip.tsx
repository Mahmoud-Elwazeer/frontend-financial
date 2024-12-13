import React from 'react';
import { format } from 'date-fns';
import { Candle } from '../../types/candle';

interface AreaChartTooltipProps {
  candle: Candle;
  isDark: boolean;
}

export const AreaChartTooltip: React.FC<AreaChartTooltipProps> = ({ candle, isDark }) => {
  return (
    <div className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
      <div className="font-semibold">
        {format(new Date(candle.dateTime), 'MMM dd, yyyy')}
      </div>
      <div>Open: {candle.startPrice.toFixed(2)}</div>
      <div>Close: {candle.endPrice.toFixed(2)}</div>
      <div>High: {candle.highestPrice.toFixed(2)}</div>
      <div>Low: {candle.lowestPrice.toFixed(2)}</div>
      <div>Volume: {candle.volume.toLocaleString()}</div>
    </div>
  );
};