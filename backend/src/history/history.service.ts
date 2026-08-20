import { Injectable } from '@nestjs/common';
import {
  FoodFightStatus,
  RoomStatus,
} from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string) {
    const sessions = await this.prisma.foodFightSession.findMany({
      where: {
        members: {
          some: { userId },
        },
        OR: [
          {
            status: {
              in: [FoodFightStatus.COMPLETED, FoodFightStatus.CANCELLED],
            },
          },
          { completedAt: { not: null } },
          {
            room: {
              status: {
                in: [RoomStatus.COMPLETED, RoomStatus.CANCELLED],
              },
            },
          },
        ],
      },
      orderBy: [{ completedAt: 'desc' }, { updatedAt: 'desc' }],
      take: 50,
      select: {
        id: true,
        status: true,
        startedAt: true,
        finalizedAt: true,
        completedAt: true,
        updatedAt: true,
        room: {
          select: {
            id: true,
            name: true,
            locationName: true,
            scheduledAt: true,
            status: true,
          },
        },
        members: {
          where: { userId },
          select: { role: true },
        },
        _count: {
          select: { members: true },
        },
        finalSelection: {
          select: {
            recommendationItem: {
              select: {
                menuName: true,
                imageUrl: true,
              },
            },
          },
        },
        restaurantSelection: {
          select: {
            name: true,
            address: true,
            imageUrl: true,
          },
        },
      },
    });

    return sessions.map((session) => {
      const isCancelled =
        session.status === FoodFightStatus.CANCELLED ||
        session.room.status === RoomStatus.CANCELLED;

      return {
        id: session.id,
        status: isCancelled ? 'CANCELLED' : 'COMPLETED',
        role: session.members[0]?.role ?? 'MEMBER',
        memberCount: session._count.members,
        startedAt: session.startedAt.toISOString(),
        completedAt: (
          session.completedAt ??
          session.finalizedAt ??
          session.updatedAt
        ).toISOString(),
        room: {
          id: session.room.id,
          name: session.room.name,
          locationName: session.room.locationName,
          scheduledAt: session.room.scheduledAt.toISOString(),
        },
        finalMenu: session.finalSelection
          ? {
              name: session.finalSelection.recommendationItem.menuName,
              imageUrl: session.finalSelection.recommendationItem.imageUrl,
            }
          : null,
        restaurant: session.restaurantSelection
          ? {
              name: session.restaurantSelection.name,
              address: session.restaurantSelection.address,
              imageUrl: session.restaurantSelection.imageUrl,
            }
          : null,
      };
    });
  }
}
