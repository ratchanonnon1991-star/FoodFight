import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, randomBytes } from 'node:crypto';

import { AuthProvider } from '../database/generated/prisma/client';
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

type OAuthProfile = {
  providerAccountId: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
};

export type AuthSessionResponse = {
  accessToken: string;
  refreshToken: string;
  foodProfileComplete: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly lineAuthService: LineAuthService,
    private readonly mailService: MailService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

  // =========================
  // REGISTER
  // =========================

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

    const otp = this.generateOtp();
    const otpHash = await this.bcryptService.hash(otp);

    const now = new Date();

    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);

    const resendAvailableAt = new Date(now.getTime() + 60 * 1000);

    await this.prisma.emailVerification.create({
      data: {
        userId: user.id,
        otpHash,
        expiresAt,
        resendAvailableAt,
      },
    });

    await this.mailService.sendEmailVerificationOtp(user.email, otp);

    return {
      id: user.id,
      email: user.email,
      expiresAt,
      resendAvailableAt,
      message: 'Verification code has been sent to your email',
    };
  }

  // =========================
  // VERIFY EMAIL
  // =========================

  async verifyEmail(dto: VerifyEmailDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid verification code');
    }

    if (user.emailVerified) {
      return {
        message: 'Email is already verified',
      };
    }

    const verification = await this.prisma.emailVerification.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!verification) {
      throw new UnauthorizedException(
        'Verification code expired. Please request a new code.',
      );
    }

    if (verification.expiresAt < new Date()) {
      throw new UnauthorizedException(
        'Verification code expired. Please request a new code.',
      );
    }

    const otpMatches = await this.bcryptService.compare(
      dto.code,
      verification.otpHash,
    );

    if (!otpMatches) {
      throw new UnauthorizedException(
        'Invalid verification code. Please check the code and try again.',
      );
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: true,
        },
      }),

      this.prisma.emailVerification.delete({
        where: {
          userId: user.id,
        },
      }),
    ]);

    return {
      message: 'Email verified successfully',
    };
  }

  // =========================
  // RESEND VERIFICATION OTP
  // =========================

  async resendVerification(dto: ResendVerificationDto) {
    const message = 'Verification code has been sent to your email';

    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      return { message };
    }

    if (user.emailVerified) {
      return {
        message: 'Email is already verified',
      };
    }

    const existing = await this.prisma.emailVerification.findUnique({
      where: {
        userId: user.id,
      },
    });

    const now = new Date();

    if (existing && existing.resendAvailableAt > now) {
      return {
        message,
        expiresAt: existing.expiresAt,
        resendAvailableAt: existing.resendAvailableAt,
      };
    }

    const otp = this.generateOtp();
    const otpHash = await this.bcryptService.hash(otp);

    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);

    const resendAvailableAt = new Date(now.getTime() + 60 * 1000);

    await this.prisma.emailVerification.upsert({
      where: {
        userId: user.id,
      },
      update: {
        otpHash,
        expiresAt,
        resendAvailableAt,
      },
      create: {
        userId: user.id,
        otpHash,
        expiresAt,
        resendAvailableAt,
      },
    });

    await this.mailService.sendEmailVerificationOtp(user.email, otp);

    return {
      message,
      expiresAt,
      resendAvailableAt,
    };
  }

  // =========================
  // CHANGE VERIFICATION EMAIL
  // =========================

  async changeVerificationEmail(dto: ChangeVerificationEmailDto) {
    const user = await this.userService.findByEmail(dto.currentEmail);

    if (!user) {
      throw new UnauthorizedException('Verification session not found');
    }

    if (user.emailVerified) {
      throw new ConflictException('Email is already verified');
    }

    const existingUser = await this.userService.findByEmail(dto.newEmail);

    if (existingUser && existingUser.id !== user.id) {
      throw new ConflictException('Email already exists');
    }

    const otp = this.generateOtp();
    const otpHash = await this.bcryptService.hash(otp);

    const now = new Date();

    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);

    const resendAvailableAt = new Date(now.getTime() + 60 * 1000);

    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          email: dto.newEmail,
        },
      });

      await tx.emailVerification.upsert({
        where: {
          userId: user.id,
        },
        update: {
          otpHash,
          expiresAt,
          resendAvailableAt,
        },
        create: {
          userId: user.id,
          otpHash,
          expiresAt,
          resendAvailableAt,
        },
      });
    });

    await this.mailService.sendEmailVerificationOtp(dto.newEmail, otp);

    return {
      email: dto.newEmail,
      expiresAt,
      resendAvailableAt,
      message: 'Verification code has been sent to your new email',
    };
  }

  // =========================
  // LOGIN
  // =========================

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

    if (!user.emailVerified) {
      throw new UnauthorizedException(
        'Please verify your email before logging in',
      );
    }

    const accessToken = await this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return this.createAuthResponse(user.id, accessToken);
  }

  async getCurrentUser(userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      sub: user.id,
      email: user.email,
      role: user.role,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    };
  }

  // =========================
  // GOOGLE
  // =========================

  async loginWithGoogle(dto: GoogleLoginDto) {
    const profile = await this.googleAuthService.verifyIdToken(dto.idToken);

    return this.loginWithOAuth(AuthProvider.GOOGLE, {
      providerAccountId: profile.sub,
      email: profile.email,
      displayName: dto.displayName || profile.name,
      avatarUrl: profile.picture,
    });
  }

  // =========================
  // LINE - ID TOKEN
  // =========================

  async loginWithLine(dto: LineLoginDto) {
    const profile = await this.lineAuthService.verifyIdToken(dto.idToken);

    // LINE may not return an email.
    // Use a stable synthetic email based on LINE user ID.
    const email = profile.email ?? `line_${profile.sub}@line.local`;

    return this.loginWithOAuth(AuthProvider.LINE, {
      providerAccountId: profile.sub,
      email,
      displayName: dto.displayName || profile.name,
      avatarUrl: profile.picture,
    });
  }

  // =========================
  // LINE - AUTHORIZATION CODE
  // =========================

  async loginWithLineCode(dto: LineCodeDto) {
    const idToken = await this.lineAuthService.exchangeCodeForIdToken(dto.code);

    return this.loginWithLine({
      idToken,
    });
  }

  // =========================
  // OAUTH COMMON FLOW
  // =========================

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

    // Keep a profile picture selected in FoodFighter. Social providers may
    // return a different picture on every login, so only use their picture
    // when the account does not have one saved yet.
    if (profile.avatarUrl && !user.avatarUrl) {
      user = await this.userService.updateAvatarUrl(user.id, profile.avatarUrl);
    }

    const accessToken = await this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return this.createAuthResponse(user.id, accessToken);
  }

  private async createAuthResponse(userId: string, accessToken: string) {
    const refreshToken = await this.createRefreshToken(userId);
    const foodProfile = await this.prisma.foodProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    return {
      accessToken,
      refreshToken,
      foodProfileComplete: Boolean(foodProfile),
    };
  }

  async refresh(refreshToken: string) {
    const normalizedToken = refreshToken.trim();

    if (!normalizedToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const tokenHash = this.hashRefreshToken(normalizedToken);
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      select: {
        id: true,
        userId: true,
        expiresAt: true,
        revokedAt: true,
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (
      !storedToken ||
      storedToken.revokedAt ||
      storedToken.expiresAt.getTime() <= Date.now()
    ) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const nextRefreshToken = this.generateRefreshToken();
    const nextRefreshTokenHash = this.hashRefreshToken(nextRefreshToken);
    const now = new Date();
    const expiresAt = this.getRefreshTokenExpiry();

    await this.prisma.$transaction(async (tx) => {
      const revoked = await tx.refreshToken.updateMany({
        where: {
          id: storedToken.id,
          revokedAt: null,
        },
        data: { revokedAt: now },
      });

      if (revoked.count !== 1) {
        throw new UnauthorizedException('Refresh token has already been used');
      }

      await tx.refreshToken.create({
        data: {
          userId: storedToken.userId,
          tokenHash: nextRefreshTokenHash,
          expiresAt,
        },
      });
    });

    const accessToken = await this.jwtService.sign({
      sub: storedToken.user.id,
      email: storedToken.user.email,
      role: storedToken.user.role,
    });

    return {
      accessToken,
      refreshToken: nextRefreshToken,
    };
  }

  // =========================
  // FORGOT PASSWORD
  // =========================

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

    return {
      message,
    };
  }

  // =========================
  // RESET PASSWORD
  // =========================

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

    return {
      message: 'Password has been reset successfully',
    };
  }

  async logout(refreshToken?: string): Promise<void> {
    const normalizedToken = refreshToken?.trim();

    if (!normalizedToken) {
      return;
    }

    await this.prisma.refreshToken.updateMany({
      where: {
        tokenHash: this.hashRefreshToken(normalizedToken),
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    });
  }

  private async createRefreshToken(userId: string) {
    const refreshToken = this.generateRefreshToken();

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: this.hashRefreshToken(refreshToken),
        expiresAt: this.getRefreshTokenExpiry(),
      },
    });

    return refreshToken;
  }

  private generateRefreshToken() {
    return randomBytes(48).toString('base64url');
  }

  private hashRefreshToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  private getRefreshTokenExpiry() {
    const days =
      this.configService.get<number>('REFRESH_TOKEN_EXPIRES_DAYS') ?? 30;

    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
