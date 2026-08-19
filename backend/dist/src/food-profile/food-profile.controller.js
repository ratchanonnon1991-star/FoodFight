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
exports.FoodProfileController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const upsert_food_profile_dto_1 = require("./dto/upsert-food-profile.dto");
const food_profile_service_1 = require("./food-profile.service");
let FoodProfileController = class FoodProfileController {
    foodProfileService;
    constructor(foodProfileService) {
        this.foodProfileService = foodProfileService;
    }
    getMe(currentUser) {
        return this.foodProfileService.findByUserId(currentUser.sub);
    }
    upsertMe(currentUser, dto) {
        return this.foodProfileService.upsert(currentUser.sub, dto);
    }
};
exports.FoodProfileController = FoodProfileController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FoodProfileController.prototype, "getMe", null);
__decorate([
    (0, common_1.Put)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_food_profile_dto_1.UpsertFoodProfileDto]),
    __metadata("design:returntype", void 0)
], FoodProfileController.prototype, "upsertMe", null);
exports.FoodProfileController = FoodProfileController = __decorate([
    (0, common_1.Controller)('food-profile'),
    __metadata("design:paramtypes", [food_profile_service_1.FoodProfileService])
], FoodProfileController);
//# sourceMappingURL=food-profile.controller.js.map