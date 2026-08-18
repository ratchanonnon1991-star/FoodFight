import { Module } from '@nestjs/common';
import { CreateRoomService } from './create-room.service';
import { JoinRoomService } from './join-room.service';
import { RoomController } from './room.controller';
import { RoomPreviewService } from './room-preview.service';

@Module({
  controllers: [RoomController],
  providers: [CreateRoomService, JoinRoomService, RoomPreviewService],
  exports: [RoomModule],
})
export class RoomModule {}
