import React from 'react';
import { 
  Building2, Globe, Briefcase, Users, Calendar, Phone, Link2,
  DollarSign, TrendingUp, BarChart3, PieChart, Activity
} from 'lucide-react';
import { LoadingSpinner } from '../loadingPage/LoadingSpinner';
import { formatCurrency, formatLargeNumber } from '../../utils/formatters';
import { CompanyMetadata } from '../../types/metadata';

interface MetadataDisplayProps {
  data: CompanyMetadata;
  isLoading: boolean;
  isError: boolean;
  error?: string;
}

export const MetadataDisplay: React.FC<MetadataDisplayProps> = ({ data, isLoading, isError, error }) => {
  // Skeleton loader with matching structure
  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state with fixed height
  if (isError || !data) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="mb-2">⚠️</div>
          <div>{error || "Metadata Not Found"}</div>
        </div>
      </div>
    );
  }

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
  } = data;

  return (
  <div className="space-y-6">
    <div className="h-full overflow-auto">
      {/* Header Section with fixed dimensions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            {data.logoURL ? (
              <img 
                src={data.logoURL} 
                alt={`${name} logo`}
                className="w-20 h-20 object-contain bg-white rounded-lg"
                loading="lazy"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-10 h-10 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">{name}</h1>
              <span className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">({symbol})</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
              {sector && (
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{sector}</span>
                </div>
              )}
              {industry && (
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{industry}</span>
                </div>
              )}
              {fullTimeEmployees && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{formatLargeNumber(fullTimeEmployees)} employees</span>
                </div>
              )}
              {addressDetails?.country && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{addressDetails.country}</span>
                </div>
              )}
            </div>
            {description && (
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Grid with fixed height scrollable containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <MetricCard
          title="Market Statistics"
          icon={<BarChart3 className="h-5 w-5 text-primary-500 dark:text-primary-400" />}
          metrics={[
            { label: "Market Cap", value: formatCurrency(marketCapitalization?.value) },
            { label: "P/E Ratio", value: highlights?.peRatio?.toFixed(2) },
            { label: "Beta", value: technicals?.beta?.toFixed(2) }
          ]}
        />

        <MetricCard
          title="Technical Indicators"
          icon={<Activity className="h-5 w-5 text-primary-500 dark:text-primary-400" />}
          metrics={[
            { 
              label: "52 Week Range", 
              value: technicals && `${technicals['52WeekLow']?.toFixed(2)} - ${technicals['52WeekHigh']?.toFixed(2)}` 
            },
            { label: "50 Day MA", value: technicals?.['50DayMA']?.toFixed(2) },
            { label: "200 Day MA", value: technicals?.['200DayMA']?.toFixed(2) }
          ]}
        />

        <ContactCard
          phone={phone}
          webUrl={webUrl}
          addressDetails={addressDetails}
        />
      </div>
    </div>
  </div>
  );
};

// Extracted components for better organization and reusability
interface MetricCardProps {
  title: string;
  icon?: React.ReactNode;
  metrics: Array<{ label: string; value?: string | number | null; }>;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, icon, metrics }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
      {icon}
      {title}
    </h2>
    <div className="space-y-4">
      {metrics.map((metric) => 
        metric.value && (
          <div key={metric.label}>
            <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{metric.value}</div>
          </div>
        )
      )}
    </div>
  </div>
);

interface ContactCardProps {
  phone?: string;
  webUrl?: string;
  addressDetails?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

const ContactCard: React.FC<ContactCardProps> = ({ phone, webUrl, addressDetails }) => (
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
            {addressDetails.street && <>{addressDetails.street}<br /></>}
            {addressDetails.city && addressDetails.state && (
              <>{addressDetails.city}, {addressDetails.state} {addressDetails.zip}<br /></>
            )}
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
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{phone}</span>
          </a>
        )}
        {webUrl && (
          <a
            href={webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            <Link2 className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{webUrl}</span>
          </a>
        )}
      </div>
    </div>
  </div>
  
);

export default MetadataDisplay;