import { Company } from '../entities/company';
import { CompanyFilterInput } from '../interfaces/company-filter.input';

export abstract class CompaniesRepository {
  abstract create(company: Company): Promise<void>;

  abstract company(companyId: string): Promise<Company | null>;

  abstract companies(filters: CompanyFilterInput): Promise<Company[] | null>;

  abstract save(company: Company): Promise<void>;
}
