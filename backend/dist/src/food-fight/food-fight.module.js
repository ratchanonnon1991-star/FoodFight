"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodFightModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const recommendation_ai_module_1 = require("../recommendation-ai/recommendation-ai.module");
const food_fight_service_1 = require("./food-fight.service");
let FoodFightModule = class FoodFightModule {
};
exports.FoodFightModule = FoodFightModule;
exports.FoodFightModule = FoodFightModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, recommendation_ai_module_1.RecommendationAiModule],
        providers: [food_fight_service_1.FoodFightService],
        exports: [food_fight_service_1.FoodFightService],
    })
], FoodFightModule);
//# sourceMappingURL=food-fight.module.js.map