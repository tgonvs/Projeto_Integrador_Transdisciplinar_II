import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class OrderIdDTO {
  @ApiProperty({
    description: 'Order id',
    example: 123123,
  })
  @Min(1)
  @IsInt()
  @Type((_) => Number)
  orderId: number;
}
