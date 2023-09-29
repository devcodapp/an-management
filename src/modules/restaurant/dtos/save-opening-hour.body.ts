import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class SaveOpeningHourBody {
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @IsUUID()
  @IsNotEmpty()
  openingHourId: string;

  @IsOptional()
  @IsNotEmpty()
  openHour: string;

  @IsOptional()
  @IsNotEmpty()
  openDay: string;

  @IsOptional()
  @IsNotEmpty()
  closeHour: string;

  @IsOptional()
  @IsNotEmpty()
  closeDay: string;


}
