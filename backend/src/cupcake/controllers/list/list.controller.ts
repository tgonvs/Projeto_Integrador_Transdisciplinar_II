import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DefaultHeaders } from 'src/modules/shared/decorator/default-headers.decorator';
import { AppControllers } from 'src/modules/shared/enums/app-controllers';
import { SwaggerTags } from 'src/modules/shared/enums/swagger-tags';
import { EventType } from 'src/modules/shared/services/dispatch-event/interface/event-type.enum';

import { ListCupcakeDTO } from '../dtos/list-cupcake.dto';
import { ListCupcakeResponseDTO } from '../dtos/list-cupcakes-response.dto';
import { ListCupcakeCommand } from './list.command';

@ApiTags(SwaggerTags.cupcake)
@Controller(AppControllers.cupcake)
export class ListCupcakeController {
  constructor(private readonly command: ListCupcakeCommand) {}

  @ApiOperation({ summary: 'List cupcakes' })
  @Get()
  handle(
    @Query() query: ListCupcakeDTO,
    @DefaultHeaders() headers,
  ): Promise<ListCupcakeResponseDTO> {
    return this.command.execute({
      input: {
        categoryId: query.categoryId,
        page: query.page,
        size: query.size,
      },
      eventData: { type: EventType.http, query, headers },
    });
  }
}
