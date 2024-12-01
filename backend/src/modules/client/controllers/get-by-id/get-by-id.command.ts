import { Injectable } from '@nestjs/common';

import { Client } from '@prisma/client';

import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { Command, CommandInput } from '../../../shared/abstractions/command';
import { ClientRepository } from '../../gateways/client-repository.gateway';
import { ClientIdDTO } from '../dtos/client-id.dto';

@Injectable()
export class GetClientByIdCommand extends Command {
  constructor(
    event: DispatchEventService,
    private readonly repository: ClientRepository,
  ) {
    super(event);
  }

  @CommandEventHandler('clientId')
  async execute({ input }: CommandInput<ClientIdDTO>): Promise<Client> {
    return await this.repository.getOrThrow({ id: input.clientId });
  }
}
