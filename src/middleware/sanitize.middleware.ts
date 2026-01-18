/**
 * @fileoverview Content sanitization middleware using DOMPurify.
 * Sanitizes user input to prevent XSS attacks and ensure content safety.
 */

import { Request, Response, NextFunction } from 'express';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Middleware function to sanitize message content and author fields.
 * Removes potentially harmful HTML and scripts while allowing limited safe formatting.
 * Validates that content is not empty after sanitization.
 * @param req - Express request object containing message data in body
 * @param res - Express response object
 * @param next - Express next function to continue middleware chain
 * @returns void - Calls next() on success or sends error response if content becomes empty
 */
export const sanitizeMessageContent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.body.content) {
    // Sanitize HTML to prevent XSS attacks
    req.body.content = DOMPurify.sanitize(req.body.content, {
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
    req.body.author = DOMPurify.sanitize(req.body.author, {
      ALLOWED_TAGS: [], // No HTML tags allowed
    }).trim();
  }

  next();
};
