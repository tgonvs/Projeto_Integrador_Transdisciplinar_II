import { Injectable } from '@nestjs/common';

import { ClientAddress } from '@prisma/client';

import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { Command, CommandInput } from '../../../shared/abstractions/command';
import { ClientAddressRepository } from '../../gateways/client-address-repository.gateway';
import { ClientAddressIdDTO } from '../dtos/client-address-id.dto';
import { UpdateClientAddressDTO } from '../dtos/update-client-address.dto';

@Injectable()
export class UpdateClientAddressCommand extends Command {
  constructor(
    event: DispatchEventService,
    private readonly repository: ClientAddressRepository,
  ) {
    super(event);
  }

  @CommandEventHandler('clientId')
  async execute({
    input: { clientAddressId: id, ...data },
  }: CommandInput<
    ClientAddressIdDTO & UpdateClientAddressDTO
  >): Promise<ClientAddress> {
    return await this.repository.update({
      data,
      where: { id },
    });
  }
}
