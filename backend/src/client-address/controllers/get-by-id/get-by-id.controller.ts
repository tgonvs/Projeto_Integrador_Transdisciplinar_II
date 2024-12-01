import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DefaultHeaders } from 'src/modules/shared/decorator/default-headers.decorator';
import { AppControllers } from 'src/modules/shared/enums/app-controllers';
import { SwaggerTags } from 'src/modules/shared/enums/swagger-tags';
import { EventType } from 'src/modules/shared/services/dispatch-event/interface/event-type.enum';

import { ClientAddressIdDTO } from '../dtos/client-address-id.dto';
import { ClientAddressResponseDTO } from '../dtos/client-address-response.dto';
import { GetClientAddressByIdCommand } from './get-by-id.command';

@ApiTags(SwaggerTags.clientAddress)
@Controller(AppControllers.clientAddress)
export class GetClientAddressByIdController {
  constructor(private readonly command: GetClientAddressByIdCommand) {}

  @ApiOperation({ summary: 'Get client address by id' })
  @Get(':clientAddressId')
  handle(
    @Param() params: ClientAddressIdDTO,
    @DefaultHeaders() headers,
  ): Promise<ClientAddressResponseDTO> {
    return this.command.execute({
      input: params,
      eventData: { type: EventType.http, params, headers },
    });
  }
}
