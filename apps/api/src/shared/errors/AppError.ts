/**
 * Base class for all intentionally-thrown application errors.
 * Controllers/services throw these; the centralized error middleware
 * (see middleware/error-handler.ts) formats the HTTP response.
 * Never throw a raw Error() for expected failure cases.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(params: { message: string; statusCode: number; code: string; details?: unknown }) {
    super(params.message);
    this.name = 'AppError';
    this.statusCode = params.statusCode;
    this.code = params.code;
    this.details = params.details;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super({ message, statusCode: 400, code: 'VALIDATION_ERROR', details });
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super({ message, statusCode: 404, code: 'NOT_FOUND' });
    this.name = 'NotFoundError';
  }
}

export class UnauthenticatedError extends AppError {
  constructor(message = 'Authentication required') {
    super({ message, statusCode: 401, code: 'UNAUTHENTICATED' });
    this.name = 'UnauthenticatedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super({ message, statusCode: 403, code: 'FORBIDDEN' });
    this.name = 'ForbiddenError';
  }
}

export class RateLimitedError extends AppError {
  constructor(message = 'Too many requests') {
    super({ message, statusCode: 429, code: 'RATE_LIMITED' });
    this.name = 'RateLimitedError';
  }
}
