import { ConfigService } from '@nestjs/config';
export type LineProfile = {
    sub: string;
    email?: string;
    name: string;
    picture?: string;
};
export declare class LineAuthService {
    private readonly configService;
    constructor(configService: ConfigService);
    exchangeCodeForIdToken(code: string): Promise<string>;
    verifyIdToken(idToken: string): Promise<LineProfile>;
}
