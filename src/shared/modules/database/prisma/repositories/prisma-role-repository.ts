import { FilterRoleBody } from '@modules/role/dto/filter-role.body';
import { Role } from '@modules/role/entities/role';
import { RoleRepository } from '@modules/role/repositories/role-repository';
import { Injectable } from '@nestjs/common';
import { PrismaRoleMapper } from '../mappers/prisma-role-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class PrismaRoleRepository implements RoleRepository {
  constructor(private prisma: PrismaService) { }

  async create(role: Role): Promise<void> {
    const raw = PrismaRoleMapper.toPrisma(role);

    await this.prisma.role.create({
      data: { ...raw },
    });
  }
  async role(roleId: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return null;
    }

    return PrismaRoleMapper.toDomain(role);
  }

  async roles({
    deleted,
    ...filters
  }: FilterRoleBody): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
        ...(filters.restaurantId && { user: { restaurantId: filters.restaurantId, } }),
        deleted: deleted || false,
      },
      include: { role_users: { include: { users: true } } },
      orderBy: { name: 'asc' },
    });
    return roles.map(PrismaRoleMapper.toDomain);
  }

  async save(role: Role): Promise<void> {
    const { id, ...raw } = PrismaRoleMapper.toPrisma(role);
    await this.prisma.role.update({
      data: { ...raw },
      where: { id },
    });
  }
}
