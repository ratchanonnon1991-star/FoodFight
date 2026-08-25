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
exports.UpsertMealPreferenceDto = void 0;
const class_validator_1 = require("class-validator");
const trim_decorator_1 = require("../../common/decorators/trim.decorator");
class UpsertMealPreferenceDto {
    cookingMethods;
    cookingMethodsOther;
    cuisines;
    cuisinesOther;
    proteins;
    proteinsOther;
    budget;
    restaurantStyles;
    restaurantStylesOther;
    additionalNuances;
}
exports.UpsertMealPreferenceDto = UpsertMealPreferenceDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(20),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.MaxLength)(50, { each: true }),
    __metadata("design:type", Array)
], UpsertMealPreferenceDto.prototype, "cookingMethods", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, trim_decorator_1.Trim)(),
    __metadata("design:type", Object)
], UpsertMealPreferenceDto.prototype, "cookingMethodsOther", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(20),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.MaxLength)(50, { each: true }),
    __metadata("design:type", Array)
], UpsertMealPreferenceDto.prototype, "cuisines", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, trim_decorator_1.Trim)(),
    __metadata("design:type", Object)
], UpsertMealPreferenceDto.prototype, "cuisinesOther", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(20),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.MaxLength)(50, { each: true }),
    __metadata("design:type", Array)
], UpsertMealPreferenceDto.prototype, "proteins", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, trim_decorator_1.Trim)(),
    __metadata("design:type", Object)
], UpsertMealPreferenceDto.prototype, "proteinsOther", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['LOW', 'MID', 'HIGH', 'ANY']),
    __metadata("design:type", String)
], UpsertMealPreferenceDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(20),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.MaxLength)(50, { each: true }),
    __metadata("design:type", Array)
], UpsertMealPreferenceDto.prototype, "restaurantStyles", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, trim_decorator_1.Trim)(),
    __metadata("design:type", Object)
], UpsertMealPreferenceDto.prototype, "restaurantStylesOther", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    (0, trim_decorator_1.Trim)(),
    __metadata("design:type", Object)
], UpsertMealPreferenceDto.prototype, "additionalNuances", void 0);
//# sourceMappingURL=upsert-meal-preference.dto.js.map