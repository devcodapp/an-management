import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVariantProductBody {
  @ApiProperty({
    description: 'O id do produto',
    type: String,
    required: true,
  })
  @IsUUID()
  optionId: string;

  @ApiProperty({
    description: 'O tipo da variação',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  type: string;
}
