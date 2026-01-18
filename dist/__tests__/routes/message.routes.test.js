/// <reference types="jest" />
// __tests__/routes/message.routes.test.ts (Jest example)
import request from 'supertest';
import app from '../../src/app';
// Mock the sanitize middleware to avoid ES module issues
jest.mock('../../src/middleware/sanitize.middleware', () => ({
    sanitizeMessageContent: jest.fn((req, res, next) => next()),
}));
describe('Message Routes', () => {
    describe('GET /api/v1/messages', () => {
        it('should return 200 and array of messages', async () => {
            const response = await request(app)
                .get('/api/v1/messages')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
        it('should respect limit and offset query params', async () => {
            const response = await request(app)
                .get('/api/v1/messages?limit=5&offset=10')
                .expect(200);
            // Add your assertions
        });
    });
    describe('POST /api/v1/messages', () => {
        it('should create a message with valid data', async () => {
            const messageData = {
                content: 'Test message',
                author: 'Test User'
            };
            const response = await request(app)
                .post('/api/v1/messages')
                .send(messageData)
                .expect(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('id');
        });
        it('should reject empty content', async () => {
            const response = await request(app)
                .post('/api/v1/messages')
                .send({ content: '' })
                .expect(400);
            expect(response.body.success).toBe(false);
        });
    });
});
