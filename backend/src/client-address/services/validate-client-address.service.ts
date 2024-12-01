import { Injectable } from '@nestjs/common';

import { InvalidClientAddressException } from '../exceptions/invalid-client-address.exception';
import { ClientAddressRepository } from '../gateways/client-address-repository.gateway';

@Injectable()
export class ValidateClientAddressService {
  constructor(private readonly repository: ClientAddressRepository) {}

  async execute({
    id,
    clientId,
  }: {
    id: number;
    clientId: number;
  }): Promise<void> {
    const address = await this.repository.get({ clientId, id });
    if (!address) throw new InvalidClientAddressException();
  }
}
