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
exports.SubmitVotesDto = exports.VoteSubmissionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("../../database/generated/prisma/client");
class VoteSubmissionDto {
    recommendationItemId;
    vote;
}
exports.VoteSubmissionDto = VoteSubmissionDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], VoteSubmissionDto.prototype, "recommendationItemId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.VoteAction),
    __metadata("design:type", String)
], VoteSubmissionDto.prototype, "vote", void 0);
class SubmitVotesDto {
    votes;
}
exports.SubmitVotesDto = SubmitVotesDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(2),
    (0, class_validator_1.ArrayMaxSize)(2),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => VoteSubmissionDto),
    __metadata("design:type", Array)
], SubmitVotesDto.prototype, "votes", void 0);
//# sourceMappingURL=submit-votes.dto.js.map