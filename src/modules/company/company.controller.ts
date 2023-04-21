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
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCompany } from './use-cases/create-company';
import { SaveCompany } from './use-cases/save-company';
import { GetCompany } from './use-cases/get-company';
import { FilterCompany } from './use-cases/filter-company';
import { DisableCompany } from './use-cases/disable-company';
import {
  CreateCompanySwagger,
  DisableCompanySwagger,
  FilterCompanySwagger,
  GetCompanySwagger,
  UpdateCompanySwagger,
} from './swagger/company.swagger';
import { FilterCompanyBody } from './dtos/filter-company-body';
import { CompanyViewModel } from './view-models/company';
import { CreateCompanyBody } from './dtos/create-company-body';
import { FileInterceptor } from '@nestjs/platform-express';
import { SaveCompanyBody } from './dtos/save-company-body';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private createCompany: CreateCompany,
    private saveCompany: SaveCompany,
    private getCompany: GetCompany,
    private filterCompany: FilterCompany,
    private disableCompany: DisableCompany,
  ) {}

  @Get()
  @ApiOperation(FilterCompanySwagger)
  async companies(@Query() query: FilterCompanyBody): Promise<any> {
    const { companies } = await this.filterCompany.execute(query);

    return { companies: companies?.map(CompanyViewModel.toHTTP) };
  }

  @Get(':id')
  @ApiOperation(GetCompanySwagger)
  async company(@Param('id') id: string): Promise<any> {
    const { company } = await this.getCompany.execute({ id });

    if (!company) {
      return {};
    }

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @Post()
  @ApiOperation(CreateCompanySwagger)
  @ApiBody({ type: CreateCompanyBody })
  async create(@Body() body: CreateCompanyBody): Promise<any> {
    const { company } = await this.createCompany.execute(body);

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @Put()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SaveCompanyBody })
  @ApiOperation(UpdateCompanySwagger)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Body() body: SaveCompanyBody,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const { company } = await this.saveCompany.execute({
      ...body,
      image,
    });

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @Patch('disable/:companyId')
  @ApiOperation(DisableCompanySwagger)
  async disable(@Param('companyId') companyId: string) {
    const { company } = await this.disableCompany.execute({
      companyId,
    });

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }
}
