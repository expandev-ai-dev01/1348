/**
 * @summary
 * Global error handling middleware
 *
 * @module middleware/error
 */

import { Request, Response, NextFunction } from 'express';

/**
 * @interface ErrorResponse
 * @description Standard error response structure
 */
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * @summary
 * Global error handling middleware
 *
 * @function errorMiddleware
 * @module middleware/error
 *
 * @param {Error} error - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns {void}
 */
export function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction): void {
  const statusCode = error.statusCode || 500;
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      code: error.code || 'INTERNAL_SERVER_ERROR',
      message: error.message || 'An unexpected error occurred',
      details: error.details || undefined,
    },
    timestamp: new Date().toISOString(),
  };

  /**
   * @important Log error for debugging
   */
  console.error('Error:', {
    code: errorResponse.error.code,
    message: errorResponse.error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json(errorResponse);
}
