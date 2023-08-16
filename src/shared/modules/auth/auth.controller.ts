import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { LoginAuthBody } from './dtos/login-auth-body';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: LoginAuthBody })
  @ApiConsumes('application/x-www-form-urlencoded')
  async signIn(@Body() signInDto: LoginAuthBody) {
    return await this.authService.signIn(
      signInDto.email,
      signInDto.password,
      signInDto.restaurantId,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/admin')
  @ApiBody({ type: LoginAuthBody })
  @ApiConsumes('application/x-www-form-urlencoded')
  async signInAdmin(@Body() signInDto: LoginAuthBody) {
    return await this.authService.signInAdmin(
      signInDto.email,
      signInDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
