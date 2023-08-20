import { Injectable } from '@nestjs/common';
import { encodePassword } from '@shared/services/encodePassword';

import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';
import { UserAlreadExists } from './errors/user-alread-exists';

interface CreateUserRequest {
  email: string;
  password?: string;
  name?: string;
  username?: string;
  googleId?: string;
  restaurantId?: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, password, name, username, restaurantId, googleId } = request;

    const userExists = await this.userRepository.userByEmail(
      email,
      restaurantId,
    );

    if (userExists) {
      throw new UserAlreadExists();
    }

    const user = new User({
      email,
      password: password && encodePassword(password),
      name,
      restaurantId,
      username,
      googleId,
    });

    await this.userRepository.create(user);

    return { user };
  }
}
