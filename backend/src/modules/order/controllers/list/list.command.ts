import { Injectable } from '@nestjs/common';

import { ResultWithPagination } from 'src/modules/shared/abstractions/repository-pagination';
import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { Command, CommandInput } from '../../../shared/abstractions/command';
import { OrderEntity } from '../../entities/order.entity';
import { OrderRepository } from '../../gateways/order-repository.gateway';
import { ListOrderDTO } from '../dtos/list-order.dto';

@Injectable()
export class ListOrderCommand extends Command {
  constructor(
    event: DispatchEventService,
    private readonly repository: OrderRepository,
  ) {
    super(event);
  }

  @CommandEventHandler('')
  async execute({
    input,
  }: CommandInput<ListOrderDTO>): Promise<ResultWithPagination<OrderEntity>> {
    return await this.repository.list(input);
  }
}
