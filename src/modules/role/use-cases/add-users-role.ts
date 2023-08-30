import { Injectable } from "@nestjs/common";
import { UserRoleBody } from "../dto/user-role.body";
import { RoleRepository } from "../repositories/role-repository";

@Injectable()
export class AddUsersRole {
  constructor(private roleRepository: RoleRepository) { }

  async execute(request: UserRoleBody[]): Promise<void> {
    for(const data of request){
      await this.roleRepository.addUser(data)
    }
  }
}
