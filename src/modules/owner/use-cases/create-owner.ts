import { CreateUser } from "@modules/user/use-cases/create-user";
import { Injectable } from "@nestjs/common";

import { CreateOwnerBody } from "../dtos/create-owner.body";
import { Owner } from "../entities/owner";
import { OwnersRepository } from "../repositories/owner-repository";

interface CreateOwnerResponse {
  owner: Owner
}

@Injectable()
export class CreateOwner {
  constructor(private ownerRepository: OwnersRepository, private createUser: CreateUser) { }

  async execute(request: CreateOwnerBody): Promise<CreateOwnerResponse> {
    const { email, name, password } = request;

    const { user } = await this.createUser.execute({ email, name, password })

    const owner = new Owner({ name, userId: user.id })

    await this.ownerRepository.create(owner)

    return {
      owner
    }

  }
}