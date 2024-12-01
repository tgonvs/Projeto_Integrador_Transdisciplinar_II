import { Test, TestingModule } from '@nestjs/testing';

import { AppEnvironment } from '../../enums/app-environment';
import { SecretService } from './secret.service';

describe('SecretService', () => {
  let sut: SecretService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SecretService],
    }).compile();

    sut = await app.get(SecretService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('fetchEnvSecret', () => {
    it('should fetch a process.env value', async () => {
      const serviceName = await sut.fetchEnvSecret(AppEnvironment.serviceName);
      expect(serviceName).toBeDefined();
    });
    it('should fetch a default value from configs', async () => {
      const dbLogging = await sut.fetchEnvSecret(AppEnvironment.dbLogging);
      expect(dbLogging).toBeDefined();
      const nodeEnv = await sut.fetchEnvSecret(AppEnvironment.nodeEnv);
      expect(nodeEnv).toBeDefined();
    });
  });
});
