import { SaveUser } from "@modules/user/use-cases/save-user";
import { Injectable } from "@nestjs/common";

import { SaveOwnerBody } from "../dtos/save-owner.body";
import { Owner } from "../entities/owner";
import { OwnersRepository } from "../repositories/owner-repository";
import { OwnerNotFound } from "./errors/owner-not-found";

interface SaveOwnerResponse {
  owner: Owner
}

@Injectable()
export class SaveOwner {
  constructor(private ownerRepository: OwnersRepository, private saveUser: SaveUser) { }

  async execute(request: SaveOwnerBody): Promise<SaveOwnerResponse> {
    const { ownerId, email, name, password, username } = request;

    const owner = await this.ownerRepository.owner(ownerId)

    if (!owner) {
      throw new OwnerNotFound()
    }

    await this.saveUser.execute({ userId: owner.userId, email, password, username })

    name && (owner.name = name);

    await this.ownerRepository.save(owner)

    return { owner }
  }
}