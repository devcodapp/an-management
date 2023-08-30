import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateRoleBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;
}