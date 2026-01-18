# Message Board API

A RESTful API for a message board application built with Node.js, Express, and TypeScript. Features comprehensive validation, sanitization, rate limiting, and testing.

## Features

- **Message Management**: Create, read, update, and delete messages
- **Input Validation**: Robust validation using Joi with detailed error messages
- **Content Sanitization**: Automatic sanitization of user-generated content
- **Rate Limiting**: Protection against abuse with configurable rate limits
- **Pagination**: Efficient pagination for message lists
- **Thread Support**: Support for threaded conversations with parent-child relationships
- **Health Check**: Built-in health check endpoint
- **TypeScript**: Full TypeScript support for better development experience
- **Testing**: Comprehensive test suite with Jest

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Joi
- **Testing**: Jest with Supertest
- **Security**: Helmet, CORS
- **Sanitization**: isomorphic-dompurify

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd message-board1
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000` by default.

## Usage

### Starting the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `ENABLE_MESSAGE_EDIT` | - | Enable message editing (set to 'true') |
| `ENABLE_MESSAGE_DELETE` | - | Enable message deletion (set to 'true') |

## API Endpoints

### Messages

#### GET /api/v1/messages
Get all messages with optional pagination.

**Query Parameters:**
- `limit` (number, 1-100, default: 20): Number of messages to return
- `offset` (number, default: 0): Number of messages to skip
- `sort` (string, 'newest' or 'oldest', default: 'newest'): Sort order

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "content": "Message content",
      "author": "Author name",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "parentId": null
    }
  ]
}
```

#### GET /api/v1/messages/:id
Get a single message by ID.

**Parameters:**
- `id` (UUID): Message ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "Message content",
    "author": "Author name",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "parentId": null
  }
}
```

#### POST /api/v1/messages
Create a new message.

**Request Body:**
```json
{
  "content": "Message content (required, 1-1000 characters)",
  "author": "Author name (optional, max 50 chars, alphanumeric)",
  "parentId": "Parent message ID (optional, UUID)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "generated-uuid"
  }
}
```

#### PUT /api/v1/messages/:id
Update an existing message (if enabled).

**Parameters:**
- `id` (UUID): Message ID

**Request Body:** Same as POST

#### DELETE /api/v1/messages/:id
Delete a message (if enabled).

**Parameters:**
- `id` (UUID): Message ID

### Health Check

#### GET /health
Check server health.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Validation Rules

### Message Creation/Update
- **content**: Required, 1-1000 characters
- **author**: Optional, max 50 characters, letters/numbers/spaces only
- **parentId**: Optional, must be valid UUID if provided

### Pagination
- **limit**: 1-100 (default: 20)
- **offset**: ≥0 (default: 0)
- **sort**: 'newest' or 'oldest' (default: 'newest')

## Testing

Run the test suite:

```bash
npm test
```

The tests cover:
- API endpoint responses
- Input validation
- Error handling
- Middleware functionality

## Project Structure

```
message-board1/
├── __tests__/              # Test files
│   └── routes/
│       └── message.routes.test.ts
├── src/
│   ├── app.ts             # Express app setup
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Express middleware
│   ├── models/           # Data models/interfaces
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── utils/            # Utility functions
├── types/                # TypeScript type definitions
├── server.ts             # Server entry point
├── jest.config.cjs       # Jest configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run test suite
- `npm run build` - Compile TypeScript (output to dist/)

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.
