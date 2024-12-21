import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, Time } from 'lightweight-charts';
import { Candle } from '../../types/candle';
import { LoadingSpinner } from '../loadingPage/LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { useTheme } from '../../contexts/ThemeContext';
import { AreaChartTooltip } from './AreaChartTooltip';
import { useChartConfig } from '../candles/useChartConfig';
import ReactDOMServer from 'react-dom/server'; 

interface AreaChartProps {
  data: Candle[];
  isLoading: boolean;
  isError: boolean;
}

export const AreaChart: React.FC<AreaChartProps> = ({ data, isLoading, isError }) => {
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
      });

      const areaSeries = chart.addAreaSeries({
        lineColor: isDark ? '#60a5fa' : '#3b82f6',
        topColor: isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(59, 130, 246, 0.4)',
        bottomColor: isDark ? 'rgba(96, 165, 250, 0.0)' : 'rgba(59, 130, 246, 0.0)',
      });

      const areaData = data.map((candle) => ({
        time: candle.dateTime.split('T')[0] as Time,
        value: candle.endPrice,
      }));

      areaSeries.setData(areaData);
      chart.timeScale().fitContent();

      chart.subscribeCrosshairMove(param => {
        if (tooltipRef.current && param.time) {
          const candle = data.find(c => c.dateTime.startsWith(param.time as string));
          if (candle) {
            tooltipRef.current.style.display = 'block';
            tooltipRef.current.innerHTML = '';
            const tooltipContent = document.createElement('div');
            tooltipContent.innerHTML = ReactDOMServer.renderToString(
              <AreaChartTooltip candle={candle} isDark={isDark} />
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
    return <ErrorMessage message="No data available for this exchange" />;
  }

  if (data.length === 0) {
    return <ErrorMessage message="No data available for this exchange" />;
  }

  return (
    <div className="relative h-screen">
      <div ref={chartContainerRef} className="w-full h-full" />
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