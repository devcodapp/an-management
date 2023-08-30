import { Injectable } from "@nestjs/common";
import { UserRoleBody } from "../dto/user-role.body";
import { RoleRepository } from "../repositories/role-repository";

@Injectable()
export class AddUserRole {
  constructor(private roleRepository: RoleRepository) { }

  async execute(request: UserRoleBody): Promise<void> {
    await this.roleRepository.addUser(request)
  }
}
