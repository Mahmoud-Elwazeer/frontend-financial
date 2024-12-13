import { ColorType } from 'lightweight-charts';

interface ChartConfig {
  layout: {
    background: {
      type: ColorType.Solid;
      color: string;
    };
    textColor: string;
  };
  grid: {
    vertLines: { color: string };
    horzLines: { color: string };
  };
}

export const useChartConfig = (isDark: boolean): ChartConfig => {
  return {
    layout: {
      background: {
        type: ColorType.Solid,
        color: isDark ? '#1f2937' : 'white',
      },
      textColor: isDark ? '#9ca3af' : '#1f2937',
    },
    grid: {
      vertLines: {
        color: isDark ? '#374151' : '#f0f0f0',
      },
      horzLines: {
        color: isDark ? '#374151' : '#f0f0f0',
      },
    },
  };
};