import { CreateUser } from '@modules/user/use-cases/create-user';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '@shared/modules/database/database.module';

import { CreateOwner } from './use-cases/create-owner';

@Module({
  providers: [CreateOwner, CreateUser, JwtService],
  imports: [DatabaseModule]
})
export class OwnerModule {}
