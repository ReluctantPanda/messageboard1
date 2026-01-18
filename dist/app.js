"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts or server.ts
const express_1 = __importDefault(require("express"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// API Routes with versioning
app.use('/api/v1/messages', message_routes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// 404 handler - MUST be after all routes
app.use('*', error_middleware_1.notFoundHandler);
// Global error handler - MUST be last
app.use(error_middleware_1.errorHandler);
exports.default = app;
