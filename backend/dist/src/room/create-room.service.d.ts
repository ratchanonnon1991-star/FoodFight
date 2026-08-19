import { ConfigService } from '@nestjs/config';
import { RoomStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
export declare class CreateRoomService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    createRoom(userId: string, dto: CreateRoomDto): Promise<{
        id: string;
        name: string;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        memberCount: number;
        maxMembers: number;
        locationName: string;
        latitude: number | null;
        longitude: number | null;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: RoomStatus;
        roomCode: string;
        inviteToken: string;
        inviteLink: string;
    }>;
    private readonly roomSelect;
    private toRoomCreatedResponse;
    private generateRoomCode;
    private generateInviteToken;
    private buildInviteLink;
    private isPrismaError;
}
