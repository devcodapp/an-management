import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUser } from './use-cases/create-user';
import { GetUser } from './use-cases/get-user';
import { SaveUser } from './use-cases/save-user';
import { GetUserEmail } from './use-cases/get-user-email';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';

@Module({
  providers: [CreateUser, GetUser, GetUserEmail, SaveUser, JwtService],
  imports: [DatabaseModule],
  controllers: [UserController],
})
export class UserModule {}
