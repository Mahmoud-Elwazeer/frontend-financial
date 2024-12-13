import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFilterOptions } from '../../services/api';
import { MultiSelect } from './MultiSelect';
import { FilterState } from '../../types/filters';
import { RefreshCw, AlertCircle } from 'lucide-react';

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
  onApply,
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
      <div className="animate-pulse bg-white rounded-lg p-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
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
    <div className="flex flex-col md:flex-row gap-4">

      {/* Multi-Select Filters Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 md:w-3/4">
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

      {/* Buttons Section */}
      {/* <div className="md:w-1/4 space-y-6">
      <button
          onClick={onApply}
          className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={onReset}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Reset Filters
        </button>
      </div> */}
      <div className="md:w-1/4 flex flex-col justify-center space-y-6">
      <button
        onClick={onReset}
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        Reset Filters
      </button>
    </div>
    </div>
    
  );
};
