import { PrismaClient } from '@prisma/client';

import { stores } from './data/stores.json';

export async function seedStores(prisma: PrismaClient) {
  const count = await prisma.store.count();
  if (count > 0) return;
  return Promise.all(
    stores.map(async (store) => {
      return prisma.store.create({ data: store });
    }),
  );
}
