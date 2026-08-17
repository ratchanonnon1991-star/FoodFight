import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly configService;
    private readonly transporter;
    private readonly from;
    constructor(configService: ConfigService);
    sendPasswordResetOtp(to: string, otp: string): Promise<void>;
}
