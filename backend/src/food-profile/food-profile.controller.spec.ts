import { Test, TestingModule } from '@nestjs/testing';
import { FoodProfileController } from './food-profile.controller';
import { FoodProfileService } from './food-profile.service';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { Role } from '../database/generated/prisma/enums';

jest.mock('../database/prisma.service', () => {
  return {
    PrismaService: class MockPrismaService {},
  };
});

describe('FoodProfileController', () => {
  let controller: FoodProfileController;
  let service: FoodProfileService;

  const mockUser: AccessTokenPayload = {
    sub: 'user-123',
    email: 'test@example.com',
    role: Role.USER,
  };

  const mockProfile = {
    id: 'fp-1',
    userId: 'user-123',
    allergies: ['dairy'],
    otherAllergies: null,
    restrictions: ['vegetarian'],
    otherRestrictions: null,
    additionalNotes: 'no onion',
    createdAt: new Date('2026-08-19T00:00:00.000Z'),
    updatedAt: new Date('2026-08-19T00:00:00.000Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodProfileController],
      providers: [
        {
          provide: FoodProfileService,
          useValue: {
            findByUserId: jest.fn().mockResolvedValue(mockProfile),
            upsert: jest.fn().mockResolvedValue(mockProfile),
          },
        },
      ],
    }).compile();

    controller = module.get<FoodProfileController>(FoodProfileController);
    service = module.get<FoodProfileService>(FoodProfileService);
  });

  describe('getMe', () => {
    it('should call foodProfileService.findByUserId with authenticated user id', async () => {
      const result = await controller.getMe(mockUser);

      expect(service.findByUserId).toHaveBeenCalledWith('user-123');
      expect(result).toEqual(mockProfile);
    });
  });

  describe('upsertMe', () => {
    it('should call foodProfileService.upsert with authenticated user id and dto', async () => {
      const dto = {
        allergies: ['dairy'],
        restrictions: ['vegetarian'],
        additionalNotes: 'no onion',
      };

      const result = await controller.upsertMe(mockUser, dto);

      expect(service.upsert).toHaveBeenCalledWith('user-123', dto);
      expect(result).toEqual(mockProfile);
    });
  });
});
