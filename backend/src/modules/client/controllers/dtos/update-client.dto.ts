import { ApiProperty } from '@nestjs/swagger';

import { Client } from '@prisma/client';
import {
  IsAlpha,
  IsEmail,
  IsInt,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';

export class UpdateClientDTO
  implements Omit<Client, 'id' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    description: 'Client mail',
    example: 'fulano.tal@domain.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Client first name',
    example: 'Fulano',
    required: false,
  })
  @IsOptional()
  @Length(3, 64)
  @IsAlpha('pt-BR')
  firstName: string;

  @ApiProperty({
    description: 'Client last name',
    example: 'Tal',
    required: false,
  })
  @IsOptional()
  @Length(3, 64)
  @IsAlpha('pt-BR')
  lastName: string;

  @ApiProperty({
    description: 'Client phone with area code',
    example: '51988777665',
    required: false,
  })
  @IsOptional()
  @Length(11, 11)
  @IsNumberString({ no_symbols: true })
  phone: string;

  @ApiProperty({
    description: 'Client favorite address id',
    example: 42,
    required: false,
  })
  @IsOptional()
  @IsInt()
  favoriteAddressId: number;
}
