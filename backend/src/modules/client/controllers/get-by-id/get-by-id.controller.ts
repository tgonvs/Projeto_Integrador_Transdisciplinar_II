import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DefaultHeaders } from 'src/modules/shared/decorator/default-headers.decorator';
import { AppControllers } from 'src/modules/shared/enums/app-controllers';
import { SwaggerTags } from 'src/modules/shared/enums/swagger-tags';
import { EventType } from 'src/modules/shared/services/dispatch-event/interface/event-type.enum';

import { ClientIdDTO } from '../dtos/client-id.dto';
import { ClientResponseDTO } from '../dtos/client-response.dto';
import { GetClientByIdCommand } from './get-by-id.command';

@ApiTags(SwaggerTags.client)
@Controller(AppControllers.client)
export class GetClientByIdController {
  constructor(private readonly command: GetClientByIdCommand) {}

  @ApiOperation({ summary: 'Get client by id' })
  @Get(':clientId')
  handle(
    @Param() params: ClientIdDTO,
    @DefaultHeaders() headers,
  ): Promise<ClientResponseDTO> {
    return this.command.execute({
      input: params,
      eventData: { type: EventType.http, params, headers },
    });
  }
}
