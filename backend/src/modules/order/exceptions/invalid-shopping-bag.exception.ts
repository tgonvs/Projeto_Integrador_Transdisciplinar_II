import { UnprocessableEntityException } from '@nestjs/common';

export class InvalidShoppingBagException extends UnprocessableEntityException {
  constructor() {
    super(
      `Some product of bag does not exist`,
      InvalidShoppingBagException.name,
    );
  }
}
