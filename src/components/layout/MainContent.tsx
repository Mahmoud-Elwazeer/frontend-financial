import React, { useState } from 'react';
import { Exchange } from '../../types/exchange';
import { ExchangeList } from '../exchanges/ExchangeList';
import { MetadataDisplay } from '../metadata/MetadataDisplay';
import { PopupChart } from '../charts/PopupChart';
import { useQuery } from '@tanstack/react-query';
import { getMetadata } from '../../services/api';
import { ChartSection } from '../charts/ChartSection';

interface MainContentProps {
  selectedExchange: Exchange | null;
  exchanges: Exchange[];
  onExchangeSelect: (exchange: Exchange) => void;
  isExchangesLoading: boolean;
  isExchangesError: boolean;
  exchangesError?: string;
  favorites: string[];
}

export const MainContent: React.FC<MainContentProps> = ({
  selectedExchange,
  exchanges,
  onExchangeSelect,
  isExchangesLoading,
  isExchangesError,
  exchangesError,
  favorites,
}) => {
  const [chartType, setChartType] = useState<'candle' | 'area'>('candle');
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  const { 
    data: metadata = {}, 
    isLoading: isMetadataLoading,
    isError: isMetadataError,
    error: metadataError,
  } = useQuery({
    queryKey: ['metadata', selectedExchange?.symbol],
    queryFn: () =>
      selectedExchange
        ? getMetadata(selectedExchange.symbol)
        : Promise.resolve({}),
    enabled: !!selectedExchange,
  });

  return (
    <main className="relative max-w-7xl mx-auto space-y-6">
      {/* Container with explicit dimensions to prevent CLS */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        style={{ 
          minHeight: '600px',
          containIntrinsicSize: '0 600px' // Add contain-intrinsic-size for modern browsers
        }}
      >
        {/* Exchange list container with skeleton state */}
        <div className="relative h-[600px] transition-all duration-300">
          <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <ExchangeList
              exchanges={exchanges}
              onExchangeSelect={onExchangeSelect}
              selectedExchange={selectedExchange || undefined}
              favorites={favorites}
              isLoading={isExchangesLoading}
              isError={isExchangesError}
              error={exchangesError}
            />
          </div>
        </div>
        
        {/* Chart section with placeholder state */}
        <div className="relative h-[600px] transition-all duration-300">
          <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            {isExchangesLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse space-y-4 w-full p-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                  <div className="h-[400px] bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
                </div>
              </div>
            ) : (
              <ChartSection
                selectedExchange={selectedExchange}
                isLoading={isExchangesLoading}
                chartType={chartType}
                onChartTypeChange={setChartType}
                onOpenModal={() => setIsChartModalOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Metadata section with maintained height */}
      <div 
        className={`transition-all duration-300 ${
          selectedExchange && !isExchangesLoading ? 'h-[200px]' : 'h-0'
        }`}
      >
        {selectedExchange && !isExchangesLoading && (
          <div className="h-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm overflow-hidden">
            <MetadataDisplay 
              data={metadata}
              isLoading={isMetadataLoading}
              isError={isMetadataError}
              error={metadataError instanceof Error ? metadataError.message : undefined}
            />
          </div>
        )}
      </div>

      {/* Modal chart */}
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