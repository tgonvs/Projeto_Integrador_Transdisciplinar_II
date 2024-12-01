import Image from "next/image";
import Link from "next/link";

import { Card, CardBody, CardFooter, Chip } from "@nextui-org/react";

import Carousel from "@/components/molecules/carousel";
import { Promotions } from "@/config/promotion-banners";
import {
  listCupcakes,
  listCupcakesCategories,
} from "@/gateways/cupcake.gateway";

export default async function Home() {
  const cupcakes = await listCupcakes();
  const categories = await listCupcakesCategories();
  return (
    <section className="flex flex-col justify-stretch gap-4 scrollbar-hide">
      <Carousel autoPlay={true} images={Promotions} />
      <div className="px-2 flex flex-col gap-2">
        <p className="text-lg uppercase font-bold">Promos que você adora!</p>
        <div className="flex flex-row gap-4 overflow-x-scroll scrollbar-hide py-2 px-1">
          {cupcakes.map(({ id, name, value, image }) => (
            <Link key={id} href={`/shopping-bag?cupcake=${id}`}>
              <Card
                className="h-full min-w-[200px] rounded-b-lg text-center"
                radius="none"
                shadow="sm"
                isPressable
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    width={200}
                    height={180}
                    alt={name}
                    className="w-full h-[180px]"
                    src={image}
                  />
                </CardBody>
                <CardFooter className="grow text-sm flex-col gap-y-2">
                  <b className="grow">{name}</b>
                  <Chip className="bg-gradient-to-tr from-indigo-500 to-pink-500 text-white shadow-lg fit">
                    {value.formatted}
                  </Chip>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-2 flex flex-col gap-2">
        <div className="flex flex-row justify-between content-center">
          <p className="text-lg font-bold">Categorias</p>{" "}
          <Link href="/category" className="hover:font-bold">
            <Chip className="bg-gradient-to-tr from-indigo-500 to-pink-500 text-white shadow-lg fit">
              ver todas
            </Chip>
          </Link>
        </div>
        <div className="flex flex-row gap-4 overflow-x-scroll scrollbar-hide py-2 px-1">
          {categories.map(({ id, name, image }) => (
            <Link
              key={id}
              href={`/category/${id}`}
              className="relative overflow-visible min-w-[200px]"
            >
              <Image
                width={200}
                height={180}
                alt={name}
                className="w-full h-[180px]"
                src={image}
              />
              <b className="absolute bottom-0 z-10 w-full text-center p-2 bg-gradient-to-tr from-zinc-900/75 to-zinc-200/25 text-white">
                {name}
              </b>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
