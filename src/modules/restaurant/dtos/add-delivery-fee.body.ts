import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class AddDeliveryFeeBody {
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @IsNotEmpty()
  @IsNumber()
  fee: number;

  @IsNotEmpty()
  @IsNumber()
  distanceMin: number;

  @IsNotEmpty()
  @IsNumber()
  distanceMax: number;
}
