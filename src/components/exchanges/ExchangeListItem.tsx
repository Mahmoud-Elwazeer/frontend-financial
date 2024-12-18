import React from 'react';
import { Building2, Globe, Coins, Briefcase } from 'lucide-react';
import { Exchange } from '../../types/exchange';
import { FavoriteButton } from './FavoriteButton';

interface ExchangeListItemProps {
    exchange: Exchange;
    isSelected: boolean;
    isFavorite: boolean;
    onSelect: () => void;
}

export const ExchangeListItem: React.FC<ExchangeListItemProps> = ({
    exchange,
    isSelected,
    isFavorite,
    onSelect,
}) => {
    return (
        <div
            onClick={onSelect}
            className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors ${isSelected
                    ? 'bg-primary-50 dark:bg-primary-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {exchange.name}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({exchange.symbol})
                        </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            {exchange.country}
                        </div>
                        <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4" />
                            {exchange.currency}
                        </div>
                        <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {exchange.nameExchange}
                        </div>
                        <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {exchange.type}
                        </div>
                    </div>
                </div>
                <FavoriteButton
                    symbol={exchange.symbol}
                    isFavorite={isFavorite}
                />
            </div>
        </div>
    );
};