import { FilterRoleBody } from "../dto/filter-role.body";
import { UserRoleBody } from "../dto/user-role.body";
import { Role } from "../entities/role";

export abstract class RoleRepository {
  abstract create(role: Role): Promise<void>;

  abstract role(roleId: string): Promise<Role | null>;

  abstract roles(
    filter: FilterRoleBody,
  ): Promise<Role[]>;

  abstract save(role: Role): Promise<void>;

  abstract addUser(data: UserRoleBody): Promise<void>;

  abstract removeUser(data: UserRoleBody): Promise<void>;


}