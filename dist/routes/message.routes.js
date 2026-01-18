"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/message.routes.ts
const express_1 = __importDefault(require("express"));
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const rateLimit_1 = require("../middleware/rateLimit");
const validation_middleware_1 = require("../middleware/validation.middleware");
const sanitize_middleware_1 = require("../middleware/sanitize.middleware");
const router = express_1.default.Router();
const messageController = new message_controller_1.default();
const config = {
    enableMessageEdit: process.env.ENABLE_MESSAGE_EDIT === 'true',
    enableMessageDelete: process.env.ENABLE_MESSAGE_DELETE === 'true',
};
// GET /api/v1/messages - Get all messages with pagination
router.get('/', rateLimit_1.rateLimiter, validation_middleware_1.paginationValidation, messageController.getMessages.bind(messageController));
// GET /api/v1/messages/:id - Get single message
router.get('/:id', rateLimit_1.rateLimiter, validation_middleware_1.idParamValidation, messageController.getMessageById.bind(messageController));
// POST /api/v1/messages - Create new message
router.post('/', rateLimit_1.rateLimiter, validation_middleware_1.createMessageValidation, sanitize_middleware_1.sanitizeMessageContent, messageController.createMessage.bind(messageController));
// Only add edit route if enabled
if (config.enableMessageEdit) {
    router.put('/:id', rateLimit_1.rateLimiter, validation_middleware_1.idParamValidation, validation_middleware_1.createMessageValidation, sanitize_middleware_1.sanitizeMessageContent, messageController.updateMessage.bind(messageController));
}
// Delete route with optional admin check
router.delete('/:id', rateLimit_1.rateLimiter, validation_middleware_1.idParamValidation, config.enableMessageDelete
    ? messageController.deleteMessage.bind(messageController)
    : (req, res) => res.status(403).json({
        success: false,
        error: 'Message deletion is disabled'
    }));
exports.default = router;
