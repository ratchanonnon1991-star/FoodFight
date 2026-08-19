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
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const upsert_payment_account_dto_1 = require("./dto/upsert-payment-account.dto");
const payment_account_service_1 = require("./payment-account.service");
let PaymentAccountController = class PaymentAccountController {
    paymentAccountService;
    constructor(paymentAccountService) {
        this.paymentAccountService = paymentAccountService;
    }
    getMyAccount(currentUser) {
        return this.paymentAccountService.getForUser(currentUser.sub);
    }
    upsertMyAccount(currentUser, dto) {
        return this.paymentAccountService.upsert(currentUser.sub, dto);
    }
    uploadQrImage(currentUser, file) {
        return this.paymentAccountService.uploadQrImage(currentUser.sub, file);
    }
    removeQrImage(currentUser) {
        return this.paymentAccountService.removeQrImage(currentUser.sub);
    }
};
exports.PaymentAccountController = PaymentAccountController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentAccountController.prototype, "getMyAccount", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_payment_account_dto_1.UpsertPaymentAccountDto]),
    __metadata("design:returntype", void 0)
], PaymentAccountController.prototype, "upsertMyAccount", null);
__decorate([
    (0, common_1.Post)('qr'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentAccountController.prototype, "uploadQrImage", null);
__decorate([
    (0, common_1.Delete)('qr'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentAccountController.prototype, "removeQrImage", null);
exports.PaymentAccountController = PaymentAccountController = __decorate([
    (0, common_1.Controller)('payment-account'),
    __metadata("design:paramtypes", [payment_account_service_1.PaymentAccountService])
], PaymentAccountController);
//# sourceMappingURL=payment-account.controller.js.map