"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationAiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ai_json_types_1 = require("./types/ai-json.types");
const AI_REQUEST_TIMEOUT_MS = 60_000;
let RecommendationAiService = class RecommendationAiService {
    configService;
    baseUrl;
    constructor(configService) {
        this.configService = configService;
        const configuredUrl = this.configService.get('AI_SERVICE_URL');
        if (!configuredUrl) {
            throw new Error('AI_SERVICE_URL is not configured');
        }
        this.baseUrl = configuredUrl.replace(/\/+$/, '');
    }
    health() {
        return this.request('/health', 'GET').then((response) => {
            if (!(0, ai_json_types_1.isAiJsonObject)(response) ||
                typeof response.status !== 'string' ||
                typeof response.service !== 'string') {
                throw new common_1.BadGatewayException('AI service returned an invalid health response');
            }
            return {
                status: response.status,
                service: response.service,
            };
        });
    }
    recommend(payload) {
        return this.request('/recommendations', 'POST', payload);
    }
    vote(payload) {
        return this.request('/votes', 'POST', payload);
    }
    finalVote(payload) {
        return this.request('/votes/final', 'POST', payload);
    }
    restaurants(payload) {
        return this.request('/restaurants', 'POST', payload);
    }
    async request(path, method, body) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), AI_REQUEST_TIMEOUT_MS);
        try {
            const response = await fetch(`${this.baseUrl}${path}`, {
                method,
                headers: body ? { 'Content-Type': 'application/json' } : undefined,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });
            const responseBody = await this.parseResponseBody(response);
            if (!response.ok) {
                throw new common_1.BadGatewayException({
                    message: this.getUpstreamErrorMessage(responseBody),
                    upstreamStatus: response.status,
                });
            }
            if (responseBody === null || !(0, ai_json_types_1.isAiJsonValue)(responseBody)) {
                throw new common_1.BadGatewayException('AI service returned an invalid JSON response');
            }
            return responseBody;
        }
        catch (error) {
            if (error instanceof common_1.BadGatewayException) {
                throw error;
            }
            if (controller.signal.aborted) {
                throw new common_1.ServiceUnavailableException('AI service request timed out');
            }
            throw new common_1.ServiceUnavailableException('AI service is unavailable');
        }
        finally {
            clearTimeout(timeoutId);
        }
    }
    async parseResponseBody(response) {
        const rawBody = await response.text();
        if (!rawBody) {
            return null;
        }
        let parsedBody;
        try {
            parsedBody = JSON.parse(rawBody);
        }
        catch {
            throw new common_1.BadGatewayException('AI service returned invalid JSON');
        }
        return (0, ai_json_types_1.isAiJsonValue)(parsedBody) ? parsedBody : null;
    }
    getUpstreamErrorMessage(body) {
        if ((0, ai_json_types_1.isAiJsonObject)(body) && typeof body.detail === 'string') {
            return body.detail;
        }
        return 'AI service request failed';
    }
};
exports.RecommendationAiService = RecommendationAiService;
exports.RecommendationAiService = RecommendationAiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RecommendationAiService);
//# sourceMappingURL=recommendation-ai.service.js.map