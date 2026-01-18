import Joi from 'joi';
export const createMessageValidation = (req, res, next) => {
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
export const idParamValidation = (req, res, next) => {
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
export const paginationValidation = (req, res, next) => {
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
    req.query.validate = value;
    next();
};
