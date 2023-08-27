import { Injectable } from "@nestjs/common";

import { Owner } from "../entities/owner";

interface CreateOwnerRequest {

}

interface CreateOwnerResponse {
  owner: Owner
}

@Injectable()
export class CreateOwner {
  constructor(){}

  async execute(request: CreateOwnerRequest): Promise<CreateOwnerResponse>{}
}