import { ConfigService } from '@nestjs/config';
import { FinalVoteRequestDto, InitialVoteRequestDto, RecommendationRequestDto, RestaurantRequestDto } from './dto/ai-request.dto';
import { type AiJsonValue } from './types/ai-json.types';
export interface AiHealthResponse {
    status: string;
    service: string;
}
export declare class RecommendationAiService {
    private readonly configService;
    private readonly baseUrl;
    constructor(configService: ConfigService);
    health(): Promise<AiHealthResponse>;
    recommend(payload: RecommendationRequestDto): Promise<AiJsonValue>;
    vote(payload: InitialVoteRequestDto): Promise<AiJsonValue>;
    finalVote(payload: FinalVoteRequestDto): Promise<AiJsonValue>;
    restaurants(payload: RestaurantRequestDto): Promise<AiJsonValue>;
    private request;
    private parseResponseBody;
    private getUpstreamErrorMessage;
}
