import { CreateRestaurantBody } from '@modules/restaurant/dtos/create-restaurant-body';
import { DisableRestaurantSwagger } from '@modules/restaurant/swagger/restaurant.swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@shared/modules/auth/auth.guard';
import { query } from 'express';
import { CreateRestaurantTypeBody } from './dtos/create-restaurant-type-body';
import {
  CreateRestaurantTypeSwagger,
  DeleteRestaurantTypeSwagger,
  FilterRestaurantTypeSwagger,
} from './swagger/restaurant-type.swagger';
import { CreateRestaurantType } from './use-cases/create-restaurant-type';
import { DeleteRestaurantType } from './use-cases/delete-restaurant-type';
import { FilterRestaurantType } from './use-cases/filter-restaurant';
import {
  IRestaurantTypeView,
  RestaurantTypeViewModel,
} from './view-models/restaurant-type';

@ApiTags('Restaurant Type')
@Controller('restaurant-type')
export class RestaurantTypeController {
  constructor(
    private filterRestaurantType: FilterRestaurantType,
    private createRestaurantType: CreateRestaurantType,
    private deleteRestaurantType: DeleteRestaurantType,
  ) {}

  @Get()
  @ApiOperation(FilterRestaurantTypeSwagger)
  async restaurants(): Promise<{
    restaurantTypes: IRestaurantTypeView[];
  } | null> {
    const { restaurantTypes } = await this.filterRestaurantType.execute();

    if (!restaurantTypes) {
      return null;
    }

    return {
      restaurantTypes: restaurantTypes?.map(RestaurantTypeViewModel.toHTTP),
    };
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation(CreateRestaurantTypeSwagger)
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateRestaurantTypeBody })
  async create(
    @Body() body: CreateRestaurantTypeBody,
  ): Promise<{ restaurantType: IRestaurantTypeView }> {
    const { restaurantType } = await this.createRestaurantType.execute(body);

    return {
      restaurantType: RestaurantTypeViewModel.toHTTP(restaurantType),
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('delete/:restaurantTypeId')
  @ApiOperation(DeleteRestaurantTypeSwagger)
  async disable(
    @Param('restaurantTypeId') restaurantTypeId: string,
  ): Promise<{ restaurantType: IRestaurantTypeView }> {
    const { restaurantType } = await this.deleteRestaurantType.execute({
      restaurantTypeId,
    });

    return {
      restaurantType: RestaurantTypeViewModel.toHTTP(restaurantType),
    };
  }
}
