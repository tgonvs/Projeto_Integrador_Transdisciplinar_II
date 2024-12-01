import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppEnvironment } from './modules/shared/enums/app-environment';

describe('AppController', () => {
  let sut: AppController;

  beforeEach(async () => {
    const ServiceNameProvider = {
      provide: AppEnvironment.serviceName,
      useValue: process.env[AppEnvironment.serviceName],
    };
    const ServiceVersionProvider = {
      provide: AppEnvironment.serviceVersion,
      useValue: process.env[AppEnvironment.serviceVersion],
    };
    const NodeEnvProvider = {
      provide: AppEnvironment.nodeEnv,
      useValue: process.env[AppEnvironment.nodeEnv],
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ServiceNameProvider, ServiceVersionProvider, NodeEnvProvider],
    }).compile();

    sut = app.get(AppController);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('healthCheck', () => {
    it('should return infos', async () => {
      const infos = await sut.healthCheck();
      expect(infos).toHaveProperty('name');
      expect(infos).toHaveProperty('version');
      expect(infos).toHaveProperty('env');
    });
  });
});
