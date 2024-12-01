import { HttpEventData } from './http-event-data.interface';
import { MessageEventData } from './message-event-data.interface';

export type EventData = HttpEventData | MessageEventData;
