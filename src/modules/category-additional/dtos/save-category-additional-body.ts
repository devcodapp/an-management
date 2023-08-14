import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class SaveCategoryAdditionalBody {
  @ApiProperty({
    description: 'O id da categoria de adicional',
    type: String,
    required: true,
  })
  @IsUUID()
  categoryAdditionalId: string;

  @ApiProperty({
    description: 'O nome da categoria de adicional',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A prioridade de amostra da categoria',
    type: Number,
    required: false,
  })
  order: number;

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
    required: false,
  })
  restaurantId?: string;
}
