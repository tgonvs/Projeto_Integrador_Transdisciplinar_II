import { Injectable, Logger } from '@nestjs/common';

import { CommandEventHandler } from 'src/modules/shared/decorator/command-event-handler.decorator';
import { DispatchEventService } from 'src/modules/shared/services/dispatch-event/dispatch-event.service';

import { ValidateClientAddressService } from 'src/modules/client-address/services/validate-client-address.service';
import { ClientIdDTO } from 'src/modules/client/controllers/dtos/client-id.dto';

import { Command, CommandInput } from '../../../shared/abstractions/command';
import { OrderEntity } from '../../entities/order.entity';
import { OrderRepository } from '../../gateways/order-repository.gateway';
import { CreateOrderDTO } from '../dtos/create-order.dto';

@Injectable()
export class CreateOrderCommand extends Command {
  private logger = new Logger(CreateOrderCommand.name);
  constructor(
    event: DispatchEventService,
    private readonly repository: OrderRepository,
    private readonly validateAddress: ValidateClientAddressService,
  ) {
    super(event);
  }

  @CommandEventHandler('clientId')
  async execute({
    input: { clientId, addressId, storeId, shoppingBag, paymentMethod },
  }: CommandInput<ClientIdDTO & CreateOrderDTO>): Promise<OrderEntity> {
    await this.validateAddress.execute({ id: addressId, clientId });

    return await this.repository.create({
      client: { connect: { id: clientId } },
      address: { connect: { id: addressId } },
      store: { connect: { id: storeId } },
      cupcakes: shoppingBag,
      paymentMethod,
    });
  }
}
