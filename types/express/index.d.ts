// types/express/index.d.ts

declare global {
  namespace Express {
    interface Request {
      // For storing validated query parameters
      validatedQuery?: {
        limit: number;
        offset: number;
        sort: 'newest' | 'oldest';
      };
      
      // For storing validated body (optional)
      validatedBody?: {
        content: string;
        author?: string;
        parentId?: string;
      };
      
      // For storing IP address for rate limiting
      clientIp?: string;
    }
    
    interface Response {
      // Custom response methods
      success: (data: any, message?: string) => void;
      error: (error: string, statusCode?: number) => void;
    }
  }
}

// types/routes.types.ts
export interface PaginationQuery {
  limit?: number;
  offset?: number;
  sort?: 'newest' | 'oldest';
}

export interface CreateMessageBody {
  content: string;
  author?: string;
  parentId?: string;
}

export interface UpdateMessageBody {
  content: string;
}

export interface MessageIdParam {
  id: string;
}
