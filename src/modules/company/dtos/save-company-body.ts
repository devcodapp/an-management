import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../entities/address';
import { randomUUID } from 'crypto';
import { IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SaveCompanyBody {
  @ApiProperty({
    description: 'O id da empresa',
    type: String,
    required: true,
  })
  companyId: string;

  @ApiProperty({
    description: 'O nome da empresa',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A descrição da Empresa',
    type: String,
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Tags da empresa',
    type: [String],
    required: false,
  })
  tags: string[];

  @ApiProperty({
    description: 'Tipo da empresa',
    type: String,
    required: false,
  })
  type: string;

  @ApiProperty({
    description: 'Endereço da empresa',
    type: Object,
    required: false,
    example: {
      street: 'Rua Tal 2088',
      city: 'São Paulo',
      state: 'SP',
      zip: '00000-000',
      district: 'Bairro Tal',
    },
  })
  address: Address;

  @ApiProperty({
    description: 'Horário de abertura da empresa',
    type: String,
    required: false,
    example: '19:00',
  })
  openAt: string;

  @ApiProperty({
    description: 'Horário de fechamento da empresa',
    type: String,
    required: false,
    example: '23:00',
  })
  closeAt: string;
}
