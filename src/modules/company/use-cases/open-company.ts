import { Injectable } from '@nestjs/common';
import { CompaniesRepository } from '../repositories/company-repository';
import { CompanyNotFound } from './errors/company-not-found';

interface OpenCompanyRequest {
  companyId: string;
}

type OpenCompanyResponse = void;

@Injectable()
export class OpenCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(request: OpenCompanyRequest): Promise<OpenCompanyResponse> {
    const { companyId } = request;

    const company = await this.companiesRepository.company(companyId);

    if (!company) {
      throw new CompanyNotFound();
    }

    company.open();

    await this.companiesRepository.save(company);
  }
}
