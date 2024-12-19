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
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
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
        
        <div className="space-y-6">
          <ChartSection
            selectedExchange={selectedExchange}
            isLoading={isExchangesLoading}
            chartType={chartType}
            onChartTypeChange={setChartType}
            onOpenModal={() => setIsChartModalOpen(true)}
          />
        </div>
      </div>

      {selectedExchange && !isExchangesLoading && (
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <MetadataDisplay 
              data={metadata}
              isLoading={isMetadataLoading}
              isError={isMetadataError}
              error={metadataError instanceof Error ? metadataError.message : undefined}
            />
          </div>
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