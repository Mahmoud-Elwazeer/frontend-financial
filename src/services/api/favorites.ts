import { api } from './config';
import { Favorite } from '../../types/favorite';
import { ApiResponse } from '../../types/api';

export const getFavorites = async () => {
  try {
    const { data } = await api.get<ApiResponse<{ favorites: Favorite[] }>>('/favorites');
    return data.favorites.data;
  } catch (error) {
    console.error('Error get all favorites:', error);
    throw error;
  }
  
};

export const addFavorite = async (symbol: string) => {
  try {
    const { data } = await api.post<ApiResponse<{ favorite: Favorite }>>('/favorites', { symbol });
    return data.favorite;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error; // Re-throw to propagate the error
  }
};

export const removeFavorite = async (symbol: string) => {
  try {
    await api.delete(`/favorites/${symbol}`);
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};