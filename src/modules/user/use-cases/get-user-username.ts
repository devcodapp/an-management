import { Injectable } from '@nestjs/common';

import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';

interface GetUserUsernameRequest {
  username: string;
}

interface GetUserUsernameResponse {
  user: User | null;
}

@Injectable()
export class GetUserUsername {
  constructor(private userRepository: UsersRepository) { }

  async execute(request: GetUserUsernameRequest): Promise<GetUserUsernameResponse> {
    const { username } = request;
    const user = await this.userRepository.userByUsername(username);

    return { user };
  }
}
