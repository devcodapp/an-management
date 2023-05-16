import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUser } from './use-cases/create-user';
import { GetUser } from './use-cases/get-user';
import { SaveUser } from './use-cases/save-user';
import { GetUserEmail } from './use-cases/get-user-email';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CreateUser, GetUser, GetUserEmail, SaveUser, JwtService],
  imports: [DatabaseModule],
})
export class UserModule {}
