import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { AuthService } from './auth.service';
import { ChangeVerificationEmailDto } from './dto/change-verification-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { LineCodeDto } from './dto/line-code.dto';
import { LineLoginDto } from './dto/line-login.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: string;
        email: string;
        expiresAt: Date;
        resendAvailableAt: Date;
        message: string;
    }>;
    verifyEmail(dto: VerifyEmailDto): Promise<{
        message: string;
    }>;
    resendVerification(dto: ResendVerificationDto): Promise<{
        message: string;
        expiresAt?: undefined;
        resendAvailableAt?: undefined;
    } | {
        message: string;
        expiresAt: Date;
        resendAvailableAt: Date;
    }>;
    changeVerificationEmail(dto: ChangeVerificationEmailDto): Promise<{
        email: string;
        expiresAt: Date;
        resendAvailableAt: Date;
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
    }>;
    loginWithGoogle(dto: GoogleLoginDto): Promise<{
        accessToken: string;
    }>;
    loginWithLine(dto: LineLoginDto): Promise<{
        accessToken: string;
    }>;
    loginWithLineCode(dto: LineCodeDto): Promise<{
        accessToken: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logout(): void;
    getMe(user: AccessTokenPayload): AccessTokenPayload;
}
