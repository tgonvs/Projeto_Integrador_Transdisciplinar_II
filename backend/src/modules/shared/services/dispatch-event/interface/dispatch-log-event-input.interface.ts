import { EventData } from 'src/modules/shared/services/dispatch-event/interface/event-data.type';

export interface DispatchLogEventInput {
  extraData: string;
  resource: string;
  data: EventData;
  response?: unknown;
  message: string;
}
