export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface ApiError {
  status: string;
  message: string;
}

export interface ApiResponse<T> {
  message: string;
  [key: string]: T | string;
}

export interface PaginatedResponse<T> {
  pagination: Pagination;
  data: T[];
}