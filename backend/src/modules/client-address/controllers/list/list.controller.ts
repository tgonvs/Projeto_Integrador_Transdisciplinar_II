import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DefaultHeaders } from 'src/modules/shared/decorator/default-headers.decorator';
import { AppControllers } from 'src/modules/shared/enums/app-controllers';
import { SwaggerTags } from 'src/modules/shared/enums/swagger-tags';
import { EventType } from 'src/modules/shared/services/dispatch-event/interface/event-type.enum';

import { ListClientAddressDTO } from '../dtos/list-client-address.dto';
import { ListClientAddressResponseDTO } from '../dtos/list-client-response.dto';
import { ListClientAddressCommand } from './list.command';

@ApiTags(SwaggerTags.clientAddress)
@Controller(AppControllers.clientAddress)
export class ListClientAddressController {
  constructor(private readonly command: ListClientAddressCommand) {}

  @ApiOperation({ summary: 'List client address' })
  @Get('')
  handle(
    @Query() query: ListClientAddressDTO,
    @DefaultHeaders() headers,
  ): Promise<ListClientAddressResponseDTO> {
    return this.command.execute({
      input: {
        clientId: query.clientId,
        address: query.address,
        city: query.city,
        neighborhood: query.neighborhood,
        state: query.state,
        zipcode: query.zipcode,
        page: query.page,
        size: query.size,
      },
      eventData: { type: EventType.http, query, headers },
    });
  }
}
