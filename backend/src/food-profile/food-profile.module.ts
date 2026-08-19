import { Module } from '@nestjs/common';
import { FoodProfileController } from './food-profile.controller';
import { FoodProfileService } from './food-profile.service';

@Module({
  controllers: [FoodProfileController],
  providers: [FoodProfileService],
  exports: [FoodProfileService],
})
export class FoodProfileModule {}
