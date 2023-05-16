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
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCompany } from './use-cases/create-company';
import { SaveCompany } from './use-cases/save-company';
import { GetCompany } from './use-cases/get-company';
import { FilterCompany } from './use-cases/filter-company';
import { DisableCompany } from './use-cases/disable-company';
import {
  CloseCompanySwagger,
  CreateCompanySwagger,
  DisableCompanySwagger,
  FilterCompanySwagger,
  GetCompanySwagger,
  OpenCompanySwagger,
  UpdateCompanySwagger,
} from './swagger/company.swagger';
import { FilterCompanyBody } from './dtos/filter-company-body';
import { CompanyViewModel, ICompanyView } from './view-models/company';
import { CreateCompanyBody } from './dtos/create-company-body';
import { SaveCompanyBody } from './dtos/save-company-body';
import { OpenCompany } from './use-cases/open-company';
import { CloseCompany } from './use-cases/close-company';
import { BooleanInterceptor } from 'src/interceptors/boolean/boolean.interceptor';
import { ArrayInterceptor } from 'src/interceptors/array/array.interceptor';
import { AuthGuard } from '@shared/modules/auth/auth.guard';

@ApiTags('Company')
@Controller('company')
@UseInterceptors(BooleanInterceptor, ArrayInterceptor)
export class CompanyController {
  constructor(
    private createCompany: CreateCompany,
    private saveCompany: SaveCompany,
    private getCompany: GetCompany,
    private filterCompany: FilterCompany,
    private disableCompany: DisableCompany,
    private openCompany: OpenCompany,
    private closeCompany: CloseCompany,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation(FilterCompanySwagger)
  async companies(
    @Query() query: FilterCompanyBody,
  ): Promise<{ companies: ICompanyView[] } | null> {
    const { companies } = await this.filterCompany.execute(query);

    if (!companies) {
      return null;
    }

    return { companies: companies?.map(CompanyViewModel.toHTTP) };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation(GetCompanySwagger)
  async company(
    @Param('id') id: string,
  ): Promise<{ company: ICompanyView } | null> {
    const { company } = await this.getCompany.execute({ id });

    if (!company) {
      return null;
    }

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @Post()
  @ApiOperation(CreateCompanySwagger)
  @ApiBody({ type: CreateCompanyBody })
  async create(
    @Body() body: CreateCompanyBody,
  ): Promise<{ company: ICompanyView }> {
    const { company } = await this.createCompany.execute(body);

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @UseGuards(AuthGuard)
  @Put()
  @ApiBody({ type: SaveCompanyBody })
  @ApiOperation(UpdateCompanySwagger)
  async update(
    @Body() body: SaveCompanyBody,
  ): Promise<{ company: ICompanyView }> {
    const { company } = await this.saveCompany.execute(body);

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @UseGuards(AuthGuard)
  @Patch('open/:companyId')
  @ApiOperation(OpenCompanySwagger)
  async open(@Param('companyId') companyId: string): Promise<void> {
    await this.openCompany.execute({
      companyId,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('close/:companyId')
  @ApiOperation(CloseCompanySwagger)
  async close(@Param('companyId') companyId: string): Promise<void> {
    await this.closeCompany.execute({
      companyId,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('disable/:companyId')
  @ApiOperation(DisableCompanySwagger)
  async disable(
    @Param('companyId') companyId: string,
  ): Promise<{ company: ICompanyView }> {
    const { company } = await this.disableCompany.execute({
      companyId,
    });

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }
}
