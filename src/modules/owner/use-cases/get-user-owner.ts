import { Injectable } from "@nestjs/common";

import { Owner } from "../entities/owner";
import { OwnersRepository } from "../repositories/owner-repository";

interface GetUserOwnerRequest {
  userId: string;
}

interface GetUserOwnerResponse {
  owner: Owner | null
}

@Injectable()
export class GetUserOwner {
  constructor(private ownerRepository: OwnersRepository) { }

  async execute({ userId }: GetUserOwnerRequest): Promise<GetUserOwnerResponse> {
    const owner = await this.ownerRepository.ownerByUser(userId)

    return { owner }
  }
}