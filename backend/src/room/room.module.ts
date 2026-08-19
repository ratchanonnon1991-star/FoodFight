import { Module } from '@nestjs/common';
import { CreateRoomService } from './create-room.service';
import { JoinRoomService } from './join-room.service';
import { LocationSearchService } from './location-search.service';
import { RoomController } from './room.controller';
import { RoomPreviewService } from './room-preview.service';
import { RoomRealtimeService } from './room-realtime.service';

@Module({
  controllers: [RoomController],
  providers: [
    CreateRoomService,
    JoinRoomService,
    LocationSearchService,
    RoomPreviewService,
    RoomRealtimeService,
  ],
  exports: [RoomModule],
})
export class RoomModule {}
