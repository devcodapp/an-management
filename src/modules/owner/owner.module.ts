import { CreateUser } from '@modules/user/use-cases/create-user';
import { SaveUser } from '@modules/user/use-cases/save-user';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '@shared/modules/database/database.module';

import { OwnerController } from './owner.controller';
import { CreateOwner } from './use-cases/create-owner';
import { GetOwner } from './use-cases/get-owner';
import { SaveOwner } from './use-cases/save-owner';

@Module({
  providers: [CreateOwner, CreateUser, JwtService, SaveOwner, SaveUser, GetOwner],
  imports: [DatabaseModule],
  controllers: [OwnerController]
})
export class OwnerModule {}
