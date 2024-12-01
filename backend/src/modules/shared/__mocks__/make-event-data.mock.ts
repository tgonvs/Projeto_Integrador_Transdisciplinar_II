import { EventType } from '../services/dispatch-event/interface/event-type.enum';
import { HttpEventData } from '../services/dispatch-event/interface/http-event-data.interface';
import { makeRequestHeadersMock } from './make-request-headers.mock';

export function makeEventDataMock(
  input?: Partial<HttpEventData>,
): HttpEventData {
  return {
    type: EventType.http,
    headers: makeRequestHeadersMock(),
    ...input,
  };
}
