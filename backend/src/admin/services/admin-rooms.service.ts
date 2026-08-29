import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '../../database/generated/prisma/client';
import { RoomStatus } from '../../database/generated/prisma/enums';
import { AdminRoomQueryDto } from '../dto/admin-room-query.dto';

export interface AdminRoomHost {
  id: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface AdminRoomItem {
  id: string;
  code: string;
  name: string;
  status: RoomStatus;
  createdAt: Date;
  host: AdminRoomHost;
  memberCount: number;
}

export interface AdminRoomsPaginatedResponse {
  items: AdminRoomItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminRoomMember {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  joinedAt: Date;
  isReady: boolean;
  isHost: boolean;
}

export interface AdminRoomDetailResponse {
  id: string;
  code: string;
  name: string;
  status: RoomStatus;
  createdAt: Date;
  host: AdminRoomHost;
  members: AdminRoomMember[];
}

const currentMemberWhere: Prisma.RoomMemberWhereInput = {
  leftAt: null,
};

@Injectable()
export class AdminRoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async getRooms(
    query: AdminRoomQueryDto,
  ): Promise<AdminRoomsPaginatedResponse> {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(50, Math.max(1, query.limit ?? 20));
    const skip = (page - 1) * limit;

    const where: Prisma.RoomWhereInput = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.search && query.search.trim().length > 0) {
      const searchTerm = query.search.trim();
      where.OR = [
        { roomCode: { contains: searchTerm, mode: 'insensitive' } },
        { name: { contains: searchTerm, mode: 'insensitive' } },
        {
          host: {
            displayName: { contains: searchTerm, mode: 'insensitive' },
          },
        },
      ];
    }

    const [rooms, total] = await Promise.all([
      this.prisma.room.findMany({
        where,
        select: {
          id: true,
          roomCode: true,
          name: true,
          status: true,
          createdAt: true,
          host: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          _count: {
            select: {
              members: {
                where: currentMemberWhere,
              },
            },
          },
        },
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.room.count({ where }),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      items: rooms.map((room) => ({
        id: room.id,
        code: room.roomCode,
        name: room.name,
        status: room.status,
        createdAt: room.createdAt,
        host: room.host,
        memberCount: room._count.members,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async getRoomById(roomId: string): Promise<AdminRoomDetailResponse> {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      select: {
        id: true,
        roomCode: true,
        name: true,
        status: true,
        createdAt: true,
        host: {
          select: {
            id: true,
            displayName: true,
            avatarUrl: true,
          },
        },
        members: {
          where: currentMemberWhere,
          orderBy: [{ joinedAt: 'asc' }, { id: 'asc' }],
          select: {
            id: true,
            userId: true,
            isReady: true,
            joinedAt: true,
            user: {
              select: {
                id: true,
                displayName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    if (!room) {
      throw new NotFoundException(`Room with id "${roomId}" was not found`);
    }

    return {
      id: room.id,
      code: room.roomCode,
      name: room.name,
      status: room.status,
      createdAt: room.createdAt,
      host: room.host,
      members: room.members.map((member) => ({
        id: member.id,
        displayName: member.user.displayName,
        avatarUrl: member.user.avatarUrl,
        joinedAt: member.joinedAt,
        isReady: member.isReady,
        isHost: member.userId === room.host.id,
      })),
    };
  }
}
