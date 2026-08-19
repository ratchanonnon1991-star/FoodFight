import { Body, Controller, Get, Put } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { UpsertFoodProfileDto } from './dto/upsert-food-profile.dto';
import { FoodProfileService } from './food-profile.service';

@Controller('food-profile')
export class FoodProfileController {
  constructor(private readonly foodProfileService: FoodProfileService) {}

  @Get('me')
  getMe(@CurrentUser() currentUser: AccessTokenPayload) {
    return this.foodProfileService.findByUserId(currentUser.sub);
  }

  @Put('me')
  upsertMe(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Body() dto: UpsertFoodProfileDto,
  ) {
    return this.foodProfileService.upsert(currentUser.sub, dto);
  }
}
