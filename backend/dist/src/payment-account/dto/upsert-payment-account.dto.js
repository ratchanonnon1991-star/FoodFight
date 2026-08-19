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
exports.UpsertPaymentAccountDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const trim_decorator_1 = require("../../common/decorators/trim.decorator");
class UpsertPaymentAccountDto {
    type;
    accountName;
    promptPayId;
}
exports.UpsertPaymentAccountDto = UpsertPaymentAccountDto;
__decorate([
    (0, class_validator_1.IsIn)(['PROMPTPAY']),
    __metadata("design:type", String)
], UpsertPaymentAccountDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, trim_decorator_1.Trim)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], UpsertPaymentAccountDto.prototype, "accountName", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.replace(/[^0-9]/g, '') : value),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(0\d{9}|\d{13})$/, {
        message: 'PromptPay ID must be a 10-digit mobile number or a 13-digit citizen ID',
    }),
    __metadata("design:type", String)
], UpsertPaymentAccountDto.prototype, "promptPayId", void 0);
//# sourceMappingURL=upsert-payment-account.dto.js.map