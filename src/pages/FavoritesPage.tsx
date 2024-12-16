import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCandles, getMetadata } from '../services/api';
import { Exchange } from '../types/exchange';
import { MainContent } from '../components/layout/MainContent';
import { LoadingSpinner } from '../components/loadingPage/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';
import { useFavorites } from '../hooks/useFavorites';

export function FavoritesPage() {
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null);
  const { favorites, favoriteSymbols, isLoading: isFavoritesLoading } = useFavorites();

  const exchanges = favorites.map(item => item.exchange);

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

  if (isFavoritesLoading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No favorites found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start adding exchanges to your favorites to see them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Favorite Exchanges
      </h1>
      <MainContent
        selectedExchange={selectedExchange}
        exchanges={exchanges}
        candles={candles}
        metadata={metadata}
        onExchangeSelect={setSelectedExchange}
        isExchangesLoading={isFavoritesLoading}
        isCandlesLoading={isCandlesLoading}
        isMetadataLoading={isMetadataLoading}
        isCandlesError={isCandlesError}
        isMetadataError={isMetadataError}
        favorites={favoriteSymbols}
      />
    </div>
  );
}