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
exports.BillController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const bill_detail_service_1 = require("./bill-detail.service");
const bill_list_service_1 = require("./bill-list.service");
const create_bill_service_1 = require("./create-bill.service");
const assign_item_dto_1 = require("./dto/assign-item.dto");
const calculate_summary_dto_1 = require("./dto/calculate-summary.dto");
const create_bill_dto_1 = require("./dto/create-bill.dto");
const set_payment_status_dto_1 = require("./dto/set-payment-status.dto");
const split_evenly_dto_1 = require("./dto/split-evenly.dto");
const upsert_receipt_item_dto_1 = require("./dto/upsert-receipt-item.dto");
const payment_service_1 = require("./payment.service");
const receipt_service_1 = require("./receipt.service");
const split_service_1 = require("./split.service");
const fileUpload = () => (0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() });
let BillController = class BillController {
    createBillService;
    billDetailService;
    billListService;
    receiptService;
    splitService;
    paymentService;
    constructor(createBillService, billDetailService, billListService, receiptService, splitService, paymentService) {
        this.createBillService = createBillService;
        this.billDetailService = billDetailService;
        this.billListService = billListService;
        this.receiptService = receiptService;
        this.splitService = splitService;
        this.paymentService = paymentService;
    }
    listAvailableRooms(currentUser) {
        return this.createBillService.listAvailableRooms(currentUser.sub);
    }
    listPendingBills(currentUser) {
        return this.billListService.listPending(currentUser.sub);
    }
    createBill(currentUser, dto) {
        return this.createBillService.createBill(currentUser.sub, dto);
    }
    getBySession(currentUser, sessionId) {
        return this.createBillService.getBySession(currentUser.sub, sessionId);
    }
    getBill(currentUser, billId) {
        return this.billDetailService.getDetail(currentUser.sub, billId);
    }
    uploadReceipt(currentUser, billId, file) {
        return this.receiptService.uploadReceipt(currentUser.sub, billId, file);
    }
    addItem(currentUser, billId, dto) {
        return this.receiptService.addItem(currentUser.sub, billId, dto);
    }
    updateItem(currentUser, billId, itemId, dto) {
        return this.receiptService.updateItem(currentUser.sub, billId, itemId, dto);
    }
    deleteItem(currentUser, billId, itemId) {
        return this.receiptService.deleteItem(currentUser.sub, billId, itemId);
    }
    assignItem(currentUser, billId, itemId, dto) {
        return this.splitService.assignItem(currentUser.sub, billId, itemId, dto);
    }
    splitEvenly(currentUser, billId, dto) {
        return this.splitService.splitEvenly(currentUser.sub, billId, dto);
    }
    calculateSummary(currentUser, billId, dto) {
        return this.splitService.calculateSummary(currentUser.sub, billId, dto);
    }
    confirmBill(currentUser, billId) {
        return this.splitService.confirmBill(currentUser.sub, billId);
    }
    getPaymentQr(currentUser, billId, targetUserId) {
        return this.paymentService.getQrForMember(currentUser.sub, billId, targetUserId);
    }
    uploadSlip(currentUser, billId, targetUserId, file) {
        return this.paymentService.uploadSlip(currentUser.sub, billId, targetUserId, file);
    }
    setPaymentStatus(currentUser, billId, targetUserId, dto) {
        return this.paymentService.setStatus(currentUser.sub, billId, targetUserId, dto);
    }
    closeBill(currentUser, billId) {
        return this.paymentService.closeBill(currentUser.sub, billId);
    }
};
exports.BillController = BillController;
__decorate([
    (0, common_1.Get)('rooms/available'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "listAvailableRooms", null);
__decorate([
    (0, common_1.Get)('pending'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "listPendingBills", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_bill_dto_1.CreateBillDto]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "createBill", null);
__decorate([
    (0, common_1.Get)('session/:sessionId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "getBySession", null);
__decorate([
    (0, common_1.Get)(':billId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "getBill", null);
__decorate([
    (0, common_1.Post)(':billId/receipt'),
    (0, common_1.UseInterceptors)(fileUpload()),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "uploadReceipt", null);
__decorate([
    (0, common_1.Post)(':billId/items'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, upsert_receipt_item_dto_1.UpsertReceiptItemDto]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "addItem", null);
__decorate([
    (0, common_1.Patch)(':billId/items/:itemId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __param(2, (0, common_1.Param)('itemId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, upsert_receipt_item_dto_1.UpsertReceiptItemDto]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)(':billId/items/:itemId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __param(2, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Put)(':billId/items/:itemId/assign'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __param(2, (0, common_1.Param)('itemId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, assign_item_dto_1.AssignItemDto]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "assignItem", null);
__decorate([
    (0, common_1.Post)(':billId/split-evenly'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, split_evenly_dto_1.SplitEvenlyDto]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "splitEvenly", null);
__decorate([
    (0, common_1.Post)(':billId/summary'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, calculate_summary_dto_1.CalculateSummaryDto]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "calculateSummary", null);
__decorate([
    (0, common_1.Post)(':billId/confirm'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "confirmBill", null);
__decorate([
    (0, common_1.Get)(':billId/payments/:userId/qr'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "getPaymentQr", null);
__decorate([
    (0, common_1.Post)(':billId/payments/:userId/slip'),
    (0, common_1.UseInterceptors)(fileUpload()),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __param(2, (0, common_1.Param)('userId')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "uploadSlip", null);
__decorate([
    (0, common_1.Patch)(':billId/payments/:userId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __param(2, (0, common_1.Param)('userId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, set_payment_status_dto_1.SetPaymentStatusDto]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "setPaymentStatus", null);
__decorate([
    (0, common_1.Post)(':billId/close'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('billId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BillController.prototype, "closeBill", null);
exports.BillController = BillController = __decorate([
    (0, common_1.Controller)('bills'),
    __metadata("design:paramtypes", [create_bill_service_1.CreateBillService,
        bill_detail_service_1.BillDetailService,
        bill_list_service_1.BillListService,
        receipt_service_1.ReceiptService,
        split_service_1.SplitService,
        payment_service_1.PaymentService])
], BillController);
//# sourceMappingURL=bill.controller.js.map