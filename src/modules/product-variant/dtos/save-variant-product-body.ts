import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveVariantProductBody {
  @ApiProperty({
    description: 'O id do produto',
    type: String,
    required: true,
  })
  @IsUUID()
  optionId: string;

  @ApiProperty({
    description: 'O id da variação',
    type: String,
    required: true,
  })
  @IsUUID()
  variantId: string;

  @ApiProperty({
    description: 'O tipo da variação',
    type: String,
    required: false,
  })
  type: string;
}
