import { FilterBaseBody } from "@shared/dtos/filter-base-body";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class FilterRoleBody extends FilterBaseBody {
  @IsOptional()
  @IsString()
  name?: string;

  @IsUUID()
  @IsNotEmpty()
  restaurantId: string
}