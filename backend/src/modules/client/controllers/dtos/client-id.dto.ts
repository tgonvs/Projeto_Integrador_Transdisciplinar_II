import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ClientIdDTO {
  @ApiProperty({
    description: 'client id',
    example: 92131231,
  })
  @IsInt()
  @Type((_) => Number)
  clientId: number;
}
