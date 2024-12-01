import { HttpException, Injectable, Logger } from '@nestjs/common';

import { DispatchErrorEventInput } from './interface/dispatch-error-event-input.interface';
import { DispatchEventInput } from './interface/dispatch-event-input.interface';
import { DispatchLogEventInput } from './interface/dispatch-log-event-input.interface';

@Injectable()
export class DispatchEventService {
  private readonly loggerService = new Logger(DispatchEventService.name);

  private dispatch(input: DispatchEventInput): void {
    const event = {
      ...input,
      ...(input.response && { response: input.response }),
    };
    this.loggerService.log(event);
  }

  log(input: DispatchLogEventInput): void {
    this.dispatch({ ...input, level: 'LOG' });
  }

  error(input: DispatchErrorEventInput, err: HttpException | Error): void {
    this.dispatch({
      ...input,
      level: 'ERROR',
      message: err.message,
      response:
        err instanceof HttpException ? err.getResponse() : 'server error',
    });
  }
}
