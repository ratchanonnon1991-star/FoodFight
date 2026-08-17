import { PrismaService } from '../database/prisma.service';
import { BcryptService } from '../infrastructure/hash/bcrypt.service';
import { GoogleAuthService } from '../infrastructure/google/google-auth.service';
import { JwtService } from '../infrastructure/jwt/jwt.service';
import { LineAuthService } from '../infrastructure/line/line-auth.service';
import { MailService } from '../infrastructure/mail/mail.service';
import { UserService } from '../user/user.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { LineLoginDto } from './dto/line-login.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordResetService } from './password-reset.service';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
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
    private loginWithOAuth;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logout(): void;
    private generateOtp;
}
