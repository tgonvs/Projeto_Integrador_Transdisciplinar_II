import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ClientAddressModule } from './modules/client-address/client-address.module';
import { ClientModule } from './modules/client/client.module';
import { CupcakeModule } from './modules/cupcake/cupcake.module';
import { OrderModule } from './modules/order/order.module';
import { SharedModule } from './modules/shared/shared.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    SharedModule,
    ClientModule,
    ClientAddressModule,
    CupcakeModule,
    OrderModule,
    StoreModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
