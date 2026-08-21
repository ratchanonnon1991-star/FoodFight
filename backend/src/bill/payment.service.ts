import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BillStatus, PaymentStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { PromptPayService } from '../infrastructure/promptpay/promptpay.service';
import { LocalStorageService } from '../infrastructure/storage/local-storage.service';
import { BillAccessService } from './bill-access.service';
import { BillDetailService } from './bill-detail.service';
import { SetPaymentStatusDto } from './dto/set-payment-status.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: LocalStorageService,
    private readonly promptPay: PromptPayService,
    private readonly billAccess: BillAccessService,
    private readonly billDetail: BillDetailService,
  ) {}

  async getQrForMember(userId: string, billId: string, targetUserId: string) {
    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertParticipant(bill, userId);

    if (bill.status !== BillStatus.COMPLETED) {
      throw new BadRequestException('The bill has not been confirmed yet');
    }

    if (!bill.createdBy.paymentAccount) {
      throw new BadRequestException(
        'The bill creator has not set up a payment account yet',
      );
    }

    const payment = bill.payments.find((p) => p.userId === targetUserId);
    if (!payment) {
      throw new NotFoundException('No payment found for this member');
    }

    const qrDataUrl = await this.promptPay.generateQrDataUrl(
      bill.createdBy.paymentAccount.promptPayNumber,
      Number(payment.amount),
    );

    return {
      qrDataUrl,
      amount: Number(payment.amount),
      accountName: bill.createdBy.paymentAccount.accountName,
    };
  }

  async uploadSlip(
    userId: string,
    billId: string,
    targetUserId: string,
    file: Express.Multer.File,
  ) {
    if (userId !== targetUserId) {
      throw new ForbiddenException('You can only upload your own payment slip');
    }

    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertParticipant(bill, userId);

    if (bill.status === BillStatus.CLOSED) {
      throw new ConflictException('This bill is already closed');
    }

    const payment = bill.payments.find((p) => p.userId === targetUserId);
    if (!payment) {
      throw new NotFoundException('No payment found for this member');
    }

    const slipImageUrl = await this.storage.save(file, 'slips');
    await this.storage.delete(payment.slipImageUrl);

    await this.prisma.userPayment.update({
      where: { billId_userId: { billId, userId: targetUserId } },
      data: { slipImageUrl, status: PaymentStatus.PAID, paidAt: new Date() },
    });

    return this.billDetail.getDetail(userId, billId);
  }

  async setStatus(
    userId: string,
    billId: string,
    targetUserId: string,
    dto: SetPaymentStatusDto,
  ) {
    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertCreator(bill, userId);

    if (bill.status === BillStatus.CLOSED) {
      throw new ConflictException('This bill is already closed');
    }

    const payment = bill.payments.find((p) => p.userId === targetUserId);
    if (!payment) {
      throw new NotFoundException('No payment found for this member');
    }

    await this.prisma.userPayment.update({
      where: { billId_userId: { billId, userId: targetUserId } },
      data: {
        status: dto.status,
        paidAt: dto.status === PaymentStatus.PAID ? new Date() : null,
      },
    });

    return this.billDetail.getDetail(userId, billId);
  }

  async closeBill(userId: string, billId: string) {
    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertCreator(bill, userId);

    if (bill.status === BillStatus.CLOSED) {
      throw new ConflictException('This bill is already closed');
    }

    if (bill.status !== BillStatus.COMPLETED) {
      throw new ConflictException('Confirm the bill before closing it');
    }

    const { remaining } = this.billDetail.toResponse(bill, userId).progress;
    if (remaining > 0) {
      throw new ConflictException('Not everyone has paid yet');
    }

    await this.prisma.bill.update({
      where: { id: billId },
      data: { status: BillStatus.CLOSED, closedAt: new Date() },
    });

    return this.billDetail.getDetail(userId, billId);
  }
}
