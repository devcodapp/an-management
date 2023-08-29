import { User } from '@modules/user/entities/user';
import { Permission, Role } from '../entities/role';

export class RoleViewModel {
  static toHTTP(role: Role & { role_users?: { users: User[] } }): IRoleView {
    return {
      id: role.id,
      name: role.name,
      permissions: role.permissions,
      restaurantId: role.restaurantId,
      numberOfUsers: role.role_users?.users.length || 0
    };
  }
}

export interface IRoleView {
  id: string;
  name: string;
  permissions: Permission[]
  restaurantId: string
  numberOfUsers: number
}
