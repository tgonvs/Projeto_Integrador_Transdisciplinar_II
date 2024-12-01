import { PrismaClient } from '@prisma/client';

import { cupcakes as rawCupcakes } from './data/cupcakes.json';

export async function seedCupcakes(prisma: PrismaClient) {
  return Promise.all(
    rawCupcakes.map(async (cupcake) => {
      const categories = cupcake.categories.map((category) => ({
        name: category,
      }));
      const ingredients = cupcake.ingredients.join(', ');

      return prisma.cupcake.upsert({
        where: { name: cupcake.name },
        create: {
          ...cupcake,
          categories: { connect: categories },
          ingredients,
        },
        update: {
          ...cupcake,
          categories: { connect: categories },
          ingredients,
        },
      });
    }),
  );
}
