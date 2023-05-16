import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { WorkerModule } from '@modules/worker/worker.module';
import { GetUserEmail } from '../user/use-cases/get-user-email';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    DatabaseModule,
    UserModule,
  ],
  providers: [AuthService, GetUserEmail],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
