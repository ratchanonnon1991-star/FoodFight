import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RecommendationAiModule } from '../recommendation-ai/recommendation-ai.module';
import { FoodFightService } from './food-fight.service';

@Module({
  imports: [DatabaseModule, RecommendationAiModule],
  providers: [FoodFightService],
  exports: [FoodFightService],
})
export class FoodFightModule {}
