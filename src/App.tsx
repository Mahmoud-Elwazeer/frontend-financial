import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getExchanges, getCandles, getMetadata } from './services/api';
import { Filters } from './components/Filters';
import { ExchangeList } from './components/ExchangeList';
import { CandleChart } from './components/CandleChart';
// import { CandleData } from './components/CandleData';
import { Exchange } from './types/exchange';
import { FilterPanel } from './components/filters/FilterPanel';
import { useExchangeFilters } from './hooks/useExchangeFilters';
import { MetadataDisplay } from './components/metadata/MetadataDisplay';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ExchangePage() {
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null);
  const { filters, handleFilterChange, handleReset, getQueryParams } = useExchangeFilters();



  const { 
    data: exchanges = [], 
    refetch: refetchExchanges,
    isLoading: isExchangesLoading,
  } = useQuery({
    queryKey: ['exchanges', getQueryParams()],
    queryFn: () => getExchanges(getQueryParams()),
  });

  const { 
    data: candles = [], 
    isLoading: isCandlesLoading,
    isError: isCandlesError,
  } = useQuery({
    queryKey: ['candles', selectedExchange?.symbol],
    queryFn: () =>
      selectedExchange
        ? getCandles(selectedExchange.symbol)
        : Promise.resolve([]),
    enabled: !!selectedExchange,
  });

  const { 
    data: metadata = [], 
    isLoading: isMetadataLoading,
    isError: isMetadataError,
  } = useQuery({
    queryKey: ['metadata', selectedExchange?.symbol],
    queryFn: () =>
      selectedExchange
        ? getMetadata(selectedExchange.symbol)
        : Promise.resolve([]),
    enabled: !!selectedExchange,
  });

  const handleApplyFilters = () => {
    refetchExchanges();
  };

  const handleResetFilters = () => {
    handleReset();
    refetchExchanges();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Financial Exchanges</h1>
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          hasResults={!isExchangesLoading && exchanges.length > 0}
        />
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ExchangeList
              exchanges={exchanges}
              onExchangeSelect={setSelectedExchange}
              selectedExchange={selectedExchange || undefined}
            />
          </div>
          
          {selectedExchange && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedExchange.name} ({selectedExchange.symbol}) - Candle Data
                </h2>
                <CandleChart 
                  data={candles} 
                  isLoading={isCandlesLoading}
                  isError={isCandlesError}
                />
              </div>
            </div>
          )}
        </div>

        {/* Full-width metadata section */}
        {selectedExchange && (
          <div className="mt-6">
            {Object.keys(metadata).length === 0 && !isMetadataLoading ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Notice:</strong>
                <span className="block sm:inline"> No Metadata available for this exchange.</span>
              </div>
            ) : (
              <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                <MetadataDisplay 
                  data={metadata}
                  isLoading={isMetadataLoading}
                  isError={isMetadataError}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ExchangePage />
    </QueryClientProvider>
  );
}

export default App;