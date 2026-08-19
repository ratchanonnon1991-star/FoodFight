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
exports.UpsertFoodProfileDto = void 0;
const class_validator_1 = require("class-validator");
const trim_decorator_1 = require("../../common/decorators/trim.decorator");
class UpsertFoodProfileDto {
    allergies;
    otherAllergies;
    restrictions;
    otherRestrictions;
    additionalNotes;
}
exports.UpsertFoodProfileDto = UpsertFoodProfileDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpsertFoodProfileDto.prototype, "allergies", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, trim_decorator_1.Trim)(),
    __metadata("design:type", Object)
], UpsertFoodProfileDto.prototype, "otherAllergies", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpsertFoodProfileDto.prototype, "restrictions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, trim_decorator_1.Trim)(),
    __metadata("design:type", Object)
], UpsertFoodProfileDto.prototype, "otherRestrictions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    (0, trim_decorator_1.Trim)(),
    __metadata("design:type", Object)
], UpsertFoodProfileDto.prototype, "additionalNotes", void 0);
//# sourceMappingURL=upsert-food-profile.dto.js.map