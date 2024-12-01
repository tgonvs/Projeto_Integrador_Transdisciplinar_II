import { Injectable } from '@nestjs/common';

import { Category, Cupcake } from '@prisma/client';

import { Command, CommandInput } from 'src/modules/shared/abstractions/command';
import { ResultWithPagination } from 'src/modules/shared/abstractions/repository-pagination';
import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { CupcakeRepository } from '../../gateways/cupcake-repository.gateway';
import { ListCupcakeDTO } from '../dtos/list-cupcake.dto';

@Injectable()
export class ListCupcakeCommand extends Command {
  constructor(
    event: DispatchEventService,
    private readonly repository: CupcakeRepository,
  ) {
    super(event);
  }

  @CommandEventHandler('')
  async execute({
    input: { categoryId, ...input },
  }: CommandInput<ListCupcakeDTO>): Promise<
    ResultWithPagination<Cupcake & { categories: Category[] }>
  > {
    return await this.repository.list({
      categories: { some: { id: categoryId } },
      ...input,
    });
  }
}
