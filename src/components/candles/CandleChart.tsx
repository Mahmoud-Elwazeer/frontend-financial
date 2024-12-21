import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, Time } from 'lightweight-charts';
import { Candle } from '../../types/candle';
import { LoadingSpinner } from '../loadingPage/LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { useTheme } from '../../contexts/ThemeContext';
import { CandleChartTooltip } from './CandleChartTooltip';
import { useChartConfig } from './useChartConfig';
import ReactDOMServer from 'react-dom/server'; 

interface CandleChartProps {
  data: Candle[];
  isLoading: boolean;
  isError: boolean;
}

export const CandleChart: React.FC<CandleChartProps> = ({ data, isLoading, isError }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const chartConfig = useChartConfig(isDark);

  useEffect(() => {
    if (chartContainerRef.current && data.length > 0) {
      const chart = createChart(chartContainerRef.current, {
        ...chartConfig,
        width: chartContainerRef.current.clientWidth,
        height: 400,
        crosshair: {
          mode: 0,
        },
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#10b981',
        downColor: '#ef4444',
        borderVisible: true,
        wickUpColor: '#10b981',
        wickDownColor: '#ef4444',
      });

      const chartData = data.map((candle) => ({
        time: candle.dateTime.split('T')[0] as Time,
        open: candle.startPrice,
        high: Math.max(candle.highestPrice, candle.startPrice + 0.0001),
        low: Math.min(candle.lowestPrice, candle.startPrice - 0.0001),
        close: candle.endPrice,
      }));

      candlestickSeries.setData(chartData);
      chart.timeScale().fitContent();

      chart.subscribeCrosshairMove(param => {
        if (tooltipRef.current && param.time) {
          const candle = data.find(c => c.dateTime.startsWith(param.time as string));
          if (candle) {
            tooltipRef.current.style.display = 'block';
            tooltipRef.current.innerHTML = '';
            const tooltipContent = document.createElement('div');
            tooltipContent.innerHTML = ReactDOMServer.renderToString(
              <CandleChartTooltip candle={candle} isDark={isDark} />
            );
            tooltipRef.current.appendChild(tooltipContent);

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
      handleResize(); // Initial resize

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [data, isDark, chartConfig]);

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
      <div ref={chartContainerRef} className="w-full h-[calc(100%-20px)]" />
      <div
        ref={tooltipRef}
        className={`absolute hidden p-2 rounded-lg shadow-lg border z-50 ${
          isDark 
            ? 'bg-gray-800 border-gray-700 text-gray-200' 
            : 'bg-white border-gray-200 text-gray-800'
        }`}
      />
    </div>
  );
};