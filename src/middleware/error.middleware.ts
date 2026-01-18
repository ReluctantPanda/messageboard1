/**
 * @fileoverview Error handling middleware for Express application.
 * Provides centralized error handling for 404 and general server errors.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle 404 Not Found errors for unmatched routes.
 * Should be placed after all route definitions but before the general error handler.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function (not used in this handler)
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
};

/**
 * General error handling middleware for unhandled errors.
 * Should be placed last in the middleware chain.
 * Logs error details and returns a generic error response.
 * @param err - Error object caught by Express
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function (not used in this handler)
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};
