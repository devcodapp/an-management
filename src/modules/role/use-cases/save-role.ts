import { Injectable } from "@nestjs/common";
import { SaveRoleBody } from "../dto/save-role.body";
import { Role } from "../entities/role";
import { RoleRepository } from "../repositories/role-repository";
import { RoleNotFound } from "./errors/role-not-found";

interface SaveRoleResponse {
  role: Role
}

@Injectable()
export class SaveRole {
  constructor(private roleRepository: RoleRepository) { }

  async execute(request: SaveRoleBody): Promise<SaveRoleResponse> {
    const { roleId, ...updatedFields } = request;

    const role = await this.roleRepository.role(roleId);

    if (!role) {
      throw new RoleNotFound()
    }

    Object.assign(role, updatedFields)

    await this.roleRepository.save(role)

    return {
      role
    }
  }
}