import { Injectable } from '@nestjs/common';
import { encodePassword } from '@shared/services/encodePassword';

import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';
import { UserAlreadExists } from './errors/user-alread-exists';

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  username?: string;
  restaurantId?: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UsersRepository) { }

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, password, name, username, restaurantId } = request;

    const userExists = await this.userRepository.userByEmail(
      email
    );

    if (userExists) {
      throw new UserAlreadExists();
    }

    let newUsername = name.split(' ')[0].toLowerCase()

    if (!username) {
      let user = await this.userRepository.userByUsername(newUsername)
      let number = 0;

      while (user) {
        number++;
        newUsername = `${name.split(' ')[0].toLowerCase()}${number}`
        user = await this.userRepository.userByUsername(newUsername)
      }
    }

    const user = new User({
      email,
      password: encodePassword(password),
      restaurantId,
      username: username || newUsername,
    });

    await this.userRepository.create(user);

    return { user };
  }
}
