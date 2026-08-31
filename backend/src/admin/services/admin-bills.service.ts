import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../database/generated/prisma/client';
import {
  BillStatus,
  PaymentStatus,
} from '../../database/generated/prisma/enums';
import { PrismaService } from '../../database/prisma.service';
import { AdminBillQueryDto } from '../dto/admin-bill-query.dto';

export interface AdminBillCreator {
  id: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface AdminBillPaymentSummary {
  paymentCount: number;
  paidPaymentCount: number;
  unpaidPaymentCount: number;
  paymentCompletionRate: number | null;
}

export interface AdminBillItem extends AdminBillPaymentSummary {
  id: string;
  status: BillStatus;
  createdAt: Date;
  closedAt: Date | null;
  reportedTotalAmount: number | null;
  creator: AdminBillCreator;
}

export interface AdminBillsPaginatedResponse {
  items: AdminBillItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminBillPayment {
  id: string;
  payer: AdminBillCreator;
  amount: number;
  status: PaymentStatus;
  paidAt: Date | null;
}

export interface AdminBillDetailResponse extends AdminBillItem {
  payments: AdminBillPayment[];
}

function completionRate(paid: number, total: number): number | null {
  if (total === 0) return null;
  return Math.round((paid / total) * 1000) / 10;
}

function paymentSummary(counts: {
  paymentCount: number;
  paidPaymentCount: number;
}): AdminBillPaymentSummary {
  const unpaidPaymentCount = counts.paymentCount - counts.paidPaymentCount;
  return {
    paymentCount: counts.paymentCount,
    paidPaymentCount: counts.paidPaymentCount,
    unpaidPaymentCount,
    paymentCompletionRate: completionRate(
      counts.paidPaymentCount,
      counts.paymentCount,
    ),
  };
}

@Injectable()
export class AdminBillsService {
  constructor(private readonly prisma: PrismaService) {}

  async getBills(
    query: AdminBillQueryDto,
  ): Promise<AdminBillsPaginatedResponse> {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(50, Math.max(1, query.limit ?? 20));
    const skip = (page - 1) * limit;
    const where: Prisma.BillWhereInput = {};

    if (query.status) where.status = query.status;
    if (query.search && query.search.trim()) {
      const searchTerm = query.search.trim();
      where.OR = [
        { id: { contains: searchTerm, mode: 'insensitive' } },
        {
          createdBy: {
            displayName: { contains: searchTerm, mode: 'insensitive' },
          },
        },
      ];
    }

    const [bills, total] = await Promise.all([
      this.prisma.bill.findMany({
        where,
        select: {
          id: true,
          status: true,
          totalAmount: true,
          closedAt: true,
          createdAt: true,
          createdBy: {
            select: { id: true, displayName: true, avatarUrl: true },
          },
        },
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.bill.count({ where }),
    ]);

    const paymentCounts = await this.getPaymentCounts(
      bills.map((bill) => bill.id),
    );
    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      items: bills.map((bill) => ({
        id: bill.id,
        status: bill.status,
        createdAt: bill.createdAt,
        closedAt: bill.closedAt,
        reportedTotalAmount:
          bill.totalAmount == null ? null : Number(bill.totalAmount),
        creator: bill.createdBy,
        ...paymentSummary(
          paymentCounts.get(bill.id) ?? {
            paymentCount: 0,
            paidPaymentCount: 0,
          },
        ),
      })),
      pagination: { page, limit, total, totalPages },
    };
  }

  private async getPaymentCounts(
    billIds: string[],
  ): Promise<Map<string, { paymentCount: number; paidPaymentCount: number }>> {
    const counts = new Map<
      string,
      { paymentCount: number; paidPaymentCount: number }
    >();
    if (billIds.length === 0) return counts;

    const groups = await this.prisma.userPayment.groupBy({
      where: { billId: { in: billIds } },
      by: ['billId', 'status'],
      _count: { _all: true },
    });

    for (const group of groups) {
      const current = counts.get(group.billId) ?? {
        paymentCount: 0,
        paidPaymentCount: 0,
      };
      current.paymentCount += group._count._all;
      if (group.status === PaymentStatus.PAID)
        current.paidPaymentCount += group._count._all;
      counts.set(group.billId, current);
    }

    return counts;
  }

  async getBillById(billId: string): Promise<AdminBillDetailResponse> {
    const bill = await this.prisma.bill.findUnique({
      where: { id: billId },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        closedAt: true,
        createdAt: true,
        createdBy: { select: { id: true, displayName: true, avatarUrl: true } },
        payments: {
          orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
          select: {
            id: true,
            amount: true,
            status: true,
            paidAt: true,
            user: { select: { id: true, displayName: true, avatarUrl: true } },
          },
        },
      },
    });

    if (!bill) {
      throw new NotFoundException(`Bill with id "${billId}" was not found`);
    }

    const paidPaymentCount = bill.payments.filter(
      (payment) => payment.status === PaymentStatus.PAID,
    ).length;

    return {
      id: bill.id,
      status: bill.status,
      createdAt: bill.createdAt,
      closedAt: bill.closedAt,
      reportedTotalAmount:
        bill.totalAmount == null ? null : Number(bill.totalAmount),
      creator: bill.createdBy,
      ...paymentSummary({
        paymentCount: bill.payments.length,
        paidPaymentCount,
      }),
      payments: bill.payments.map((payment) => ({
        id: payment.id,
        payer: payment.user,
        amount: Number(payment.amount),
        status: payment.status,
        paidAt: payment.paidAt,
      })),
    };
  }
}
