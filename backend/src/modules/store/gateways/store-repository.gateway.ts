import { Injectable } from '@nestjs/common';

import { Store, Prisma } from '@prisma/client';

import {
  RepositoryPagination,
  ResultWithPagination,
  WhereWithPagination,
} from 'src/modules/shared/abstractions/repository-pagination';
import { PrismaGateway } from 'src/modules/shared/gateways/prisma.gateway';

@Injectable()
export class StoreRepository extends RepositoryPagination<Store> {
  constructor(private readonly prisma: PrismaGateway) {
    super();
  }

  async list({
    size = 25,
    page = 1,
    ...where
  }: WhereWithPagination<Prisma.StoreWhereInput> = {}): Promise<
    ResultWithPagination<Store>
  > {
    const [count, content] = await Promise.all([
      this.prisma.store.count(),
      this.prisma.store.findMany({
        where,
        ...this.parsePaginationInput({ page, size }),
      }),
    ]);

    return this.parsePaginationOutput({ page, size, count, content });
  }
}
