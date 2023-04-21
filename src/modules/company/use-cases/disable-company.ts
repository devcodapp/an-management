import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company';
import { CompaniesRepository } from '../repositories/company-repository';
import { CompanyNotFound } from './errors/company-not-found';

interface DisableCompanyRequest {
  companyId: string;
}
interface DisableCompanyResponse {
  company: Company;
}

@Injectable()
export class DisableCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(
    request: DisableCompanyRequest,
  ): Promise<DisableCompanyResponse> {
    const { companyId } = request;

    const company = await this.companiesRepository.company(companyId);

    if (!company) {
      throw new CompanyNotFound();
    }

    company.disabledAt = new Date();

    await this.companiesRepository.save(company);

    return { company };
  }
}
