import { NotFoundException } from '@nestjs/common';

export class ClientAddressNotFoundException extends NotFoundException {
  constructor() {
    super('client address not found!', ClientAddressNotFoundException.name);
  }
}
