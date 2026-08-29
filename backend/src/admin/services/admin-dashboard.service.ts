import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RoomStatus } from '../../database/generated/prisma/enums';

export interface AdminDashboardMetrics {
  totalUsers: number;
  newUsersLast7Days: number;
  totalRooms: number;
  activeRooms: number;
  completedRooms: number;
  cancelledRooms: number;
}

@Injectable()
export class AdminDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardMetrics(now: Date = new Date()): Promise<AdminDashboardMetrics> {
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      newUsersLast7Days,
      totalRooms,
      activeRooms,
      completedRooms,
      cancelledRooms,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      }),
      this.prisma.room.count(),
      this.prisma.room.count({
        where: {
          status: {
            in: [RoomStatus.LOBBY, RoomStatus.IN_PROGRESS],
          },
        },
      }),
      this.prisma.room.count({
        where: {
          status: RoomStatus.COMPLETED,
        },
      }),
      this.prisma.room.count({
        where: {
          status: RoomStatus.CANCELLED,
        },
      }),
    ]);

    return {
      totalUsers,
      newUsersLast7Days,
      totalRooms,
      activeRooms,
      completedRooms,
      cancelledRooms,
    };
  }
}
