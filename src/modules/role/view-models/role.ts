import { Permission, Role } from '../entities/role';

export class RoleViewModel {
  static toHTTP(role: Role, fields?: string[]): IRoleView {
    // const roleToReturn = {}
    // for(const field of fields) {
    //   role
    // }

    return {
      id: role.id,
      name: role.name,
      permissions: role.permissions,
      restaurantId: role.restaurantId,
      numberOfUsers: role.numberOfUsers,
      users: role.users
    };
  }
}

export interface IRoleView {
  id: string;
  name: string;
  permissions: Permission[]
  restaurantId: string
  numberOfUsers: number
  users: IUserView[]
}

interface IUserView {
  id: string;
  username: string;
  email: string
}
