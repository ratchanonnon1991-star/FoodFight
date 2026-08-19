import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
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
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('google')
  loginWithGoogle(@Body() dto: GoogleLoginDto) {
    return this.authService.loginWithGoogle(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('line')
  loginWithLine(@Body() dto: LineLoginDto) {
    return this.authService.loginWithLine(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('line/code')
  loginWithLineCode(@Body() dto: LineCodeDto) {
    return this.authService.loginWithLineCode(dto);
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

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Get('me')
  getMe(@CurrentUser() user: AccessTokenPayload) {
    return this.authService.getCurrentUser(user.sub);
  }
}
