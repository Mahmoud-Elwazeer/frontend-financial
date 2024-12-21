// Generic API response types
export interface ApiExchanges<T> {
    message: string;
    exchanges: T;
}

export interface ApiExchange<T> {
    message: string;
    exchange: T;
}

export interface ApiFilters<T> {
    message: string;
    filters: T;
}

    export interface PaginatedResponse<T> {
    totalItems: number;
    data: T[];
}

export interface ApiCandles<T> {
    message: string;
    candles: T;
}

export interface ApiFavorites<T> {
    message: string;
    favorites: T;
}

export interface ApiFavorite<T> {
    message: string;
    favorite: T;
}

export interface ApiMetadata<T> {
    message: string;
    metadata: T;
}

export interface ApiError {
    status: 'error';
    message: string;
    code?: string;
}