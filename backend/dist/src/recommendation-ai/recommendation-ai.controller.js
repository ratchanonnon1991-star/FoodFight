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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationAiController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../common/decorators/public.decorator");
const ai_request_dto_1 = require("./dto/ai-request.dto");
const recommendation_ai_service_1 = require("./recommendation-ai.service");
let RecommendationAiController = class RecommendationAiController {
    recommendationAiService;
    constructor(recommendationAiService) {
        this.recommendationAiService = recommendationAiService;
    }
    health() {
        return this.recommendationAiService.health();
    }
    recommend(dto) {
        return this.recommendationAiService.recommend(dto);
    }
    vote(dto) {
        return this.recommendationAiService.vote(dto);
    }
    finalVote(dto) {
        return this.recommendationAiService.finalVote(dto);
    }
    restaurants(dto) {
        return this.recommendationAiService.restaurants(dto);
    }
};
exports.RecommendationAiController = RecommendationAiController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecommendationAiController.prototype, "health", null);
__decorate([
    (0, common_1.Post)('recommendations'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_request_dto_1.RecommendationRequestDto]),
    __metadata("design:returntype", void 0)
], RecommendationAiController.prototype, "recommend", null);
__decorate([
    (0, common_1.Post)('votes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_request_dto_1.InitialVoteRequestDto]),
    __metadata("design:returntype", void 0)
], RecommendationAiController.prototype, "vote", null);
__decorate([
    (0, common_1.Post)('votes/final'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_request_dto_1.FinalVoteRequestDto]),
    __metadata("design:returntype", void 0)
], RecommendationAiController.prototype, "finalVote", null);
__decorate([
    (0, common_1.Post)('restaurants'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_request_dto_1.RestaurantRequestDto]),
    __metadata("design:returntype", void 0)
], RecommendationAiController.prototype, "restaurants", null);
exports.RecommendationAiController = RecommendationAiController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [recommendation_ai_service_1.RecommendationAiService])
], RecommendationAiController);
//# sourceMappingURL=recommendation-ai.controller.js.map