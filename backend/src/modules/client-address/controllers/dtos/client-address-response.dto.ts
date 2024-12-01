import { ClientAddress } from '@prisma/client';

export class ClientAddressResponseDTO implements ClientAddress {
  id: number;
  clientId: number;
  address: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  createdAt: Date;
  updatedAt: Date;
}
