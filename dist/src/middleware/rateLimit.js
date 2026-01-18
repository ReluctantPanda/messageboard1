// middleware/rateLimit.middleware.ts
import rateLimit from 'express-rate-limit';
// General rate limiter for all routes
export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        success: false,
        error: 'Too many requests, please try again later.'
    },
    skipSuccessfulRequests: false, // Count all requests
});
// Stricter limiter for message creation
export const createMessageRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Only 5 messages per hour per IP
    message: {
        success: false,
        error: 'Too many messages created. Please try again in an hour.'
    },
    skipFailedRequests: true, // Don't count failed requests
});
