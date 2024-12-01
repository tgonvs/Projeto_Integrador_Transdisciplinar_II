import { Injectable } from '@nestjs/common';

import { ClientAddress, Prisma } from '@prisma/client';

import {
  RepositoryPagination,
  ResultWithPagination,
  WhereWithPagination,
} from 'src/modules/shared/abstractions/repository-pagination';
import { PrismaGateway } from 'src/modules/shared/gateways/prisma.gateway';

import { InvalidClientException } from 'src/modules/client/exceptions/invalid-client.exception';

import { ClientAddressNotFoundException } from '../exceptions/client-address-not-found.exception';

@Injectable()
export class ClientAddressRepository extends RepositoryPagination<ClientAddress> {
  constructor(private readonly prisma: PrismaGateway) {
    super();
  }

  get(
    where: Prisma.ClientAddressWhereUniqueInput,
  ): Promise<ClientAddress | null> {
    return this.prisma.clientAddress.findUnique({ where });
  }

  async getOrThrow(
    where: Prisma.ClientAddressWhereUniqueInput,
  ): Promise<ClientAddress | null> {
    try {
      return await this.prisma.clientAddress.findUniqueOrThrow({ where });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') throw new ClientAddressNotFoundException();
      }
      throw e;
    }
  }

  async list({
    size = 25,
    page = 1,
    ...where
  }: WhereWithPagination<Prisma.ClientAddressWhereInput> = {}): Promise<
    ResultWithPagination<ClientAddress>
  > {
    const [count, content] = await Promise.all([
      this.prisma.clientAddress.count(),
      this.prisma.clientAddress.findMany({
        where,
        ...this.parsePaginationInput({ page, size }),
      }),
    ]);

    return this.parsePaginationOutput({ page, size, count, content });
  }

  async create(data: Prisma.ClientAddressCreateInput): Promise<ClientAddress> {
    try {
      return await this.prisma.clientAddress.create({
        data,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') throw new InvalidClientException();
      }
      throw e;
    }
  }

  async update({
    where,
    data,
  }: {
    where: Prisma.ClientAddressWhereUniqueInput;
    data: Prisma.ClientAddressUpdateInput;
  }): Promise<ClientAddress> {
    try {
      return await this.prisma.clientAddress.update({
        data,
        where,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') throw new ClientAddressNotFoundException();
      }
      throw e;
    }
  }
}
