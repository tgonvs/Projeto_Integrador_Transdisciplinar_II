import { PrismaClient } from '@prisma/client';

import { categories as rawCategories } from './data/cupcake-category.json';

export async function seedCategories(prisma: PrismaClient) {
  return Promise.all(
    rawCategories.map(async (category) => {
      return prisma.category.upsert({
        where: { name: category.name },
        update: category,
        create: category,
      });
    }),
  );
}
