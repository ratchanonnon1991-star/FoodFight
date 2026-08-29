import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { Role } from '../../database/generated/prisma/enums';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { AdminDashboardController } from './admin-dashboard.controller';
import { AdminDashboardService, AdminDashboardMetrics } from '../services/admin-dashboard.service';

jest.mock('../../database/prisma.service', () => {
  return {
    PrismaService: class MockPrismaService {},
  };
});

describe('AdminDashboardController', () => {
  let controller: AdminDashboardController;
  let service: AdminDashboardService;
  let reflector: Reflector;

  const mockMetrics: AdminDashboardMetrics = {
    totalUsers: 100,
    newUsersLast7Days: 10,
    totalRooms: 40,
    activeRooms: 5,
    completedRooms: 30,
    cancelledRooms: 5,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminDashboardController],
      providers: [
        {
          provide: AdminDashboardService,
          useValue: {
            getDashboardMetrics: jest.fn().mockResolvedValue(mockMetrics),
          },
        },
      ],
    }).compile();

    controller = module.get<AdminDashboardController>(AdminDashboardController);
    service = module.get<AdminDashboardService>(AdminDashboardService);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should return metrics from service on getDashboard()', async () => {
    const result = await controller.getDashboard();

    expect(service.getDashboardMetrics).toHaveBeenCalled();
    expect(result).toEqual(mockMetrics);
  });

  it('should have @Roles(Role.ADMIN) metadata at controller class level', () => {
    const roles = reflector.get<Role[]>(ROLES_KEY, AdminDashboardController);

    expect(roles).toEqual([Role.ADMIN]);
  });
});
