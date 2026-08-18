import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { CreateRoomService } from './create-room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomService } from './join-room.service';
import { RoomPreviewService } from './room-preview.service';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly createRoomService: CreateRoomService,
    private readonly joinRoomService: JoinRoomService,
    private readonly roomPreviewService: RoomPreviewService,
  ) {}

  @Post()
  createRoom(
    @CurrentUser() currentUser: AccessTokenPayload,
    @Body() dto: CreateRoomDto,
  ) {
    return this.createRoomService.createRoom(currentUser.sub, dto);
  }

  @Public()
  @Get('code/:roomCode')
  findRoomByCode(@Param('roomCode') roomCode: string) {
    return this.roomPreviewService.findRoomByCode(roomCode);
  }

  @Public()
  @Get('invite/:inviteToken')
  findRoomByInviteToken(@Param('inviteToken') inviteToken: string) {
    return this.roomPreviewService.findRoomByInviteToken(inviteToken);
  }

  @Get(':roomId')
  getRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() currentUser: AccessTokenPayload,
  ) {
    return this.joinRoomService.getRoom(roomId, currentUser.sub);
  }

  @Post(':roomId/join')
  joinRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() currentUser: AccessTokenPayload,
  ) {
    return this.joinRoomService.joinRoom(roomId, currentUser.sub);
  }
}
