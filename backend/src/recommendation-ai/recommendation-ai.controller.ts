import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import {
  FinalVoteRequestDto,
  InitialVoteRequestDto,
  RecommendationRequestDto,
  RestaurantRequestDto,
} from './dto/ai-request.dto';
import { RecommendationAiService } from './recommendation-ai.service';

@Controller('ai')
export class RecommendationAiController {
  constructor(
    private readonly recommendationAiService: RecommendationAiService,
  ) {}

  @Public()
  @Get('health')
  health() {
    return this.recommendationAiService.health();
  }

  @Post('recommendations')
  recommend(@Body() dto: RecommendationRequestDto) {
    return this.recommendationAiService.recommend(dto);
  }

  @Post('votes')
  vote(@Body() dto: InitialVoteRequestDto) {
    return this.recommendationAiService.vote(dto);
  }

  @Post('votes/final')
  finalVote(@Body() dto: FinalVoteRequestDto) {
    return this.recommendationAiService.finalVote(dto);
  }

  @Post('restaurants')
  restaurants(@Body() dto: RestaurantRequestDto) {
    return this.recommendationAiService.restaurants(dto);
  }
}
