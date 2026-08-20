import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Sse,
} from '@nestjs/common';
import { concat, from, Observable, of, switchMap } from 'rxjs';
import type { MessageEvent } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { CreateRoomService } from './create-room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomService } from './join-room.service';
import { LocationSearchService } from './location-search.service';
import { RoomPreviewService } from './room-preview.service';
import { RoomRealtimeService } from './room-realtime.service';
import { SetReadyDto } from './dto/set-ready.dto';
import { TransferHostDto } from './dto/transfer-host.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly createRoomService: CreateRoomService,
    private readonly joinRoomService: JoinRoomService,
    private readonly locationSearchService: LocationSearchService,
    private readonly roomPreviewService: RoomPreviewService,
    private readonly roomRealtimeService: RoomRealtimeService,
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

  @Public()
  @Get('location-search')
  searchLocations(
    @Query('q') query = '',
    @Query('lat') latitude = '',
    @Query('lon') longitude = '',
  ) {
    return this.locationSearchService.search(
      query,
      parseOptionalCoordinate(latitude),
      parseOptionalCoordinate(longitude),
    );
  }

  @Public()
  @Get('location-reverse')
  reverseLocation(@Query('lat') latitude = '', @Query('lon') longitude = '') {
    return this.locationSearchService.reverse(
      Number(latitude || Number.NaN),
      Number(longitude || Number.NaN),
    );
  }

  @Get('current')
  getCurrentRoom(@CurrentUser() currentUser: AccessTokenPayload) {
    return this.joinRoomService.getCurrentRoom(currentUser.sub);
  }

  @Patch(':roomId')
  updateRoom(
    @Param('roomId') roomId: string,
    @Body() dto: UpdateRoomDto,
    @CurrentUser() currentUser: AccessTokenPayload,
  ) {
    return this.joinRoomService.updateRoom(roomId, currentUser.sub, dto);
  }

  @Delete(':roomId')
  closeRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() currentUser: AccessTokenPayload,
  ) {
    return this.joinRoomService.closeRoom(roomId, currentUser.sub);
  }

  @Sse(':roomId/events')
  roomEvents(
    @Param('roomId') roomId: string,
    @CurrentUser() currentUser: AccessTokenPayload,
  ): Observable<MessageEvent> {
    return from(this.joinRoomService.getRoom(roomId, currentUser.sub)).pipe(
      switchMap(() =>
        concat(
          of<MessageEvent>({ data: { type: 'room-updated', roomId } }),
          this.roomRealtimeService.subscribe(roomId),
        ),
      ),
    );
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

  @Patch(':roomId/ready')
  setReady(
    @Param('roomId') roomId: string,
    @Body() dto: SetReadyDto,
    @CurrentUser() currentUser: AccessTokenPayload,
  ) {
    return this.joinRoomService.setReady(roomId, currentUser.sub, dto.isReady);
  }

  @Post(':roomId/start')
  startRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() currentUser: AccessTokenPayload,
  ) {
    return this.joinRoomService.startRoom(roomId, currentUser.sub);
  }

  @Delete(':roomId/leave')
  leaveRoom(
    @Param('roomId') roomId: string,
    @CurrentUser() currentUser: AccessTokenPayload,
  ) {
    return this.joinRoomService.leaveRoom(roomId, currentUser.sub);
  }

  @Post(':roomId/transfer-host')
  transferHost(
    @Param('roomId') roomId: string,
    @Body() dto: TransferHostDto,
    @CurrentUser() currentUser: AccessTokenPayload,
  ) {
    return this.joinRoomService.transferHost(
      roomId,
      currentUser.sub,
      dto.memberId,
    );
  }

  @Delete(':roomId/members/:memberId')
  kickMember(
    @Param('roomId') roomId: string,
    @Param('memberId') memberId: string,
    @CurrentUser() currentUser: AccessTokenPayload,
  ) {
    return this.joinRoomService.kickMember(roomId, currentUser.sub, memberId);
  }
}

function parseOptionalCoordinate(value: string) {
  return value.trim() ? Number(value) : undefined;
}
