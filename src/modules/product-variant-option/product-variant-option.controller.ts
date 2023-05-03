import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOptionVariantProductBody } from './dtos/create-option-variant-product-body';
import { SaveOptionVariantProductBody } from './dtos/save-option-variant-product-body';
import { RemoveOptionVariant } from './usecases/remove-option-variant-product';
import { EnableOptionVariant } from './usecases/enable-option-variant-product';
import { DisableOptionVariant } from './usecases/disable-option-variant-product';
import { AddImageOptionVariant } from './usecases/images/add-image-option-variant-product';
import { RemoveImageOptionVariant } from './usecases/images/remove-image-option-variant-product';
import {
  CreateOptionProductVariantSwagger,
  DeleteOptionProductVariantSwagger,
  DisableOptionProductVariantSwagger,
  EnableOptionProductVariantSwagger,
  RemoveImageOptionProductVariantSwagger,
} from './swagger/option-variant-product.swagger';
import {
  IProductView,
  ProductViewModel,
} from '@modules/product/view-models/product';
import { AddOptionVariant } from './usecases/add-option-variant-product';
import { SaveOptionVariant } from './usecases/save-option-variant-product';
import { UpdateOptionProductVariantSwagger } from './swagger/option-variant-product.swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddImageOptionVariantProductBody } from './dtos/add-image-option-variant-product-body';
import { RemoveImageOptionVariantProductBody } from './dtos/remove-image-option-variant-product-body';

@ApiTags('Product Option')
@Controller('product-option')
export class ProductVariantOptionController {
  constructor(
    private addOptionVariant: AddOptionVariant,
    private saveOptionVariant: SaveOptionVariant,
    private removeOptionVariant: RemoveOptionVariant,
    private enableOptionVariant: EnableOptionVariant,
    private disableOptionVariant: DisableOptionVariant,
    private addImageOptionVariant: AddImageOptionVariant,
    private removeImageOptionVariant: RemoveImageOptionVariant,
  ) {}

  @Post()
  @ApiOperation(CreateOptionProductVariantSwagger)
  @ApiBody({ type: CreateOptionVariantProductBody })
  async create(
    @Body() body: CreateOptionVariantProductBody,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.addOptionVariant.execute(body);

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

  @Put()
  @ApiOperation(UpdateOptionProductVariantSwagger)
  @ApiBody({ type: SaveOptionVariantProductBody })
  async update(
    @Body() body: SaveOptionVariantProductBody,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.saveOptionVariant.execute(body);

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

  @Patch('p/:productId/v/:variantId/:optionSKU')
  @ApiOperation(DeleteOptionProductVariantSwagger)
  async delete(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Param('optionSKU') optionSKU: string,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.removeOptionVariant.execute({
      optionSKU,
      productId,
      variantId,
    });

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

  @Patch('enable/p/:productId/v/:variantId/:optionSKU')
  @ApiOperation(EnableOptionProductVariantSwagger)
  async enable(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Param('optionSKU') optionSKU: string,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.enableOptionVariant.execute({
      optionSKU,
      productId,
      variantId,
    });

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

  @Patch('disable/p/:productId/v/:variantId/:optionSKU')
  @ApiOperation(DisableOptionProductVariantSwagger)
  async disable(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Param('optionSKU') optionSKU: string,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.disableOptionVariant.execute({
      optionSKU,
      productId,
      variantId,
    });

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

  @Patch('upload')
  @ApiConsumes('multipart/form-data')
  @ApiOperation(DisableOptionProductVariantSwagger)
  @ApiBody({ type: AddImageOptionVariantProductBody })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Body() body: AddImageOptionVariantProductBody,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.addImageOptionVariant.execute({
      ...body,
      image,
    });

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }

  @Patch('removeImage')
  @ApiConsumes('multipart/form-data')
  @ApiOperation(RemoveImageOptionProductVariantSwagger)
  @ApiBody({ type: RemoveImageOptionVariantProductBody })
  async removeImage(
    @Body() body: RemoveImageOptionVariantProductBody,
  ): Promise<{ product: IProductView }> {
    const { product } = await this.removeImageOptionVariant.execute(body);

    return {
      product: ProductViewModel.toHTTP(product),
    };
  }
}
