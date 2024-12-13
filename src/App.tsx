import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getExchanges, getCandles, getMetadata } from './services/api';
import { Exchange } from './types/exchange';
import { FilterPanel } from './components/filters/FilterPanel';
import { useExchangeFilters } from './hooks/useExchangeFilters';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { MainContent } from './components/layout/MainContent';

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          hasResults={!isExchangesLoading && exchanges.length > 0}
        />
        
        <MainContent
          selectedExchange={selectedExchange}
          exchanges={exchanges}
          candles={candles}
          metadata={metadata}
          onExchangeSelect={setSelectedExchange}
          isExchangesLoading={isExchangesLoading}
          isCandlesLoading={isCandlesLoading}
          isMetadataLoading={isMetadataLoading}
          isCandlesError={isCandlesError}
          isMetadataError={isMetadataError}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ExchangePage />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;