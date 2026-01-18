/**
 * Interface representing a message in the message board system.
 * Messages contain user-generated content with optional author information.
 */
export interface IMessage {
    /** Unique identifier for the message (auto-generated) */
    id: string;
    /** The main content of the message (required, 1-1000 characters) */
    content: string;
    /** Optional author name (max 50 characters, alphanumeric + spaces) */
    author?: string;
    /** Timestamp when the message was created */
    timestamp: Date;
    /** IP address of the client that created the message */
    ipAddress: string;
}
