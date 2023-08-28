import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '@shared/modules/database/database.module';

import { CreateUser } from './use-cases/create-user';
import { GetUser } from './use-cases/get-user';
import { GetUserEmail } from './use-cases/get-user-email';
import { GetUserUsername } from './use-cases/get-user-username';
import { SaveUser } from './use-cases/save-user';

@Module({
  providers: [CreateUser, GetUser, GetUserEmail, SaveUser, GetUserUsername, JwtService],
  imports: [DatabaseModule],
})
export class UserModule {}
