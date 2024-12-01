import { Logger } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { seedCategories } from './seeds/categories';
import { seedCupcakes } from './seeds/cupcakes';
import { seedStoresDeliveryRange } from './seeds/store-delivery-range';
import { seedStores } from './seeds/stores';

const prisma = new PrismaClient();
const logger = new Logger('PrismaSeeder');

async function main() {
  try {
    await seedCategories(prisma);
    await seedCupcakes(prisma);
    await seedStores(prisma);
    await seedStoresDeliveryRange(prisma);
    logger.log('All seeds executed with success');
  } catch (err) {
    logger.error('Failed to run seeds');
    logger.error(err.message, err.stack);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
