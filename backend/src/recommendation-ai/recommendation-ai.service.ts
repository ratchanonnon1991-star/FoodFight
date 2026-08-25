import {
  BadGatewayException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FinalVoteRequestDto,
  InitialVoteRequestDto,
  RecommendationRequestDto,
  RestaurantRequestDto,
} from './dto/ai-request.dto';
import {
  isAiJsonObject,
  isAiJsonValue,
  type AiJsonValue,
} from './types/ai-json.types';

// The first recommendation request loads and normalizes the food catalog in
// the AI service. Subsequent requests reuse the cached catalog.
const AI_REQUEST_TIMEOUT_MS = 60_000;

export interface AiHealthResponse {
  status: string;
  service: string;
}

@Injectable()
export class RecommendationAiService {
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    const configuredUrl = this.configService.get<string>('AI_SERVICE_URL');

    if (!configuredUrl) {
      throw new Error('AI_SERVICE_URL is not configured');
    }

    this.baseUrl = configuredUrl.replace(/\/+$/, '');
  }

  health(): Promise<AiHealthResponse> {
    return this.request('/health', 'GET').then((response) => {
      if (
        !isAiJsonObject(response) ||
        typeof response.status !== 'string' ||
        typeof response.service !== 'string'
      ) {
        throw new BadGatewayException(
          'AI service returned an invalid health response',
        );
      }

      return {
        status: response.status,
        service: response.service,
      };
    });
  }

  recommend(payload: RecommendationRequestDto): Promise<AiJsonValue> {
    return this.request('/recommendations', 'POST', payload);
  }

  vote(payload: InitialVoteRequestDto): Promise<AiJsonValue> {
    return this.request('/votes', 'POST', payload);
  }

  finalVote(payload: FinalVoteRequestDto): Promise<AiJsonValue> {
    return this.request('/votes/final', 'POST', payload);
  }

  restaurants(payload: RestaurantRequestDto): Promise<AiJsonValue> {
    return this.request('/restaurants', 'POST', payload);
  }

  private async request(
    path: string,
    method: 'GET' | 'POST',
    body?: object,
  ): Promise<AiJsonValue> {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      AI_REQUEST_TIMEOUT_MS,
    );

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      const responseBody = await this.parseResponseBody(response);

      if (!response.ok) {
        throw new BadGatewayException({
          message: this.getUpstreamErrorMessage(responseBody),
          upstreamStatus: response.status,
        });
      }

      if (responseBody === null || !isAiJsonValue(responseBody)) {
        throw new BadGatewayException(
          'AI service returned an invalid JSON response',
        );
      }

      return responseBody;
    } catch (error) {
      if (error instanceof BadGatewayException) {
        throw error;
      }

      if (controller.signal.aborted) {
        throw new ServiceUnavailableException('AI service request timed out');
      }

      throw new ServiceUnavailableException('AI service is unavailable');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async parseResponseBody(
    response: Response,
  ): Promise<AiJsonValue | null> {
    const rawBody = await response.text();

    if (!rawBody) {
      return null;
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody) as unknown;
    } catch {
      throw new BadGatewayException('AI service returned invalid JSON');
    }

    return isAiJsonValue(parsedBody) ? parsedBody : null;
  }

  private getUpstreamErrorMessage(body: AiJsonValue | null): string {
    if (isAiJsonObject(body) && typeof body.detail === 'string') {
      return body.detail;
    }

    return 'AI service request failed';
  }
}
