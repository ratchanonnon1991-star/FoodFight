import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '../database/generated/prisma/client';
import { BillAccessService, BillWithRelations } from './bill-access.service';

@Injectable()
export class BillDetailService {
  constructor(private readonly billAccess: BillAccessService) {}

  async getDetail(userId: string, billId: string) {
    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertParticipant(bill, userId);
    return this.toResponse(bill, userId);
  }

  toResponse(bill: BillWithRelations, userId: string) {
    const subtotal = bill.items.reduce(
      (sum, item) => sum + Number(item.totalPrice),
      0,
    );
    const serviceCharge =
      bill.serviceCharge != null ? Number(bill.serviceCharge) : 0;
    const tax = bill.tax != null ? Number(bill.tax) : 0;
    const discount = bill.discount != null ? Number(bill.discount) : 0;
    const totalAmount =
      bill.totalAmount != null
        ? Number(bill.totalAmount)
        : subtotal + serviceCharge + tax - discount;

    const collected = bill.payments
      .filter((payment) => payment.status === PaymentStatus.PAID)
      .reduce((sum, payment) => sum + Number(payment.amount), 0);

    return {
      id: bill.id,
      status: bill.status,
      summaryCalculated: bill.totalAmount != null,
      isCreator: bill.createdById === userId,
      createdBy: {
        id: bill.createdBy.id,
        displayName: bill.createdBy.displayName,
        avatarUrl: bill.createdBy.avatarUrl,
      },
      meal: {
        name: bill.session.room.name,
        restaurantName: bill.session.restaurantSelection?.name ?? null,
      },
      members: bill.session.members.map((member) => ({
        userId: member.userId,
        displayName: member.user.displayName,
        avatarUrl: member.user.avatarUrl,
        role: member.role,
      })),
      receipt: bill.receipt
        ? {
            id: bill.receipt.id,
            imageUrl: bill.receipt.imageUrl,
            ocrStatus: bill.receipt.ocrStatus,
            uploadedAt: bill.receipt.uploadedAt,
          }
        : null,
      items: bill.items.map((item) => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice),
        assignedUserIds: item.shares.map((share) => share.userId),
        shares: item.shares.map((share) => ({
          userId: share.userId,
          displayName: share.user.displayName,
          avatarUrl: share.user.avatarUrl,
          amount: Number(share.amount),
        })),
      })),
      subtotal,
      serviceCharge,
      tax,
      discount,
      totalAmount,
      paymentAccount: bill.createdBy.paymentAccount
        ? {
            accountName: bill.createdBy.paymentAccount.accountName,
            promptPayId: bill.createdBy.paymentAccount.promptPayNumber,
            qrImageUrl: bill.createdBy.paymentAccount.qrCodeUrl,
          }
        : null,
      payments: bill.payments.map((payment) => ({
        userId: payment.userId,
        displayName: payment.user.displayName,
        avatarUrl: payment.user.avatarUrl,
        amount: Number(payment.amount),
        status: payment.status,
        paidAt: payment.paidAt,
        slipImageUrl: payment.slipImageUrl,
      })),
      progress: {
        paidCount: bill.payments.filter(
          (payment) => payment.status === PaymentStatus.PAID,
        ).length,
        totalCount: bill.payments.length,
        collected,
        remaining: Math.max(totalAmount - collected, 0),
      },
    };
  }
}
