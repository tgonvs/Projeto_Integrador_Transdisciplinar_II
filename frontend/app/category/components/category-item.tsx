"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";

import { CupcakeService } from "@/gateways/cupcake.gateway";

type Params = {
  category: CupcakeService.CategoryDTO;
};

export const CategoryItem = ({ category }: Params) => {
  const router = useRouter();
  return (
    <Card
      className="max-w-sm rounded-b-lg"
      radius="none"
      shadow="sm"
      key={category.id}
      isPressable
      onPress={() => {
        router.push(`/category/${category.id}`);
      }}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          height={1024}
          width={1024}
          alt={category.name}
          className="w-full object-cover h-[140px]"
          src={category.image}
        />
      </CardBody>
      <CardFooter className="justify-between flex-col">
        <p className="text-lg font-bold">{category.name}</p>
        <Divider className="my-2" />
        <p className="text-small">{category.description}</p>
      </CardFooter>
    </Card>
  );
};
