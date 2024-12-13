import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFilterOptions } from '../../services/api';
import { MultiSelect } from './MultiSelect';
import { FilterState } from '../../types/filters';
import { RefreshCw } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onApply: () => void;
  onReset: () => void;
  hasResults: boolean;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
  hasResults,
}) => {
  const { data: filterOptions, isLoading } = useQuery({
    queryKey: ['filterOptions'],
    queryFn: getFilterOptions,
  });

  const handleSectionChange = (sectionId: keyof FilterState, values: string[]) => {
    onFilterChange({
      ...filters,
      [sectionId]: values,
    });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg p-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!filterOptions) {
    return null;
  }

  const sections = [
    { id: 'type' as const, label: 'Type', options: filterOptions.types },
    { id: 'currency' as const, label: 'Currency', options: filterOptions.currencies },
    { id: 'country' as const, label: 'Country', options: filterOptions.countries },
  ].filter((section) => section.options.length > 0);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 md:w-3/4 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <MultiSelect
              key={section.id}
              label={section.label}
              options={section.options}
              selectedValues={filters[section.id]}
              onChange={(values) => handleSectionChange(section.id, values)}
            />
          ))}
        </div>
      </div>

      <div className="md:w-1/4 flex flex-col justify-center space-y-4">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};