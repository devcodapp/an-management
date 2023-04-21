import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { DatabaseModule } from '@shared/modules/database/database.module';
import { CreateCompany } from './use-cases/create-company';
import { SaveCompany } from './use-cases/save-company';
import { GetCompany } from './use-cases/get-company';
import { FilterCompany } from './use-cases/filter-company';
import { DisableCompany } from './use-cases/disable-company';
import { CloudinaryService } from '@shared/modules/cloudinary/cloudinary.service';

@Module({
  controllers: [CompanyController],
  imports: [DatabaseModule],
  providers: [
    CreateCompany,
    SaveCompany,
    GetCompany,
    FilterCompany,
    DisableCompany,
    CloudinaryService,
  ],
})
export class CompanyModule {}
