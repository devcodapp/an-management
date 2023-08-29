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
    return newRole
  }

  static toDomain(raw: RawRole & { role_users?: any}) {
    return new Role(
      {
        restaurantId: raw.restaurantId,
        name: raw.name,
        description: raw.description ,
        permissions: raw.permissions as [],
        numberOfUsers: raw.role_users.users.length || 0
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
