import { Injectable } from "@nestjs/common";
import { Role } from "../entities/role";
import { RoleRepository } from "../repositories/role-repository";

interface GetRoleRequest {
  roleId: string
}

interface GetRoleResponse {
  role: Role | null
}

@Injectable()
export class GetRole {
  constructor(private roleRepository: RoleRepository) { }

  async execute({ roleId }: GetRoleRequest): Promise<GetRoleResponse> {
    const role = await this.roleRepository.role(roleId)

    return {
      role
    }
  }
}