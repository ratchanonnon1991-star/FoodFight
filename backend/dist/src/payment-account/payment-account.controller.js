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
exports.PaymentAccountController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const upsert_payment_account_dto_1 = require("./dto/upsert-payment-account.dto");
const payment_account_service_1 = require("./payment-account.service");
let PaymentAccountController = class PaymentAccountController {
    paymentAccountService;
    constructor(paymentAccountService) {
        this.paymentAccountService = paymentAccountService;
    }
    getMe(currentUser) {
        return this.paymentAccountService.findByUserId(currentUser.sub);
    }
    upsertMe(currentUser, dto) {
        return this.paymentAccountService.upsert(currentUser.sub, dto);
    }
};
exports.PaymentAccountController = PaymentAccountController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentAccountController.prototype, "getMe", null);
__decorate([
    (0, common_1.Put)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_payment_account_dto_1.UpsertPaymentAccountDto]),
    __metadata("design:returntype", void 0)
], PaymentAccountController.prototype, "upsertMe", null);
exports.PaymentAccountController = PaymentAccountController = __decorate([
    (0, common_1.Controller)('payment-account'),
    __metadata("design:paramtypes", [payment_account_service_1.PaymentAccountService])
], PaymentAccountController);
//# sourceMappingURL=payment-account.controller.js.map