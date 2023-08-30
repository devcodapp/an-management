import { Injectable } from "@nestjs/common";

import { FilterRoleBody } from "../dto/filter-role.body";
import { Role } from "../entities/role";
import { RoleRepository } from "../repositories/role-repository";

interface FilterRoleResponse {
  roles: Role[]
}

@Injectable()
export class FilterRole {
  constructor(private roleRepository: RoleRepository){}
  
  async execute(request: FilterRoleBody): Promise<FilterRoleResponse>{
    const roles = await this.roleRepository.roles(request)

    return {
      roles
    }
  }
}