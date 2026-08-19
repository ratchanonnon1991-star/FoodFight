import { Injectable } from '@nestjs/common';
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
}
