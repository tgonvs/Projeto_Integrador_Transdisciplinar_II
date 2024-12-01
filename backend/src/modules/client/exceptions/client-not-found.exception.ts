import { NotFoundException } from '@nestjs/common';

export class ClientNotFoundException extends NotFoundException {
  constructor() {
    super('Cliente not found!', ClientNotFoundException.name);
  }
}
