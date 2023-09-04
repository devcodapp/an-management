import { User } from '@modules/user/entities/user';
import { GetUserEmail } from '@modules/user/use-cases/get-user-email';
import { GetUserUsername } from '@modules/user/use-cases/get-user-username';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginAuthBody } from './dtos/login-auth-body';

@Injectable()
export class AuthService {
  constructor(
    private getUserEmail: GetUserEmail,
    private gerUserUsername: GetUserUsername,
    private jwtService: JwtService,
  ) { }

  async signIn(request: LoginAuthBody) {
    const { password, email, username } = request

    let user: User;

    if (email) {
      const { user: userRaw } = await this.getUserEmail.execute({ email });
      user = userRaw
    } else if (username) {
      const { user: userRaw } = await this.gerUserUsername.execute({ username });

      if (!userRaw) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
      }

      user = userRaw
    } else {
      throw new HttpException('Informe um nome de usuário ou email', HttpStatus.BAD_REQUEST)
    }

    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id, roles: user.roleIds };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
      user: {
        username: user.username,
        email: user.email,

        restaurantId: user.restaurantId,
        id: user.id,
      },
    };
  }

}
