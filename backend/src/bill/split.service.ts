import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BillStatus, PaymentStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { BillAccessService } from './bill-access.service';
import { BillDetailService } from './bill-detail.service';
import { AssignItemDto } from './dto/assign-item.dto';
import { CalculateSummaryDto } from './dto/calculate-summary.dto';
import {
  fromCents,
  splitEvenlyCents,
  splitProportionallyCents,
  toCents,
} from './util/money.util';

@Injectable()
export class SplitService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly billAccess: BillAccessService,
    private readonly billDetail: BillDetailService,
  ) {}

  async assignItem(
    userId: string,
    billId: string,
    itemId: string,
    dto: AssignItemDto,
  ) {
    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertCreator(bill, userId);

    if (
      bill.status === BillStatus.COMPLETED ||
      bill.status === BillStatus.CANCELLED
    ) {
      throw new ConflictException('This bill is already finalized');
    }

    const item = bill.items.find((existing) => existing.id === itemId);
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    const memberIds = new Set(
      bill.session.members.map((member) => member.userId),
    );
    const assigneeIds = Array.from(new Set(dto.userIds));

    for (const assigneeId of assigneeIds) {
      if (!memberIds.has(assigneeId)) {
        throw new BadRequestException(
          'Cannot assign an item to someone outside this meal',
        );
      }
    }

    const totalCents = toCents(Number(item.totalPrice));
    const shareCents = splitEvenlyCents(totalCents, assigneeIds.length);

    await this.prisma.$transaction(async (tx) => {
      await tx.itemShare.deleteMany({ where: { receiptItemId: itemId } });

      if (assigneeIds.length > 0) {
        await tx.itemShare.createMany({
          data: assigneeIds.map((assigneeId, index) => ({
            receiptItemId: itemId,
            userId: assigneeId,
            amount: fromCents(shareCents[index]),
          })),
        });
      }

      if (bill.status === BillStatus.DRAFT) {
        await tx.bill.update({
          where: { id: billId },
          data: { status: BillStatus.SPLITTING },
        });
      }
    });

    return this.billDetail.getDetail(userId, billId);
  }

  async calculateSummary(
    userId: string,
    billId: string,
    dto: CalculateSummaryDto,
  ) {
    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertCreator(bill, userId);
    this.assertReadyToCalculate(bill.status, bill.items.length);

    const unassignedItem = bill.items.find((item) => item.shares.length === 0);
    if (unassignedItem) {
      throw new BadRequestException(
        `"${unassignedItem.name}" has not been assigned to anyone yet`,
      );
    }

    const serviceCharge = dto.serviceCharge ?? 0;
    const tax = dto.tax ?? 0;
    const discount = dto.discount ?? 0;

    const subtotal = bill.items.reduce(
      (sum, item) => sum + Number(item.totalPrice),
      0,
    );
    const totalAmount = subtotal + serviceCharge + tax - discount;

    await this.prisma.bill.update({
      where: { id: billId },
      data: {
        subtotal,
        serviceCharge,
        tax,
        discount,
        totalAmount,
        status: BillStatus.SPLITTING,
      },
    });

    return this.billDetail.getDetail(userId, billId);
  }

  async confirmBill(userId: string, billId: string) {
    const bill = await this.billAccess.loadOrThrow(billId);
    this.billAccess.assertCreator(bill, userId);
    this.assertReadyToCalculate(bill.status, bill.items.length);

    if (bill.totalAmount == null) {
      throw new BadRequestException(
        'Calculate the bill summary before confirming',
      );
    }

    if (!bill.createdBy.paymentAccount) {
      throw new ForbiddenException(
        'Set up your payment account before confirming the bill',
      );
    }

    const extraChargesCents =
      toCents(Number(bill.serviceCharge ?? 0)) +
      toCents(Number(bill.tax ?? 0)) -
      toCents(Number(bill.discount ?? 0));

    const memberTotals = new Map<string, number>();
    for (const member of bill.session.members) {
      memberTotals.set(member.userId, 0);
    }

    for (const item of bill.items) {
      for (const share of item.shares) {
        memberTotals.set(
          share.userId,
          (memberTotals.get(share.userId) ?? 0) + toCents(Number(share.amount)),
        );
      }
    }

    const participantIds = Array.from(memberTotals.keys()).filter(
      (participantId) => (memberTotals.get(participantId) ?? 0) > 0,
    );
    const weights = participantIds.map((id) => memberTotals.get(id) ?? 0);
    const extraSharesCents = splitProportionallyCents(
      extraChargesCents,
      weights,
    );

    await this.prisma.$transaction(async (tx) => {
      await tx.userPayment.deleteMany({ where: { billId } });

      if (participantIds.length > 0) {
        await tx.userPayment.createMany({
          data: participantIds.map((participantId, index) => ({
            billId,
            userId: participantId,
            amount: fromCents(
              (memberTotals.get(participantId) ?? 0) + extraSharesCents[index],
            ),
            status: PaymentStatus.UNPAID,
          })),
        });
      }

      await tx.bill.update({
        where: { id: billId },
        data: { status: BillStatus.COMPLETED },
      });
    });

    return this.billDetail.getDetail(userId, billId);
  }

  private assertReadyToCalculate(status: BillStatus, itemCount: number) {
    if (status === BillStatus.COMPLETED || status === BillStatus.CANCELLED) {
      throw new ConflictException('This bill is already finalized');
    }

    if (itemCount === 0) {
      throw new BadRequestException(
        'Add at least one item before calculating the split',
      );
    }
  }
}
