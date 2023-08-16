import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GetUserEmail } from '../user/use-cases/get-user-email';

@Injectable()
export class AuthService {
  constructor(
    private getUserEmail: GetUserEmail,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string, restaurantId: string) {
    const { user } = await this.getUserEmail.execute({ restaurantId, email });
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id };
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
