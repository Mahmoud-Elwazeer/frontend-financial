import React from 'react';
import { 
  Building2, Globe, Briefcase, Users, Coins, Phone, Link2, BarChart3, Activity
} from 'lucide-react';
import { formatCurrency, formatLargeNumber } from '../../utils/formatters';
import { CompanyMetadata } from '../../types/metadata';
import { LoadingSpinner } from '../loadingPage/LoadingSpinner';
import { MetadataError } from './MetadataError';

interface MetadataDisplayProps {
  data:  Partial<CompanyMetadata>;
  isLoading: boolean;
  isError: boolean;
  error?: string;
}

export const MetadataDisplay: React.FC<MetadataDisplayProps> = ({ data, isLoading, isError, error  }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return <MetadataError message={error || "Not Found Metadata"} />;
  }

  const {
    name,
    symbol,
    isin,
    countryName,
    type,
    currency,
    description,
    sector,
    fullTimeEmployees,
    webUrl,
    phone,
    addressDetails,
    marketCapitalization,
    highlights,
    technicals,
    exchangeTradedFundDetails,
  } = data;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-6">
          {data.logoURL && (
            <img 
              src={data.logoURL} 
              alt={`${name} logo`}
              className="w-20 h-20 object-contain bg-white rounded-lg"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">({symbol})</span>
              {isin && (
                <span className="text-sm text-gray-500 dark:text-gray-400">({isin})</span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {sector}
              </div>
              <div className="flex items-center gap-1">
                <Coins className="h-4 w-4" />
                {currency}
            </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {type}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {formatLargeNumber(fullTimeEmployees ?? 0)} employees
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {countryName}
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Market Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <BarChart3 className="h-5 w-5 text-primary-500 dark:text-primary-400" />
            Market Statistics
          </h2>
          <div className="space-y-4">
            <MetricItem
              label="Market Cap"
              value={formatCurrency(marketCapitalization?.value ?? 0)}
            />
            <MetricItem
              label="P/E Ratio"
              value={highlights?.peRatio?.toFixed(2)}
            />
            <MetricItem
              label="Beta"
              value={technicals?.beta?.toFixed(2)}
            />
          </div>
        </div>

        {/* Technical Indicators */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <Activity className="h-5 w-5 text-primary-500 dark:text-primary-400" />
            Technical Indicators
          </h2>
          <div className="space-y-4">
            <MetricItem
              label="52 Week Range"
              value={technicals && `${technicals['52WeekLow']?.toFixed(2)} - ${technicals['52WeekHigh']?.toFixed(2)}`}
            />
            <MetricItem
              label="50 Day MA"
              value={technicals?.['50DayMA']?.toFixed(2)}
            />
            <MetricItem
              label="200 Day MA"
              value={technicals?.['200DayMA']?.toFixed(2)}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Contact Information
          </h2>
          <div className="space-y-4">
            {addressDetails && (
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Address
                </h3>
                <p className="text-gray-900 dark:text-gray-100">
                  {addressDetails.street}<br />
                  {addressDetails.city}, {addressDetails.state} {addressDetails.zip}<br />
                  {addressDetails.country}
                </p>
              </div>
            )}
            <div className="space-y-2">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
              )}
              {webUrl && (
                <a
                  href={webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  <Link2 className="h-4 w-4" />
                  {webUrl}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Fund Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <BarChart3 className="h-5 w-5 text-primary-500 dark:text-primary-400" />
            Fund Information
          </h2>
          <div className="space-y-4">
            <MetricItem label="Total Assets" value={exchangeTradedFundDetails?.totalAssets? formatLargeNumber(exchangeTradedFundDetails?.totalAssets): 'N/A'}
            />
            <MetricItem label="Ongoing Charge" value={exchangeTradedFundDetails?.ongoingCharge?`${parseFloat(exchangeTradedFundDetails.ongoingCharge).toFixed(2)}`: 'N/A' }
            />
            <MetricItem label="Inception Date" value={exchangeTradedFundDetails?.inceptionDate}
            />
            <MetricItem label="Domicile" value={exchangeTradedFundDetails?.domicile}
            />
          </div>
        </div>

        {/* Risk Metrics*/}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <BarChart3 className="h-5 w-5 text-primary-500 dark:text-primary-400" />
            Risk Metrics
          </h2>
          <div className="space-y-4">
            <MetricItem label="1Y Volatility" value={exchangeTradedFundDetails?.performance['1YVolatility'] ? `${exchangeTradedFundDetails?.performance['1YVolatility']} %` : 'N/A' }
            />
            <MetricItem label="3Y Volatility" value={exchangeTradedFundDetails?.performance['1YVolatility'] ? `${exchangeTradedFundDetails?.performance['3YVolatility']} %` : 'N/A' }
            />
            <MetricItem label="3Y Exp Return" value={exchangeTradedFundDetails?.performance['1YVolatility'] ? `${exchangeTradedFundDetails?.performance['3YExpReturn']} %` : 'N/A' }
            />
            <MetricItem label="3Y Sharp Ratio" value={exchangeTradedFundDetails?.performance['1YVolatility'] ? `${exchangeTradedFundDetails?.performance['3YSharpRatio']} %` : 'N/A' }
            />
          </div>
        </div>

      </div>
    </div>
  );
};

interface MetricItemProps {
  label: string;
  value?: string | number | null;
}

const MetricItem: React.FC<MetricItemProps> = ({ label, value }) => {
  if (!value) return null;
  if (value === 'N/A') return null;
  
  return (
    <div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
      <div className="text-lg font-semibold text-gray-900 dark:text-white">
        {value}
      </div>
    </div>
  );
};
