import React, { useState } from 'react';
import { Exchange } from '../../types/exchange';
import { ExchangeList } from '../exchanges/ExchangeList';
import { ChartContainer } from '../charts/ChartContainer';
import { ChartToggle } from '../charts/ChartToggle';
import { MetadataDisplay } from '../metadata/MetadataDisplay';
import { PopupChart } from '../charts/PopupChart';
import { Maximize2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getMetadata } from '../../services/api';
import { NoExchangeSelected } from '../exchanges/NoExchangeSelected';

interface MainContentProps {
  selectedExchange: Exchange | null;
  exchanges: Exchange[];
  onExchangeSelect: (exchange: Exchange) => void;
  isExchangesLoading: boolean;
  favorites: string[];
}

export const MainContent: React.FC<MainContentProps> = ({
  selectedExchange,
  exchanges,
  onExchangeSelect,
  isExchangesLoading,
  favorites,
}) => {
  const [chartType, setChartType] = useState<'candle' | 'area'>('candle');
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  const { 
    data: metadata = {}, 
    isLoading: isMetadataLoading,
    isError: isMetadataError,
  } = useQuery({
    queryKey: ['metadata', selectedExchange?.symbol],
    queryFn: () =>
      selectedExchange
        ? getMetadata(selectedExchange.symbol)
        : Promise.resolve({}),
    enabled: !!selectedExchange,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ExchangeList
            exchanges={exchanges}
            onExchangeSelect={onExchangeSelect}
            selectedExchange={selectedExchange || undefined}
            favorites={favorites}
          />
        </div>
        
        <div className="space-y-6">
          {selectedExchange ? (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedExchange.name} ({selectedExchange.symbol})
                </h2>
                <div className="flex items-center gap-2">
                  <ChartToggle chartType={chartType} onToggle={setChartType} />
                  <button
                    onClick={() => setIsChartModalOpen(true)}
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
          ) : (
            <NoExchangeSelected />
          )}
        </div>
      </div>

      {selectedExchange ? (
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <MetadataDisplay 
              data={metadata}
              isLoading={isMetadataLoading}
              isError={isMetadataError}
            />
          </div>
        </div>
      ) : null}

      {selectedExchange && (
        <PopupChart
          isOpen={isChartModalOpen}
          onClose={() => setIsChartModalOpen(false)}
          symbol={selectedExchange.symbol}
          title={`${selectedExchange.name} (${selectedExchange.symbol})`}
          chartType={chartType}
          onChartTypeChange={setChartType}
        />
      )}
    </main>
  );
};