import { Injectable } from "@nestjs/common";

import { Role } from "../entities/role";
import { RoleRepository } from "../repositories/role-repository";

interface GetManyRolesRequest {
  roleIds: string[];
}

interface GetManyRolesResponse {
  roles: Role[]
}

@Injectable()
export class GetManyRoles {
  constructor(private roleRepository: RoleRepository) { }

  async execute({ roleIds }: GetManyRolesRequest): Promise<GetManyRolesResponse> {
    const roles = await this.roleRepository.rolesByIds(roleIds)

    return {
      roles
    }
  }
}