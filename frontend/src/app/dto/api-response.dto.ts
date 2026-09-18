export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  errors: Record<string, string>;
}
