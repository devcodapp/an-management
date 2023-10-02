import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class SaveOpeningHourBody {
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @IsUUID()
  @IsNotEmpty()
  openingHourId: string;

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
