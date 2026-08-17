import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';

@Controller('auth')
export class AuthController {
  @Public()
  @Post('register')
  register() {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login() {}

  @Get('me')
  getMe(@CurrentUser() user: AccessTokenPayload) {
    return user;
  }
}
