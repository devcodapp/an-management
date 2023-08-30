import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginAdminAuthBody } from './dtos/login-admin-auth-body';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: LoginAdminAuthBody) {
    return await this.authService.signIn(
      signInDto.email,
      signInDto.password,
      // signInDto.restaurantId,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/admin')
  async signInAdmin(@Body() signInDto: LoginAdminAuthBody) {
    return await this.authService.signInAdmin(
      signInDto.email,
      signInDto.password,
    );
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('login/google')
  // @ApiBody({ type: LoginAuthBody })
  // @ApiConsumes('application/x-www-form-urlencoded')
  // async signInGoogle(@Body() signInDto: LoginGoogleBody) {
  //   return await this.authService.signInGoogle(
  //     signInDto.email,
  //     signInDto.googleId,
  //   );
  // }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
