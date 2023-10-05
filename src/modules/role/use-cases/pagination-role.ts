import { Injectable } from "@nestjs/common";
import { PaginationProps } from "@shared/dtos/pagination-body";

import { FilterRoleBody } from "../dto/filter-role.body";
import { RolePaginated } from "../entities/role";
import { RoleRepository } from "../repositories/role-repository";

@Injectable()
export class PaginationRole {
  constructor(private roleRepository: RoleRepository) { }

  async execute(request: FilterRoleBody, pagination: PaginationProps): Promise<RolePaginated> {
    const roles = await this.roleRepository.rolesPagination(request, pagination)

    return roles
  }
}