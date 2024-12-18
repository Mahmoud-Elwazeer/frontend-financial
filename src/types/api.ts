export interface ApiError {
  status: string;
  message: string;
}

export interface ApiResponse<T> {
  message: string;
  [key: string]: T | string;
}


export interface DataResponse<T> {
  totalItems: number;
  data: T[];
}
