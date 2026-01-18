class MessageStorageService {
    constructor() {
        this.messages = [];
        this.idCounter = 0;
    }
    async create(message) {
        const newMessage = {
            ...message,
            id: (++this.idCounter).toString(),
            timestamp: new Date(),
            ipAddress: '127.0.0.1' // Default for now
        };
        this.messages.push(newMessage);
        return newMessage;
    }
    async findAll(limit = 20, offset = 0) {
        return this.messages.slice(offset, offset + limit);
    }
    async findById(id) {
        return this.messages.find(msg => msg.id === id) || null;
    }
    async update(id, updates) {
        const index = this.messages.findIndex(msg => msg.id === id);
        if (index === -1)
            return null;
        this.messages[index] = { ...this.messages[index], ...updates };
        return this.messages[index];
    }
    async delete(id) {
        const index = this.messages.findIndex(msg => msg.id === id);
        if (index === -1)
            return false;
        this.messages.splice(index, 1);
        return true;
    }
}
export default MessageStorageService;
