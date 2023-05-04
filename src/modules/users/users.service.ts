import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export interface user {
  id: string;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: user[] = [
    {
      id: '1',
      username: 'john',
      email: 'john@example.com',
      password: 'changeme',
    },
    {
      id: '2',
      username: 'maria',
      email: 'maria@example.com',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<user | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
