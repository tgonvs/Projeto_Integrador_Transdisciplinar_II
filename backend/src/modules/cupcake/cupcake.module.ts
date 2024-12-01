import { Module } from '@nestjs/common';

import { ListCategoryCommand } from './controllers/list-category/list-category.command';
import { ListCategoryController } from './controllers/list-category/list-category.controller';
import { ListCupcakeCommand } from './controllers/list/list.command';
import { ListCupcakeController } from './controllers/list/list.controller';
import { CategoryRepository } from './gateways/category-repository.gateway';
import { CupcakeRepository } from './gateways/cupcake-repository.gateway';

@Module({
  controllers: [ListCategoryController, ListCupcakeController],
  providers: [
    CategoryRepository,
    CupcakeRepository,
    ListCategoryCommand,
    ListCupcakeCommand,
  ],
  exports: [CupcakeRepository],
})
export class CupcakeModule {}
