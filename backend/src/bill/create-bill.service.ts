import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  BillStatus,
  FoodFightStatus,
  RoomStatus,
  SessionMemberRole,
} from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { BillDetailService } from './bill-detail.service';
import { CreateBillDto } from './dto/create-bill.dto';

@Injectable()
export class CreateBillService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly billDetail: BillDetailService,
  ) {}

  async listAvailableRooms(userId: string) {
    const rooms = await this.prisma.room.findMany({
      where: {
        status: { in: [RoomStatus.LOBBY, RoomStatus.IN_PROGRESS] },
        OR: [
          { hostId: userId },
          { members: { some: { userId, leftAt: null } } },
        ],
      },
      select: {
        id: true,
        name: true,
        scheduledAt: true,
        hostId: true,
        host: { select: { displayName: true, avatarUrl: true } },
        members: {
          where: { leftAt: null },
          select: {
            userId: true,
            user: { select: { displayName: true, avatarUrl: true } },
          },
        },
        session: {
          select: {
            id: true,
            restaurantSelection: { select: { name: true } },
            bill: { select: { id: true, status: true } },
          },
        },
      },
      orderBy: { scheduledAt: 'desc' },
    });

    return rooms
      .filter(
        (room) =>
          room.session?.bill?.status !== BillStatus.COMPLETED &&
          room.session?.bill?.status !== BillStatus.CLOSED,
      )
      .map((room) => ({
        roomId: room.id,
        name: room.name,
        scheduledAt: room.scheduledAt,
        restaurantName: room.session?.restaurantSelection?.name ?? null,
        members: [
          {
            userId: room.hostId,
            displayName: room.host.displayName,
            avatarUrl: room.host.avatarUrl,
          },
          ...room.members.map((member) => ({
            userId: member.userId,
            displayName: member.user.displayName,
            avatarUrl: member.user.avatarUrl,
          })),
        ],
        billId: room.session?.bill?.id ?? null,
        billStatus: room.session?.bill?.status ?? null,
      }));
  }

  async createBill(userId: string, dto: CreateBillDto) {
    const room = await this.prisma.room.findUnique({
      where: { id: dto.roomId },
      include: { members: { where: { leftAt: null } } },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const isHost = room.hostId === userId;
    const isMember = room.members.some((member) => member.userId === userId);
    if (!isHost && !isMember) {
      throw new ForbiddenException('You are not a member of this room');
    }

    const billId = await this.prisma.$transaction(async (tx) => {
      let session = await tx.foodFightSession.findUnique({
        where: { roomId: room.id },
      });

      if (!session) {
        session = await tx.foodFightSession.create({
          data: { roomId: room.id, status: FoodFightStatus.BILLING },
        });

        const participantIds = [
          room.hostId,
          ...room.members.map((member) => member.userId),
        ];

        await tx.sessionMember.createMany({
          data: participantIds.map((participantId) => ({
            sessionId: session!.id,
            userId: participantId,
            role:
              participantId === room.hostId
                ? SessionMemberRole.HOST
                : SessionMemberRole.MEMBER,
          })),
          skipDuplicates: true,
        });
      } else if (
        session.status !== FoodFightStatus.BILLING &&
        session.status !== FoodFightStatus.COMPLETED
      ) {
        await tx.foodFightSession.update({
          where: { id: session.id },
          data: { status: FoodFightStatus.BILLING },
        });
      }

      const existingBill = await tx.bill.findUnique({
        where: { sessionId: session.id },
      });

      if (existingBill) {
        if (existingBill.status === BillStatus.CANCELLED) {
          const revived = await tx.bill.update({
            where: { id: existingBill.id },
            data: { status: BillStatus.DRAFT, createdById: userId },
          });
          return revived.id;
        }

        throw new ConflictException('A bill already exists for this meal');
      }

      const bill = await tx.bill.create({
        data: {
          sessionId: session.id,
          createdById: userId,
          status: BillStatus.DRAFT,
        },
      });

      return bill.id;
    });

    return this.billDetail.getDetail(userId, billId);
  }

  async getBySession(userId: string, sessionId: string) {
    const bill = await this.prisma.bill.findUnique({ where: { sessionId } });
    if (!bill) {
      throw new NotFoundException('No bill has been created for this meal yet');
    }

    return this.billDetail.getDetail(userId, bill.id);
  }
}
