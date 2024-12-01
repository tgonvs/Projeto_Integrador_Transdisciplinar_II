import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

import { PaginationDTO } from 'src/modules/shared/dtos/pagination.dto';

export class ListOrderDTO extends PaginationDTO {
  @ApiProperty({
    description: 'Client id',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type((_) => Number)
  clientId: number;

  @ApiProperty({
    description: 'Address id of client',
    example: 42,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type((_) => Number)
  addressId: number;

  @ApiProperty({
    description: 'Selected store id',
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type((_) => Number)
  storeId: number;
}
