import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTableBody {
  @ApiProperty({
    description: 'O nome do table',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O preço do table',
    type: Number,
  })
  @IsNotEmpty()
  amountOfChairs: number;

  @ApiProperty({
    description: 'O id da categoria',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;
}
