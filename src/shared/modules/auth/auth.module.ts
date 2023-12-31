import { GetUserEmail } from '@modules/user/use-cases/get-user-email';
import { GetUserUsername } from '@modules/user/use-cases/get-user-username';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    DatabaseModule,
    UserModule,
  ],
  providers: [AuthService, GetUserEmail, GetUserUsername],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
