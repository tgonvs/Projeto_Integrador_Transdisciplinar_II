import { FactoryProvider } from '@nestjs/common';

import { AppEnvironment } from '../enums/app-environment';
import { SecretService } from '../services/secret/secret.service';

export const SecretsProviders: FactoryProvider[] = Object.values(
  AppEnvironment,
).map((key: AppEnvironment): FactoryProvider => {
  return {
    inject: [SecretService],
    provide: key,
    useFactory: async (secretService: SecretService): Promise<string> => {
      return secretService.fetchEnvSecret(key);
    },
  };
});
