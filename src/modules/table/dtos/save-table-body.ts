import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveTableBody {
  @ApiProperty({
    description: 'O id do table',
    type: String,
    required: true,
  })
  @IsUUID()
  tableId: string;

  @ApiProperty({
    description: 'O nome do table',
    type: String,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'A preço do table',
    type: Number,
    required: false,
  })
  amountOfChairs: number;

  @ApiProperty({
    description: 'O id da categoria',
    type: String,
    required: false,
  })
  companyId?: string;
}
