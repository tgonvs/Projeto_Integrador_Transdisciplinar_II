import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({
    description: 'Page number',
    example: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  @Type((_) => Number)
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({
    description: 'Max size of content response, maximum of 50 elements',
    example: 25,
    default: 25,
    required: false,
  })
  @IsOptional()
  @Type((_) => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  size: number;
}
