import React from 'react';
import { Exchange } from '../../types/exchange';
import { ExchangeListItem } from './ExchangeListItem';
import { ExchangeListSkeleton } from './ExchangeListSkeleton';

interface ExchangeListProps {
  exchanges: Exchange[];
  onExchangeSelect: (exchange: Exchange) => void;
  selectedExchange?: Exchange;
  favorites?: string[];
  isLoading?: boolean;
}

export const ExchangeList: React.FC<ExchangeListProps> = ({
  exchanges,
  onExchangeSelect,
  selectedExchange,
  favorites = [],
  isLoading = false,
}) => {
  if (isLoading) {
    return <ExchangeListSkeleton />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
        {exchanges.map((exchange) => (
          <ExchangeListItem
            key={exchange._id}
            exchange={exchange}
            isSelected={selectedExchange?._id === exchange._id}
            isFavorite={favorites.includes(exchange.symbol)}
            onSelect={() => onExchangeSelect(exchange)}
          />
        ))}
      </div>
    </div>
  );
};