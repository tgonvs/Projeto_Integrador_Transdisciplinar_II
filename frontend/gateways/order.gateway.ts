import { PaginationDTO, api } from "@/gateways/api";
import { Order } from "@/models/order.model";

export async function createOrder({
  accountId,
  ...data
}: OrderService.OrderCreateDTO): Promise<void> {
  await api.post<Order>(`/client/${accountId}/order`, data);
}

export async function listOrder(accountId: number): Promise<Order[]> {
  const data = await api.get<PaginationDTO<OrderService.OrderDTO>>("/order", {
    params: {
      clientId: accountId,
    },
  });
  return data.content.map(Order.create);
}

export namespace OrderService {
  export type OrderDTO = {
    id: number;
    addressId: number;
    storeId: number;
    cupcakes: CupcakeDTO[];
    value: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
  };

  export type CupcakeDTO = {
    id: number;
    name: string;
    image: string;
    value: number;
    quantity: number;
    description: string;
    ingredients: string;
  };

  export type OrderCreateDTO = {
    accountId: number;
    addressId: number;
    storeId: number;
    shoppingBag: ShoppingBagDTO[];
    paymentMethod: string;
  };

  export type ShoppingBagDTO = {
    id: number;
    quantity: number;
  };
}
