import { Order as OrderFromPrisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { OrderCupcakeEntity } from './order-cupcakes.entity';

export class OrderEntity implements Omit<OrderFromPrisma, 'cupcakes'> {
  id: number;
  clientId: number;
  addressId: number;
  storeId: number;
  cupcakes: OrderCupcakeEntity[];
  value: Decimal;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}
