import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { LineLoginDto } from './dto/line-login.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: string;
        email: string;
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
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logout(): void;
    getMe(user: AccessTokenPayload): AccessTokenPayload;
}
