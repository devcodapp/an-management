import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantTypeBody {
  @IsString()
  @IsNotEmpty()
  name: string;
}
