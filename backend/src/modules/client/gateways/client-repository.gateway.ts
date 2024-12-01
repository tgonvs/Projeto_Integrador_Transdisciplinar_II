import { Injectable } from '@nestjs/common';

import { Client, Prisma } from '@prisma/client';

import {
  RepositoryPagination,
  ResultWithPagination,
  WhereWithPagination,
} from 'src/modules/shared/abstractions/repository-pagination';
import { PrismaGateway } from 'src/modules/shared/gateways/prisma.gateway';

import { ClientNotFoundException } from '../exceptions/client-not-found.exception';
import { EmailAlreadyInUseException } from '../exceptions/email-already-in-use.exception';

@Injectable()
export class ClientRepository extends RepositoryPagination<Client> {
  constructor(private readonly prisma: PrismaGateway) {
    super();
  }

  async getOrThrow(
    where: Prisma.ClientWhereUniqueInput,
  ): Promise<Client | null> {
    try {
      return await this.prisma.client.findUniqueOrThrow({ where });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') throw new ClientNotFoundException();
      }
      throw e;
    }
  }
  
  async list({
    size = 25,
    page = 1,
    ...where
  }: WhereWithPagination<Prisma.ClientWhereInput> = {}): Promise<
    ResultWithPagination<Client>
  > {
    const [count, content] = await Promise.all([
      this.prisma.client.count(),
      this.prisma.client.findMany({
        where,
        ...this.parsePaginationInput({ page, size }),
      }),
    ]);

    return this.parsePaginationOutput({ page, size, count, content });
  }

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    try {
      return await this.prisma.client.create({
        data,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') throw new EmailAlreadyInUseException();
      }
      throw e;
    }
  }

  async update(params: {
    where: Prisma.ClientWhereUniqueInput;
    data: Prisma.ClientUpdateInput;
  }): Promise<Client> {
    try {
      const { where, data } = params;
      return await this.prisma.client.update({
        data,
        where,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') throw new ClientNotFoundException();
        if (e.code === 'P2002') throw new EmailAlreadyInUseException();
      }
      throw e;
    }
  }
}
