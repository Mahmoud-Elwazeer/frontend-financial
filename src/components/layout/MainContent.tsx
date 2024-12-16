import React, { useState } from 'react';
import { Exchange } from '../../types/exchange';
import { ExchangeList } from '../exchanges/ExchangeList';
import { CandleChart } from '../candles/CandleChart';
import { AreaChart } from '../charts/AreaChart';
import { ChartToggle } from '../charts/ChartToggle';
import { MetadataDisplay } from '../metadata/MetadataDisplay';
import { PopupChart } from '../charts/PopupChart';
import { Maximize2 } from 'lucide-react';

interface MainContentProps {
  selectedExchange: Exchange | null;
  exchanges: Exchange[];
  candles: any[];
  metadata: any;
  onExchangeSelect: (exchange: Exchange) => void;
  isExchangesLoading: boolean;
  isCandlesLoading: boolean;
  isMetadataLoading: boolean;
  isCandlesError: boolean;
  isMetadataError: boolean;
  favorites: string[];
}

export const MainContent: React.FC<MainContentProps> = ({
  selectedExchange,
  exchanges,
  candles,
  metadata,
  onExchangeSelect,
  isExchangesLoading,
  isCandlesLoading,
  isMetadataLoading,
  isCandlesError,
  isMetadataError,
  favorites,
}) => {
  const [chartType, setChartType] = useState<'candle' | 'area'>('candle');
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

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
        
        {selectedExchange && (
          <div className="space-y-6">
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
              {chartType === 'candle' ? (
                <CandleChart 
                  data={candles} 
                  isLoading={isCandlesLoading}
                  isError={isCandlesError}
                />
              ) : (
                <AreaChart 
                  data={candles} 
                  isLoading={isCandlesLoading}
                  isError={isCandlesError}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {selectedExchange && (
        <div className="mt-6">
          {Object.keys(metadata || {}).length === 0 && !isMetadataLoading ? (
            <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 text-yellow-700 dark:text-yellow-200 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Notice:</strong>
              <span className="block sm:inline"> No Metadata available for this exchange.</span>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <MetadataDisplay 
                data={metadata}
                isLoading={isMetadataLoading}
                isError={isMetadataError}
              />
            </div>
          )}
        </div>
      )}

      {selectedExchange && (
        <PopupChart
          isOpen={isChartModalOpen}
          onClose={() => setIsChartModalOpen(false)}
          data={candles}
          title={`${selectedExchange.name} (${selectedExchange.symbol})`}
          isLoading={isCandlesLoading}
          isError={isCandlesError}
        />
      )}
    </main>
  );
};