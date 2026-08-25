import { Module } from '@nestjs/common';
import { FoodFightModule } from '../food-fight/food-fight.module';
import { CreateRoomService } from './create-room.service';
import { JoinRoomService } from './join-room.service';
import { LocationSearchService } from './location-search.service';
import { RoomController } from './room.controller';
import { RoomPreviewService } from './room-preview.service';
import { RoomRealtimeService } from './room-realtime.service';

@Module({
  imports: [FoodFightModule],
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
