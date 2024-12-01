import { UnprocessableEntityException } from '@nestjs/common';

export class EmailAlreadyInUseException extends UnprocessableEntityException {
  constructor() {
    super('This email is already in use!', EmailAlreadyInUseException.name);
  }
}
