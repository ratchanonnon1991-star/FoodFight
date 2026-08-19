import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpsertFoodProfileDto } from './dto/upsert-food-profile.dto';

@Injectable()
export class FoodProfileService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly foodProfileSelect = {
    id: true,
    userId: true,
    allergies: true,
    otherAllergies: true,
    restrictions: true,
    otherRestrictions: true,
    additionalNotes: true,
    createdAt: true,
    updatedAt: true,
  } as const;

  async findByUserId(userId: string) {
    const profile = await this.prisma.foodProfile.findUnique({
      where: { userId },
      select: this.foodProfileSelect,
    });

    if (!profile) {
      throw new NotFoundException('Food profile not found');
    }

    return profile;
  }

  async upsert(userId: string, dto: UpsertFoodProfileDto) {
    const otherAllergies = this.normalizeOptionalString(dto.otherAllergies);
    const otherRestrictions = this.normalizeOptionalString(dto.otherRestrictions);
    const additionalNotes = this.normalizeOptionalString(dto.additionalNotes);

    return this.prisma.foodProfile.upsert({
      where: { userId },
      create: {
        userId,
        allergies: dto.allergies,
        otherAllergies,
        restrictions: dto.restrictions,
        otherRestrictions,
        additionalNotes,
      },
      update: {
        allergies: dto.allergies,
        otherAllergies,
        restrictions: dto.restrictions,
        otherRestrictions,
        additionalNotes,
      },
      select: this.foodProfileSelect,
    });
  }

  private normalizeOptionalString(value?: string | null): string | null {
    if (value === undefined || value === null) {
      return null;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
}
