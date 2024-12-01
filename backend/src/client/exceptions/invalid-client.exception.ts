import { UnprocessableEntityException } from '@nestjs/common';

export class InvalidClientException extends UnprocessableEntityException {
  constructor() {
    super('Invalid client id', InvalidClientException.name);
  }
}
