/**
 * @fileoverview Main Express application setup and configuration.
 * Configures middleware, routes, and error handling for the message board API.
 */

import express from 'express';
import messageRoutes from './routes/message.routes';
import { notFoundHandler, errorHandler } from './middleware/error.middleware';

/**
 * Express application instance configured with middleware and routes.
 * Handles message board API endpoints with proper error handling.
 */
const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes with versioning
app.use('/api/v1/messages', messageRoutes);

/**
 * Health check endpoint for monitoring service availability.
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response with service status and timestamp
 */
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler - MUST be after all routes
app.use(notFoundHandler);

// Global error handler - MUST be last
app.use(errorHandler);

export default app;
