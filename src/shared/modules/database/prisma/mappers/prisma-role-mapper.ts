import { Role } from '@modules/role/entities/role';
import { Role as RawRole } from '@prisma/client';

export class PrismaRoleMapper {
  static toPrisma(role: Role) {
    const newRole = {} as any
    for(const field in role['props']){
      newRole[field] = role['props'][field]
    }
    for(const field in role) {
      if(field.startsWith('_')){
        const newField = field.split('_')[1]
        newRole[newField] = role[field]
      }
    }
    delete newRole.numberOfUsers
    delete newRole.users
    return newRole
  }

  static toDomain(raw: RawRole & { role_users?: any,}) {
    const users = raw.role_users?.map(role => role.user);
    return new Role(
      {
        restaurantId: raw.restaurantId,
        name: raw.name,
        description: raw.description ,
        permissions: raw.permissions as [],
        numberOfUsers: raw.numberOfUsers || 0,
        users: users?.map(user => {
          return {
            id: user.id,
            username: user.username,
            email: user.email
          }
        }) 
      },
      {
        createdAt: raw.createdAt,
        createdUser: raw.createdUser,
        deletedAt: raw.deletedAt,
        deletedUser: raw.deletedUser,
        id: raw.id,
        deleted: raw.deleted,
      },
    );
  }
}
