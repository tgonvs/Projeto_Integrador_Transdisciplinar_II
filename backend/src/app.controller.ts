import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AppControllers } from './modules/shared/enums/app-controllers';
import { AppEnvironment } from './modules/shared/enums/app-environment';
import { SwaggerTags } from './modules/shared/enums/swagger-tags';

export type ServerInfo = {
  name: string;
  version: string;
  env: string;
};
@ApiTags(SwaggerTags.app)
@Controller(AppControllers.app)
export class AppController {
  constructor(
    @Inject(AppEnvironment.serviceName) private readonly serviceName: string,
    @Inject(AppEnvironment.serviceVersion)
    private readonly serviceVersion: string,
    @Inject(AppEnvironment.nodeEnv) private readonly nodeEnv: string,
  ) {}

  @ApiOperation({ summary: 'Check if application is healthy' })
  @Get('/health-check')
  async healthCheck(): Promise<ServerInfo> {
    return {
      name: this.serviceName,
      version: this.serviceVersion,
      env: this.nodeEnv,
    };
  }
}
