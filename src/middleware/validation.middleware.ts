/**
 * @fileoverview Validation middleware using Joi schemas for request validation.
 * Provides input validation for message operations, parameters, and pagination.
 */

import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * Validates request body for message creation/update operations.
 * Ensures content meets requirements and optional fields are properly formatted.
 * @param req - Express request object containing message data in body
 * @param res - Express response object
 * @param next - Express next function to continue middleware chain
 * @returns void - Calls next() on success or sends error response
 */
export const createMessageValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    content: Joi.string()
      .required()
      .min(1)
      .max(1000)
      .messages({
        'string.empty': 'Message content is required',
        'string.max': 'Message cannot exceed 1000 characters'
      }),
    author: Joi.string()
      .optional()
      .max(50)
      .pattern(/^[a-zA-Z0-9\s]+$/)
      .messages({
        'string.pattern.base': 'Author name can only contain letters, numbers, and spaces'
      }),
    parentId: Joi.string()
      .optional()
      .uuid()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      error: error.details[0].message
    });
    return;
  }

  next();
};

/**
 * Validates URL parameters containing message IDs.
 * Ensures ID is a valid UUID format.
 * @param req - Express request object containing ID in params
 * @param res - Express response object
 * @param next - Express next function to continue middleware chain
 * @returns void - Calls next() on success or sends error response
 */
export const idParamValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    id: Joi.string()
      .required()
      .uuid()
      .messages({
        'string.guid': 'ID must be a valid UUID'
      })
  });

  const { error } = schema.validate({ id: req.params.id });
  if (error) {
    res.status(400).json({
      success: false,
      error: error.details[0].message
    });
    return;
  }

  next();
};

/**
 * Validates query parameters for pagination and sorting.
 * Applies default values and ensures parameters are within acceptable ranges.
 * @param req - Express request object containing pagination params in query
 * @param res - Express response object
 * @param next - Express next function to continue middleware chain
 * @returns void - Calls next() on success or sends error response
 */
export const paginationValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    limit: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(20),
    offset: Joi.number()
      .integer()
      .min(0)
      .default(0),
    sort: Joi.string()
      .valid('newest', 'oldest')
      .default('newest')
  });

  const { error, value } = schema.validate(req.query);
  if (error) {
    res.status(400).json({
      success: false,
      error: error.details[0].message
    });
    return;
  }

  // Attach validated values to request
  // req.validatedQuery = value;
  (req.query as any).validate = value;
  next();
};
