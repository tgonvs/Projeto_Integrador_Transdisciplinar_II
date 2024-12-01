import { EventType } from './event-type.enum';

export interface HttpEventData {
  type: EventType.http;
  authorization?: object;
  params?: object;
  headers?: object;
  body?: object;
  query?: object;
}
