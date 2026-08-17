import { AccessTokenPayload } from '../../infrastructure/jwt/types/jwt-payload';

declare module 'express' {
  interface Request {
    user?: AccessTokenPayload;
  }
}
