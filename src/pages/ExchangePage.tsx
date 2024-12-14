import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getExchanges, getCandles, getMetadata, getFavorites } from '../services/api';
import { Exchange } from '../types/exchange';
import { FilterPanel } from '../components/filters/FilterPanel';
import { useExchangeFilters } from '../hooks/useExchangeFilters';
import { Header } from '../components/layout/Header';
import { MainContent } from '../components/layout/MainContent';
import { Footer } from '../components/layout/Footer';

export function ExchangePage() {
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null);
  const { filters, handleFilterChange, handleReset, getQueryParams } = useExchangeFilters();

  const { 
    data: favorites = [],
    isLoading: isFavoritesLoading,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  });

  const favoriteSymbols = Array.isArray(favorites) ? favorites.map(fav => fav.symbol) : [];

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

  const handleApplyFilters = () => {
    refetchExchanges();
  };

  const handleResetFilters = () => {
    handleReset();
    refetchExchanges();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      <Header />
      <div className="flex-grow">
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
            favorites={favoriteSymbols}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}