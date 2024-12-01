import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { AppEnvironment } from '../enums/app-environment';

@Injectable()
export class PrismaGateway extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject(AppEnvironment.dbHost) dbHost: string,
    @Inject(AppEnvironment.dbUser) dbUser: string,
    @Inject(AppEnvironment.dbPass) dbPass: string,
    @Inject(AppEnvironment.dbName) dbName: string,
    @Inject(AppEnvironment.dbLogging) dbLogging: string,
  ) {
    super({
      datasourceUrl: `postgresql://${dbUser}:${dbPass}@${dbHost}:5432/${dbName}?schema=public`,
      log: dbLogging === 'true' ? ['query', 'info', 'warn', 'error'] : [],
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
