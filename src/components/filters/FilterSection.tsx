import React from 'react';
import { Check } from 'lucide-react';

interface FilterSectionProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  label,
  options,
  selectedValues,
  onChange,
}) => {
  const handleOptionClick = (option: string) => {
    if (option === 'All') {
      onChange(['All']);
    } else {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter(v => v !== option)
        : [...selectedValues.filter(v => v !== 'All'), option];
      onChange(newValues.length ? newValues : ['All']);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{label}</h3>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {['All', ...options].map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
              selectedValues.includes(option)
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <span>{option}</span>
            {selectedValues.includes(option) && (
              <Check className="h-4 w-4" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};