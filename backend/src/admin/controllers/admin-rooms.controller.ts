import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Role } from '../../database/generated/prisma/enums';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdminRoomQueryDto } from '../dto/admin-room-query.dto';
import { AdminRoomsService } from '../services/admin-rooms.service';

@Controller('admin/rooms')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class AdminRoomsController {
  constructor(private readonly adminRoomsService: AdminRoomsService) {}

  @Get()
  getRooms(@Query() query: AdminRoomQueryDto) {
    return this.adminRoomsService.getRooms(query);
  }

  @Get(':roomId')
  getRoomById(@Param('roomId') roomId: string) {
    return this.adminRoomsService.getRoomById(roomId);
  }
}
