"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const env_validation_1 = require("./config/env.validation");
const auth_module_1 = require("./auth/auth.module");
const jwt_module_1 = require("./infrastructure/jwt/jwt.module");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const user_module_1 = require("./user/user.module");
const database_module_1 = require("./database/database.module");
const room_module_1 = require("./room/room.module");
const food_profile_module_1 = require("./food-profile/food-profile.module");
const payment_account_module_1 = require("./payment-account/payment-account.module");
const history_module_1 = require("./history/history.module");
const recommendation_ai_module_1 = require("./recommendation-ai/recommendation-ai.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validate: env_validation_1.validate,
            }),
            database_module_1.DatabaseModule,
            jwt_module_1.JwtModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            room_module_1.RoomModule,
            food_profile_module_1.FoodProfileModule,
            payment_account_module_1.PaymentAccountModule,
            history_module_1.HistoryModule,
            recommendation_ai_module_1.RecommendationAiModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map