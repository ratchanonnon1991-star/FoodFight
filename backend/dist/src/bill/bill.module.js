"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillModule = void 0;
const common_1 = require("@nestjs/common");
const ocr_module_1 = require("../infrastructure/ocr/ocr.module");
const promptpay_module_1 = require("../infrastructure/promptpay/promptpay.module");
const local_storage_module_1 = require("../infrastructure/storage/local-storage.module");
const bill_access_service_1 = require("./bill-access.service");
const bill_controller_1 = require("./bill.controller");
const bill_detail_service_1 = require("./bill-detail.service");
const create_bill_service_1 = require("./create-bill.service");
const payment_service_1 = require("./payment.service");
const receipt_service_1 = require("./receipt.service");
const split_service_1 = require("./split.service");
let BillModule = class BillModule {
};
exports.BillModule = BillModule;
exports.BillModule = BillModule = __decorate([
    (0, common_1.Module)({
        imports: [local_storage_module_1.LocalStorageModule, promptpay_module_1.PromptPayModule, ocr_module_1.OcrModule],
        controllers: [bill_controller_1.BillController],
        providers: [
            bill_access_service_1.BillAccessService,
            bill_detail_service_1.BillDetailService,
            create_bill_service_1.CreateBillService,
            receipt_service_1.ReceiptService,
            split_service_1.SplitService,
            payment_service_1.PaymentService,
        ],
    })
], BillModule);
//# sourceMappingURL=bill.module.js.map