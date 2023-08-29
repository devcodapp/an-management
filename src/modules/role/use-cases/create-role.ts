import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { CreateRoleBody } from "../dto/create-role.body";
import { Role } from "../entities/role";
import { RoleRepository } from "../repositories/role-repository";

interface CreateRoleResponse {
  role: Role
}

@Injectable()
export class CreateRole {
  constructor(private roleRepository: RoleRepository, @Inject(REQUEST) private req: Request,) { }

  async execute(request: CreateRoleBody): Promise<CreateRoleResponse> {
    const { description, name, restaurantId } = request

    const role = new Role({
      description,
      name,
      restaurantId,
      permissions: []
    }, { createdUser: this.req['user'].sub })

    await this.roleRepository.create(role)

    return { role };
  }
}