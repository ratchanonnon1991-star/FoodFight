import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.getPublicProfile(id);
  }

  @Patch('me')
  updateMe(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateMe(
      currentUser.sub,
      dto.displayName,
      dto.avatarUrl,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Patch('me/password')
  async changePassword(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.userService.updatePassword(currentUser.sub, dto.password);
    return { message: 'Password has been changed successfully' };
  }
}
