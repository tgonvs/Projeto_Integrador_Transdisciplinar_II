import { ApiProperty } from '@nestjs/swagger';

import { ClientAddress } from '@prisma/client';
import {
  IsBoolean,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateClientAddressDTO
  implements Omit<ClientAddress, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    description: 'Address',
    example: 'Av. Sem Fim',
  })
  @IsString()
  @Length(3, 255)
  address: string;

  @ApiProperty({
    description: 'Address number',
    example: 42,
  })
  @IsInt()
  number: number;

  @ApiProperty({
    description: 'Address complement',
    example: 'casa 71',
  })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  complement: string;

  @ApiProperty({
    description: 'Address neighborhood',
    example: 'Centro',
  })
  @IsString()
  @Length(0, 255)
  neighborhood: string;

  @ApiProperty({
    description: 'Address city',
    example: 'Dois Irmãos',
  })
  @IsString()
  @Length(3, 255)
  city: string;

  @ApiProperty({
    description: 'Address state',
    example: 'RS',
  })
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({
    description: 'Address postal code',
    example: '93950000',
  })
  @IsNumberString({ no_symbols: true })
  @Length(8, 8)
  zipcode: string;

  @ApiProperty({
    description: 'Choose address as favorite from client',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  favorite: boolean;
}
