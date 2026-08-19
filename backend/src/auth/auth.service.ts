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

    return {
      accessToken,
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

    if (profile.avatarUrl && profile.avatarUrl !== user.avatarUrl) {
      user = await this.userService.updateAvatarUrl(user.id, profile.avatarUrl);
    }

    const accessToken = await this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
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

  logout(): void {}

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
