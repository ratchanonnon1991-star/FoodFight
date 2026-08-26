import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';

export const billInclude = {
  session: {
    include: {
      room: { select: { name: true, status: true } },
      restaurantSelection: { select: { name: true } },
      members: {
        select: {
          userId: true,
          role: true,
          user: { select: { displayName: true, avatarUrl: true } },
        },
      },
    },
  },
  createdBy: {
    select: {
      id: true,
      displayName: true,
      avatarUrl: true,
      paymentAccount: true,
    },
  },
  receipt: true,
  items: {
    orderBy: { createdAt: 'asc' },
    include: {
      shares: {
        include: {
          user: { select: { id: true, displayName: true, avatarUrl: true } },
        },
      },
    },
  },
  payments: {
    include: {
      user: { select: { id: true, displayName: true, avatarUrl: true } },
    },
  },
} satisfies Prisma.BillInclude;

export type BillWithRelations = Prisma.BillGetPayload<{
  include: typeof billInclude;
}>;

@Injectable()
export class BillAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async loadOrThrow(billId: string): Promise<BillWithRelations> {
    const bill = await this.prisma.bill.findUnique({
      where: { id: billId },
      include: billInclude,
    });

    if (!bill) {
      throw new NotFoundException('Bill not found');
    }

    return bill;
  }

  assertParticipant(bill: BillWithRelations, userId: string): void {
    const isParticipant = bill.session.members.some(
      (member) => member.userId === userId,
    );

    if (!isParticipant) {
      throw new ForbiddenException('You are not part of this bill');
    }
  }

  assertCreator(bill: BillWithRelations, userId: string): void {
    if (bill.createdById !== userId) {
      throw new ForbiddenException('Only the bill creator can do this');
    }
  }
}
