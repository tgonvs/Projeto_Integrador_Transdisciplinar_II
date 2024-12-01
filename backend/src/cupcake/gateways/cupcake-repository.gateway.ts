import { Injectable } from '@nestjs/common';

import { Category, Cupcake, Prisma } from '@prisma/client';

import {
  RepositoryPagination,
  ResultWithPagination,
  WhereWithPagination,
} from 'src/modules/shared/abstractions/repository-pagination';
import { PrismaGateway } from 'src/modules/shared/gateways/prisma.gateway';

@Injectable()
export class CupcakeRepository extends RepositoryPagination<
  Cupcake & { categories: Category[] }
> {
  constructor(private readonly prisma: PrismaGateway) {
    super();
  }

  async list({
    size = 25,
    page = 1,
    ...where
  }: WhereWithPagination<Prisma.CupcakeWhereInput> = {}): Promise<
    ResultWithPagination<Cupcake & { categories: Category[] }>
  > {
    const [count, content] = await Promise.all([
      this.prisma.cupcake.count(),
      this.prisma.cupcake.findMany({
        where,
        ...this.parsePaginationInput({ page, size }),
        include: { categories: true },
      }),
    ]);

    return this.parsePaginationOutput({ page, size, count, content });
  }
}
