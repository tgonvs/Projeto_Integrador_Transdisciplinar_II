import { ApiProperty } from '@nestjs/swagger';

import {
  IsAlpha,
  IsEmail,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';

import { PaginationDTO } from 'src/modules/shared/dtos/pagination.dto';

export class ListClientDTO extends PaginationDTO {
  @ApiProperty({
    description: 'Client mail',
    example: 'fulano.tal@domain.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Client first name',
    example: 'Fulano',
    required: false,
  })
  @Length(3, 64)
  @IsAlpha('pt-BR')
  @IsOptional()
  firstName: string;

  @ApiProperty({
    description: 'Client last name',
    example: 'Tal',
    required: false,
  })
  @Length(3, 64)
  @IsAlpha('pt-BR')
  @IsOptional()
  lastName: string;

  @ApiProperty({
    description: 'Client phone with area code',
    example: '51988777665',
    required: false,
  })
  @Length(11, 11)
  @IsNumberString({ no_symbols: true })
  @IsOptional()
  phone: string;
}
