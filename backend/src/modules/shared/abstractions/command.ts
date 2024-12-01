import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';
import { EventData } from 'src/modules/shared/services/dispatch-event/interface/event-data.type';

export interface CommandInput<Input = unknown> {
  input?: Input;
  eventData: EventData;
}

export abstract class Command<Input = unknown, Response = unknown> {
  constructor(private readonly eventService: DispatchEventService) {}

  abstract execute(input: CommandInput<Input>): Promise<Response>;
}
