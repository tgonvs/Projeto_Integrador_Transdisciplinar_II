import { PrismaClient } from '@prisma/client';

import { delivery } from './data/store-delivery-ranges.json';

export async function seedStoresDeliveryRange(prisma: PrismaClient) {
  const count = await prisma.storeDeliveryRange.count();
  if (count > 0) return;
  return Promise.all(
    delivery.map(async (range) => {
      const store = await prisma.store.findFirst({
        where: { state: range.uf },
      });
      return prisma.storeDeliveryRange.create({
        data: {
          storeId: store.id,
          initial: range.initial,
          final: range.final,
        },
      });
    }),
  );
}
