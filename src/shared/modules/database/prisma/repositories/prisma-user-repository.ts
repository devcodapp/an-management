import { User } from '@modules/user/entities/user';
import { UsersRepository } from '@modules/user/repositories/user-repository';
import { Injectable } from '@nestjs/common';

import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaService) { }
  
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
    restaurantId?: string | undefined,
    ): Promise<User | null> {
      const user = await this.prisma.user.findFirst({
        where: { email, ...(restaurantId && { restaurantId }) },
      });
      
      if (!user) {
        return null;
      }
      
    return PrismaUserMapper.toDomain(user);
  }
  
    async userByUsername(username: string): Promise<User | null> {
      const user = await this.prisma.user.findUnique({
        where: { username },
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
