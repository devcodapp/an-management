import { IsNotEmpty, IsUUID } from "class-validator"

export class UserRoleBody {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsUUID()
  @IsNotEmpty()
  roleId: string
}