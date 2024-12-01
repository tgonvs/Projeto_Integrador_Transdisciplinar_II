import { Injectable } from '@nestjs/common';

import { Client } from '@prisma/client';

import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { ValidateClientAddressService } from 'src/modules/client-address/services/validate-client-address.service';

import { Command, CommandInput } from '../../../shared/abstractions/command';
import { ClientRepository } from '../../gateways/client-repository.gateway';
import { ClientIdDTO } from '../dtos/client-id.dto';
import { UpdateClientDTO } from '../dtos/update-client.dto';

@Injectable()
export class UpdateClientCommand extends Command {
  constructor(
    event: DispatchEventService,
    private readonly repository: ClientRepository,
    private readonly validateAddress: ValidateClientAddressService,
  ) {
    super(event);
  }

  @CommandEventHandler('clientId')
  async execute({
    input: { clientId, ...data },
  }: CommandInput<ClientIdDTO & UpdateClientDTO>): Promise<Client> {
    if (data.favoriteAddressId)
      await this.validateAddress.execute({
        id: data.favoriteAddressId,
        clientId,
      });
    return await this.repository.update({ where: { id: clientId }, data });
  }
}
