import { ApiProperty } from '@nestjs/swagger';

import { Client } from '@prisma/client';
import { IsAlpha, IsEmail, IsNumberString, Length } from 'class-validator';

export class CreateClientDTO
  implements
    Omit<Client, 'id' | 'favoriteAddressId' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    description: 'Client mail',
    example: 'fulano.tal@domain.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Client first name',
    example: 'Fulano',
  })
  @Length(3, 64)
  @IsAlpha('pt-BR')
  firstName: string;

  @ApiProperty({
    description: 'Client last name',
    example: 'Tal',
  })
  @Length(3, 64)
  @IsAlpha('pt-BR')
  lastName: string;

  @ApiProperty({
    description: 'Client phone with area code',
    example: '51988777665',
  })
  @Length(11, 11)
  @IsNumberString({ no_symbols: true })
  phone: string;
}
