import { CurrencyVO } from "./currency-vo";
import { OrderCupcake } from "./order-cupcake.model";

export class Order {
  id!: number;
  addressId!: number;
  storeId!: number;
  cupcakes!: OrderCupcake[];
  value!: CurrencyVO;
  paymentMethod!: string;
  createdAt!: string;
  updatedAt!: string;

  static create({
    id,
    addressId,
    storeId,
    cupcakes,
    value,
    paymentMethod,
    createdAt,
    updatedAt,
  }: Order.Input) {
    return {
      id: id,
      addressId: addressId,
      storeId: storeId,
      cupcakes: cupcakes.map((cupcake) => OrderCupcake.create(cupcake)),
      value: CurrencyVO.create(Number(value)),
      paymentMethod: paymentMethod,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
  }
}

export namespace Order {
  export type Input = {
    id: number;
    addressId: number;
    storeId: number;
    cupcakes: OrderCupcake.Input[];
    value: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
  };
}
