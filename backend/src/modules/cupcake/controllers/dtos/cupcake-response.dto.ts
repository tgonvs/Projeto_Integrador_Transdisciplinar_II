import { Cupcake } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { CategoryResponseDTO } from './category-response.dto';

export class CupcakeResponseDTO implements Cupcake {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  value: Decimal;
  image: string;
  categories: CategoryResponseDTO[];
}
