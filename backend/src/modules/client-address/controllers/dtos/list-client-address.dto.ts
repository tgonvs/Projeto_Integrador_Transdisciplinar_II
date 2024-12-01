import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { PaginationDTO } from 'src/modules/shared/dtos/pagination.dto';

export class ListClientAddressDTO extends PaginationDTO {
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
    description: 'Address',
    example: 'Av. Sem Fim',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  address: string;

  @ApiProperty({
    description: 'Address neighborhood',
    example: 'Centro',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  neighborhood: string;

  @ApiProperty({
    description: 'Address city',
    example: 'Dois Irmãos',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  city: string;

  @ApiProperty({
    description: 'Address state',
    example: 'RS',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({
    description: 'Address postal code',
    example: '93950000',
    required: false,
  })
  @IsOptional()
  @IsNumberString({ no_symbols: true })
  @Length(8, 8)
  zipcode: string;
}
