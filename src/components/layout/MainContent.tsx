import React, { useState } from 'react';
import { Exchange } from '../../types/exchange';
import { ExchangeList } from '../exchanges/ExchangeList';
import { MetadataDisplay } from '../metadata/MetadataDisplay';
import { PopupChart } from '../charts/PopupChart';
import { useQuery } from '@tanstack/react-query';
import { getMetadata } from '../../services/api';
import { ChartSection } from '../charts/ChartSection';
import { CompanyMetadata } from '../../types/metadata';
import { Candle } from '../../types/candle';


interface MainContentProps {
  selectedExchange: Exchange | null;
  exchanges: Exchange[];
  candles: Candle[];
  metadata: CompanyMetadata | null;
  onExchangeSelect: (exchange: Exchange) => void;
  isExchangesLoading: boolean;
  isExchangesError: boolean;
  exchangesError?: string;
  favorites: string[];
  isCandlesLoading: boolean;
  isMetadataLoading: boolean;
  isCandlesError: boolean;
  isMetadataError: boolean;
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
    data: metadata = {} as CompanyMetadata, 
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
    <main className="max-w-7xl mx-auto space-y-6">
      {/* Fixed height container for the grid to prevent layout shift */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
        {/* Exchange list with fixed height */}
        <div className="h-[600px]">
          <div className="sticky top-24 h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
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
        
        {/* Chart section with fixed height */}
        <div className="h-[600px]">
          <div className="sticky top-24 h-full">
            <ChartSection
              selectedExchange={selectedExchange}
              isLoading={isExchangesLoading}
              chartType={chartType}
              onChartTypeChange={setChartType}
              onOpenModal={() => setIsChartModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Metadata section with min-height to prevent layout shift */}
      {selectedExchange && !isExchangesLoading && (
        <div className="min-h-[200px] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <MetadataDisplay 
            data={metadata}
            isLoading={isMetadataLoading}
            isError={isMetadataError}
            error={metadataError instanceof Error ? metadataError.message : undefined}
          />
        </div>
      )}

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