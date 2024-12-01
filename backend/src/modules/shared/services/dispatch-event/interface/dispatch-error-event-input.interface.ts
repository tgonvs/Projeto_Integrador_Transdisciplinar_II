import { EventData } from 'src/modules/shared/services/dispatch-event/interface/event-data.type';

export interface DispatchErrorEventInput {
  extraData: string;
  resource: string;
  data: EventData;
}
