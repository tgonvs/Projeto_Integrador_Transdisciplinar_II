import { Injectable } from '@nestjs/common';

import { ClientAddress } from '@prisma/client';

import { ResultWithPagination } from 'src/modules/shared/abstractions/repository-pagination';
import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { Command, CommandInput } from '../../../shared/abstractions/command';
import { ClientAddressRepository } from '../../gateways/client-address-repository.gateway';
import { ListClientAddressDTO } from '../dtos/list-client-address.dto';

@Injectable()
export class ListClientAddressCommand extends Command {
  constructor(
    event: DispatchEventService,
    private readonly repository: ClientAddressRepository,
  ) {
    super(event);
  }

  @CommandEventHandler('')
  async execute({
    input,
  }: CommandInput<ListClientAddressDTO>): Promise<
    ResultWithPagination<ClientAddress>
  > {
    return await this.repository.list(input);
  }
}
