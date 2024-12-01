import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DefaultHeaders } from 'src/modules/shared/decorator/default-headers.decorator';
import { PaginationDTO } from 'src/modules/shared/dtos/pagination.dto';
import { AppControllers } from 'src/modules/shared/enums/app-controllers';
import { SwaggerTags } from 'src/modules/shared/enums/swagger-tags';
import { EventType } from 'src/modules/shared/services/dispatch-event/interface/event-type.enum';

import { ListCategoryResponseDTO } from '../dtos/list-category-response.dto';
import { ListCategoryCommand } from './list-category.command';

@ApiTags(SwaggerTags.cupcake)
@Controller(AppControllers.cupcake)
export class ListCategoryController {
  constructor(private readonly command: ListCategoryCommand) {}

  @ApiOperation({ summary: 'List cupcakes categories' })
  @Get('/category')
  handle(
    @Query() query: PaginationDTO,
    @DefaultHeaders() headers,
  ): Promise<ListCategoryResponseDTO> {
    return this.command.execute({
      input: {
        page: query.page,
        size: query.size,
      },
      eventData: { type: EventType.http, query, headers },
    });
  }
}
