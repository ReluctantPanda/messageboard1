import { Request, Response } from 'express';
import MessageStorageService from '../services/memory-storage.service';

/**
 * Controller class handling HTTP requests for message operations.
 * Acts as an intermediary between routes and the storage service,
 * providing proper error handling and response formatting.
 */
class MessageController {
    /** Instance of the storage service for data operations */
    private storageService = new MessageStorageService();

    /**
     * Retrieves all messages with pagination support.
     * @param req - Express request object containing query parameters
     * @param res - Express response object
     * @returns Promise that resolves when the response is sent
     */
    async getMessages(req: Request, res: Response): Promise<void> {
        try {
            const limit = parseInt(req.query.limit as string) || 20;
            const offset = parseInt(req.query.offset as string) || 0;
            const messages = await this.storageService.findAll(limit, offset);
            res.json({ success: true, data: messages });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to fetch messages' });
        }
    }

    /**
     * Retrieves a single message by its ID.
     * @param req - Express request object containing message ID in params
     * @param res - Express response object
     * @returns Promise that resolves when the response is sent
     */
    async getMessageById(req: Request, res: Response): Promise<void> {
        try {
            const message = await this.storageService.findById(req.params.id as string);
            if (!message) {
                res.status(404).json({ success: false, error: 'Message not found' });
                return;
            }
            res.json({ success: true, data: message });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to fetch message' });
        }
    }

    /**
     * Creates a new message from request body data.
     * @param req - Express request object containing message data in body
     * @param res - Express response object
     * @returns Promise that resolves when the response is sent
     */
    async createMessage(req: Request, res: Response): Promise<void> {
        try {
            const message = await this.storageService.create(req.body);
            res.status(201).json({ success: true, data: { id: message.id } });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to create message' });
        }
    }

    /**
     * Updates an existing message with new data.
     * @param req - Express request object containing message ID in params and update data in body
     * @param res - Express response object
     * @returns Promise that resolves when the response is sent
     */
    async updateMessage(req: Request, res: Response): Promise<void> {
        try {
            const message = await this.storageService.update(req.params.id as string, req.body);
            if (!message) {
                res.status(404).json({ success: false, error: 'Message not found' });
                return;
            }
            res.json({ success: true, data: { id: message.id } });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to update message' });
        }
    }

    /**
     * Deletes a message by its ID.
     * @param req - Express request object containing message ID in params
     * @param res - Express response object
     * @returns Promise that resolves when the response is sent
     */
    async deleteMessage(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await this.storageService.delete(req.params.id as string);
            if (!deleted) {
                res.status(404).json({ success: false, error: 'Message not found' });
                return;
            }
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to delete message' });
        }
    }
}

export default MessageController;
