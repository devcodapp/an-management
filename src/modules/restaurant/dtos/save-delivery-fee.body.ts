import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class SaveDeliveryFeeBody {
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @IsUUID()
  @IsNotEmpty()
  deliveryFeeId: string;

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
