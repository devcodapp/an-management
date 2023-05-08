import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserFilterInput } from '@modules/users/interfaces/user-filter.input';
import { UsersRepository } from '@modules/users/repositories/user-repository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { User } from '@modules/users/entities/user';

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: { ...raw },
    });
  }
  async user(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async users(filters: UserFilterInput): Promise<User[] | null> {
    const users = await this.prisma.user.findMany({
      where: { ...filters, name: { contains: filters.name }, deletedAt: null },
      orderBy: { name: 'asc' },
    });
    return users.map(PrismaUserMapper.toDomain);
  }

  async save(user: User): Promise<void> {
    const { id, ...raw } = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.update({
      data: { ...raw },
      where: { id },
    });
  }
}
