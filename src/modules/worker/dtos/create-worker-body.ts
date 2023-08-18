import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerBody {
  @ApiProperty({
    description: 'O nome do usuário',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O email do usuário',
    type: String,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'O cargo do usuário',
    type: String,
  })
  @IsNotEmpty()
  role: 'admin' | 'colaborator';

  @ApiProperty({
    description: 'O id da restaurante',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;
}
