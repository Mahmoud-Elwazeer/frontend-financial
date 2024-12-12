import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filters: { type?: string; country?: string; currency?: string }) => void;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [type, setType] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [currency, setCurrency] = React.useState('');

  const handleFilterChange = () => {
    onFilterChange({ type, country, currency });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Filter by type..."
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Filter by country..."
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Filter by currency..."
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <button
          onClick={handleFilterChange}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};