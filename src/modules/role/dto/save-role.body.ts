import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Permission } from "../entities/role";

export class SaveRoleBody {
  @IsNotEmpty()
  @IsUUID()
  roleId: string;

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @Type(() => Array)
  permissions?: Permission[]
}