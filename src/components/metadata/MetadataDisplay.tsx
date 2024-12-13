import React from 'react';
import { 
  Building2, Globe, Briefcase, Users, Calendar, Phone, Link2,
  DollarSign, TrendingUp, BarChart3, PieChart, Activity
} from 'lucide-react';
import { formatCurrency, formatLargeNumber, calculatePercentChange } from '../../utils/formatters';
import { CompanyMetadata } from '../../types/metadata';
import { LoadingSpinner } from '../loadingPage/LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

interface MetadataDisplayProps {
  data: CompanyMetadata;
  isLoading: boolean;
  isError: boolean;
}

export const MetadataDisplay: React.FC<MetadataDisplayProps> = ({ data, isLoading, isError  }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    // return <ErrorMessage message="No Metadata data available for this exchange" />;
    return;
  }

  // if (data.length === 0) {
  //   return <ErrorMessage message="No candle data available for this exchange" />;
  // }

  console.log(data)
  
  const {
    name,
    symbol,
    description,
    sector,
    industry,
    fullTimeEmployees,
    webUrl,
    phone,
    addressDetails,
    marketCapitalization,
    highlights,
    technicals,
    valuation,
  } = data;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start gap-6">
          {data.logoURL && (
            <img 
              src={data.logoURL} 
              alt={`${name} logo`}
              className="w-20 h-20 object-contain"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <span className="text-sm text-gray-500">({symbol})</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {sector}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {industry}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {formatLargeNumber(fullTimeEmployees)} employees
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {/* {addressDetails.country} */}
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 line-clamp-3">{description}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Market Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Market Statistics
          </h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">Market Cap</div>
              <div className="text-lg font-semibold">
                {formatCurrency(marketCapitalization.value)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">P/E Ratio</div>
              <div className="text-lg font-semibold">
                {/* {highlights.peRatio.toFixed(2)} */}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Beta</div>
              <div className="text-lg font-semibold">
                {/* {technicals.beta.toFixed(2)} */}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Indicators */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Technical Indicators
          </h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">52 Week Range</div>
              <div className="text-lg font-semibold">
                {/* {technicals['52WeekLow'].toFixed(2)} - {technicals['52WeekHigh'].toFixed(2)} */}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">50 Day MA</div>
              <div className="text-lg font-semibold">
                {/* {technicals['50DayMA'].toFixed(2)} */}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">200 Day MA</div>
              <div className="text-lg font-semibold">
                {/* {technicals['200DayMA'].toFixed(2)} */}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-blue-500" />
            Financial Highlights
          </h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">Revenue (TTM)</div>
              <div className="text-lg font-semibold">
                {/* {formatCurrency(highlights.revenueTtm)} */}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Profit Margin</div>
              <div className="text-lg font-semibold">
                {/* {(highlights.profitMargin * 100).toFixed(2)}% */}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Operating Margin</div>
              <div className="text-lg font-semibold">
                {/* {(highlights.operatingMarginTtm * 100).toFixed(2)}% */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Address</h3>
            <p className="text-gray-900">
              {/* {addressDetails.street}<br /> */}
              {/* {addressDetails.city}, {addressDetails.state} {addressDetails.zip}<br /> */}
              {/* {addressDetails.country} */}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <a href={`tel:${phone}`} className="text-blue-600 hover:text-blue-800">
                {phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-gray-400" />
              <a href={webUrl} target="_blank" rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800">
                {webUrl}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};