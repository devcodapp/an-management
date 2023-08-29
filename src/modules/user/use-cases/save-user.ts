import { Injectable } from '@nestjs/common';
import { encodePassword } from '@shared/services/encodePassword';

import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';
import { UsernameAlreadExists } from './errors/username-alread-exists';

interface SaveUserRequest {
  userId: string;
  username?: string;
  email?: string;
  password?: string;
}

interface SaveUserResponse {
  user: User;
}

@Injectable()
export class SaveUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: SaveUserRequest): Promise<SaveUserResponse> {
    const { userId, password, ...updateFields } = request;

    const user = await this.userRepository.user(userId);

    if (!user) {
      throw new UserNotFound();
    }

    if(updateFields.username){
      const hasUserWithUsername = await this.userRepository.userByUsername(updateFields.username);

      if(hasUserWithUsername?.id != userId) {
        throw new UsernameAlreadExists()
      }
    }

    Object.assign(user, updateFields);

    password && (user.password = encodePassword(password));

    await this.userRepository.save(user);

    return { user };
  }
}
