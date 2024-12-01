import { Injectable } from '@nestjs/common';

import { Client } from '@prisma/client';

import { ResultWithPagination } from 'src/modules/shared/abstractions/repository-pagination';
import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { Command, CommandInput } from '../../../shared/abstractions/command';
import { ClientRepository } from '../../gateways/client-repository.gateway';
import { ListClientDTO } from '../dtos/list-client.dto';

@Injectable()
export class ListClientCommand extends Command {
  constructor(
    event: DispatchEventService,
    private readonly repository: ClientRepository,
  ) {
    super(event);
  }

  @CommandEventHandler('')
  async execute({
    input,
  }: CommandInput<ListClientDTO>): Promise<ResultWithPagination<Client>> {
    return await this.repository.list(input);
  }
}
