import { Inject, Injectable } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Role } from "../entities/role"
import { RoleRepository } from "../repositories/role-repository"
import { RoleNotFound } from "./errors/role-not-found"

interface DeleteRoleRequest {
  roleId: string
}

interface DeleteRoleResponse {
  role: Role
}

@Injectable()
export class DeleteRole {
  constructor(private roleRepository: RoleRepository, @Inject(REQUEST) private req: Request) { }

  async execute({ roleId }: DeleteRoleRequest): Promise<DeleteRoleResponse> {
    const role = await this.roleRepository.role(roleId)

    if (!role) {
      throw new RoleNotFound()
    }

    role.delete(this.req['user'].sub)

    await this.roleRepository.save(role)

    return { role }
  }
}