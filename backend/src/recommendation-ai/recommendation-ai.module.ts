import { Module } from '@nestjs/common';
import { RecommendationAiController } from './recommendation-ai.controller';
import { RecommendationAiService } from './recommendation-ai.service';

@Module({
  controllers: [RecommendationAiController],
  providers: [RecommendationAiService],
  exports: [RecommendationAiService],
})
export class RecommendationAiModule {}
