import { Injectable } from '@nestjs/common';

import { Category, Prisma } from '@prisma/client';

import {
  RepositoryPagination,
  ResultWithPagination,
  WhereWithPagination,
} from 'src/modules/shared/abstractions/repository-pagination';
import { PrismaGateway } from 'src/modules/shared/gateways/prisma.gateway';

@Injectable()
export class CategoryRepository extends RepositoryPagination<Category> {
  constructor(private readonly prisma: PrismaGateway) {
    super();
  }

  async list({
    size = 25,
    page = 1,
  }: WhereWithPagination<Prisma.CategoryWhereInput> = {}): Promise<
    ResultWithPagination<Category>
  > {
    const [count, content] = await Promise.all([
      this.prisma.category.count(),
      this.prisma.category.findMany({
        ...this.parsePaginationInput({ page, size }),
      }),
    ]);

    return this.parsePaginationOutput({ page, size, count, content });
  }
}
