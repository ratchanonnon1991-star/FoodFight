"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentAccountModule = void 0;
const common_1 = require("@nestjs/common");
const local_storage_module_1 = require("../infrastructure/storage/local-storage.module");
const payment_account_controller_1 = require("./payment-account.controller");
const payment_account_service_1 = require("./payment-account.service");
let PaymentAccountModule = class PaymentAccountModule {
};
exports.PaymentAccountModule = PaymentAccountModule;
exports.PaymentAccountModule = PaymentAccountModule = __decorate([
    (0, common_1.Module)({
        imports: [local_storage_module_1.LocalStorageModule],
        controllers: [payment_account_controller_1.PaymentAccountController],
        providers: [payment_account_service_1.PaymentAccountService],
        exports: [payment_account_service_1.PaymentAccountService],
    })
], PaymentAccountModule);
//# sourceMappingURL=payment-account.module.js.map