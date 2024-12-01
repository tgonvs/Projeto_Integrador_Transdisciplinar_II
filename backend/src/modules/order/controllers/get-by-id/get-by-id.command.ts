import { Injectable } from '@nestjs/common';

import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { Command, CommandInput } from '../../../shared/abstractions/command';
import { OrderEntity } from '../../entities/order.entity';
import { OrderRepository } from '../../gateways/order-repository.gateway';
import { OrderIdDTO } from '../dtos/order-id.dto';

@Injectable()
export class GetOrderByIdCommand extends Command {
  constructor(
    event: DispatchEventService,
    private readonly repository: OrderRepository,
  ) {
    super(event);
  }

  @CommandEventHandler('OrderId')
  async execute({ input }: CommandInput<OrderIdDTO>): Promise<OrderEntity> {
    return await this.repository.getOrThrow({
      id: input.orderId,
    });
  }
}
