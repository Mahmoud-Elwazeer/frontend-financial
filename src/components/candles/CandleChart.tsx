import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, Time } from 'lightweight-charts';
import { Candle } from '../types/candle';
import { format } from 'date-fns';
import { LoadingSpinner } from '../loadingPage/LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

interface CandleChartProps {
  data: Candle[];
  isLoading: boolean;
  isError: boolean;
}

export const CandleChart: React.FC<CandleChartProps> = ({ data, isLoading, isError }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current && data.length > 0) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: 'white' },
          textColor: 'black',
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
        crosshair: {
          mode: 0,
        },
        grid: {
          vertLines: { color: '#f0f0f0' },
          horzLines: { color: '#f0f0f0' },
        },
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: true,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
        borderColor: '#378658',
      });

      const chartData = data.map((candle) => ({
        time: candle.dateTime.split('T')[0] as Time,
        open: candle.startPrice,
        high: Math.max(candle.highestPrice, candle.startPrice + 0.0001), // Ensure some height for flat candles
        low: Math.min(candle.lowestPrice, candle.startPrice - 0.0001), // Ensure some height for flat candles
        close: candle.endPrice,
      }));

      candlestickSeries.setData(chartData);

      // Auto-scale the chart
      chart.timeScale().fitContent();

      // Subscribe to crosshair move to update tooltip
      chart.subscribeCrosshairMove(param => {
        if (tooltipRef.current && param.time) {
          const candle = data.find(c => c.dateTime.startsWith(param.time as string));
          if (candle) {
            tooltipRef.current.style.display = 'block';
            tooltipRef.current.innerHTML = `
              <div class="text-sm">
                <div class="font-semibold">${format(new Date(candle.dateTime), 'MMM dd, yyyy')}</div>
                <div>Open: ${candle.startPrice.toFixed(2)}</div>
                <div>Close: ${candle.endPrice.toFixed(2)}</div>
                <div>High: ${candle.highestPrice.toFixed(2)}</div>
                <div>Low: ${candle.lowestPrice.toFixed(2)}</div>
                <div>Volume: ${candle.volume.toLocaleString()}</div>
              </div>
            `;

            const coordinate = param.point;
            if (coordinate) {
              const left = coordinate.x + 60;
              const top = coordinate.y + 60;
              tooltipRef.current.style.left = left + 'px';
              tooltipRef.current.style.top = top + 'px';
            }
          }
        } else if (tooltipRef.current) {
          tooltipRef.current.style.display = 'none';
        }
      });

      chartRef.current = chart;

      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message="No candle data available for this exchange" />;
  }

  if (data.length === 0) {
    return <ErrorMessage message="No candle data available for this exchange" />;
  }

  return (
    <div className="relative">
      <div ref={chartContainerRef} className="w-full" />
      <div
        ref={tooltipRef}
        className="absolute hidden bg-white p-2 rounded-lg shadow-lg border border-gray-200 z-50"
      />
    </div>
  );
};