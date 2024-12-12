export interface Exchange {
  _id: string;
  symbol: string;
  ticker: string;
  code: string;
  isin: string;
  type: string;
  wpkn: string;
  name: string;
  nameLong: string;
  region: string;
  country: string;
  currency: string;
  figi: string;
  cik: string;
  lei: string;
  source: string;
  operatingMIC: string;
  codeExchange: string;
  virtualExchange: string;
  nameExchange: string;
  isArtificialExchange: boolean;
  segmentExchange: string;
  segmentNameExchange: string;
  createdAt: string;
  updatedAt: string;
}

export interface Candle {
  _id: string;
  symbol: string;
  dateTime: string;
  startPrice: number;
  highestPrice: number;
  lowestPrice: number;
  endPrice: number;
  volume: number;
  source: string;
  candleType: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}