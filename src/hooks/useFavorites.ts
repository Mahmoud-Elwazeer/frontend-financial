import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavorites, addFavorite, removeFavorite } from '../services/api/favorites';
import { Favorite } from '../types/favorite';

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  });

  const favoriteSymbols = favorites.map(fav => fav.symbol);

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async ({ symbol, isFavorite }: { symbol: string; isFavorite: boolean }) => {
      if (isFavorite) {
        return removeFavorite(symbol);
      }
      return addFavorite(symbol);
    },
    onMutate: async ({ symbol, isFavorite }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['favorites'] });

      // Snapshot the previous value
      const previousFavorites = queryClient.getQueryData(['favorites']);

      // Optimistically update favorites
      queryClient.setQueryData(['favorites'], (old: Favorite[] = []) => {
        if (isFavorite) {
          return old.filter(fav => fav.symbol !== symbol);
        }
        // Note: This is a simplified version since we don't have the full exchange data
        return [...old, { symbol }];
      });

      return { previousFavorites };
    },
    onError: (_err,_variables, context) => {
      // Rollback on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
    },
    onSettled: () => {
      // Refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  return {
    favorites,
    favoriteSymbols,
    isLoading,
    toggleFavorite,
  };
};