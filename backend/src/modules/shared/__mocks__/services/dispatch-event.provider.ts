import { DispatchEventService } from '../../services/dispatch-event/dispatch-event.service';

export const DispatchEventServiceMock = {
  log: jest.fn(),
  error: jest.fn(),
};

export const DispatchEventServiceProvider = {
  provide: DispatchEventService,
  useValue: DispatchEventServiceMock,
};
