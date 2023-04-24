import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company';
import { CompaniesRepository } from '../repositories/company-repository';

interface GetCompanyRequest {
  id: string;
}

interface GetCompanyResponse {
  company: Company | null;
}

@Injectable()
export class GetCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(request: GetCompanyRequest): Promise<GetCompanyResponse> {
    const { id } = request;

    const company = await this.companiesRepository.company(id);

    return { company };
  }
}
