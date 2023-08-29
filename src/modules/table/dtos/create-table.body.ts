import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTableBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amountOfChairs: number;

  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;
}
