import MessageStorageService from '../services/memory-storage.service';
class MessageController {
    constructor() {
        this.storageService = new MessageStorageService();
    }
    async getMessages(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 20;
            const offset = parseInt(req.query.offset) || 0;
            const messages = await this.storageService.findAll(limit, offset);
            res.json({ success: true, data: messages });
        }
        catch (error) {
            res.status(500).json({ success: false, error: 'Failed to fetch messages' });
        }
    }
    async getMessageById(req, res) {
        try {
            const message = await this.storageService.findById(req.params.id);
            if (!message) {
                res.status(404).json({ success: false, error: 'Message not found' });
                return;
            }
            res.json({ success: true, data: message });
        }
        catch (error) {
            res.status(500).json({ success: false, error: 'Failed to fetch message' });
        }
    }
    async createMessage(req, res) {
        try {
            const message = await this.storageService.create(req.body);
            res.status(201).json({ success: true, data: { id: message.id } });
        }
        catch (error) {
            res.status(500).json({ success: false, error: 'Failed to create message' });
        }
    }
    async updateMessage(req, res) {
        try {
            const message = await this.storageService.update(req.params.id, req.body);
            if (!message) {
                res.status(404).json({ success: false, error: 'Message not found' });
                return;
            }
            res.json({ success: true, data: { id: message.id } });
        }
        catch (error) {
            res.status(500).json({ success: false, error: 'Failed to update message' });
        }
    }
    async deleteMessage(req, res) {
        try {
            const deleted = await this.storageService.delete(req.params.id);
            if (!deleted) {
                res.status(404).json({ success: false, error: 'Message not found' });
                return;
            }
            res.json({ success: true });
        }
        catch (error) {
            res.status(500).json({ success: false, error: 'Failed to delete message' });
        }
    }
}
export default MessageController;
