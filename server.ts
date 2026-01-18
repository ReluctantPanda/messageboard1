/**
 * @fileoverview Server entry point for the Message Board API.
 * Initializes and starts the Express server with configuration from environment variables.
 */

import app from './src/app.ts';

/** Default server port if not specified in environment */
const PORT = process.env.PORT || 3000;

/**
 * Start the Express server and listen for incoming connections.
 * Logs server startup information to console.
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
