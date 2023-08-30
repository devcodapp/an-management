import { Injectable } from "@nestjs/common";
import { UserRoleBody } from "../dto/user-role.body";
import { RoleRepository } from "../repositories/role-repository";

@Injectable()
export class RemoveUsersRole {
  constructor(private roleRepository: RoleRepository) { }

  async execute(request: UserRoleBody[]): Promise<void> {
    for(const data of request){
      await this.roleRepository.removeUser(data)
    }
  }
}
