import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';

import { AuthService, type AuthSessionResponse } from './auth.service';

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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('resend-verification')
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('change-verification-email')
  changeVerificationEmail(@Body() dto: ChangeVerificationEmailDto) {
    return this.authService.changeVerificationEmail(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.withRefreshCookie(response, this.authService.login(dto));
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('google')
  loginWithGoogle(
    @Body() dto: GoogleLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.withRefreshCookie(
      response,
      this.authService.loginWithGoogle(dto),
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('line')
  loginWithLine(
    @Body() dto: LineLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.withRefreshCookie(response, this.authService.loginWithLine(dto));
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('line/code')
  loginWithLineCode(
    @Body() dto: LineCodeDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.withRefreshCookie(
      response,
      this.authService.loginWithLineCode(dto),
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.refresh(
      this.readRefreshCookie(request) ?? '',
    );

    this.setRefreshCookie(response, result.refreshToken);

    return { accessToken: result.accessToken };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(this.readRefreshCookie(request));
    this.clearRefreshCookie(response);

    return { message: 'Logged out successfully' };
  }

  @Get('me')
  getMe(@CurrentUser() user: AccessTokenPayload) {
    return this.authService.getCurrentUser(user.sub);
  }

  private async withRefreshCookie(
    response: Response,
    authPromise: Promise<AuthSessionResponse>,
  ) {
    const { refreshToken, ...clientResponse } = await authPromise;

    this.setRefreshCookie(response, refreshToken);

    return clientResponse;
  }

  private setRefreshCookie(response: Response, refreshToken: string) {
    const maxAgeSeconds = this.getRefreshTokenMaxAgeSeconds();
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';

    response.setHeader(
      'Set-Cookie',
      `${REFRESH_COOKIE_NAME}=${encodeURIComponent(refreshToken)}; Max-Age=${maxAgeSeconds}; Path=/; HttpOnly; SameSite=Lax${secure}`,
    );
  }

  private clearRefreshCookie(response: Response) {
    response.setHeader(
      'Set-Cookie',
      `${REFRESH_COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`,
    );
  }

  private readRefreshCookie(request: Request) {
    const cookieHeader = request.headers.cookie;

    if (!cookieHeader) {
      return undefined;
    }

    const cookie = cookieHeader
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${REFRESH_COOKIE_NAME}=`));

    return cookie
      ? decodeURIComponent(cookie.slice(REFRESH_COOKIE_NAME.length + 1))
      : undefined;
  }

  private getRefreshTokenMaxAgeSeconds() {
    const days = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS ?? 30);
    return Math.max(1, days) * 24 * 60 * 60;
  }
}

const REFRESH_COOKIE_NAME = 'foodfighter_refresh_token';
