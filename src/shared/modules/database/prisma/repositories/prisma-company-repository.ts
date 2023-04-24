import { Company } from '@modules/company/entities/company';
import { CompanyFilterInput } from '@modules/company/interfaces/company-filter.input';
import { CompaniesRepository } from '@modules/company/repositories/company-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaCompanyMapper } from '../mappers/prisma-company-mapper';

@Injectable()
export class PrismaCompanyRepository implements CompaniesRepository {
  constructor(private prisma: PrismaService) {}

  async create(company: Company): Promise<void> {
    const raw = PrismaCompanyMapper.toPrisma(company);

    await this.prisma.company.create({
      data: {
        name: raw.name,
        description: raw.description,
        type: raw.type,
        tags: raw.tags,
        id: raw.id,
      },
    });
  }
  async company(companyId: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return null;
    }

    return PrismaCompanyMapper.toDomain(company);
  }
  async companies(filters: CompanyFilterInput): Promise<Company[] | null> {
    const companies = await this.prisma.company.findMany({
      where: {
        ...(filters.name && { name: { contains: filters.name } }),
        ...(filters.description && {
          description: { contains: filters.description },
        }),
        ...(filters.tags && { tags: { hasSome: filters.tags } }),
        ...(filters.type && { type: filters.type }),
        ...(filters.isOpened != undefined && { isOpened: filters.isOpened }),
        ...(filters.disabledAt
          ? { disabledAt: { not: null } }
          : { disabledAt: null }),
      },
      orderBy: { name: 'asc' },
    });

    return companies.map(PrismaCompanyMapper.toDomain);
  }
  async save(company: Company): Promise<void> {
    const { id, ...raw } = PrismaCompanyMapper.toPrisma(company);

    await this.prisma.company.update({
      data: { ...raw },
      where: { id },
    });
  }
}
