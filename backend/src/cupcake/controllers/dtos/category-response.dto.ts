import { Category } from '@prisma/client';

export class CategoryResponseDTO implements Category {
  id: number;
  name: string;
  image: string;
  description: string;
}
