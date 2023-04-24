import { Injectable } from '@nestjs/common';
import { CompaniesRepository } from '../repositories/company-repository';
import { Company } from '../entities/company';

interface CreateCompanyRequest {
  name: string;
  description: string;
  tags: string[];
  type: string;
}

interface CreateCompanyResponse {
  company: Company;
}

@Injectable()
export class CreateCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(request: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const { description, name, tags, type } = request;

    const company = new Company({
      description,
      name,
      tags,
      type,
    });

    await this.companiesRepository.create(company);

    return {
      company,
    };
  }
}
