import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersRepository } from '@shared/modules/user/repositories/user-repository';
import { User } from '@shared/modules/user/entities/user';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({ data: raw });
  }

  async user(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async userByEmail(
    email: string,
    companyId?: string | undefined,
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email, companyId },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async save(user: User): Promise<void> {
    const { id, ...raw } = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.update({ where: { id }, data: raw });
  }
}
