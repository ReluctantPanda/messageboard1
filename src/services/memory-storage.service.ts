import { IMessage } from '../models/message.interface';

/**
 * In-memory storage service for managing message data.
 * Provides CRUD operations for messages with simple array-based storage.
 * Note: This is a development implementation - production should use a persistent database.
 */
class MessageStorageService {
    /** Array to store messages in memory */
    private messages: IMessage[] = [];
    /** Counter for generating unique message IDs */
    private idCounter = 0;

    /**
     * Creates a new message and stores it in memory.
     * @param message - Message data without id and timestamp (auto-generated)
     * @returns Promise resolving to the created message with generated fields
     */
    async create(message: Omit<IMessage, 'id' | 'timestamp'>): Promise<IMessage> {
        const newMessage: IMessage = {
            ...message,
            id: (++this.idCounter).toString(),
            timestamp: new Date(),
            ipAddress: '127.0.0.1' // Default for now
        };
        this.messages.push(newMessage);
        return newMessage;
    }

    /**
     * Retrieves all messages with optional pagination.
     * @param limit - Maximum number of messages to return (default: 20)
     * @param offset - Number of messages to skip (default: 0)
     * @returns Promise resolving to array of messages
     */
    async findAll(limit: number = 20, offset: number = 0): Promise<IMessage[]> {
        return this.messages.slice(offset, offset + limit);
    }

    /**
     * Finds a single message by its ID.
     * @param id - Unique identifier of the message
     * @returns Promise resolving to the message or null if not found
     */
    async findById(id: string): Promise<IMessage | null> {
        return this.messages.find(msg => msg.id === id) || null;
    }

    /**
     * Updates an existing message with new data.
     * @param id - Unique identifier of the message to update
     * @param updates - Partial message data to update
     * @returns Promise resolving to the updated message or null if not found
     */
    async update(id: string, updates: Partial<Omit<IMessage, 'id' | 'timestamp'>>): Promise<IMessage | null> {
        const index = this.messages.findIndex(msg => msg.id === id);
        if (index === -1) return null;

        this.messages[index] = { ...this.messages[index], ...updates };
        return this.messages[index];
    }

    /**
     * Deletes a message by its ID.
     * @param id - Unique identifier of the message to delete
     * @returns Promise resolving to true if deleted, false if not found
     */
    async delete(id: string): Promise<boolean> {
        const index = this.messages.findIndex(msg => msg.id === id);
        if (index === -1) return false;

        this.messages.splice(index, 1);
        return true;
    }
}

export default MessageStorageService;
