import { Injectable, MessageEvent } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

export interface RoomRealtimeEvent {
  type: 'room-updated';
  roomId: string;
}

@Injectable()
export class RoomRealtimeService {
  private readonly streams = new Map<string, Subject<MessageEvent>>();

  subscribe(roomId: string): Observable<MessageEvent> {
    const stream = this.getStream(roomId);

    return new Observable<MessageEvent>((subscriber) => {
      const subscription = stream.subscribe(subscriber);

      return () => subscription.unsubscribe();
    });
  }

  publish(roomId: string) {
    const event: RoomRealtimeEvent = {
      type: 'room-updated',
      roomId,
    };

    this.getStream(roomId).next({ data: event });
  }

  private getStream(roomId: string) {
    const existingStream = this.streams.get(roomId);

    if (existingStream) {
      return existingStream;
    }

    const stream = new Subject<MessageEvent>();
    this.streams.set(roomId, stream);
    return stream;
  }
}
