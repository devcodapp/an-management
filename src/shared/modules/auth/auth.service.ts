import { WorkerService } from '@modules/worker/worker.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private workersService: WorkerService,
    private jwtService: JwtService,
  ) {}

  async signIn(name: string, pass: string) {
    const worker = await this.workersService.findOne(name);
    if (worker?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { name: worker.name, sub: worker.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
