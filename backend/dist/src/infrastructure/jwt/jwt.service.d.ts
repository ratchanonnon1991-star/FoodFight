import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from './types/jwt-payload';
export declare class JwtService {
    private readonly nestJwtService;
    private readonly configService;
    constructor(nestJwtService: NestJwtService, configService: ConfigService);
    sign(payload: AccessTokenPayload): Promise<string>;
    verify(token: string): Promise<AccessTokenPayload>;
}
