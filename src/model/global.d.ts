import { User } from '@prisma/client';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }

    export interface Response {
      composeRes: (data: Record<string, any>, status?: number) => void;
    }
  }
}
