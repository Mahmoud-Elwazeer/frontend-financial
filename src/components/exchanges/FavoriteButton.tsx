import React from 'react';
import { Heart } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite, removeFavorite } from '../../services/api/favorites';

interface FavoriteButtonProps {
  symbol: string;
  isFavorite: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ symbol, isFavorite }) => {
  const queryClient = useQueryClient();

  const { mutate: toggleFavorite, isLoading } = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        await removeFavorite(symbol);
      } else {
        await addFavorite(symbol);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['exchanges'] });
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoading) toggleFavorite();
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors ${
        isFavorite
          ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
          : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isLoading}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  );
};
