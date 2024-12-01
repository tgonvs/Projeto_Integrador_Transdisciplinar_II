import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { faker } from '@faker-js/faker';

import { LoggerServiceMock } from '../../__mocks__/logger-service.provider';
import { makeEventDataMock } from '../../__mocks__/make-event-data.mock';
import { DispatchEventService } from './dispatch-event.service';

describe('DispatchEventService', () => {
  let sut: DispatchEventService;

  const input = {
    data: makeEventDataMock(),
    resource: faker.string.sample(16),
    extraData: faker.string.sample(16),
    message: faker.string.sample(16),
  };

  const EventsRepositoryMock = {
    insert: jest.fn().mockResolvedValue(null),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const app: TestingModule = await Test.createTestingModule({
      providers: [DispatchEventService],
    }).compile();

    sut = app.get(DispatchEventService);
    Object.assign(sut, { loggerService: LoggerServiceMock });
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('log', () => {
    it('should call dispatch with LOG values', async () => {
      sut.log(input);
      expect(LoggerServiceMock.log).toBeCalledTimes(1);
      expect(LoggerServiceMock.log).toHaveBeenCalledWith({
        ...input,
        level: 'LOG',
      });
    });
    it('should not rise exception when events repository throw an error', async () => {
      EventsRepositoryMock.insert.mockRejectedValueOnce(new Error());
      sut.log(input);
      expect(LoggerServiceMock.log).toBeCalledTimes(1);
      expect(LoggerServiceMock.log).toHaveBeenCalledWith({
        ...input,
        level: 'LOG',
      });
    });
  });
  describe('error', () => {
    it('should call dispatch with http ERROR values', async () => {
      const error = new NotFoundException();
      sut.error(input, error);
      expect(LoggerServiceMock.log).toBeCalledTimes(1);
      expect(LoggerServiceMock.log).toHaveBeenCalledWith({
        ...input,
        level: 'ERROR',
        response: error.getResponse(),
        message: error.message,
      });
    });
    it('should call dispatch with ERROR values', async () => {
      const error = new Error();
      sut.error(input, error);
      expect(LoggerServiceMock.log).toBeCalledTimes(1);
      expect(LoggerServiceMock.log).toHaveBeenCalledWith({
        ...input,
        level: 'ERROR',
        response: 'server error',
        message: error.message,
      });
    });
  });
});
