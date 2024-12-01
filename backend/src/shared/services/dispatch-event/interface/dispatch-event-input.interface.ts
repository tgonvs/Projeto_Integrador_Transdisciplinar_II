import { EventData } from 'src/modules/shared/services/dispatch-event/interface/event-data.type';

export interface DispatchEventInput {
  resource: string;
  data: EventData;
  message: string;
  response?: unknown;
  extraData: string;
  level: 'LOG' | 'ERROR';
}
