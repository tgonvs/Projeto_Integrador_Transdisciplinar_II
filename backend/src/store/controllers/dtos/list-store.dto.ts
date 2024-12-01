import { ApiProperty } from '@nestjs/swagger';

import { IsNumberString, IsOptional, IsString, Length } from 'class-validator';

import { PaginationDTO } from 'src/modules/shared/dtos/pagination.dto';

export class ListStoreDTO extends PaginationDTO {
  @ApiProperty({
    description: 'Store name',
    example: 'Cupcake Mania',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  name: string;

  @ApiProperty({
    description: 'Store address',
    example: 'Av. Sem Fim',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  address: string;

  @ApiProperty({
    description: 'Store address neighborhood',
    example: 'Centro',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  neighborhood: string;

  @ApiProperty({
    description: 'Store address city',
    example: 'Dois Irmãos',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  city: string;

  @ApiProperty({
    description: 'Store address state',
    example: 'RS',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({
    description: 'Store address postal code',
    example: '93950000',
    required: false,
  })
  @IsOptional()
  @IsNumberString({ no_symbols: true })
  @Length(8, 8)
  zipcode: string;

  @ApiProperty({
    description: 'Store which serves this postal code',
    example: '93950000',
    required: false,
  })
  @IsOptional()
  @IsNumberString({ no_symbols: true })
  @Length(8, 8)
  servedZipcode: string;
}
