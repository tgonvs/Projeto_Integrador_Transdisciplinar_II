import { Card } from "@nextui-org/card";

import { Order } from "@/models/order.model";

import { OrderItem } from "./order-item";

export type Props = {
  order: Order;
};

export function OrderCard({ order }: Props) {
  return (
    <Card className="w-full sm:w-96 flex flex-col gap-3 p-4">
      <p className="flex justify-between">
        <strong>Data</strong>{" "}
        {new Date(order.createdAt).toLocaleString("pt-BR")}
      </p>
      <p className="flex justify-between">
        <strong>Pagamento</strong> {order.paymentMethod.toUpperCase()} -{" "}
        {order.value.formatted}
      </p>
      <p></p>
      {order.cupcakes.map((cupcake, i, arr) => (
        <OrderItem
          cupcake={cupcake}
          key={cupcake.id}
          isLastItem={i < arr.length - 1}
        />
      ))}
    </Card>
  );
}
