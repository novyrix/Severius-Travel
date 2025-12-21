/**
 * Custom Error Classes for Severius Travel Application
 * Provides type-safe error handling with proper context
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BookingError extends AppError {
  constructor(
    message: string,
    code: string = 'BOOKING_ERROR',
    statusCode: number = 400,
    context?: Record<string, unknown>
  ) {
    super(message, code, statusCode, context);
    this.name = 'BookingError';
  }
}

export class PaymentError extends AppError {
  constructor(
    message: string,
    public provider: 'pesapal' | 'paypal' | 'whatsapp',
    public originalError?: unknown,
    code: string = 'PAYMENT_ERROR',
    statusCode: number = 500
  ) {
    super(message, code, statusCode, { provider, originalError });
    this.name = 'PaymentError';
  }
}

export class AuthenticationError extends AppError {
  constructor(
    message: string = 'Authentication required',
    code: string = 'UNAUTHORIZED',
    statusCode: number = 401,
    context?: Record<string, unknown>
  ) {
    super(message, code, statusCode, context);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(
    message: string = 'Insufficient permissions',
    code: string = 'FORBIDDEN',
    statusCode: number = 403,
    context?: Record<string, unknown>
  ) {
    super(message, code, statusCode, context);
    this.name = 'AuthorizationError';
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public fields?: Record<string, string>,
    code: string = 'VALIDATION_ERROR',
    statusCode: number = 400
  ) {
    super(message, code, statusCode, { fields });
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(
    resource: string,
    identifier?: string,
    code: string = 'NOT_FOUND',
    statusCode: number = 404
  ) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(message, code, statusCode, { resource, identifier });
    this.name = 'NotFoundError';
  }
}

export class DatabaseError extends AppError {
  constructor(
    message: string,
    public operation: 'create' | 'read' | 'update' | 'delete',
    public originalError?: unknown,
    code: string = 'DATABASE_ERROR',
    statusCode: number = 500
  ) {
    super(message, code, statusCode, { operation, originalError });
    this.name = 'DatabaseError';
  }
}

export class EmailError extends AppError {
  constructor(
    message: string,
    public recipient?: string,
    public originalError?: unknown,
    code: string = 'EMAIL_ERROR',
    statusCode: number = 500
  ) {
    super(message, code, statusCode, { recipient, originalError });
    this.name = 'EmailError';
  }
}

export class RateLimitError extends AppError {
  constructor(
    message: string = 'Too many requests',
    public retryAfter?: Date,
    code: string = 'RATE_LIMIT_EXCEEDED',
    statusCode: number = 429
  ) {
    super(message, code, statusCode, { retryAfter });
    this.name = 'RateLimitError';
  }
}

// Type guard functions
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function isBookingError(error: unknown): error is BookingError {
  return error instanceof BookingError;
}

export function isPaymentError(error: unknown): error is PaymentError {
  return error instanceof PaymentError;
}

export function isAuthenticationError(error: unknown): error is AuthenticationError {
  return error instanceof AuthenticationError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

// Error response formatter for API routes
export function formatErrorResponse(error: unknown) {
  if (isAppError(error)) {
    return {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
      ...(process.env.NODE_ENV === 'development' && { context: error.context }),
    };
  }

  if (error instanceof Error) {
    return {
      error: error.message,
      code: 'INTERNAL_ERROR',
      statusCode: 500,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    };
  }

  return {
    error: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    statusCode: 500,
  };
}
