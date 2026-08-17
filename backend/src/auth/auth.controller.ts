import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  register() {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login() {}

  @Get('me')
  getMe() {}
}
