import { title } from "@/components/primitives";
import { getCategory, listCupcakes } from "@/gateways/cupcake.gateway";

import { CupcakeCard } from "../components/cupcake-card";

type Params = {
  params: {
    categoryId: string;
  };
};

export default async function Page({ params }: Readonly<Params>) {
  const category = await getCategory(Number(params.categoryId));
  const cupcakes = await listCupcakes({
    categoryId: Number(params.categoryId),
  });

  const handleGrid = (itemsCount: number) => {
    if (itemsCount >= 3) return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3";
    if (itemsCount >= 2) return "grid-cols-1 sm:grid-cols-2";
    return "grid-cols-1";
  };

  return (
    <>
      <h1 className={title()}>{category.name}</h1>
      <div
        className={`grid ${handleGrid(
          cupcakes.length
        )} items-stretch gap-4 shrink`}
      >
        {cupcakes.map((cupcake) => (
          <CupcakeCard key={cupcake.id} cupcake={cupcake} />
        ))}
      </div>
    </>
  );
}
