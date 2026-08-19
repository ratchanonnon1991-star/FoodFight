import { PrismaService } from '../database/prisma.service';
import { BcryptService } from '../infrastructure/hash/bcrypt.service';
import { GoogleAuthService } from '../infrastructure/google/google-auth.service';
import { JwtService } from '../infrastructure/jwt/jwt.service';
import { LineAuthService } from '../infrastructure/line/line-auth.service';
import { MailService } from '../infrastructure/mail/mail.service';
import { UserService } from '../user/user.service';
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
import { PasswordResetService } from './password-reset.service';
export declare class AuthService {
    private readonly prisma;
    private readonly userService;
    private readonly bcryptService;
    private readonly jwtService;
    private readonly googleAuthService;
    private readonly lineAuthService;
    private readonly mailService;
    private readonly passwordResetService;
    constructor(prisma: PrismaService, userService: UserService, bcryptService: BcryptService, jwtService: JwtService, googleAuthService: GoogleAuthService, lineAuthService: LineAuthService, mailService: MailService, passwordResetService: PasswordResetService);
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
        foodProfileComplete: boolean;
    }>;
    getCurrentUser(userId: string): Promise<{
        sub: string;
        email: string;
        role: import("../database/generated/prisma/enums").Role;
        displayName: string;
        avatarUrl: string | null;
    }>;
    loginWithGoogle(dto: GoogleLoginDto): Promise<{
        accessToken: string;
        foodProfileComplete: boolean;
    }>;
    loginWithLine(dto: LineLoginDto): Promise<{
        accessToken: string;
        foodProfileComplete: boolean;
    }>;
    loginWithLineCode(dto: LineCodeDto): Promise<{
        accessToken: string;
        foodProfileComplete: boolean;
    }>;
    private loginWithOAuth;
    private createAuthResponse;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logout(): void;
    private generateOtp;
}
