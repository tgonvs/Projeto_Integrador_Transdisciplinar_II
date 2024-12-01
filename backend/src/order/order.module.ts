import { Module } from '@nestjs/common';

import { ClientAddressModule } from '../client-address/client-address.module';
import { ClientModule } from '../client/client.module';
import { CupcakeModule } from '../cupcake/cupcake.module';
import { StoreModule } from '../store/store.module';
import { CreateOrderCommand } from './controllers/create/create.command';
import { CreateOrderController } from './controllers/create/create.controller';
import { GetOrderByIdCommand } from './controllers/get-by-id/get-by-id.command';
import { GetOrderByIdController } from './controllers/get-by-id/get-by-id.controller';
import { ListOrderCommand } from './controllers/list/list.command';
import { ListOrderController } from './controllers/list/list.controller';
import { OrderRepository } from './gateways/order-repository.gateway';

@Module({
  imports: [ClientModule, ClientAddressModule, CupcakeModule, StoreModule],
  controllers: [
    CreateOrderController,
    GetOrderByIdController,
    ListOrderController,
  ],
  providers: [
    OrderRepository,
    CreateOrderCommand,
    GetOrderByIdCommand,
    ListOrderCommand,
  ],
})
export class OrderModule {}
