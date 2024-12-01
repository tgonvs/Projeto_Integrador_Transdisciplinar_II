import Image from "next/image";

import { Divider } from "@nextui-org/react";

import { OrderCupcake } from "@/models/order-cupcake.model";

type Props = {
  cupcake: OrderCupcake;
  isLastItem: boolean;
};

export const OrderItem = ({ cupcake, isLastItem }: Props) => (
  <div className="w-full flex flex-col items-center gap-2">
    <div className="w-full flex flex-row items-center gap-3">
      <div className="w-[48px] h-[48px] shrink-0">
        <Image
          className="rounded-full w-12 h-12"
          width={48}
          height={48}
          src={cupcake.image}
          alt={cupcake.name}
        />
      </div>
      <div className="grow flex flex-col gap-1">
        <p className="font-bold line-clamp-1">{cupcake.name}</p>
        <p className="flex flex-row text-sm self-end justify-center items-center gap-3">
          <span>
            {cupcake.quantity} x {cupcake.value.formatted}
          </span>
        </p>
      </div>
    </div>
    {isLastItem && <Divider className="w-4/5 m-1" />}
  </div>
);
