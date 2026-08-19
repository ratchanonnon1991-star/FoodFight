import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FoodProfileService } from './food-profile.service';
import { PrismaService } from '../database/prisma.service';

jest.mock('../database/prisma.service', () => {
  return {
    PrismaService: class MockPrismaService {
      foodProfile = {
        findUnique: jest.fn(),
        upsert: jest.fn(),
      };
    },
  };
});

describe('FoodProfileService', () => {
  let service: FoodProfileService;
  let prisma: PrismaService;

  const mockProfile = {
    id: 'fp-123',
    userId: 'user-456',
    allergies: ['dairy', 'nuts'],
    otherAllergies: 'sesame',
    restrictions: ['halal'],
    otherRestrictions: null,
    additionalNotes: 'mild spicy only',
    createdAt: new Date('2026-08-19T00:00:00.000Z'),
    updatedAt: new Date('2026-08-19T00:00:00.000Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodProfileService, PrismaService],
    }).compile();

    service = module.get<FoodProfileService>(FoodProfileService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('findByUserId', () => {
    it('should return the food profile when it exists', async () => {
      (prisma.foodProfile.findUnique as jest.Mock).mockResolvedValue(
        mockProfile,
      );

      const result = await service.findByUserId('user-456');

      expect(prisma.foodProfile.findUnique).toHaveBeenCalledWith({
        where: { userId: 'user-456' },
        select: expect.any(Object),
      });
      expect(result).toEqual(mockProfile);
    });

    it('should throw NotFoundException when food profile does not exist', async () => {
      (prisma.foodProfile.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findByUserId('non-existent-user')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('upsert', () => {
    it('should upsert food profile and normalize empty string fields to null', async () => {
      (prisma.foodProfile.upsert as jest.Mock).mockResolvedValue(mockProfile);

      const dto = {
        allergies: ['dairy', 'nuts'],
        otherAllergies: '  sesame  ',
        restrictions: ['halal'],
        otherRestrictions: '   ',
        additionalNotes: '',
      };

      await service.upsert('user-456', dto);

      expect(prisma.foodProfile.upsert).toHaveBeenCalledWith({
        where: { userId: 'user-456' },
        create: {
          userId: 'user-456',
          allergies: ['dairy', 'nuts'],
          otherAllergies: 'sesame',
          restrictions: ['halal'],
          otherRestrictions: null,
          additionalNotes: null,
        },
        update: {
          allergies: ['dairy', 'nuts'],
          otherAllergies: 'sesame',
          restrictions: ['halal'],
          otherRestrictions: null,
          additionalNotes: null,
        },
        select: expect.any(Object),
      });
    });

    it('should handle undefined optional fields properly', async () => {
      (prisma.foodProfile.upsert as jest.Mock).mockResolvedValue({
        ...mockProfile,
        otherAllergies: null,
        otherRestrictions: null,
        additionalNotes: null,
      });

      const dto = {
        allergies: [],
        restrictions: [],
      };

      await service.upsert('user-456', dto);

      expect(prisma.foodProfile.upsert).toHaveBeenCalledWith({
        where: { userId: 'user-456' },
        create: {
          userId: 'user-456',
          allergies: [],
          otherAllergies: null,
          restrictions: [],
          otherRestrictions: null,
          additionalNotes: null,
        },
        update: {
          allergies: [],
          otherAllergies: null,
          restrictions: [],
          otherRestrictions: null,
          additionalNotes: null,
        },
        select: expect.any(Object),
      });
    });
  });
});
