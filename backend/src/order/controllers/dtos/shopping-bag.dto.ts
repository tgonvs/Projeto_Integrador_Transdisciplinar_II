import { ApiProperty } from '@nestjs/swagger';

import { IsInt, Min } from 'class-validator';

export class ShoppingBagDTO {
  @ApiProperty({
    description: 'Cupcake id',
    example: 42,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Quantity of cupcakes',
    example: 42,
  })
  @Min(1)
  @IsInt()
  quantity: number;
}
