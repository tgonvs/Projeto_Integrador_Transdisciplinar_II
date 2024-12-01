import { Module } from '@nestjs/common';

import { ListStoreCommand } from './controllers/list/list.command';
import { ListStoreController } from './controllers/list/list.controller';
import { StoreRepository } from './gateways/store-repository.gateway';

@Module({
  controllers: [ListStoreController],
  providers: [StoreRepository, ListStoreCommand],
  exports: [StoreRepository],
})
export class StoreModule {}
