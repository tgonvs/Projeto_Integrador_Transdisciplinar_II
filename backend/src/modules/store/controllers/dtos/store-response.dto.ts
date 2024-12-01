import { Store } from '@prisma/client';

export class StoreResponseDTO implements Store {
  id: number;
  name: string;
  address: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
}
