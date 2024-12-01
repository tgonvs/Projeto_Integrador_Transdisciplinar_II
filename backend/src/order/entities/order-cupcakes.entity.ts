import { Cupcake } from '@prisma/client';

export class OrderCupcakeEntity implements Omit<Cupcake, 'value'> {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  value: number;
  image: string;
  quantity: number;
}
