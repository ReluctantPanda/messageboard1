// routes/message.routes.ts
import express from 'express';
import MessageController from '../controllers/message.controller';
import { rateLimiter } from '../middleware/rateLimit';
import { idParamValidation, createMessageValidation, paginationValidation } from '../middleware/validation.middleware';
import { sanitizeMessageContent } from '../middleware/sanitize.middleware';
const router = express.Router();
const messageController = new MessageController();
const config = {
    enableMessageEdit: process.env.ENABLE_MESSAGE_EDIT === 'true',
    enableMessageDelete: process.env.ENABLE_MESSAGE_DELETE === 'true',
};
// GET /api/v1/messages - Get all messages with pagination
router.get('/', rateLimiter, paginationValidation, messageController.getMessages.bind(messageController));
// GET /api/v1/messages/:id - Get single message
router.get('/:id', rateLimiter, idParamValidation, messageController.getMessageById.bind(messageController));
// POST /api/v1/messages - Create new message
router.post('/', rateLimiter, createMessageValidation, sanitizeMessageContent, messageController.createMessage.bind(messageController));
// Only add edit route if enabled
if (config.enableMessageEdit) {
    router.put('/:id', rateLimiter, idParamValidation, createMessageValidation, sanitizeMessageContent, messageController.updateMessage.bind(messageController));
}
// Delete route with optional admin check
router.delete('/:id', rateLimiter, idParamValidation, config.enableMessageDelete
    ? messageController.deleteMessage.bind(messageController)
    : (req, res) => res.status(403).json({
        success: false,
        error: 'Message deletion is disabled'
    }));
export default router;
