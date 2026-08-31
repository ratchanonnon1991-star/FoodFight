import { Test, TestingModule } from '@nestjs/testing';
import { RoomStatus } from '../../database/generated/prisma/enums';
import { PrismaService } from '../../database/prisma.service';
import { AdminDashboardService } from './admin-dashboard.service';

jest.mock('../../database/prisma.service', () => {
  return {
    PrismaService: class MockPrismaService {
      user = { count: jest.fn() };
      room = { count: jest.fn() };
    },
  };
});

describe('AdminDashboardService', () => {
  let service: AdminDashboardService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminDashboardService, PrismaService],
    }).compile();

    service = module.get<AdminDashboardService>(AdminDashboardService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return aggregated metrics from Prisma count queries', async () => {
    const fixedNow = new Date('2026-08-19T12:00:00.000Z');
    const expected7DaysAgo = new Date('2026-08-12T12:00:00.000Z');

    const userCountSpy = jest.spyOn(prisma.user, 'count')
      .mockResolvedValueOnce(120) // totalUsers
      .mockResolvedValueOnce(15); // newUsersLast7Days

    const roomCountSpy = jest.spyOn(prisma.room, 'count')
      .mockResolvedValueOnce(50) // totalRooms
      .mockResolvedValueOnce(8) // activeRooms (LOBBY + IN_PROGRESS)
      .mockResolvedValueOnce(35) // completedRooms
      .mockResolvedValueOnce(7); // cancelledRooms

    const result = await service.getDashboardMetrics(fixedNow);

    expect(result).toEqual({
      totalUsers: 120,
      newUsersLast7Days: 15,
      totalRooms: 50,
      activeRooms: 8,
      completedRooms: 35,
      cancelledRooms: 7,
    });

    expect(userCountSpy).toHaveBeenNthCalledWith(1);
    expect(userCountSpy).toHaveBeenNthCalledWith(2, {
      where: {
        createdAt: {
          gte: expected7DaysAgo,
        },
      },
    });

    expect(roomCountSpy).toHaveBeenNthCalledWith(1);
    expect(roomCountSpy).toHaveBeenNthCalledWith(2, {
      where: {
        status: {
          in: [RoomStatus.LOBBY, RoomStatus.IN_PROGRESS],
        },
      },
    });
    expect(roomCountSpy).toHaveBeenNthCalledWith(3, {
      where: {
        status: RoomStatus.COMPLETED,
      },
    });
    expect(roomCountSpy).toHaveBeenNthCalledWith(4, {
      where: {
        status: RoomStatus.CANCELLED,
      },
    });
  });
});
