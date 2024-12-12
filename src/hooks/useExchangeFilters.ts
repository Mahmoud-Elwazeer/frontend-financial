import { useState, useCallback } from 'react';
import { FilterState } from '../types/filters';

const initialFilters: FilterState = {
  type: ['All'],
  currency: ['All'],
  country: ['All'],
};

export const useExchangeFilters = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleReset = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const getQueryParams = useCallback(() => {
    const params: Record<string, string> = {};
    
    Object.entries(filters).forEach(([key, values]) => {
      if (!values.includes('All') && values.length > 0) {
        params[key] = values.join(',');
      }
    });

    return params;
  }, [filters]);

  return {
    filters,
    handleFilterChange,
    handleReset,
    getQueryParams,
  };
};