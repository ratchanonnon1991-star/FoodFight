import { FinalVoteRequestDto, InitialVoteRequestDto, RecommendationRequestDto, RestaurantRequestDto } from './dto/ai-request.dto';
import { RecommendationAiService } from './recommendation-ai.service';
export declare class RecommendationAiController {
    private readonly recommendationAiService;
    constructor(recommendationAiService: RecommendationAiService);
    health(): Promise<import("./recommendation-ai.service").AiHealthResponse>;
    recommend(dto: RecommendationRequestDto): Promise<import("./types/ai-json.types").AiJsonValue>;
    vote(dto: InitialVoteRequestDto): Promise<import("./types/ai-json.types").AiJsonValue>;
    finalVote(dto: FinalVoteRequestDto): Promise<import("./types/ai-json.types").AiJsonValue>;
    restaurants(dto: RestaurantRequestDto): Promise<import("./types/ai-json.types").AiJsonValue>;
}
