import { Injectable } from "@nestjs/common";

import { Owner } from "../entities/owner";
import { OwnersRepository } from "../repositories/owner-repository";

interface GetOwnerRequest {
  ownerId: string;
}

interface GetOwnerResponse {
  owner: Owner | null
}

@Injectable()
export class GetOwner {
  constructor(private ownerRepository: OwnersRepository) { }

  async execute({ ownerId }: GetOwnerRequest): Promise<GetOwnerResponse> {
    const owner = await this.ownerRepository.owner(ownerId)

    return { owner }
  }
}