import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRestaurant } from './use-cases/create-restaurant';
import { SaveRestaurant } from './use-cases/save-restaurant';
import { GetRestaurant } from './use-cases/get-restaurant';
import { FilterRestaurant } from './use-cases/filter-restaurant';
import { DisableRestaurant } from './use-cases/disable-restaurant';
import {
  CloseRestaurantSwagger,
  CreateRestaurantSwagger,
  DisableRestaurantSwagger,
  FilterRestaurantSwagger,
  GetRestaurantSwagger,
  OpenRestaurantSwagger,
  UpdateRestaurantSwagger,
} from './swagger/restaurant.swagger';
import { FilterRestaurantBody } from './dtos/filter-restaurant-body';
import { RestaurantViewModel, IRestaurantView } from './view-models/restaurant';
import { CreateRestaurantBody } from './dtos/create-restaurant-body';
import { SaveRestaurantBody } from './dtos/save-restaurant-body';
import { OpenRestaurant } from './use-cases/open-restaurant';
import { CloseRestaurant } from './use-cases/close-restaurant';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';
import { ArrayInterceptor } from 'src/interceptors/array/array.interceptor';
import { AuthGuard } from '@shared/modules/auth/auth.guard';

@ApiTags('Restaurant')
@Controller('restaurant')
@UseInterceptors(BooleanInterceptor, ArrayInterceptor)
export class RestaurantController {
  constructor(
    private createRestaurant: CreateRestaurant,
    private saveRestaurant: SaveRestaurant,
    private getRestaurant: GetRestaurant,
    private filterRestaurant: FilterRestaurant,
    private disableRestaurant: DisableRestaurant,
    private openRestaurant: OpenRestaurant,
    private closeRestaurant: CloseRestaurant,
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation(FilterRestaurantSwagger)
  async restaurants(
    @Query() query: FilterRestaurantBody,
  ): Promise<{ restaurants: IRestaurantView[] } | null> {
    const { restaurants } = await this.filterRestaurant.execute(query);

    if (!restaurants) {
      return null;
    }

    return { restaurants: restaurants?.map(RestaurantViewModel.toHTTP) };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation(GetRestaurantSwagger)
  async restaurant(
    @Param('id') id: string,
  ): Promise<{ restaurant: IRestaurantView } | null> {
    const { restaurant } = await this.getRestaurant.execute({ id });

    if (!restaurant) {
      return null;
    }

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @Post()
  @ApiOperation(CreateRestaurantSwagger)
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateRestaurantBody })
  async create(
    @Body() body: CreateRestaurantBody,
  ): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.createRestaurant.execute(body);

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: SaveRestaurantBody })
  @ApiOperation(UpdateRestaurantSwagger)
  async update(
    @Body() body: SaveRestaurantBody,
  ): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.saveRestaurant.execute(body);

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('open/:restaurantId')
  @ApiOperation(OpenRestaurantSwagger)
  async open(@Param('restaurantId') restaurantId: string): Promise<void> {
    await this.openRestaurant.execute({
      restaurantId,
    });
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('close/:restaurantId')
  @ApiOperation(CloseRestaurantSwagger)
  async close(@Param('restaurantId') restaurantId: string): Promise<void> {
    await this.closeRestaurant.execute({
      restaurantId,
    });
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('disable/:restaurantId')
  @ApiOperation(DisableRestaurantSwagger)
  async disable(
    @Param('restaurantId') restaurantId: string,
  ): Promise<{ restaurant: IRestaurantView }> {
    const { restaurant } = await this.disableRestaurant.execute({
      restaurantId,
    });

    return {
      restaurant: RestaurantViewModel.toHTTP(restaurant),
    };
  }
}
