import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getExchanges } from '../services/api';
import { Exchange } from '../types/exchange';
import { FilterPanel } from '../components/filters/FilterPanel';
import { useExchangeFilters } from '../hooks/useExchangeFilters';
import { MainContent } from '../components/layout/MainContent';
import { useFavorites } from '../hooks/useFavorites';

export function ExchangePage() {
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null);
  const { filters, handleFilterChange, handleReset, getQueryParams } = useExchangeFilters();
  const { favoriteSymbols } = useFavorites();

  // Reset selected exchange whenever filters change
  useEffect(() => {
    setSelectedExchange(null);
  }, [filters]);

  const { 
    data: exchanges = [], 
    isLoading: isExchangesLoading,
    isError: isExchangesError,
    error: exchangesError,
  } = useQuery({
    queryKey: ['exchanges', getQueryParams()],
    queryFn: () => getExchanges(getQueryParams()),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />
      
      <MainContent
        selectedExchange={selectedExchange}
        exchanges={exchanges}
        onExchangeSelect={setSelectedExchange}
        isExchangesLoading={isExchangesLoading}
        isExchangesError={isExchangesError}
        exchangesError={exchangesError instanceof Error ? exchangesError.message : undefined}
        favorites={favoriteSymbols}
      />
    </div>
  );
}