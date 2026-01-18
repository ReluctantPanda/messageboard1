// app.ts or server.ts
import express from 'express';
import messageRoutes from './routes/message.routes';
import { notFoundHandler, errorHandler } from './middleware/error.middleware';
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// API Routes with versioning
app.use('/api/v1/messages', messageRoutes);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// 404 handler - MUST be after all routes
app.use(notFoundHandler);
// Global error handler - MUST be last
app.use(errorHandler);
export default app;
