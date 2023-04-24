import { Injectable } from '@nestjs/common';
import { CompaniesRepository } from '../repositories/company-repository';
import { CompanyNotFound } from './errors/company-not-found';

interface CloseCompanyRequest {
  companyId: string;
}

type CloseCompanyResponse = void;

@Injectable()
export class CloseCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(request: CloseCompanyRequest): Promise<CloseCompanyResponse> {
    const { companyId } = request;

    const company = await this.companiesRepository.company(companyId);

    if (!company) {
      throw new CompanyNotFound();
    }

    company.close();

    await this.companiesRepository.save(company);
  }
}
