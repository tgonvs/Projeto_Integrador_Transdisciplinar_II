import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DefaultHeaders } from 'src/modules/shared/decorator/default-headers.decorator';
import { AppControllers } from 'src/modules/shared/enums/app-controllers';
import { SwaggerTags } from 'src/modules/shared/enums/swagger-tags';
import { EventType } from 'src/modules/shared/services/dispatch-event/interface/event-type.enum';

import { ListClientResponseDTO } from '../dtos/list-client-response.dto';
import { ListClientDTO } from '../dtos/list-client.dto';
import { ListClientCommand } from './list.command';

@ApiTags(SwaggerTags.client)
@Controller(AppControllers.client)
export class ListClientController {
  constructor(private readonly command: ListClientCommand) {}

  @ApiOperation({ summary: 'List clients' })
  @Get()
  handle(
    @Query() query: ListClientDTO,
    @DefaultHeaders() headers,
  ): Promise<ListClientResponseDTO> {
    return this.command.execute({
      input: {
        email: query.email,
        firstName: query.firstName,
        lastName: query.lastName,
        phone: query.phone,
        page: query.page,
        size: query.size,
      },
      eventData: { type: EventType.http, query, headers },
    });
  }
}
