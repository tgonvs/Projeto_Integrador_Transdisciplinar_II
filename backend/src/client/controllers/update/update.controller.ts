import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DefaultHeaders } from 'src/modules/shared/decorator/default-headers.decorator';
import { AppControllers } from 'src/modules/shared/enums/app-controllers';
import { SwaggerTags } from 'src/modules/shared/enums/swagger-tags';
import { EventType } from 'src/modules/shared/services/dispatch-event/interface/event-type.enum';

import { ClientIdDTO } from '../dtos/client-id.dto';
import { ClientResponseDTO } from '../dtos/client-response.dto';
import { UpdateClientDTO } from '../dtos/update-client.dto';
import { UpdateClientCommand } from './update.command';

@ApiTags(SwaggerTags.client)
@Controller(AppControllers.client)
export class UpdateClientController {
  constructor(private readonly command: UpdateClientCommand) {}

  @ApiOperation({ summary: 'Client update' })
  @Patch('/:clientId')
  handle(
    @Param() params: ClientIdDTO,
    @Body() body: UpdateClientDTO,
    @DefaultHeaders() headers,
  ): Promise<ClientResponseDTO> {
    return this.command.execute({
      input: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        favoriteAddressId: body.favoriteAddressId,
        ...params,
      },
      eventData: { type: EventType.http, params, body, headers },
    });
  }
}
