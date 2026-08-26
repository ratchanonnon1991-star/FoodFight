import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { BillDetailService } from './bill-detail.service';
import { BillListService } from './bill-list.service';
import { CreateBillService } from './create-bill.service';
import { AssignItemDto } from './dto/assign-item.dto';
import { CalculateSummaryDto } from './dto/calculate-summary.dto';
import { CreateBillDto } from './dto/create-bill.dto';
import { SetPaymentStatusDto } from './dto/set-payment-status.dto';
import { SplitEvenlyDto } from './dto/split-evenly.dto';
import { UpsertReceiptItemDto } from './dto/upsert-receipt-item.dto';
import { PaymentService } from './payment.service';
import { ReceiptService } from './receipt.service';
import { SplitService } from './split.service';

const fileUpload = () => FileInterceptor('file', { storage: memoryStorage() });

@Controller('bills')
export class BillController {
  constructor(
    private readonly createBillService: CreateBillService,
    private readonly billDetailService: BillDetailService,
    private readonly billListService: BillListService,
    private readonly receiptService: ReceiptService,
    private readonly splitService: SplitService,
    private readonly paymentService: PaymentService,
  ) {}

  @Get('rooms/available')
  listAvailableRooms(@CurrentUser() currentUser: AccessTokenPayload) {
    return this.createBillService.listAvailableRooms(currentUser.sub);
  }

  @Get('pending')
  listPendingBills(@CurrentUser() currentUser: AccessTokenPayload) {
    return this.billListService.listPending(currentUser.sub);
  }

  @Post()
  createBill(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Body() dto: CreateBillDto,
  ) {
    return this.createBillService.createBill(currentUser.sub, dto);
  }

  @Get('session/:sessionId')
  getBySession(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('sessionId') sessionId: string,
  ) {
    return this.createBillService.getBySession(currentUser.sub, sessionId);
  }

  @Get(':billId')
  getBill(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
  ) {
    return this.billDetailService.getDetail(currentUser.sub, billId);
  }

  @Post(':billId/receipt')
  @UseInterceptors(fileUpload())
  uploadReceipt(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.receiptService.uploadReceipt(currentUser.sub, billId, file);
  }

  @Post(':billId/items')
  addItem(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
    @Body() dto: UpsertReceiptItemDto,
  ) {
    return this.receiptService.addItem(currentUser.sub, billId, dto);
  }

  @Patch(':billId/items/:itemId')
  updateItem(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpsertReceiptItemDto,
  ) {
    return this.receiptService.updateItem(currentUser.sub, billId, itemId, dto);
  }

  @Delete(':billId/items/:itemId')
  deleteItem(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.receiptService.deleteItem(currentUser.sub, billId, itemId);
  }

  @Put(':billId/items/:itemId/assign')
  assignItem(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
    @Param('itemId') itemId: string,
    @Body() dto: AssignItemDto,
  ) {
    return this.splitService.assignItem(currentUser.sub, billId, itemId, dto);
  }

  @Post(':billId/split-evenly')
  splitEvenly(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
    @Body() dto: SplitEvenlyDto,
  ) {
    return this.splitService.splitEvenly(currentUser.sub, billId, dto);
  }

  @Post(':billId/summary')
  calculateSummary(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
    @Body() dto: CalculateSummaryDto,
  ) {
    return this.splitService.calculateSummary(currentUser.sub, billId, dto);
  }

  @Post(':billId/confirm')
  confirmBill(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
  ) {
    return this.splitService.confirmBill(currentUser.sub, billId);
  }

  @Get(':billId/payments/:userId/qr')
  getPaymentQr(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
    @Param('userId') targetUserId: string,
  ) {
    return this.paymentService.getQrForMember(
      currentUser.sub,
      billId,
      targetUserId,
    );
  }

  @Post(':billId/payments/:userId/slip')
  @UseInterceptors(fileUpload())
  uploadSlip(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
    @Param('userId') targetUserId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.paymentService.uploadSlip(
      currentUser.sub,
      billId,
      targetUserId,
      file,
    );
  }

  @Patch(':billId/payments/:userId')
  setPaymentStatus(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
    @Param('userId') targetUserId: string,
    @Body() dto: SetPaymentStatusDto,
  ) {
    return this.paymentService.setStatus(
      currentUser.sub,
      billId,
      targetUserId,
      dto,
    );
  }

  @Post(':billId/close')
  closeBill(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Param('billId') billId: string,
  ) {
    return this.paymentService.closeBill(currentUser.sub, billId);
  }
}
