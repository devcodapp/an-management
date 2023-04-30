import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreateCategoryAdditionalBody {
  @ApiProperty({
    description: 'O nome da categoria de adicional',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A prioridade de amostra da categoria',
    type: Number,
  })
  @IsNotEmpty()
  order: number;

  @ApiProperty({
    description: 'O id da empresa',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  companyId: string;
}
