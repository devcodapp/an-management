import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserEmail } from '../user/use-cases/get-user-email';
import * as bcrypt from 'bcrypt';
import { encodePassword } from '@shared/services/encodePassword';

@Injectable()
export class AuthService {
  constructor(
    private getUserEmail: GetUserEmail,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string, companyId: string) {
    console.log(email, pass, companyId);
    const { user } = await this.getUserEmail.execute({ companyId, email });
    console.log(user);
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
