import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Role } from '../../database/generated/prisma/enums';
import { AdminUserQueryDto } from '../dto/admin-user-query.dto';
import { Prisma } from '../../database/generated/prisma/client';

export interface AdminUserItem {
  id: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  role: Role;
  avatarUrl: string | null;
  createdAt: Date;
}

export interface AdminUsersPaginatedResponse {
  items: AdminUserItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminUserFoodProfile {
  allergies: string[];
  otherAllergies: string | null;
  restrictions: string[];
  otherRestrictions: string | null;
  additionalNotes: string | null;
}

export interface AdminUserActivity {
  hostedRoomsCount: number;
  joinedRoomsCount: number;
}

export interface AdminUserDetailResponse {
  id: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  role: Role;
  avatarUrl: string | null;
  createdAt: Date;
  providers: string[];
  foodProfile: AdminUserFoodProfile | null;
  activity: AdminUserActivity;
}

@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(query: AdminUserQueryDto): Promise<AdminUsersPaginatedResponse> {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, Math.max(1, query.limit ?? 20));
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};

    if (query.role) {
      where.role = query.role;
    }

    if (query.search && query.search.trim().length > 0) {
      const searchTerm = query.search.trim();
      where.OR = [
        { displayName: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          displayName: true,
          email: true,
          emailVerified: true,
          role: true,
          avatarUrl: true,
          createdAt: true,
        },
        orderBy: [
          { createdAt: 'desc' },
          { id: 'desc' },
        ],
        skip,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async getUserById(userId: string): Promise<AdminUserDetailResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        displayName: true,
        email: true,
        emailVerified: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        foodProfile: {
          select: {
            allergies: true,
            otherAllergies: true,
            restrictions: true,
            otherRestrictions: true,
            additionalNotes: true,
          },
        },
        accounts: {
          select: {
            provider: true,
          },
        },
        _count: {
          select: {
            hostedRooms: true,
            roomMembers: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id "${userId}" was not found`);
    }

    return {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      providers: user.accounts.map((acc) => acc.provider),
      foodProfile: user.foodProfile
        ? {
            allergies: user.foodProfile.allergies,
            otherAllergies: user.foodProfile.otherAllergies,
            restrictions: user.foodProfile.restrictions,
            otherRestrictions: user.foodProfile.otherRestrictions,
            additionalNotes: user.foodProfile.additionalNotes,
          }
        : null,
      activity: {
        hostedRoomsCount: user._count.hostedRooms,
        joinedRoomsCount: user._count.roomMembers,
      },
    };
  }
}
