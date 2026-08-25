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
exports.RestaurantRequestDto = exports.FinalVoteRequestDto = exports.FinalVoteItemDto = exports.InitialVoteRequestDto = exports.VoteItemDto = exports.RecommendationSummaryDto = exports.RecommendationRequestDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class RecommendationRequestDto {
    roomId;
    members;
    history;
    rerollExclusions;
}
exports.RecommendationRequestDto = RecommendationRequestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecommendationRequestDto.prototype, "roomId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsObject)({ each: true }),
    __metadata("design:type", Array)
], RecommendationRequestDto.prototype, "members", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RecommendationRequestDto.prototype, "history", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RecommendationRequestDto.prototype, "rerollExclusions", void 0);
class RecommendationSummaryDto {
    conceptId;
    nameTh;
}
exports.RecommendationSummaryDto = RecommendationSummaryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecommendationSummaryDto.prototype, "conceptId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecommendationSummaryDto.prototype, "nameTh", void 0);
class VoteItemDto {
    memberId;
    conceptId;
    vote;
}
exports.VoteItemDto = VoteItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VoteItemDto.prototype, "memberId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VoteItemDto.prototype, "conceptId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VoteItemDto.prototype, "vote", void 0);
class InitialVoteRequestDto {
    recommendations;
    memberIds;
    votes;
    rerollCount = 0;
}
exports.InitialVoteRequestDto = InitialVoteRequestDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RecommendationSummaryDto),
    __metadata("design:type", Array)
], InitialVoteRequestDto.prototype, "recommendations", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], InitialVoteRequestDto.prototype, "memberIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => VoteItemDto),
    __metadata("design:type", Array)
], InitialVoteRequestDto.prototype, "votes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], InitialVoteRequestDto.prototype, "rerollCount", void 0);
class FinalVoteItemDto {
    memberId;
    conceptId;
}
exports.FinalVoteItemDto = FinalVoteItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinalVoteItemDto.prototype, "memberId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinalVoteItemDto.prototype, "conceptId", void 0);
class FinalVoteRequestDto {
    candidates;
    memberIds;
    votes;
}
exports.FinalVoteRequestDto = FinalVoteRequestDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsObject)({ each: true }),
    __metadata("design:type", Array)
], FinalVoteRequestDto.prototype, "candidates", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FinalVoteRequestDto.prototype, "memberIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FinalVoteItemDto),
    __metadata("design:type", Array)
], FinalVoteRequestDto.prototype, "votes", void 0);
class RestaurantRequestDto {
    finalConcept;
    groupLocation;
    normalizedMembers;
    radiusKm = 5;
    topK = 5;
}
exports.RestaurantRequestDto = RestaurantRequestDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RestaurantRequestDto.prototype, "finalConcept", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RestaurantRequestDto.prototype, "groupLocation", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsObject)({ each: true }),
    __metadata("design:type", Array)
], RestaurantRequestDto.prototype, "normalizedMembers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], RestaurantRequestDto.prototype, "radiusKm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], RestaurantRequestDto.prototype, "topK", void 0);
//# sourceMappingURL=ai-request.dto.js.map