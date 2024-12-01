import { Injectable, Logger } from '@nestjs/common';

import { ClientAddress } from '@prisma/client';

import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { ClientIdDTO } from 'src/modules/client/controllers/dtos/client-id.dto';
import { ClientRepository } from 'src/modules/client/gateways/client-repository.gateway';

import { Command, CommandInput } from '../../../shared/abstractions/command';
import { ClientAddressRepository } from '../../gateways/client-address-repository.gateway';
import { CreateClientAddressDTO } from '../dtos/create-client-address.dto';

@Injectable()
export class CreateClientAddressCommand extends Command {
  private logger = new Logger(CreateClientAddressCommand.name);
  constructor(
    event: DispatchEventService,
    private readonly repository: ClientAddressRepository,
    private readonly clientRepository: ClientRepository,
  ) {
    super(event);
  }

  @CommandEventHandler('clientId')
  async execute({
    input: { favorite, ...input },
  }: CommandInput<
    ClientIdDTO & CreateClientAddressDTO
  >): Promise<ClientAddress> {
    const address = await this.repository.create(input);
    if (favorite)
      this.clientRepository
        .update({
          where: { id: input.clientId },
          data: { favoriteAddressId: address.id },
        })
        .catch((err) =>
          this.logger.warn(`Cant set address as favorite :: ${err.message}`),
        );
    return address;
  }
}
