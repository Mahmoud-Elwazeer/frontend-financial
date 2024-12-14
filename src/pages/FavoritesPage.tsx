import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFavorites, getExchanges } from '../services/api';
import { Exchange } from '../types/exchange';
import { Header } from '../components/layout/Header';
import { MainContent } from '../components/layout/MainContent';
import { Footer } from '../components/layout/Footer';
import { LoadingSpinner } from '../components/loadingPage/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

export function FavoritesPage() {
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null);

  const { 
    data: favorites = [],
    isLoading: isFavoritesLoading,
    isError: isFavoritesError,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  });

  const favoriteSymbols = favorites.map(fav => fav.symbol);

  const { 
    data: exchanges = [],
    isLoading: isExchangesLoading,
  } = useQuery({
    queryKey: ['exchanges', { symbols: favoriteSymbols }],
    queryFn: () => getExchanges({ symbols: favoriteSymbols.join(',') }),
    enabled: favoriteSymbols.length > 0,
  });

  if (isFavoritesLoading || isExchangesLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (isFavoritesError) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <ErrorMessage message="Failed to load favorites" />
        </div>
        <Footer />
      </div>
    );
  }

  if (exchanges.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No favorites found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start adding exchanges to your favorites to see them here.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Favorite Exchanges
          </h1>
          <MainContent
            selectedExchange={selectedExchange}
            exchanges={exchanges}
            candles={[]}
            metadata={[]}
            onExchangeSelect={setSelectedExchange}
            isExchangesLoading={isExchangesLoading}
            isCandlesLoading={false}
            isMetadataLoading={false}
            isCandlesError={false}
            isMetadataError={false}
            favorites={favoriteSymbols}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}