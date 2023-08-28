import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { CreateOwnerBody } from './dtos/create-owner.body';
import { SaveOwnerBody } from './dtos/save-owner.body';
import { CreateOwner } from './use-cases/create-owner';
import { GetOwner } from './use-cases/get-owner';
import { SaveOwner } from './use-cases/save-owner';
import { IOwnerView, OwnerViewModel } from './view-models/owner';

@Controller('owner')
export class OwnerController {
  constructor(private createOwner: CreateOwner, private saveOwner: SaveOwner, private getOwner: GetOwner) { }

 
  @Get(':id')
  async owner(
    @Param('id') ownerId: string,
  ): Promise<{ owner: IOwnerView } | null> {
    const { owner } = await this.getOwner.execute({
      ownerId,
    });

    if (!owner) {
      return null;
    }

    return {
      owner: OwnerViewModel.toHTTP(owner),
    };
  }

  @Post()
  async create(@Body() body: CreateOwnerBody,): Promise<{ owner: IOwnerView }> {
    const { owner } = await this.createOwner.execute(body);

    return { owner: OwnerViewModel.toHTTP(owner) }
  }

  @Put()
  async update(@Body() body: SaveOwnerBody): Promise<any> {
    const { owner } = await this.saveOwner.execute(body)

    return { owner: OwnerViewModel.toHTTP(owner) }
  }
}
