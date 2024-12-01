import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaGateway } from './gateways/prisma.gateway';
import { SecretsProviders } from './providers/secrets.provider';
import { DispatchEventService } from './services/dispatch-event/dispatch-event.service';
import { SecretService } from './services/secret/secret.service';

const SharedProviders = [
  ...SecretsProviders,
  PrismaGateway,
  DispatchEventService,
];

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...SharedProviders, SecretService],
  exports: [...SharedProviders],
})
export class SharedModule {}
