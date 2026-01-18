"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeMessageContent = void 0;
const isomorphic_dompurify_1 = __importDefault(require("isomorphic-dompurify"));
const sanitizeMessageContent = (req, res, next) => {
    if (req.body.content) {
        // Sanitize HTML to prevent XSS attacks
        req.body.content = isomorphic_dompurify_1.default.sanitize(req.body.content, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'], // Minimal allowed tags
            ALLOWED_ATTR: ['href', 'title'], // Minimal allowed attributes
        }).trim();
        // Check if content is empty after sanitization
        if (!req.body.content) {
            res.status(400).json({
                success: false,
                error: 'Message content is invalid or empty after sanitization'
            });
            return;
        }
    }
    if (req.body.author) {
        // Sanitize author name (no HTML)
        req.body.author = isomorphic_dompurify_1.default.sanitize(req.body.author, {
            ALLOWED_TAGS: [], // No HTML tags allowed
        }).trim();
    }
    next();
};
exports.sanitizeMessageContent = sanitizeMessageContent;
