import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company';
import { CompaniesRepository } from '../repositories/company-repository';

interface FilterCompanyRequest {
  name?: string;
  tags?: string[];
  type?: string;
}

interface FilterCompanyResponse {
  companies: Company[] | null;
}

@Injectable()
export class FilterCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(request: FilterCompanyRequest): Promise<FilterCompanyResponse> {
    const companies = await this.companiesRepository.companies(request);

    return { companies };
  }
}
