import { FilterRoleBody } from '@modules/role/dto/filter-role.body';
import { UserRoleBody } from '@modules/role/dto/user-role.body';
import { Role, RolePaginated } from '@modules/role/entities/role';
import { RoleRepository } from '@modules/role/repositories/role-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationProps } from '@shared/dtos/pagination-body';
import { randomUUID } from 'crypto';
import { Paginate } from 'src/utils/pagination';

import { PrismaRoleMapper } from '../mappers/prisma-role-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class PrismaRoleRepository implements RoleRepository {
  constructor(private prisma: PrismaService) { }

  async addUser(data: UserRoleBody): Promise<void> {
    const role_user = await this.prisma.role_User.findFirst({
      where: {
        roleId: data.roleId,
        userId: data.userId
      }
    })

    if (role_user) {
      throw new HttpException(`Este usuário já pertence a este cargo. Usuário:${data.userId} Cargo:${data.roleId}`, HttpStatus.CONFLICT)
    }

    await this.prisma.role_User.create({
      data: {
        id: randomUUID(),
        userId: data.userId,
        roleId: data.roleId
      }
    })
  }

  async removeUser(data: UserRoleBody): Promise<void> {
    const role_user = await this.prisma.role_User.findFirst({
      where: {
        roleId: data.roleId,
        userId: data.userId
      }
    })

    if (!role_user) {
      throw new HttpException(`Relacionamento entre este usuário e este cargo não encontrado. `, HttpStatus.BAD_REQUEST)
    }

    await this.prisma.role_User.delete({
      where: {
        id: role_user?.id
      }
    })
  }

  async create(role: Role): Promise<void> {
    const raw = PrismaRoleMapper.toPrisma(role);

    await this.prisma.role.create({
      data: { ...raw },
    });
  }
  async role(roleId: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
      include: { role_users: { include: { user: true }, }, _count: true }
    });

    if (!role) {
      return null;
    }

    return PrismaRoleMapper.toDomain(role);
  }

  async rolesByIds(roleIds: string[]): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      where: { id: { in: roleIds } }
    })

    return roles.map(PrismaRoleMapper.toDomain);
  }

  async roles(filters: FilterRoleBody): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
        ...(filters.restaurantId && { restaurantId: filters.restaurantId, }),
        deleted: filters.deleted || false,
      },
      include: { _count: true },
      orderBy: { name: 'asc' },
    });
    return roles.map(PrismaRoleMapper.toDomain);
  }

  async rolesPagination(filters: FilterRoleBody, { currentPage, perPage }: PaginationProps): Promise<RolePaginated> {
    const query: Prisma.RoleFindManyArgs = {
      where: {
        ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
        ...(filters.restaurantId && { restaurantId: filters.restaurantId, }),
        deleted: filters.deleted || false,
      },
    }
    const [roles, count] = await this.prisma.$transaction([
      this.prisma.role.findMany({
        where: query.where,
        include: { _count: true },
        orderBy: { name: 'asc' },
        skip: perPage * (currentPage - 1),
        take: perPage
      }),
      this.prisma.role.count({where: query.where})
    ])
    const pagination = await Paginate(count, perPage, currentPage)

    return {
      items: roles.map(PrismaRoleMapper.toDomain),
      pagination
    }
  }

  async save(role: Role): Promise<void> {
    const { id, ...raw } = PrismaRoleMapper.toPrisma(role);
    await this.prisma.role.update({
      data: { ...raw },
      where: { id },
    });
  }
}
