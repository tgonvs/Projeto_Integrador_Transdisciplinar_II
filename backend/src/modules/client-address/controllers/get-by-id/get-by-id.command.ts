import { Injectable } from '@nestjs/common';

import { ClientAddress } from '@prisma/client';

import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { Command, CommandInput } from '../../../shared/abstractions/command';
import { ClientAddressRepository } from '../../gateways/client-address-repository.gateway';
import { ClientAddressIdDTO } from '../dtos/client-address-id.dto';

@Injectable()
export class GetClientAddressByIdCommand extends Command {
  constructor(
    event: DispatchEventService,
    private readonly repository: ClientAddressRepository,
  ) {
    super(event);
  }

  @CommandEventHandler('clientAddressId')
  async execute({
    input,
  }: CommandInput<ClientAddressIdDTO>): Promise<ClientAddress> {
    return await this.repository.getOrThrow({
      id: input.clientAddressId,
    });
  }
}
