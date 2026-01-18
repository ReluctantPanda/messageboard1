/**
 * @fileoverview Request logging middleware for Express.
 * Logs incoming requests and response times for monitoring and debugging.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function that logs HTTP requests and their response times.
 * Records request method, URL, client IP, response status code, and processing duration.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function to continue middleware chain
 */
export const routeLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // Log request
  console.log(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);

  // Capture response finish
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });

  next();
};
