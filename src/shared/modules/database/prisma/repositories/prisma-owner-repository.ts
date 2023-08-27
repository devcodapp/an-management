import { Owner } from '@modules/owner/entities/owner';
import { OwnersRepository } from '@modules/owner/repositories/owner-repository';
import { Injectable } from '@nestjs/common';

import { PrismaOwnerMapper } from '../mappers/prisma-owner-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class PrismaOwnerRepository implements OwnersRepository {
  constructor(private prisma: PrismaService) { }
  
  async create(owner: Owner): Promise<void> {
    const raw = PrismaOwnerMapper.toPrisma(owner);

    await this.prisma.owner.create({ data: {...raw, id: raw.id ?? ''} });
  }

  async owner(ownerId: string): Promise<Owner | null> {
    const owner = await this.prisma.owner.findUnique({ where: { id: ownerId } });
    
    if (!owner) {
      return null;
    }
    
    return PrismaOwnerMapper.toDomain(owner);
  }
  

  async save(owner: Owner): Promise<void> {
    const { id, ...raw } = PrismaOwnerMapper.toPrisma(owner);

    await this.prisma.owner.update({ where: { id }, data: raw });
  }
}
