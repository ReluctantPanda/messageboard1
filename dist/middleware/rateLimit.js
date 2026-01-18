"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageRateLimiter = exports.rateLimiter = void 0;
// middleware/rateLimit.middleware.ts
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// General rate limiter for all routes
exports.rateLimiter = (0, express_rate_limit_1.default)({
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
exports.createMessageRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Only 5 messages per hour per IP
    message: {
        success: false,
        error: 'Too many messages created. Please try again in an hour.'
    },
    skipFailedRequests: true, // Don't count failed requests
});
