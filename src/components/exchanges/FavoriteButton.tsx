import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';

interface FavoriteButtonProps {
  symbol: string;
  isFavorite: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ symbol, isFavorite }) => {
  const { toggleFavorite } = useFavorites();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({ symbol, isFavorite });
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors ${
        isFavorite
          ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
          : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  );
};