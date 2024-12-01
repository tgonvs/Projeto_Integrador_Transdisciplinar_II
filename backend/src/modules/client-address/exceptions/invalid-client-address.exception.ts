import { UnprocessableEntityException } from '@nestjs/common';

export class InvalidClientAddressException extends UnprocessableEntityException {
  constructor() {
    super(
      'Address does not exists or do not belong to this client',
      InvalidClientAddressException.name,
    );
  }
}
