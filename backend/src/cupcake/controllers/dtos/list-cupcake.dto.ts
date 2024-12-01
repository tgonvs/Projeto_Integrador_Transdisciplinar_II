import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

import { PaginationDTO } from 'src/modules/shared/dtos/pagination.dto';

export class ListCupcakeDTO extends PaginationDTO {
  @ApiProperty({
    description: 'Category id to filter cupcakes',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type((_) => Number)
  categoryId: number;
}
