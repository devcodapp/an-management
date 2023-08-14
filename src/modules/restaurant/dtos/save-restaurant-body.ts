import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../entities/address';
import { randomUUID } from 'crypto';
import { IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SaveRestaurantBody {
  @ApiProperty({
    description: 'O id da restaurante',
    type: String,
    required: true,
  })
  restaurantId: string;

  @ApiProperty({
    description: 'O nome da restaurante',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A descrição da Restaurante',
    type: String,
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Tags da restaurante',
    type: [String],
    required: false,
  })
  tags: string[];

  @ApiProperty({
    description: 'Tipo da restaurante',
    type: String,
    required: false,
  })
  type: string;

  @ApiProperty({
    description: 'Endereço da restaurante',
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
    description: 'Horário de abertura da restaurante',
    type: String,
    required: false,
    example: '19:00',
  })
  openAt: string;

  @ApiProperty({
    description: 'Horário de fechamento da restaurante',
    type: String,
    required: false,
    example: '23:00',
  })
  closeAt: string;
}
