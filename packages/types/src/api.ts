/**
 * Shared API envelope types — matches docs/api/conventions.md exactly.
 * Both apps/web and apps/api should reference these rather than
 * redefining the shape.
 */
export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: { requestId?: string; [key: string]: unknown };
}

export interface ApiErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: { requestId?: string };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiErrorBody;
