export interface CompanyMetadata {
  _id: string;
  symbol: string;
  isin: string;
  exchange: string;
  currency: string;
  countryName: string;
  type: string;
  name: string;
  description: string;
  sector: string;
  industry: string;
  fullTimeEmployees: number;
  webUrl: string;
  phone: string;
  logoURL: string;
  addressDetails: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  marketCapitalization: {
    value: number;
  };
  highlights: {
    peRatio: number;
    profitMargin: number;
    operatingMarginTtm: number;
    revenueTtm: number;
  };
  technicals: {
    beta: number;
    '52WeekHigh': number;
    '52WeekLow': number;
    '50DayMA': number;
    '200DayMA': number;
  };
  valuation: {
    trailingPe: number;
    forwardPe: number;
    priceBookMrq: number;
  };
  exchangeTradedFundDetails: {
    totalAssets: number;
    ongoingCharge: string;
    inceptionDate: string;
    domicile: string;
    performance: {
      '1YVolatility': number;
      '3YVolatility': number;
      '3YExpReturn': number;
      '3YSharpRatio': number
    };
  };
}