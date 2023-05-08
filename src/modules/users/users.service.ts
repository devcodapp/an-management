import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export interface user {
  id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: user[] = [
    {
      id: '1',
      name: 'john',
      email: 'john@example.com',
      password: 'changeme',
    },
    {
      id: '2',
      name: 'maria',
      email: 'maria@example.com',
      password: 'guess',
    },
  ];

  async findOne(name: string): Promise<user | undefined> {
    return this.users.find((user) => user.name === name);
  }
}
