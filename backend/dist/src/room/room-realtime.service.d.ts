import { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface RoomRealtimeEvent {
    type: 'room-updated';
    roomId: string;
}
export declare class RoomRealtimeService {
    private readonly streams;
    subscribe(roomId: string): Observable<MessageEvent>;
    publish(roomId: string): void;
    private getStream;
}
