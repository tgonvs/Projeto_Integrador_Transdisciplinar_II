import { Injectable } from '@nestjs/common';

import { Store } from '@prisma/client';

import { Command, CommandInput } from 'src/modules/shared/abstractions/command';
import { ResultWithPagination } from 'src/modules/shared/abstractions/repository-pagination';
import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { StoreRepository } from '../../gateways/store-repository.gateway';
import { ListStoreDTO } from '../dtos/list-store.dto';

@Injectable()
export class ListStoreCommand extends Command {
  constructor(
    event: DispatchEventService,
    private readonly repository: StoreRepository,
  ) {
    super(event);
  }

  @CommandEventHandler('')
  async execute({
    input: { size, page, servedZipcode, ...input },
  }: CommandInput<ListStoreDTO>): Promise<ResultWithPagination<Store>> {
    return await this.repository.list({
      size,
      page,
      ...input,
      ...(servedZipcode && {
        StoreDeliveryRange: {
          some: {
            AND: [
              { final: { gte: Number(servedZipcode) } },
              { initial: { lte: Number(servedZipcode) } },
            ],
          },
        },
      }),
    });
  }
}
