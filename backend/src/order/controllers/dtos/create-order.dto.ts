import { ApiProperty } from '@nestjs/swagger';

import { Order } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDefined,
  IsInt,
  ValidateNested,
} from 'class-validator';

import { ShoppingBagDTO } from './shopping-bag.dto';

export class CreateOrderDTO
  implements
    Omit<
      Order,
      'id' | 'clientId' | 'cupcakes' | 'value' | 'createdAt' | 'updatedAt'
    >
{
  @ApiProperty({
    description: 'Address id to delivery',
    example: 42,
  })
  @IsInt()
  addressId: number;

  @ApiProperty({
    description: 'Selected store id',
    example: 1234,
  })
  @IsInt()
  storeId: number;

  @ApiProperty({
    description: 'Selected cupcakes',
    example: [
      {
        id: 1,
        quantity: 5,
      },
      {
        id: 2,
        quantity: 5,
      },
      {
        id: 1,
        quantity: 1,
      },
    ],
  })
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMaxSize(50)
  @Type((_) => ShoppingBagDTO)
  shoppingBag: ShoppingBagDTO[];

  @ApiProperty({
    description: 'Selected store id',
    enum: ['card', 'cash', 'pix'],
    example: 'pix',
  })
  paymentMethod: string;
}
