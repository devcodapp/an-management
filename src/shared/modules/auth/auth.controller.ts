import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginAuthBody } from './dtos/login-auth-body';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: LoginAuthBody) {
    return await this.authService.signIn(
      signInDto,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request) {
    return req['user'];
  }
}
