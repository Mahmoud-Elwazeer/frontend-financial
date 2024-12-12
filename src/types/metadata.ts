export interface CompanyMetadata {
  _id: string;
  symbol: string;
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
}