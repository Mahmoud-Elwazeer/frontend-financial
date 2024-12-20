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
    <div className="max-w-7xl mx-auto">
      {/* Main grid with fixed height to prevent layout shifts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px] mb-6">
        {/* Exchange list with fixed dimensions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
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
        
        {/* Chart section with fixed dimensions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <ChartSection
            selectedExchange={selectedExchange}
            isLoading={isExchangesLoading}
            chartType={chartType}
            onChartTypeChange={setChartType}
            onOpenModal={() => setIsChartModalOpen(true)}
          />
        </div>
      </div>

      {/* Metadata section with smooth height transition */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          selectedExchange ? 'h-[200px] opacity-100' : 'h-0 opacity-0'
        }`}
      >
        {selectedExchange && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
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
    </div>
  );
};