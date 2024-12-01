import Image from "next/image";

import { Divider } from "@nextui-org/react";

import { Cupcake } from "@/models/cupcake.model";

import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

type Props = {
  cupcake: Cupcake & { count: number };
  addCupcake: (cupcakeId: number) => void;
  removeCupcake: (cupcakeId: number) => void;
  isLastItem: boolean;
};

export const BagItem = ({
  cupcake,
  addCupcake,
  removeCupcake,
  isLastItem,
}: Props) => (
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
          <FaMinusCircle
            className="text-rose-500 hover:text-rose-700"
            onClick={() => {
              removeCupcake(cupcake.id);
            }}
          />
          <span>
            {cupcake.count} x {cupcake.value.formatted}
          </span>
          <FaPlusCircle
            className="text-lime-500 hover:text-lime-700"
            onClick={() => {
              addCupcake(cupcake.id);
            }}
          />
        </p>
      </div>
    </div>
    {isLastItem && <Divider className="w-4/5 m-1" />}
  </div>
);
