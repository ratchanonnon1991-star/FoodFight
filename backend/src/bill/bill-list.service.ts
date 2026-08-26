import { Injectable } from '@nestjs/common';
import {
  BillStatus,
  PaymentStatus,
  RoomStatus,
} from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BillListService {
  constructor(private readonly prisma: PrismaService) {}

  async listPending(userId: string) {
    const bills = await this.prisma.bill.findMany({
      where: {
        status: {
          in: [BillStatus.DRAFT, BillStatus.SPLITTING, BillStatus.COMPLETED],
        },
        session: {
          room: { status: { not: RoomStatus.CANCELLED } },
          members: { some: { userId } },
        },
      },
      select: {
        id: true,
        status: true,
        createdById: true,
        totalAmount: true,
        createdAt: true,
        updatedAt: true,
        session: {
          select: {
            room: { select: { name: true } },
            restaurantSelection: { select: { name: true } },
          },
        },
        createdBy: { select: { displayName: true } },
        receipt: { select: { id: true } },
        items: {
          select: {
            shares: { select: { userId: true } },
          },
        },
        payments: {
          select: { status: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return bills.map((bill) => {
      const unassignedItemCount = bill.items.filter(
        (item) => item.shares.length === 0,
      ).length;
      const paidPaymentCount = bill.payments.filter(
        (payment) => payment.status === PaymentStatus.PAID,
      ).length;

      const nextStep = this.getNextStep(
        bill.status,
        bill.items.length,
        unassignedItemCount,
      );

      return {
        id: bill.id,
        status: bill.status,
        title: bill.session.room.name,
        restaurantName: bill.session.restaurantSelection?.name ?? null,
        createdByName: bill.createdBy.displayName,
        isCreator: bill.createdById === userId,
        receiptUploaded: Boolean(bill.receipt),
        itemCount: bill.items.length,
        unassignedItemCount,
        totalAmount: bill.totalAmount != null ? Number(bill.totalAmount) : null,
        paymentProgress: {
          paidCount: paidPaymentCount,
          totalCount: bill.payments.length,
        },
        nextStep,
        continueHref: this.getContinueHref(bill.id, nextStep),
        createdAt: bill.createdAt,
        updatedAt: bill.updatedAt,
      };
    });
  }

  private getNextStep(
    status: BillStatus,
    itemCount: number,
    unassignedItemCount: number,
  ) {
    if (status === BillStatus.COMPLETED) {
      return 'PAYMENT' as const;
    }

    if (itemCount === 0) {
      return 'RECEIPT' as const;
    }

    if (unassignedItemCount > 0) {
      return 'SPLIT' as const;
    }

    return 'SUMMARY' as const;
  }

  private getContinueHref(
    billId: string,
    nextStep: 'RECEIPT' | 'SPLIT' | 'SUMMARY' | 'PAYMENT',
  ) {
    if (nextStep === 'RECEIPT') {
      return `/bills/${billId}/receipt`;
    }

    if (nextStep === 'SPLIT') {
      return `/bills/${billId}/split`;
    }

    if (nextStep === 'SUMMARY') {
      return `/bills/${billId}/summary`;
    }

    return `/bills/${billId}`;
  }
}
