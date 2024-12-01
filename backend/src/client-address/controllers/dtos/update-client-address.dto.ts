import { ApiProperty } from '@nestjs/swagger';

import { ClientAddress } from '@prisma/client';
import {
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateClientAddressDTO
  implements Omit<ClientAddress, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>
{
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
    description: 'Address number',
    example: 42,
    required: false,
  })
  @IsOptional()
  @IsInt()
  number: number;

  @ApiProperty({
    description: 'Address complement',
    example: 'casa 71',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  complement: string;

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
