"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationValidation = exports.idParamValidation = exports.createMessageValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createMessageValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        content: joi_1.default.string()
            .required()
            .min(1)
            .max(1000)
            .messages({
            'string.empty': 'Message content is required',
            'string.max': 'Message cannot exceed 1000 characters'
        }),
        author: joi_1.default.string()
            .optional()
            .max(50)
            .pattern(/^[a-zA-Z0-9\s]+$/)
            .messages({
            'string.pattern.base': 'Author name can only contain letters, numbers, and spaces'
        }),
        parentId: joi_1.default.string()
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
exports.createMessageValidation = createMessageValidation;
const idParamValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        id: joi_1.default.string()
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
exports.idParamValidation = idParamValidation;
const paginationValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        limit: joi_1.default.number()
            .integer()
            .min(1)
            .max(100)
            .default(20),
        offset: joi_1.default.number()
            .integer()
            .min(0)
            .default(0),
        sort: joi_1.default.string()
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
exports.paginationValidation = paginationValidation;
