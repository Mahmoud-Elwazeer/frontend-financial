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