import React from 'react';
import { Exchange } from '../../types/exchange';
import { ExchangeListItem } from './ExchangeListItem';
import { ExchangeListSkeleton } from './ExchangeListSkeleton';
import { ExchangeListError } from './ExchangeListError';

interface ExchangeListProps {
  exchanges: Exchange[];
  onExchangeSelect: (exchange: Exchange) => void;
  selectedExchange?: Exchange;
  favorites?: string[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
}

export const ExchangeList: React.FC<ExchangeListProps> = ({
  exchanges,
  onExchangeSelect,
  selectedExchange,
  favorites = [],
  isLoading = false,
  isError = false,
  error,
}) => {
  if (isLoading) {
    return <ExchangeListSkeleton />;
  }

  if (!exchanges.length || isError) {
    return (
      <ExchangeListError 
        message={error || "No Exchanges found for the selected Filtration. Please adjust Filtration and try again"}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
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