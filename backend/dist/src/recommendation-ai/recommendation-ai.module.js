"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationAiModule = void 0;
const common_1 = require("@nestjs/common");
const recommendation_ai_controller_1 = require("./recommendation-ai.controller");
const recommendation_ai_service_1 = require("./recommendation-ai.service");
let RecommendationAiModule = class RecommendationAiModule {
};
exports.RecommendationAiModule = RecommendationAiModule;
exports.RecommendationAiModule = RecommendationAiModule = __decorate([
    (0, common_1.Module)({
        controllers: [recommendation_ai_controller_1.RecommendationAiController],
        providers: [recommendation_ai_service_1.RecommendationAiService],
        exports: [recommendation_ai_service_1.RecommendationAiService],
    })
], RecommendationAiModule);
//# sourceMappingURL=recommendation-ai.module.js.map