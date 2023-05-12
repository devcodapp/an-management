import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { WorkerModule } from '@modules/worker/worker.module';
import { GetUserEmail } from '../user/use-cases/get-user-email';

@Module({
  imports: [
    WorkerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, GetUserEmail],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
