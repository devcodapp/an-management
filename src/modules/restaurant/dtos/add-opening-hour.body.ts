import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AddOpeningHourBody {
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @IsNotEmpty()
  @IsString()
  openHour: string;

  @IsNotEmpty()
  @IsString()
  openDay: string;

  @IsNotEmpty()
  @IsString()
  closeHour: string;

  @IsNotEmpty()
  @IsString()
  closeDay: string;


}
