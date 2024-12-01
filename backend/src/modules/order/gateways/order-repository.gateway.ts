import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import {
  RepositoryPagination,
  ResultWithPagination,
  WhereWithPagination,
} from 'src/modules/shared/abstractions/repository-pagination';
import { PrismaGateway } from 'src/modules/shared/gateways/prisma.gateway';

import { OrderCupcakeEntity } from '../entities/order-cupcakes.entity';
import { OrderEntity } from '../entities/order.entity';
import { InvalidShoppingBagException } from '../exceptions/invalid-shopping-bag.exception';
import { OrderNotFoundException } from '../exceptions/order-not-found.exception';

@Injectable()
export class OrderRepository extends RepositoryPagination<OrderEntity> {
  constructor(private readonly prisma: PrismaGateway) {
    super();
  }

  private async mapCupcakesToOrderCupcakesAndValue(
    orderCupcakes: Array<Pick<OrderCupcakeEntity, 'id' | 'quantity'>>,
  ): Promise<{ value: number; cupcakes: OrderCupcakeEntity[] }> {
    const mapBag = orderCupcakes.reduce((agg, cupcake) => {
      const current = agg.get(cupcake.id) || 0;
      agg.set(cupcake.id, cupcake.quantity + current);
      return agg;
    }, new Map<number, number>());

    const keys = [...mapBag.keys()];

    const cupcakesWithoutQuantity = await this.prisma.cupcake.findMany({
      where: {
        id: { in: keys },
      },
    });

    const mapCupcakes = new Map(
      cupcakesWithoutQuantity.map((cupcake) => [cupcake.id, cupcake]),
    );

    let value = 0;
    const cupcakes: OrderCupcakeEntity[] = keys.map((key) => {
      const cupcake = mapCupcakes.get(key);
      if (!cupcake) throw new InvalidShoppingBagException();
      const quantity = mapBag.get(key);
      value = value + Number(cupcake.value) * quantity;
      return {
        ...cupcake,
        value: Number(cupcake.value),
        quantity,
      };
    });

    return { value, cupcakes };
  }

  async get(where: Prisma.OrderWhereUniqueInput): Promise<OrderEntity | null> {
    const result = await this.prisma.order.findUnique({ where });
    if (!result) return null;
    return {
      ...result,
      cupcakes: result.cupcakes as unknown as OrderCupcakeEntity[],
    };
  }

  async getOrThrow(
    where: Prisma.OrderWhereUniqueInput,
  ): Promise<OrderEntity | null> {
    try {
      const result = await this.prisma.order.findUniqueOrThrow({
        where,
      });
      return {
        ...result,
        cupcakes: result.cupcakes as unknown as OrderCupcakeEntity[],
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') throw new OrderNotFoundException();
      }
      throw e;
    }
  }

  async list({
    size = 25,
    page = 1,
    ...where
  }: WhereWithPagination<Prisma.OrderWhereInput> = {}): Promise<
    ResultWithPagination<OrderEntity>
  > {
    const [count, content] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.findMany({
        where,
        ...this.parsePaginationInput({ page, size }),
      }),
    ]);

    return this.parsePaginationOutput({
      page,
      size,
      count,
      content,
    });
  }

  async create(
    data: Omit<Prisma.OrderCreateInput, 'value' | 'cupcakes'> & {
      cupcakes: Pick<OrderCupcakeEntity, 'id' | 'quantity'>[];
    },
  ): Promise<OrderEntity> {
    try {
      const { value, cupcakes } = await this.mapCupcakesToOrderCupcakesAndValue(
        data.cupcakes,
      );
      const result = await this.prisma.order.create({
        data: {
          ...data,
          cupcakes: cupcakes as unknown as Prisma.JsonArray,
          value,
        },
      });
      return { ...result, cupcakes };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025')
          throw new UnprocessableEntityException(e.meta.cause);
      }
      throw e;
    }
  }
}
