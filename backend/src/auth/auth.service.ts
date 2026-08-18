import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthProvider } from '../database/generated/prisma/client';
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

type OAuthProfile = {
  providerAccountId: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly lineAuthService: LineAuthService,
    private readonly mailService: MailService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

  async register(dto: RegisterDto) {
    const userByEmail = await this.userService.findByEmail(dto.email);
    if (userByEmail) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await this.bcryptService.hash(dto.password);
    const user = await this.userService.create({
      displayName: dto.displayName,
      email: dto.email,
      passwordHash,
    });

    return {
      id: user.id,
      email: user.email,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await this.bcryptService.compare(
      dto.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken };
  }

  async loginWithGoogle(dto: GoogleLoginDto) {
    const profile = await this.googleAuthService.verifyIdToken(dto.idToken);
    return this.loginWithOAuth(AuthProvider.GOOGLE, {
      providerAccountId: profile.sub,
      email: profile.email,
      displayName: dto.displayName || profile.name,
      avatarUrl: profile.picture,
    });
  }

  async loginWithLine(dto: LineLoginDto) {
    const profile = await this.lineAuthService.verifyIdToken(dto.idToken);
    return this.loginWithOAuth(AuthProvider.LINE, {
      providerAccountId: profile.sub,
      email: profile.email,
      displayName: dto.displayName || profile.name,
      avatarUrl: profile.picture,
    });
  }

  private async loginWithOAuth(provider: AuthProvider, profile: OAuthProfile) {
    let user = await this.userService.findUserByProviderAccount(
      provider,
      profile.providerAccountId,
    );

    if (!user) {
      const userByEmail = await this.userService.findByEmail(profile.email);
      if (userByEmail) {
        await this.userService.linkAccount(
          userByEmail.id,
          provider,
          profile.providerAccountId,
        );
        user = userByEmail;
      } else {
        user = await this.userService.createUserWithAccount({
          displayName: profile.displayName,
          email: profile.email,
          provider,
          providerAccountId: profile.providerAccountId,
          avatarUrl: profile.avatarUrl,
        });
      }
    }

    if (profile.avatarUrl && profile.avatarUrl !== user.avatarUrl) {
      user = await this.userService.updateAvatarUrl(user.id, profile.avatarUrl);
    }

    const accessToken = await this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const message = 'A password reset code has been sent to your email';

    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      return { message };
    }

    const existing = await this.passwordResetService.findLatestActive(user.id);
    if (existing && existing.resendAvailableAt > new Date()) {
      return { message };
    }

    const otp = this.generateOtp();
    const tokenHash = await this.bcryptService.hash(otp);
    await this.passwordResetService.create(user.id, tokenHash);
    await this.mailService.sendPasswordResetOtp(user.email, otp);

    return { message };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException(
        'Verification code expired. Please request a new code.',
      );
    }

    const passwordReset = await this.passwordResetService.findLatestActive(
      user.id,
    );
    if (!passwordReset || passwordReset.expiresAt < new Date()) {
      throw new UnauthorizedException(
        'Verification code expired. Please request a new code.',
      );
    }

    const otpMatches = await this.bcryptService.compare(
      dto.otp,
      passwordReset.tokenHash,
    );
    if (!otpMatches) {
      throw new UnauthorizedException(
        'Invalid verification code. Please check the code and try again',
      );
    }

    await this.prisma.$transaction(async (tx) => {
      await this.userService.updatePassword(user.id, dto.password, tx);
      await this.passwordResetService.markUsed(passwordReset.id, tx);
    });

    return { message: 'Password has been reset successfully' };
  }

  logout(): void {}

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
