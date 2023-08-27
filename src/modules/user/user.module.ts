import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUser } from './use-cases/create-user';
import { GetUser } from './use-cases/get-user';
import { GetUserEmail } from './use-cases/get-user-email';
import { SaveUser } from './use-cases/save-user';
import { UserController } from './user.controller';
import { DatabaseModule } from '@shared/modules/database/database.module';

@Module({
  providers: [CreateUser, GetUser, GetUserEmail, SaveUser, JwtService],
  imports: [DatabaseModule],
  controllers: [UserController],
})
export class UserModule {}
